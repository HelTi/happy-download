## helti-cli

### 使用

> npm install helti-cli -g

### helti-cli down <url> (下载网络文件，默认存放文件夹 download)

```shell
## 下载网络文件
helti-cli down <url>  ##url必须加上http或者https协议

## --dir 指定文件存放位置
helti-cli down --dir <foldername> <url>

## --name 对文件进行自定义命名
helti-cli down --name <filename> <url>
```

### example

```shell
helti-cli down https://cdn.bootcss.com/vue/2.6.10/vue.js
helti-cli down --dir my https://cdn.bootcss.com/vue/2.6.10/vue.js
helti-cli down --name v https://cdn.bootcss.com/vue/2.6.10/vue.js
```
