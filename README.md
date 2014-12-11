## gulp-example

# Gulp介紹

### 目錄

本次筆記內容如下:

* [Intro](#Intro)
* [Install Gulp](#Install Gulp)
* [Gulp plugins](#Gulp plugins)
  - gulp-ruby-sass
  - gulp-minify-css
  - gulp-rename
  - gulp-notify
  - gulp-jshint
  - gulp-concat
  - gulp-uglify
  - gulp-cache
  - gulp-imagemin
  - del
  - watch
  - gulp-livereload
  - gulp-connect
  - gulp-compass
* [Gulp Tasks](#Gulp Tasks)
* [Gulp other commands](#Gulp other commands)
* [Gulp Reference](#Gulp Reference)


***

## Intro

>The streaming build system
>[參考Gulp github文件](https://github.com/gulpjs/gulp/)

>[Gulp開發教程：Building With Gulp](http://get.jobdeer.com/1410.get)

網站開發的過程中，我們會使用很多工具來提高我們開發的效率或提高程式碼的品質，比如壓縮程式碼、檢測程式碼、合併檔案等任務，而Gulp 與 Grunt 都是任務管理工具，能夠自動化幫你管理任務。

***

####何謂自動化?

	自動化管理任務聽起來感覺很抽象，
	以Gulp為例，
	其實就是將任務列到gulpfile.js 檔案中，
	輸入Gulp指令後，就會自動幫你執行任務。

####gulpfile.js 是什麼?

	gulpfile.js是定義Gulp任務的檔案
	所以我們要建立一個名稱為gulpfile.js的檔案


***

 Gulp 與 Grunt 都是任務管理工具
 
>Grunt 是File Based
>Gulp 是Stream Based

1. Gulp 程式碼更容易閱讀

2. Gulp處理速度較快。

***

## Install Gulp

###1.安裝Node.js

Gulp是基於 Node.js的，故要首先安裝 Node.js

###2.安裝gulp的命令列工具

指令如下：
```
npm install -g gulp
```

-g 是指會將gulp安裝到全域環境下，讓你可以存取gulp的CLI。

###3.新增package.json和gulpfile.js


因為grunt命令執行，必須於所在目錄中包括package.json和gulpfile.js兩個文件。

	package.json，是npm項目配置文件

	gulpfile.js，是專門用來配置gulp的配置文件
	

####* 建立package.json
npm init 會自動創建一個基本的package.json文件
```
npm init 
```
也可以複製別人的package.json文件來修改
```

{
  "name": "EIP",
  "version": "0.0.0",
  "description": "EIP for miniASP",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Anna",
  "license": "ISC"
}

```

####* 建立gulpfile.js

建立一個基本的gulpfile,可以複製別人的gulpfile.js文件來修改

***

接著，需要在本地端的專案進行gulp安裝。

cd到你的專案根目錄，執行下列指令：

下列指令將gulp安裝到本地端的專案內，另外於指令中加上--save-dev指令，就會同時幫你紀錄於package.json內的devDependencies物件。

```
npm install gulp --save-dev
```

如果中間有出現類似下方的錯誤
```
C:\Users\anna.AD1\AppData\Roaming\npm-cache\isarray\0.0.1\package\package.json
```

記得要清npm的cache，
```
npm cache clean
```

>安裝成功畫面如下:

```
gulp@3.8.10 C:\Users\anna.AD1\AppData\Roaming\npm\node_modules\gulp
├── interpret@0.3.8
├── pretty-hrtime@0.2.2
├── deprecated@0.0.1
├── archy@1.0.0
├── minimist@1.1.0
├── v8flags@1.0.5
├── semver@4.1.0
├── tildify@1.0.0 (user-home@1.1.0)
├── chalk@0.5.1 (ansi-styles@1.1.0, escape-string-regexp@1.0.2, supports-color@0.2.0, strip-ansi@0.3.0, has-ansi@0.1.0)
├── orchestrator@0.3.7 (stream-consume@0.1.0, sequencify@0.0.7, end-of-stream@0.1.5)
├── liftoff@0.13.6 (extend@1.3.0, flagged-respawn@0.3.1, resolve@1.0.0, findup-sync@0.1.3)
├── gulp-util@3.0.1 (lodash._reinterpolate@2.4.1, dateformat@1.0.8, lodash@2.4.1, vinyl@0.4.5, through2@0.6.3, multipipe@0.1.2, lodash.template@2.4.1)
└── vinyl-fs@0.3.13 (graceful-fs@3.0.4, mkdirp@0.5.0, strip-bom@1.0.0, defaults@1.0.0, vinyl@0.4.5, through2@0.6.3, glob-stream@3.1.17, glob-watcher@0.0.6)
```

http://get.jobdeer.com/938.get
http://www.benben.cc/blog/?cat=10


***
## Gulp plugins

gulp 本身並不複雜，比較需要學習的是那些插件(任務)本身設定與使用方法。


本範例會用到的插件如下:

```
npm install --save-dev gulp-ruby-sass #編譯Sass
npm install --save-dev gulp-minify-css #縮小化(minify)CSS
npm install --save-dev gulp-rename #重新命名
npm install --save-dev gulp-notify #更新通知
npm install --save-dev gulp-jshint #JSHint
npm install --save-dev gulp-concat #合併
npm install --save-dev gulp-uglify #醜化(Uglify) 
npm install --save-dev gulp-cache #圖片快取，只有更改過的圖片會進行壓縮
npm install --save-dev gulp-imagemin #圖片壓縮
npm install --save-dev del #編譯Sass
npm install --save-dev watch #編譯Sass
npm install --save-dev gulp-livereload #即時重整(LiveReload)
npm install --save-dev gulp-connect #把 webserver 跟 livereload 整合在一起的套件
npm install gulp-compass --save-dev #編譯compass

```



***

## Gulp Tasks

首先介紹基本編寫gulp任務的方法
[Gulp Task and Gulp Pipe](http://wcc723.github.io/gulp/2014/09/24/gulp-task/)

Gulp主要有四個指令，用這些指令就可以完成大部份工作。

- gulp.task(name, fn) 定義一個任務名稱，接下來指定任務的工作內容
- gulp.run(task) 運行指定的任務
- gulp.src(glob) 檔案來源
- gulp.dest(folder) 檔案的存檔路徑

***
>基本任務撰寫方法

1.安裝gulp的命令列工具

```
npm install -g gulp
```

***

2.建立package.json

```
npm init # 建立 package.json

```
***

3.安裝gulp

```
npm install gulp --save-dev
```

***
4.安裝插件

範例如下:


```
gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});

```
在運行上列這段任務之前，你需要先安裝對應插件

- gulp
- gulp-jshint
- gulp-uglify
- gulp-concat


```
npm install --save-dev gulp-jshint
npm install --save-dev gulp-uglify
npm install --save-dev gulp-concat

```

5.建立 gulpfile.js 編寫任務

***
範例解析如下:

- gulp.task API用來建立任務
- 建立一個名稱為js的任務，並執行function內的指令
- 下列範例中'js'是排程名稱，可以自訂
- 我們可以透過終端機輸入$ gulp + 排程名稱來執行任務

基本任務指定方法為:

```
gulp.task('js', function () {
});

```
***
進階任務指定方法為:

預設的任務也可以指定先後順序，下列範例是先執行'clean'的任務，再執行'styles', 'scripts', 'images'這三個任務
```
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
```
***
- src()裡面放的是來源檔案，意思是會去尋找js/*.js內的檔案來進行任務

```
return gulp.src('js/*.js')
```
***
- 針對這些檔案執行JSHint，用來檢測程式碼錯誤

```
.pipe(jshint())
```
***
- 將錯誤報告使用預設的方法印出來

```
.pipe(jshint.reporter('default'))
```
***
- 壓縮程式碼

```
.pipe(uglify())
```
***
- 將檔案合併起來

```
.pipe(concat('app.js'))
```
***
- gulp.dest()裡面擺放輸出的位置，將任務完成的檔案存放在名稱為build資料夾的appljs檔案中

```
.pipe(gulp.dest('build'));
```
***
***

## Gulp other commands

查詢node.js版本
```
npm update -g
```

>1.4.9


建立package.json檔案
```
npm init
```
列出可執行的任務

```
gulp -T
````
***
## Gulp Reference

[gulp 官方網站](http://gulpjs.com/)

[getting-started.md 官方文件](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

[使用 gulp 構建工程](http://www.u396.com/getting-started-with-gulp.html)

[Gulp開發教程：Building With Gulp](http://get.jobdeer.com/1410.get)

[Gulp.js-LiveReload 自動刷新頁面](http://michaelhsu.tw/2014/06/11/gulp-livereload/)

[使用 Gulp 為前端開發伺服器](http://andyyou.logdown.com/posts/223484-using-gulp-for-front-end-development-server)

[Gulp 初體驗](http://andyyou.logdown.com/posts/178360-gulp-first-experience)

[Gulp：新一代前端構建利器](http://blog.csdn.net/ys_073/article/details/20805345)

[gulp入門指南](http://987.tw/2014/07/09/gulpru-men-zhi-nan/)

[The streaming build system Gulp](http://blog.wu-boy.com/2013/12/streaming-build-system-gulp/)

[NPM - Node Package Manager](http://www.openfoundry.org/tw/tech-column/8537-npm-node-package-manager)

[NODEJS 應用佈建快手：利用 PACKAGE.JSON 處理麻煩的模組相依性](http://fred-zone.blogspot.tw/2012/02/nodejs-packagejson.html)

[Node.js 系列學習日誌 #6 - 使用 package.json 安裝、管理模組](http://ithelp.ithome.com.tw/question/10158140?tag=ithome.nq)

[node-express-mongoose-demo / package.json](https://github.com/madhums/node-express-mongoose-demo/blob/master/package.json)

[NPM 套件管理工具](https://github.com/nodejs-tw/nodejs-wiki-book/blob/master/zh-tw/node_npm.rst)

[node.js 一個package的檔案結構](http://blog.winwu.today/2013/04/nodejs-package.html)

[[譯]用 Gulp 作為 Web 開發服務器](http://www.ofcss.com/2014/05/03/gulp-as-a-development-web-server-zh_cn.html)

[gulp入門指南](http://987.tw/2014/07/09/gulpru-men-zhi-nan/)

[Gulp：任務自動管理工具](http://javascript.ruanyifeng.com/tool/gulp.html)

[gulp-compass](https://www.npmjs.org/package/gulp-compass)