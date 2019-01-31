const program = require('commander')
const colors = require('colors')
const download = require('./utils/download')
const gitClone = require('./utils/gitclone')

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
      download(url, downloadOpt)
    }
  })
  .option('-g, --git <url>', 'git repository address', function (val) {
    console.log('gitaddress', val)
    gitClone(val, function () {

    })
  })
  .parse(process.argv);