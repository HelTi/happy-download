const program = require("commander");
const colors = require("colors");
const ora = require("ora");
var pkg = require("./package.json");

const download = require("./utils/download");

const spinner = ora();
spinner.color = "yellow";

program
  .version(pkg.version)
  .command("down <url>")
  .option("-d, --dir <d>", "deposit file address (Folder)）")
  .option("-n, --name <n>", "rename files", null)
  .action(function(url, cmd) {
    let downloadOpt = {};
    if (cmd.dir) {
      downloadOpt["dirPath"] = cmd.dir;
    }

    if (cmd.name) {
      downloadOpt["filename"] = cmd.name;
    }
    
    spinner.start("开始下载 \n");
    download(url, downloadOpt).then(_ => {
      spinner.succeed("下载完成！");
    });
  });

program.parse(process.argv);
