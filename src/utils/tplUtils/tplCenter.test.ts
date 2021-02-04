import { TplType } from "@/types/TpleType.enum";
import { getTpl } from "./tplCenter";

const Constants = {
  NOEXIST_KEY: "not_exist",
  VERSION_KEY: "v1",
};

test("正常引入v1版本组", () => {
  expect(
    getTpl(Constants.VERSION_KEY, TplType.TYPE_FILTER_FORM).includes("react")
  ).toEqual(true);
  expect(
    getTpl(Constants.VERSION_KEY, TplType.TYPE_CONTENT).includes("react")
  ).toEqual(true);
  expect(
    getTpl(Constants.VERSION_KEY, TplType.TYPE_ENTRANCE).includes("react")
  ).toEqual(true);
});

test("异常引入不存在的版本组", () => {
  expect(() =>
    getTpl(Constants.NOEXIST_KEY, TplType.TYPE_FILTER_FORM)
  ).toThrowError();
  expect(() =>
    getTpl(Constants.NOEXIST_KEY, TplType.TYPE_CONTENT)
  ).toThrowError();
  expect(() =>
    getTpl(Constants.NOEXIST_KEY, TplType.TYPE_ENTRANCE)
  ).toThrowError();
});

test("异常引入不存在的模板类型", () => {
  expect(() =>
    getTpl(Constants.VERSION_KEY, Constants.NOEXIST_KEY as TplType)
  ).toThrowError();
});

test("异常引入版本与类型均不存在的模板类型", () => {
  expect(() =>
    getTpl(Constants.NOEXIST_KEY, Constants.NOEXIST_KEY as TplType)
  ).toThrowError();
});
