import { getEasyMockConf } from "./geneApiModel";

test("Api生成测试组", () => {
  expect(getEasyMockConf(true)).toEqual(undefined);
});
