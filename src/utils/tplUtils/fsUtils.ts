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

/**
 * 寻找最近的项目根目录位置
 * @param subpath 查找的起始路径
 */
export function getProjectRoot(subpath: string): string | undefined {
  // 递归向上查找
  const currentDirFileList = fs.readdirSync(subpath);
  if (currentDirFileList.includes("package.json")) {
    return subpath;
  }
  // 如果向上的路径与当前路径一致，则表明已经抵达当前盘符根路径
  if (subpath === path.resolve(subpath, "../")) {
    return undefined;
  }
  return getProjectRoot(path.resolve(subpath, "../"));
}
