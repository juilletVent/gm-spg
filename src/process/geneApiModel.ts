import path from "path";
import inquirer from "inquirer";
import { getProjectRoot } from "@/utils/tplUtils";
import { myErrorLog } from "@/utils/logUtils";
import { EasyMockConf } from "@/types/EasyMockConf";
import { pick } from "lodash";

export default function geneApiModel() {
  // 1、定位当前项目的根路径
  // 2、查找并分析EasyMock配置文件，给出可以生成模型的项目名称

  const projectRoot = getProjectRoot(process.cwd());
  if (!projectRoot) {
    myErrorLog("未找到最近的package.json文件，无法定位项目根目录。");
    return;
  }

  const mockConf = require(path.resolve(
    projectRoot,
    "./.easy-mock.js"
  )) as EasyMockConf;

  const optList = mockConf.projects.map((item) => pick(item, ["id", "name"]));

  inquirer
    .prompt({
      name: "请选择需要生成Api模型的项目",
      type: "checkbox",
      pageSize: 10,
      choices: optList,
    })
    .then((answers) => {
      console.log(answers);
    })
    .catch((err) => {
      myErrorLog(`生成失败：${err.message}`);
    });
}
