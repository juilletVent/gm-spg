import { program } from "commander";

program
  .command("init [tplVersion] [docUri]")
  .description("创建SearchPage基础模板")
  .action(function (tplVersion = "v1") {
    console.log("tplVersion", tplVersion);

    // if (docUri) {
    //   // do something...request doc data and replace to template.
    // }
  });
