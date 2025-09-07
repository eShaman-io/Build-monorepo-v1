import "dotenv/config";

const required = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env: ${k}`);
  return v;
};

export const CONFIG = {
  OPENAI_API_KEY: required("OPENAI_API_KEY"),
};
