import inquirer from "inquirer";
import { get, pick } from "lodash";
import { g, myErrorLog, myInfoLog } from "@/utils/logUtils";
import { EasyMockConfI } from "@/types/EasyMockConf";
import { getEasyMockConf, getMockData } from "@/utils/mockUtils";
import analyseInterfaceInfo from "@/utils/mockUtils/analyseInterfaceInfo";
import { filterListSchemaInterface } from "@/utils/mockUtils/filterListSchemaInterface";
import { writeInterface } from "@/utils/mockUtils/writeInterface";

export async function getTargetProject(mockConf?: EasyMockConfI) {
  if (!mockConf) {
    return [];
  }
  // 根据配置文件提供备选项（.easy-mock.js）
  const optList = mockConf.projects.map((item) => pick(item, ["id", "name"]));
  const userChoose =
    process.env.NODE_ENV === "development"
      ? { targets: ["contract"] } // eztPlatform
      : await inquirer.prompt({
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
export default async function geneApiModel(cover: boolean) {
  // 1、定位当前项目的根路径
  // 2、查找并分析EasyMock配置文件，给出可以生成模型的项目名称，提供选择
  // 3、根据选择项目访问Easymock，获取模型数据
  // 4、分析数据模型
  //    1、过滤非Get接口
  //    2、过滤非List接口
  //    3、过滤数据模型不符合预定义规范的List接口
  //    4、根据接口信息生成接口类型描述（类型名、所属接口、详细信息）
  //    5、根据描述信息循环写出接口类型定义文件
  // 5、打印完成信息

  try {
    // 取得当前项目的EasyMock配置文件
    myInfoLog("Generate process --> 定位EasyMock配置文件");
    const mockConf = getEasyMockConf();
    myInfoLog("Generate process --> Mock配置已获取");
    // 询问用户的目标项目是哪一个
    const targetProjects = await getTargetProject(mockConf);
    // 获取Mock模型数据
    myInfoLog("Generate process --> 下载EasyMock项目信息");
    const mockOriginalData = await getMockData(mockConf, targetProjects);
    myInfoLog("Generate process --> 下载成功，开始分析");
    // 分析数据生成接口描述列表（包含接口参数模型、接口响应模型、接口地址、接口描述）
    const interfaceInfos = analyseInterfaceInfo(mockOriginalData);
    // 过滤接口，只取Get类型 and List and 固定响应模式的接口
    const targetInterfaceList = filterListSchemaInterface(interfaceInfos);
    // // 循环写出接口定义文件
    await writeInterface(targetInterfaceList, cover);
    // 输出完成日志
    myInfoLog(`Generate process --> ${g("写出完成！")}`);
  } catch (error) {
    myErrorLog((error as Error).message);
  }
}
