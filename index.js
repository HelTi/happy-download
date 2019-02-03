const program = require('commander')
const colors = require('colors')
const ora = require('ora');

const download = require('./utils/download')
const gitClone = require('./utils/gitclone')

const spinner = ora();
spinner.color = 'yellow';

program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .option('-u, --url <url>', 'https or http address', function (url) {
    let argvs = process.argv.slice(2)
    if (!url) {
      console.log('请输入url'.red)
    } else {
      let downloadOpt = {}
      if (!!argvs[2]) {
        downloadOpt['filename'] = argvs[2]
      }

      spinner.start('开始下载 \n')
      download(url, downloadOpt).then((_) => {
        spinner.succeed('下载完成！')
      })
    }
  })
  .option('-g, --git <url>', 'git repository address', function (val) {
    console.log('gitaddress', val)
    spinner.start('开始下载 \n')
    gitClone(val, function () {
      spinner.succeed('下载完成！')
    })
  })
  .parse(process.argv);