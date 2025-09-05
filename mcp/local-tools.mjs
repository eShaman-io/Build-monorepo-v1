Set-Content -LiteralPath "mcp\local-tools.mjs" -Value @'
#!/usr/bin/env node
import { exec as _exec } from "child_process";
import { promisify } from "util";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/stdio.js";

const exec = promisify(_exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_ROOT = process.cwd();
const DEFAULT_APP_DIR = path.join(WORKSPACE_ROOT, "apps", "web");

async function run(cmd, opts = {}) {
  const started = Date.now();
  try {
    const { stdout, stderr } = await exec(cmd, {
      cwd: opts.cwd || WORKSPACE_ROOT,
      shell: true,
      maxBuffer: 1024 * 1024 * 10,
      env: { ...process.env, ...(opts.env || {}) },
    });
    return { ok: true, command: cmd, cwd: opts.cwd || WORKSPACE_ROOT, ms: Date.now() - started, stdout, stderr };
  } catch (err) {
    return { ok: false, command: cmd, cwd: opts.cwd || WORKSPACE_ROOT, ms: Date.now() - started, stdout: err.stdout || "", stderr: err.stderr || String(err) };
  }
}

/** Scaffold a Next.js page or API route (with optional Zod + test) */
const scaffoldRouteTool = {
  name: "scaffoldRoute",
  description: "Create a Next.js route handler (api) or page with optional Zod schema and test.",
  inputSchema: {
    type: "object",
    properties: {
      appDir: { type: "string", description: "Path to Next.js app dir", default: DEFAULT_APP_DIR },
      route: { type: "string", description: "Route path (e.g., /api/ping or /about)" },
      method: { type: "string", enum: ["GET", "POST"], default: "GET" },
      withZod: { type: "boolean", default: true },
      withTest: { type: "boolean", default: true }
    },
    required: ["route"]
  },
  handler: async ({ appDir = DEFAULT_APP_DIR, route, method = "GET", withZod = true, withTest = true }) => {
    const isApi = route.startsWith("/api/");
    const normalized = route.replace(/^\//, "");
    const baseDir = path.join(appDir, "app", normalized);
    const fileDir = isApi ? baseDir : baseDir; // page folder doubles as route folder
    const handlerPath = isApi ? path.join(baseDir, "route.ts") : path.join(baseDir, "page.tsx");

    await run(`mkdir "${fileDir}"`);

    const zodImport = withZod ? `\nimport { z } from "zod";` : "";

    const handlerSource = isApi
      ? `import { NextResponse } from "next/server";${zodImport}

export async function ${method.toLowerCase()}(req: Request) {
  ${withZod ? `// const schema = z.object({ name: z.string().min(1) });` : `// validate here`}
  return NextResponse.json({ ok: true, route: "${route}", method: "${method}" });
}
`
      : `export default function Page() {
  return <main style={{padding:16}}>
    <h1>${route}</h1>
    <p>Scaffolded page.</p>
  </main>;
}
`;

    // Write file via PowerShell to be Windows-safe
    const write = await run(`powershell -Command "Set-Content -Path '${handlerPath}' -Value @'\n${handlerSource.replace(/'/g, "''")}\n'@"`);

    let testWrite = { ok: true, stdout: "", stderr: "" };
    if (withTest) {
      const testDir = path.join(appDir, "__tests__");
      const testFile = path.join(testDir, `${normalized.replace(/[\\/]/g, "_")}.test.ts`);
      await run(`mkdir "${testDir}"`);
      const testSrc = `describe("${route}", () => {
  it("placeholder", () => {
    expect(1 + 1).toBe(2);
  });
});
`;
      testWrite = await run(`powershell -Command "Set-Content -Path '${testFile}' -Value @'\n${testSrc.replace(/'/g, "''")}\n'@"`);
    }

    return {
      ok: write.ok && testWrite.ok,
      details: { handlerPath },
      nextSteps: [
        "Run: pnpm dev",
        \`Visit: http://localhost:3000${route}\`,
        withTest ? "Run tests: pnpm test -w" : undefined
      ].filter(Boolean)
    };
  }
};

/** Deploy Firebase (Hosting + Functions) */
const firebaseDeployTool = {
  name: "firebaseDeploy",
  description: "Deploy Firebase Hosting/Functions using the Firebase CLI.",
  inputSchema: {
    type: "object",
    properties: {
      only: { type: "string", default: "hosting,functions" },
      project: { type: "string", description: "Firebase project alias or ID (optional)" }
    }
  },
  handler: async ({ only = "hosting,functions", project }) => {
    const target = project ? \`--project \${project}\` : "";
    const cmd = \`pnpm exec firebase deploy --only \${only} \${target}\`.trim();
    const res = await run(cmd);
    return { ...res, hint: "If auth fails, run `pnpm exec firebase login` or add firebase-tools locally." };
  }
};

/** Fix lint + format */
const fixLintTool = {
  name: "fixLint",
  description: "Run workspace lint (if present) and Prettier write.",
  inputSchema: { type: "object", properties: {} },
  handler: async () => {
    const lint = await run(`pnpm run -w lint --if-present || echo "no lint script"`);
    const fmt = await run(`pnpm exec prettier . -w`);
    return { ok: lint.ok && fmt.ok, lint, fmt };
  }
};

/** Typecheck */
const typecheckTool = {
  name: "typecheck",
  description: "Run TypeScript typecheck across the workspace.",
  inputSchema: { type: "object", properties: {} },
  handler: async () => run(`pnpm run -w typecheck --if-present || pnpm exec tsc -b --pretty`)
};

/** Tests */
const runTestsTool = {
  name: "runTests",
  description: "Run tests across the workspace.",
  inputSchema: {
    type: "object",
    properties: { watch: { type: "boolean", default: false } }
  },
  handler: async ({ watch = false }) => run(watch ? `pnpm test -w -- --watch` : `pnpm test -w`)
};

/** Check for outdated deps */
const bumpDepsTool = {
  name: "bumpDeps",
  description: "List outdated packages across the workspace.",
  inputSchema: { type: "object", properties: {} },
  handler: async () => {
    const check = await run(`pnpm -w outdated || echo "No outdated packages or command failed."`);
    return { ok: true, check };
  }
};

const server = new Server(
  { name: "local-tools", version: "1.0.0", tools: [scaffoldRouteTool, firebaseDeployTool, fixLintTool, typecheckTool, runTestsTool, bumpDepsTool] },
  { capabilities: { tools: {} } }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("[local-tools] MCP server running via stdio. Root:", WORKSPACE_ROOT);
'@
