const colors = require('colors')
const { exec } = require('child_process');

function gitClone(url, cb) {
  exec(`git clone ${url}`, (err, stdout, stderr) => {
    if (err) {
      cb(err)
    } else {
      cb()
    }
  });
}

module.exports = gitClone