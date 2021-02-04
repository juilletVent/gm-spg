import color from "colors-console";

export enum LogLevel {
  /** 错误 */
  ERROR,
  /** 警告 */
  WARN = 100,
  /** 运行信息 */
  INFO = 200,
  /** 调试信息 */
  DEBUG = 300,
}

export function myLog(level: LogLevel, content: string) {
  const colorMap = {
    [LogLevel.ERROR]: "red",
    [LogLevel.WARN]: "yellow",
    [LogLevel.INFO]: "blue",
    [LogLevel.DEBUG]: "white",
  };
  console.log(color(colorMap[level], content));
}

export const myErrorLog = (content: string) =>
  myLog(LogLevel.ERROR, `[ERROR] ${content}`);
export const myWarnLog = (content: string) =>
  myLog(LogLevel.WARN, `[WARN] ${content}`);
export const myInfoLog = (content: string) =>
  myLog(LogLevel.INFO, `[INFO] ${content}`);
export const myDebugLog = (content: string) =>
  myLog(LogLevel.DEBUG, `[DEBUG] ${content}`);
