import fs from "fs";
import path from "path";
import childProcess from "child_process";
import { getProjectRoot } from "@/utils/tplUtils";

function checkAndGenerateStatus() {
  const pkgRoot = getProjectRoot(process.cwd());

  if (!pkgRoot) {
    // 项目根路径定位失败，中断执行
    return;
  }

  const componentsDis = path.join(pkgRoot, "src/components/Status");
  if (!fs.existsSync(componentsDis)) {
    // eslint-disable-next-line no-console
    console.log(`[INFO] 配套Status组件不存在，正在生成...`);

    // 文件夹不存在，组件不存在，执行命令生成
    childProcess.execSync("spg gen status", {
      stdio: "inherit",
    });
  }
}

export { checkAndGenerateStatus };
