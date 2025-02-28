import fs from "fs";
import fsex from "fs-extra";
import path from "path";
import prettier from "prettier";
import { get, forIn, camelCase, upperFirst } from "lodash";
import { InterfaceDescI, ProjectDesc } from "@/types/InterfaceDesc";
import { ListAttrDesc } from "@/types/ListAttrDesc";
import { getProjectRoot } from "@/utils/tplUtils";
import { getCurrentTime } from "@/utils/timeUtils";
import { myErrorLog, myInfoLog, myWarnLog } from "@/utils/logUtils";

const fsp = fs.promises;

function getInterfaceName(info: InterfaceDescI): string {
  try {
    const namePattern = /\/([a-zA-Z\-\d{}]+)\/([a-zA-Z\-\d{}]+)$/;
    const name1 = info.path
      .match(namePattern)![1]
      .replace(/{([a-zA-Z\d-])}/, "$1");
    const name2 = info.path
      .match(namePattern)![2]
      .replace(/{([a-zA-Z\d-])}/, "$1");
    return upperFirst(`${camelCase(name1)}${upperFirst(camelCase(name2))}`);
  } catch (error) {
    throw new Error("接口地址不符合一般匹配规则（字母、数字、短横线、花括号）");
  }
}

function getAttrDesc(attrInfo: ListAttrDesc) {
  let { type } = attrInfo;
  if (
    ["integer", "long", "number"].includes(type) ||
    attrInfo.format === "date-time"
  ) {
    type = "number | string";
  }

  if (type === "array") {
    return `
    /** ${attrInfo.description} */
    ${attrInfo.key}: Array<${upperFirst(camelCase(attrInfo.key))}I>;`;
  }

  if (type === "object") {
    return `
  /** ${attrInfo.description} */
    ${attrInfo.key}: ${upperFirst(camelCase(attrInfo.key))}I;`;
  }

  return `
  /** ${attrInfo.description} */
    ${attrInfo.key}: ${type};`;
}

/** 递归生成节点下所有的子模型 */
function getPremiseInterface(
  // 当前节点信息
  attrInfo: ListAttrDesc,
  // 临时存储
  premiseInterface: string[]
) {
  const interfaceName = `${upperFirst(camelCase(attrInfo.key))}I`;
  const mapProps =
    attrInfo.type === "array"
      ? attrInfo.items!.properties!
      : attrInfo.properties!;
  const mapArray: ListAttrDesc[] = [];
  forIn(mapProps, (val, key) => {
    mapArray.push({
      ...val,
      key,
    });
  });
  premiseInterface.push(`
  /** ${attrInfo.description} */
  export interface ${interfaceName} {
    ${mapArray
      .map((item) => {
        if (item.type === "object" || item.type === "array") {
          getPremiseInterface(item, premiseInterface);
        }
        return getAttrDesc(item);
      })
      .join("")}
  }
  `);
}

/** 生成单个接口的所有模型定义内容 */
function getInterfaceContent(
  interfaceName: string,
  desc: InterfaceDescI,
  projectId: string
): string {
  const properties = get(
    desc,
    "responseModel.200.schema.properties.data.items.properties"
  );
  const items: ListAttrDesc[] = [];
  forIn(properties, (val, key) => {
    items.push({
      ...val,
      key,
    });
  });
  const interfaceDescStr = get(desc, "desc", "无描述");
  const premiseInterface: string[] = [];
  let interfaceContent = `/** ${interfaceDescStr} 
  * @uri ${desc.path}
  * @projectId ${projectId}
  * create by gm-spg CLI @ ${getCurrentTime()}
  */
  export interface ${interfaceName}I {${items
    .map((item) => {
      // 如果发现是嵌套结构，则调用子处理生成所有的子级结构暂存在premiseInterface中，后续进行前置插入
      if (item.type === "array" || item.type === "object") {
        getPremiseInterface(item, premiseInterface);
      }
      return getAttrDesc(item);
    })
    .join("")}
  }
`;

  // 拼接所需的前置子结构定义
  interfaceContent = `${premiseInterface.join("")}
${interfaceContent}`;
  try {
    return prettier.format(interfaceContent, { semi: true, parser: "babel" });
  } catch (error) {
    throw new Error(`Prettier格式化异常，${(error as Error).message}`);
  }
}

/** 单组模型写出 */
async function writeGroupApi(
  typesDirPath: string,
  interfaceDescs: InterfaceDescI[],
  cover: boolean,
  projectId: string
) {
  interfaceDescs.map(async (desc) => {
    try {
      const interfaceName = getInterfaceName(desc);
      const filePath = path.join(typesDirPath, `${interfaceName}.d.ts`);
      // 如果是覆盖模式或文件不存在，则写出
      if (cover || !fs.existsSync(filePath)) {
        myInfoLog(`Generate process --> ${filePath}`);
        await fsp.writeFile(
          filePath,
          getInterfaceContent(interfaceName, desc, projectId)
        );
        return;
      }
      myWarnLog(
        `Generate process --> 接口已存在，跳过：${desc.path} \r\n ${filePath}`
      );
    } catch (error) {
      myErrorLog(
        `Generate process --> 接口生成异常，跳过：${desc.path}`,
        error as Error
      );
    }
  });
}

export async function writeInterface(
  projectsDesc: ProjectDesc,
  cover: boolean
) {
  try {
    const projectRoot = getProjectRoot(process.cwd());
    if (!projectRoot) {
      throw new Error("未定位到项目根目录！");
    }
    const typesDir = path.resolve(projectRoot, "./src/types/spg-type");
    // 不存在目录则创建
    if (!fs.existsSync(typesDir)) {
      fsex.mkdirSync(typesDir);
    }
    const projectIds = Object.keys(projectsDesc);
    const allTask = projectIds.map((projectId) =>
      writeGroupApi(typesDir, projectsDesc[projectId], cover, projectId)
    );
    await Promise.all(allTask);
  } catch (error) {
    myErrorLog((error as Error).message);
  }
}
