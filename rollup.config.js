import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import progress from "rollup-plugin-progress";
import external from "rollup-plugin-peer-deps-external";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";

export default {
  input: "./src/spg.ts",
  output: {
    dir: "dist",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  watch: "src/**",
  plugins: [
    external(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    ,
    resolve(),
    commonjs(),
    clear({
      targets: ["dist"],
    }),
    copy({
      targets: [
        { src: "src/utils/tpl", dest: "dist" },
        { src: "src/components", dest: "dist" },
      ],
    }),
    progress({
      // clearLine: false, // default: true
    }),
  ],
};
