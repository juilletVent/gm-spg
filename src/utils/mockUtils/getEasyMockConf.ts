import path from "path";
import { EasyMockConfI } from "@/types/EasyMockConf";
import { getProjectRoot } from "@/utils/tplUtils";

/** 获取项目内的Easymock配置 */
export default function getEasyMockConf() {
  const projectRoot = getProjectRoot(process.cwd());
  if (!projectRoot) {
    throw new Error("未找到最近的package.json文件，无法定位项目根目录");
  }

  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(path.resolve(
      projectRoot,
      "./.easy-mock.js"
    )) as EasyMockConfI;
  } catch (error) {
    throw new Error("未找到easy-mock配置文件");
  }
}
