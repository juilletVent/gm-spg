import path from "path";
import fs from "fs";
import color from "colors-console";
import { myErrorLog } from "@/utils/logUtils";

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
    const tplDir = path.resolve(__dirname, `tpl/${tplVersion}`);
    if (!fs.existsSync(tplDir)) {
      console.log(color("red", `[ERROR] 模板版本${tplVersion}不存在！`));
      return;
    }

    // 创建模块文件夹
    const targetDir = path.resolve(process.cwd(), moduleName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    // 递归拷贝模板文件夹
    fs.cpSync(tplDir, targetDir, { recursive: true });

    console.log("[DONE]", color("green", `模块 ${targetDir} 创建成功`));
  } catch (error) {
    myErrorLog((error as Error).message);
  }
}
