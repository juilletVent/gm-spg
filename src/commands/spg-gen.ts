import { program } from "commander";
import { GenType } from "@/types/GenType.enum";
import { geneStatusComponent } from "@/process/geneStatusComponent";
import { myErrorLog, b } from "@/utils/logUtils";
import { geneApiModel } from "@/process/geneApiModel";

program
  .usage(
    `[type] 
    type：可选值如下
      - ${b("interface")}   基于easymock配置文件，创建List类型接口的数据模型
      - ${b("status")}      [实验性质]生成渲染列表状态的周边组件，依赖项目结构`
  )
  .option("--cover", "是否才用强制覆盖的形式生成，请谨慎使用")
  .action(() => {
    const type = (program.args[0] || GenType.TYPE_API) as GenType;
    const opts = program.opts();
    switch (type) {
      case GenType.TYPE_STATUS:
        geneStatusComponent();
        break;
      case GenType.TYPE_API:
        geneApiModel(opts.cover);
        break;
      default:
        myErrorLog(
          `gen子指令参数错误，不能生成类型为 "${type}" 的周边文件，没有对应的周边实现。`
        );
    }
  })
  .parse(process.argv);
