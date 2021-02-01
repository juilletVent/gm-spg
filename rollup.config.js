import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  external: ["commander"],
  plugins: [resolve(), commonjs()],
};
