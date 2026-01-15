import path from "path";
import fs from "fs";
import color from "colors-console";
import { myErrorLog } from "@/utils/logUtils";

function copyDirectorySync(src: string, dest: string): void {
  // 创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 读取源目录内容
  const entries = fs.readdirSync(src, {
    withFileTypes: true,
    encoding: "utf8", // 明确指定 UTF-8 编码
  });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    try {
      if (entry.isDirectory()) {
        // 递归复制子目录
        copyDirectorySync(srcPath, destPath);
      } else if (entry.isFile()) {
        // 复制文件
        fs.copyFileSync(srcPath, destPath);
      } else if (entry.isSymbolicLink()) {
        // 处理软链接
        const linkTarget = fs.readlinkSync(srcPath);
        fs.symlinkSync(linkTarget, destPath);
      }
    } catch (error) {
      console.error(`复制失败 ${srcPath}:`, (error as Error).message);
      throw error;
    }
  }
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
  try {
    // 确定是否存在目标版本
    const tplDir = path.normalize(path.resolve(__dirname, `tpl/${tplVersion}`));
    if (!fs.existsSync(tplDir)) {
      console.log(color("red", `[ERROR] 模板版本${tplVersion}不存在！`));
      return;
    }

    // 创建模块文件夹
    const targetDir = path.normalize(path.resolve(process.cwd(), moduleName));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    // 递归拷贝模板文件夹
    copyDirectorySync(tplDir, targetDir);

    throw new Error("模拟错误测试");

    // console.log("[DONE]", color("green", `模块 ${targetDir} 创建成功`));
  } catch (error) {
    myErrorLog((error as Error).message);
  }
}
