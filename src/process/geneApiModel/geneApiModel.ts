import path from "path";
import inquirer from "inquirer";
import { get, pick } from "lodash";
import { getProjectRoot } from "@/utils/tplUtils";
import { myErrorLog } from "@/utils/logUtils";
import { EasyMockConf } from "@/types/EasyMockConf";

/** 获取项目内的Easymock配置 */
export function getEasyMockConf(isTest?: boolean) {
  const projectRoot = getProjectRoot(process.cwd());
  if (!projectRoot) {
    myErrorLog("未找到最近的package.json文件，无法定位项目根目录", isTest);
    return;
  }
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(path.resolve(
      projectRoot,
      "./.easy-mock.js"
    )) as EasyMockConf;
  } catch (error) {
    myErrorLog("未找到easy-mock配置文件", isTest);
  }
}

export async function getTargetProject(mockConf?: EasyMockConf) {
  if (!mockConf) {
    return [];
  }
  // 根据配置文件提供备选项（.easy-mock.js）
  const optList = mockConf.projects.map((item) => pick(item, ["id", "name"]));
  const userChoose = await inquirer.prompt({
    name: "targets",
    message: "请选择需要生成Api模型的项目",
    // suffix: '（按下"空格"键选择，按下"A"键选择所有，按下"I"键反选）',
    validate: (input) => {
      if (get(input, "length", 0) === 0) {
        return "请选择需要生成模型的项目";
      }
      return true;
    },
    type: "checkbox",
    pageSize: 10,
    choices: optList,
  });

  return optList.filter((project) => userChoose.targets.includes(project.name));
}

/** 生成Api数据模型 */
export default function geneApiModel() {
  // 1、定位当前项目的根路径
  // 2、查找并分析EasyMock配置文件，给出可以生成模型的项目名称，提供选择
  // 3、根据选择项目访问Easymock，获取模型数据
  const mockConf = getEasyMockConf();
  const targetProject = getTargetProject(mockConf);
  console.log("targetProject", targetProject);
}
