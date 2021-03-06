module.exports = {
  // easy-mock 服务器
  host: "http://easy-mock.gm",
  // 生成文件输入目录
  output: "src/api",
  // 生成代码使用的模板
  template: "gmsoft-happyCoding/axios-ts",
  projects: [
    {
      id: "5bc45680acb9922af8f7f803",
      name: "login",
      urlPreprocessor: (url) => url.replace("/djc-gateway", ""),
      baseUrl: "process.env.REACT_APP_DJC_GATEWAY",
    },
    {
      id: "5ffe555b78b53f620950fd3c",
      name: "eztPlatform",
      urlPreprocessor: (url) => url.replace("/xcj-gateway", ""),
      // 如果baseUrl为字符串请使用 "'baseUrl'"
      baseUrl: "process.env.REACT_APP_XCJ_GATEWAY",
    },
  ],
};
