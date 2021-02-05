import { program } from "commander";
import { GenType } from "@/types/GenType.enum";
import { geneStatusComponent } from "@/process/geneStatusComponent";
import { myErrorLog, b } from "@/utils/logUtils";
import { geneApiModel } from "@/process/geneApiModel";

program
  .command("gen [type]")
  .usage(
    `[type] 
    type：可选值如下
      - ${b("interface")}   基于easymock配置文件，创建List类型接口的数据模型
      - ${b("status")}      [实验性质]生成渲染列表状态的周边组件，依赖项目结构`
  )
  .description(
    `创建接口：基于EasyMock配置文件创建接口数据模型。创建周边组件：为使用了渲染状态的列表创建渲染Status的支持${b(
      "[实验性质]"
    )}`
  )
  .action((type: string = GenType.TYPE_STATUS) => {
    switch (type) {
      case GenType.TYPE_STATUS:
        geneStatusComponent();
        break;
      case GenType.TYPE_API:
        geneApiModel();
        break;
      default:
        myErrorLog(
          `gen子指令参数错误，不能生成类型为 "${type}" 的周边文件，没有对应的周边实现。`
        );
    }
  });
