import color from "colors-console";
import fsx from "fs-extra";
import path from "path";
import { getProjectRoot } from "@/utils/tplUtils";
import { getCurrentTime } from "@/utils/timeUtils";

export enum LogLevel {
  /** 错误 */
  ERROR = 0,
  /** 警告 */
  WARN = 100,
  /** 运行信息 */
  INFO = 200,
  /** 调试信息 */
  DEBUG = 300,
}

const colorMap = {
  [LogLevel.ERROR]: "red",
  [LogLevel.WARN]: "yellow",
  [LogLevel.INFO]: "blue",
  [LogLevel.DEBUG]: "white",
};

export function myLog(level: LogLevel, content: string, error?: Error) {
  // eslint-disable-next-line no-console
  console.log(color(colorMap[level], content));
  if (error) {
    const projectRoot = getProjectRoot(process.cwd());
    if (projectRoot) {
      const logFilePath = path.resolve(projectRoot, "./spg-error.log");
      fsx.appendFileSync(
        logFilePath,
        `
  [Error] [${getCurrentTime()}] ${content}
          message： ${error.message}
          stack:    ${error.stack}
  `
      );
    }
  }
}

const hocTester = (fn: Function) => (content: string, isTester?: boolean) => {
  if (!isTester) {
    fn(content);
  }
};

export const myErrorLog = hocTester((content: string, error?: Error) =>
  myLog(
    LogLevel.ERROR,
    `${color(colorMap[LogLevel.ERROR], "[ERROR]")} ${content}`,
    error
  )
);
export const myWarnLog = hocTester((content: string, error?: Error) =>
  myLog(
    LogLevel.WARN,
    `${color(colorMap[LogLevel.WARN], "[WARN] ")} ${content}`,
    error
  )
);
export const myInfoLog = hocTester((content: string) =>
  myLog(
    LogLevel.INFO,
    `${color(colorMap[LogLevel.INFO], "[INFO] ")} ${content}`
  )
);
export const myDebugLog = hocTester((content: string) =>
  myLog(
    LogLevel.DEBUG,
    `${color(colorMap[LogLevel.DEBUG], "[DEBUG]")} ${content}`
  )
);
