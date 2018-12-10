# 一、项目创建

## 项目初始化

1. vue init webpack client
2. cd client
3. cnpm install
4. cnpm i axios vuex element-ui -S


## 项目结构调整（根据个人爱好或团队要求而来）

1. 在 src 目录下新建 views 文件夹， 用于存放所有的页面，components 下只放置组件文件
2. 创建 filters 和 directives 文件夹，用于存放过滤器和指令
3. 其他的配置文件，工具函数等，自己创建文件夹或放到某个独立目录
4. 对于非页面型的小组件，为了避免频繁引入，可借助webpack的 require.context() 进行一次性引入进行优化。具体用例见项目 components/common 目录


# 二、开发中的便捷使用

## 在项目中使用 scss

1. cnpm install node-sass --save-dev
2. cnpm install sass-loader --save-dev
3. 配置loader，webpack.base.config.js 在 loaders 里面加上
```
{
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
}
```
4. 在自己写 `style` 时标签上写上 `lang="scss"`
5. 如果你希望定义一下全局能够使用的 scss 样式，首先需要创建一个 .scss 文件，然后在项目的 main.js 中使用 import 命令就像导入模块一样，将独立 .scss 文件全局导入项目 `import "./styles/common.scss";`
6. 为了多个地方使用同一主题的颜色等参数，可以单独建一个 vars.scss 文件，用于定义各种变量，如 `$color-primary: #20a0ff;//#18c79c`，然后在 webpack.base.config.js 配置别名 `'scss_vars': '@/styles/vars.scss'`，需要的地方使用如下
```
<style scoped lang="scss">
	@import '~scss_vars';
	.container {
		background: $color-primary;
	}
</style>
```

7. 可以通过为 styles 目录下的 scss 文件定义别名，在 app.vue 中引入，但是对样式的图片路径支持不好控制，所以还是建议直接把全局的样式文件放在最外层的 static 目录下。通过 link 引入


## 使用 mockjs 模拟数据请求，帮助项目前期前后端独立开发

1. cnpm install mockjs --save-dev
2. 创建 mock 文件夹，里面创建 index.js，内容如下：
```
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
```

3. main.js 入口文件 mockjs，require('./mock/index.js')
4. 创建 mockapi，在 api 文件夹添加 requestMock.js，如下：
```
import axios from 'axios'
import vue from 'vue'
 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 
// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
  }, function(error) {
    return Promise.reject(error);
  })
  // 响应拦截器
axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
})
 
// 封装axios的post请求
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
 
export default {
  JH_news(url, params) {
    return fetch(url, params);
  }
}
```

5. 使用 mock，views/index.vue
```
import api from '../api/requestMock.js'

export default {
  name: 'index',
  data () {
    return {
      newsListShow: [],
    }
  },
  components: {
    NewsCell
  },
  methods:{
    setNewsApi: function() {
      api.JH_news('/news/index', 'type=top&key=123456')
      .then(res => {
        console.log(res);
        this.newsListShow = res.articles;
      });
    },
  },
  created() {
    this.setNewsApi();
  }
}
```
6. [更多api请参考 mock 文档](https://github.com/nuysoft/Mock/wiki/Getting-Started)


# 其他

1. 如果你还不习惯于使用 eslint 来规范你的代码，而在项目初始化时又选择了使用 eslint 检查你的代码，
   可以取消 eslint 的检查。操作方式：在 build/webpack.base.conf.js 中，
   把 ...(config.dev.useEslint ? [createLintingRule()] : []) 中的 createLintingRule() 注释掉或去掉，重新启动程序即可。
2. 在 vue 项目中，可以选择 mock 的定制化插件 axios-mock-adapter 。