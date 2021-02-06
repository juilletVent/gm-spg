import { program } from "commander";

program
  .action(function (tplVersion = "v1") {
    console.log("tplVersion", tplVersion);

    // if (docUri) {
    //   // do something...request doc data and replace to template.
    // }
  })
  .parse(process.argv);
