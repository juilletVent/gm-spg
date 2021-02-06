import path from "path";
import fs from "fs-extra";
import { getProjectRoot } from "@/utils/tplUtils";
import { getEasyMockConf } from ".";

const projectRoot = getProjectRoot(__dirname);
const src = path.resolve(__dirname, "./.easy-mock.js");
const dst = path.resolve(projectRoot!, "./.easy-mock.js");

it("Api生成测试组-非空组", () => {
  fs.copyFileSync(src, dst);
  expect(getEasyMockConf()?.host).toEqual("http://easy-mock.gm");
});

afterEach(() => {
  try {
    fs.unlinkSync(dst);
  } catch (error) {
    // 静默失败
  }
});
