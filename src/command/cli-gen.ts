import { program } from "commander";
import { GenType } from "@/types/GenType.enum";
import { geneStatusComponent } from "@/utils/geneStatusComponent";
import { myErrorLog } from "@/utils/loger";

program
  .command("gen [type]")
  .description("创建相关周边组件[实验性质]")
  .usage(
    `[type]\r\n
    type：可选值如下
      - status [实验性质]生成渲染列表状态的周边组件，依赖项目结构
    `
  )
  .action((type: string = GenType.TYPE_STATUS) => {
    switch (type) {
      case GenType.TYPE_STATUS:
        geneStatusComponent();
        break;
      default:
        myErrorLog(
          `gen子指令参数错误，不能生成类型为 "${type}" 的周边文件，没有对应的周边实现。`
        );
    }
  });
