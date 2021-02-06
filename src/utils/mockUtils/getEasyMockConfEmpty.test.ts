import path from "path";
import fs from "fs-extra";
import { getProjectRoot } from "@/utils/tplUtils";
import { getEasyMockConf } from ".";

const projectRoot = getProjectRoot(__dirname);
const dst = path.resolve(projectRoot!, "./.easy-mock.js");

it("Api生成测试组-空组", () => {
  expect(() => {
    getEasyMockConf();
  }).toThrowError();
});

beforeEach(() => {
  try {
    fs.unlinkSync(dst);
  } catch (error) {
    // 静默失败
  }
});
