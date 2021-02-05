import path from "path";
import fs from "fs-extra";
import { getProjectRoot } from "@/utils/tplUtils";
import { getEasyMockConf } from "./geneApiModel";

const projectRoot = getProjectRoot(__dirname);
const src = path.resolve(__dirname, "./.easy-mock.js");
const dst = path.resolve(projectRoot!, "./.easy-mock.js");

it("Api生成测试组-空组", () => {
  expect(getEasyMockConf(true)).toEqual(undefined);
});

beforeEach(() => {
  try {
    fs.unlinkSync(dst);
  } catch (error) {}
});
