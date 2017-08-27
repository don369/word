# README

这是一个用来记单词查单词的app，该app还在开发中；

要求：

* node: '^7.6' , 由于使用了async/await 故需要使用7.6以上

* express: '^4.0'

* database: mongodb

项目下载：

```
git clone https://github.com/don369/word.git

```

运行：

先安装依赖项

```npm
npm install 
```

然后修改config.js中的数据库连接

```js
db_connect: 'mongodb://localhost/wordbook',
```

然后运行 `npm start` 即可

用浏览器打开 `127.0.0.1:8080`

默认用户为admin，密码为：admin

隐藏的链接 `／invitations/new` 用来生产注册用的邀请码。

使用express框架，数据库为mongodb，链接数据库的库为mongoose，第三方查词，有用户登录，注册功能，用户验证使用自己写的中间件。session利用nosql的特性，存在在mongodb库上。使用MVC设计，将controller，Model，View分离，RESTful架构设计路由。

MVC模式的设计思路：

后缀名为controller.js为控制器，负责逻辑以及路由控制。

views文件夹内的为视图

model文件夹内的为数据库的表的抽象，数据的操作。



