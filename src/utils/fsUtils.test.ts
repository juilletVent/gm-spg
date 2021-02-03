import { isEmpty } from "lodash";
import path from "path";
import { getAllChildFolder, getProjectRoot } from "./fsUtils";

const current = __dirname;

test("获取指定目录的所有子目录", () => {
  expect(isEmpty(getAllChildFolder(current))).toEqual(false);
  expect(
    getAllChildFolder(path.resolve(current, "./fsUtilsTestDir")).length
  ).toEqual(2);
});

test("获取当前项目根路径", () => {
  expect(getProjectRoot(__dirname)).toEqual(path.resolve(__dirname, "../../"));
  expect(getProjectRoot(path.resolve(__dirname, "../"))).toEqual(
    path.resolve(__dirname, "../../")
  );
});
