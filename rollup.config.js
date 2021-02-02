import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
// import copy from "rollup-plugin-copy";

export default {
  input: "./src/index.ts",
  output: {
    // 输出文件夹
    dir: "dist",
    // 输出格式
    // amd – Asynchronous Module Definition, used with module loaders like RequireJS
    // cjs – CommonJS, suitable for Node and other bundlers (alias: commonjs)
    // es – Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a <script type=module> tag in modern browsers (alias: esm, module)
    // iife – A self-executing function, suitable for inclusion as a <script> tag. (If you want to create a bundle for your application, you probably want to use this.)
    // umd – Universal Module Definition, works as amd, cjs and iife all in one
    // system – Native format of the SystemJS loader (alias: systemjs)
    format: "cjs",
    banner: "#!/usr/bin/env node",
    // 外部模块需要进行全局声明（使用了 external 插件时，就不需要了）
    // globals: {
    //   commander: "commander",
    // },
  },
  // 如果是外部依赖模块，需要在此处进行声明（使用了 external 插件时，就不需要了）
  // external: ["commander"],
  plugins: [
    external(),
    typescript({
      // rollupCommonJSResolveHack: true,
      clean: true,
    }),
    ,
    resolve(),
    commonjs(),
    // copy({
    //   targets: [{ src: "src/tpl/**/*", dest: "dist/tpl" }],
    // }),
  ],
};
