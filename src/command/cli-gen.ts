import { program } from "commander";
import { GenType } from "@/types/GenType.enum";
import { geneStatusComponent } from "@/utils/geneStatusComponent";

program
  .command("gen [type]")
  .description("创建相关周边组件")
  .action((type: string = GenType.TYPE_STATUS) => {
    switch (type) {
      case GenType.TYPE_STATUS:
        geneStatusComponent();
        break;
      default:
        console.error(
          "gen子指令参数错误，不能生成类型为${type}的周边文件，没有对应的周边实现。"
        );
    }
  });
