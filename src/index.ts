import { program } from "commander";
// import inquirer from "inquirer";
// import templates from "./tpl/index";
// import { execCreateFile } from "./utils/execCreateFile";

// require("./command/command-createFolder");

// let prompList = [
//   {
//     type: "list",
//     name: "template",
//     message: "请选择你想要生成的模板？",
//     choices: templates,
//     default: templates[0],
//   },
// ];

program.version(
  require("../package").version,
  "-v,--version",
  "查看当前CLI版本"
);

program
  .alias("gmspg")
  .option("-i,--init", "初始化SearchPage模板代码")
  // .option("-l,--list <valus>", "分割字符串", strToArr)
  .action((options, command) => {
    const { init } = options;
    if (init) {
      console.log("init .");
    }
  });

// program
//   .command("create <filename>")
//   .description("创建一个文件")
//   .action(async (filename) => {
//     const res = await inquirer.prompt(prompList);
//     console.log("res", res);
//     const err = await execCreateFile(res, filename);
//   });

program.parse(process.argv);
