import color from "colors-console";

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

export function myLog(level: LogLevel, content: string) {
  // eslint-disable-next-line no-console
  console.log(color(colorMap[level], content));
}

const hocTester = (fn: Function) => (content: string, isTester?: boolean) => {
  if (!isTester) {
    fn(content);
  }
};

export const myErrorLog = hocTester((content: string) =>
  myLog(
    LogLevel.ERROR,
    `${color(colorMap[LogLevel.ERROR], "[ERROR]")} ${content}`
  )
);
export const myWarnLog = hocTester((content: string) =>
  myLog(LogLevel.WARN, `${color(colorMap[LogLevel.WARN], "[WARN]")} ${content}`)
);
export const myInfoLog = hocTester((content: string) =>
  myLog(LogLevel.INFO, `${color(colorMap[LogLevel.INFO], "[INFO]")} ${content}`)
);
export const myDebugLog = hocTester((content: string) =>
  myLog(
    LogLevel.DEBUG,
    `${color(colorMap[LogLevel.DEBUG], "[DEBUG]")} ${content}`
  )
);
