import fs from "fs-extra";
import path from "path";

/**
 * 取得所有子目录
 * @param {string} 目标路径
 */
export function getAllChildFolder(subpath: string) {
  const fileList = fs.readdirSync(subpath);
  const isDirectory = (item: string) => {
    const filePath = path.resolve(subpath, item);
    return fs.lstatSync(filePath).isDirectory();
  };
  return fileList.filter(isDirectory);
}
