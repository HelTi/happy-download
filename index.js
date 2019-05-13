const program = require('commander')
const ora = require('ora')
var pkg = require('./package.json')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const CWD = process.cwd()

const download = require('./utils/download')
const download_git = require('download-git-repo')
const templateUrlMap = require('./template/url')

const spinner = ora()
spinner.color = 'yellow'

// 基础模版
const promptList = [
  {
    type: 'list',
    message: '请选择一种模版',
    name: 'template',
    choices: ['vue', 'webpack-m-pages'],
    filter: function(val) {
      return val.toLowerCase()
    }
  }
]

program
  .version(pkg.version)
  .command('down <url>')
  .option('-d, --dir <d>', 'deposit file address (Folder)）')
  .option('-n, --name <n>', 'rename files', null)
  .action(function(url, cmd) {
    let downloadOpt = {}
    if (cmd.dir) {
      downloadOpt['dirPath'] = cmd.dir
    }

    if (cmd.name) {
      downloadOpt['filename'] = cmd.name
    }

    spinner.start('开始下载 \n')
    download(url, downloadOpt).then(_ => {
      spinner.succeed('下载完成！')
    })
  })

program
  .command('create <dir>')
  .description('create project template')
  .action(function(dir, cmd) {
    if (dir) {
      const TEMPLATE_PATH = path.join(CWD, dir)
      if (!fs.existsSync(TEMPLATE_PATH)) {
        fs.mkdirSync(TEMPLATE_PATH)
      }
      inquirer.prompt(promptList).then(anwsers => {
        const TEMPLATE_URL = templateUrlMap[anwsers.template]
        spinner.start('开始下载模版 \n')
        download_git(TEMPLATE_URL, dir, function(err) {
          if (err) {
            spinner.fail('下载模版失败 ！\n')
          } else {
            spinner.succeed('下载模版成功！ \n')
          }
        })
      })
    }
  })

program.parse(process.argv)
