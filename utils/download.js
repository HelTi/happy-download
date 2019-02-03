const request = require('request')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const mime = require('mime-types')
const randomUserAgent = require('./userAgent')

/**
 * url: http地址
 * dirPath： 默认下载文件夹
 * filename: 文件名
 */
function download(url, { dirPath = 'download', filename = 'file_name' } = {}, cb) {

  return new Promise((resolve, reject) => {
    const cwd = process.cwd()
    const DOWNLOAD_PATH = path.join(cwd, dirPath)
    if (fs.existsSync(DOWNLOAD_PATH)) {
      console.log(`已存在${dirPath}文件夹`.gray)
    } else {
      fs.mkdirSync(DOWNLOAD_PATH)
    }
    console.log('存放文件夹位置'.gray, DOWNLOAD_PATH)
    //请求下载
    request
      .get({
        url: url,
        headers: {
          'User-Agent': randomUserAgent()
        }
      })
      .on('response', (response) => {
        let { headers, statusCode } = response
        let contentType = response.headers['content-type'];
        let urlSplit = url.split('/'),
          urlSplitLen = urlSplit.length;
        let file_name = (urlSplit[urlSplitLen - 1]).split('.') ? ((urlSplit[urlSplitLen - 1]).split('.'))[0] : urlSplit[2];
        extension_name = '.' + mime.extension(contentType)
        filename = file_name ? file_name + extension_name : 'index'

        let wr = fs.createWriteStream(path.join(DOWNLOAD_PATH, filename))
        wr.on('finish', function () {
          resolve(true)
          cb && cb()
        })
        wr.on('error', function (err) {
          reject(false)
          cb && cb(err)
        })
        //写入文件
        response.pipe(wr)
      })
  })

}

module.exports = download