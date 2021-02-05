import { program } from "commander";

program
  .command("init [tplVersion] [docUri]")
  .description("创建SearchPage基础模板")
  .action(function (tplVersion, docUri) {
    if (tplVersion === void 0) {
      tplVersion = "v1";
    }
    if (docUri) {
      // do something...request doc data and replace to template.
    }
  });
