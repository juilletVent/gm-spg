import path from "path";
import fs from "fs-extra";
import { TplType } from "@/types/TpleType.enum";
import getTpl from "./tplCenter";

/**
 * 对应模板类型生成文件
 * @param tplType
 * @param content
 */
function writeTpl(fileName: string | TplType, content: string) {
  const filePath = path.resolve(process.cwd(), `${fileName}.tsx`);
  fs.writeFileSync(filePath, content);
}

/**
 * 写出默认形式的SearchPage模板文件
 * @param absolutePath 写出的绝对路径
 * @param tplVersion 模板文件版本号
 */
export default async function writeDefaultTpl(
  moduleName: string,
  tplVersion: string
) {
  // 写出FilterForm内容
  const filterContent = getTpl(tplVersion, TplType.TYPE_FILTER_FORM);
  // 写出Content内容
  const Content = getTpl(tplVersion, TplType.TYPE_CONTENT);
  // 写出Entrancen内容
  const entranceContent = getTpl(tplVersion, TplType.TYPE_ENTRANCE);

  writeTpl(TplType.TYPE_FILTER_FORM, filterContent);
  writeTpl(TplType.TYPE_CONTENT, Content);
  writeTpl(moduleName, entranceContent);
}
