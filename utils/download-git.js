const download = require('download-git-repo')
const ora = require('ora')

const spinner = ora()

module.exports = function(repo, tmp) {
  spinner.start('开始下载模版 \n')
  download(repo, tmp, function(err) {
    if (err) {
      spinner.fail('下载模版失败 ！\n')
    } else {
      spinner.succeed('下载模版成功！ \n')
    }
  })
}
