import type { Config } from "tailwindcss";
import sharedConfig from '../../configs/tailwind.config';

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
export default config;
