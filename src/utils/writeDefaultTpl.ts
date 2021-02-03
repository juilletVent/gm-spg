import path from "path";
import fs from "fs-extra";
import color from "colors-console";
import { TplType } from "@/types/TpleType.enum";
import getTpl from "./tplCenter";

/**
 * 对应模板类型生成文件
 * @param tplType
 * @param content
 */
function writeTpl(
  dirName: string,
  fileName: string | TplType,
  content: string
) {
  const currentPwd = process.cwd();
  const targetDir = path.resolve(currentPwd, dirName);
  // 判断当前存不存在模块文件夹，如果不存在则创建
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  const filePath = path.resolve(targetDir, `${fileName}.tsx`);
  console.log("Write file -> ", color("cyan", filePath));
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
  let entranceContent = getTpl(tplVersion, TplType.TYPE_ENTRANCE);
  entranceContent = entranceContent.replace(/###moduleName###/g, moduleName);

  writeTpl(moduleName, TplType.TYPE_FILTER_FORM, filterContent);
  writeTpl(moduleName, TplType.TYPE_CONTENT, Content);
  writeTpl(moduleName, moduleName, entranceContent);

  console.log("Write file -> ", color("green", "文件写出完成！"));
}
