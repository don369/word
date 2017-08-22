# README

这是一个用来记单词查单词的app，该app还在开发中；

要求：

* node: '^6.0'

* express: '^4.0'

* database: mongodb

运行：

先安装依赖项
```npm
npm install 
```

然后修改config.js中的数据库连接
```js
db_connect: 'mongodb://localhost/wordbook',
```

接着执行init.js文件
```js
node init.js
```

然后运行 `node index.js`

用浏览器打开 `127.0.0.1:8080`

默认用户为admin，密码为：admin

／invitations/new用来生产邀请码。


