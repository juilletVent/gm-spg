import fs from "fs-extra";
import path from "path";
import { getAllChildFolder } from "@/utils/tplUtils/fsUtils";
import { TplType } from "@/types/TpleType.enum";

/** 可选的模板类型 */
const AllEnums = ["FilterForm", "Content", "Entrance", "renderConf"];

/**
 * 获取对应版本以及类型的模板内容
 * @param {string} tplVersion 版本号
 * @param {string} tplType 模板类型
 */
export function getTpl(tplVersion: string, tplType: TplType): string {
  const targetPath = path.resolve(
    __dirname,
    `./tpl/${tplVersion}/${tplType}.tsx`
  );
  const tsTargetPath = path.resolve(
    __dirname,
    `./tpl/${tplVersion}/${tplType}.ts`
  );

  // 文件不存在，检查到底是版本号错误，还是模板类型错误
  if (!fs.existsSync(targetPath) && !fs.existsSync(tsTargetPath)) {
    // 如果模板类型不在可用列表内，则认定入参模板类型有误
    if (!AllEnums.includes(tplType)) {
      throw new Error(
        `调用getTpl获取模板内容时发生错误：参数tplType的值必须为以下可选值之一：FilterForm | Content" | Entrance，传入的值为：${tplType}`
      );
    }

    const allChildFolder = getAllChildFolder(path.resolve(__dirname, "./tpl"));

    if (!allChildFolder.includes(tplVersion)) {
      throw new Error(
        `未找到参数tplVersion对应的模板版本，可用的版本号如下：${JSON.stringify(
          allChildFolder
        )}`
      );
    }

    throw new Error(
      "未找到对应版本的模板文件，请在gm-spg模板文件夹中定义对应的模板文件。"
    );
  }

  if (fs.existsSync(targetPath)) {
    // 根据传入的版本以及类型取得相应的内容
    return fs.readFileSync(targetPath, { encoding: "utf-8" });
  }
  return fs.readFileSync(tsTargetPath, { encoding: "utf-8" });
}
