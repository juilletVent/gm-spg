import { program } from "commander";

program
  .version(require("../package").version, "-v,--version", "查看当前CLI版本")
  // .command("init [tplVersion] [docUri]", "测试Init")
  .command("gen [type]", "创建接口/周边实现文件")
  .command("def [moduleName] [tplVersion]", "创建SearchPage默认模板");

program.parse(process.argv);
