import path from "path";
import getTpl, { TplType } from "@/tpl/tplCenter";
import fs from "fs-extra";

function writeTpl(tplType: TplType, content: string) {
  const filePath = path.resolve(process.cwd(), `${tplType}.tsx`);
  fs.writeFileSync(filePath, content);
}

/**
 * 写出默认形式的SearchPage模板文件
 * @param absolutePath 写出的绝对路径
 * @param tplVersion 模板文件版本号
 */
export default async function writeDefaultTpl(tplVersion: string) {
  console.log("run-2");
  // 写出FilterForm内容
  const filterContent = getTpl(tplVersion, TplType.TYPE_FILTER_FORM);
  console.log("filterContent", filterContent);
  // 写出Content内容
  const Content = getTpl(tplVersion, TplType.TYPE_CONTENT);
  // 写出Entrancen内容
  const entranceContent = getTpl(tplVersion, TplType.TYPE_ENTRANCE);

  writeTpl(TplType.TYPE_FILTER_FORM, filterContent);
  console.log("write", filterContent);
  writeTpl(TplType.TYPE_CONTENT, Content);
  writeTpl(TplType.TYPE_ENTRANCE, entranceContent);
}
