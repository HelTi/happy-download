const colors = require('colors')
const { exec } = require('child_process');

function gitClone(url, cb) {
  console.log('开始克隆仓库')
  exec(`git clone ${url}`, (err, stdout, stderr) => {
    if (err) {
      console.log('克隆仓库出错')
      cb(err)
    } else {
      console.log('克隆git仓库文件完毕')
      cb()
    }
  });
}

module.exports = gitClone