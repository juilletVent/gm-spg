import { program } from "commander";
import writeDefaultTpl from "@/utils/writeDefaultTpl";

program
  .command("init [tplVersion] [docUri]")
  .description("创建SearchPage基础模板")
  .action((tplVersion: string = "v1", docUri?: string) => {
    if (docUri) {
      // do something...request doc data and replace to template.
      return;
    }
    console.log("run");

    writeDefaultTpl(tplVersion);
  });
