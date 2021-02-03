import path from "path";
import fs from "fs-extra";
import copyDir from "copy-dir";
import { getProjectRoot } from "./fsUtils";
import { myErrorLog, myInfoLog } from "./loger";

export function geneStatusComponent() {
  // 1、确定项目根目录（向上递归寻找，直到盘符下为止）
  // 2、判断src/components是否存在
  //    1、如果存在，判断Status文件夹是否存在
  //        1、如果不存在，则创建，并将文件拷贝过去
  //        2、如果存在，则中端操作，并给出提示
  //    2、不存在components文件，则创建components以及子文件夹，并给出提示，然后复制文件
  // 3、输出执行成功
  // console.log(color("green", "The build process has successfully executed."));

  const projectRoot = getProjectRoot(process.cwd());
  if (!projectRoot) {
    myErrorLog(
      "未找到最近的项目根目录，请在具备packagec.json的项目内执行命令。"
    );
    return;
  }

  const componentsDir = path.join(projectRoot, "./src/components");
  let hasComponentDir = (() => {
    try {
      return fs.lstatSync(componentsDir).isDirectory();
    } catch (error) {
      return false;
    }
  })();

  if (!hasComponentDir) {
    // 不存在组件目录，创建之
    fs.ensureDirSync(componentsDir, 0o777);
  }

  if (fs.existsSync(path.resolve(componentsDir, "./Status"))) {
    myInfoLog(`当前项目components内已有Status组件文件夹。

      1. 您是否已经生成了Status组件
      
      2. 尝试变更Status文件夹名称后重试`);
    return;
  }

  // 复制Status文件夹到目标文件夹下
  copyDir(
    path.resolve(__dirname, "./components/Status"),
    componentsDir,
    {
      cover: false,
    },
    (err) => {
      if (!err) {
        myInfoLog("Status组件写入完成！");
        return;
      }
      myErrorLog("Status组件写入失败！");
      myErrorLog(err.message);
    }
  );
}
