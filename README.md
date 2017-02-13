dwz - 个人短网址小应用
==============================
[preview](https://powerful-escarpment-34251.herokuapp.com/)  
ps:click the logo for links list
```
username:username
password:password
```
## 1. Dependencies
+ [npm](http://npmjs.com/)
+ [expressjs](http://expressjs.com/)
+ [mongodb](https://www.mongodb.com/)
+ [angularjs](https://angularjs.org/)


## 2. How to run
```bash
$ npm install  			 			# install dependencies
$ cp config.example.js config.js 	# set site configuration
$ npm run dev    		 			# start Node Server at port 3000
```

## 3. API

## 目录：

1. [获取api说明](#1)
2. [添加短网址](#2)
3. [检查tinyurl是否被使用](#3)
4. [登录](#4)
5. [修改短网址](#5)
6. [删除短网址](#6)
7. [获取所有短网址](#7)

## 文档：

<h3 id="1">1.获取api说明</h3>

#### 请求

`GET /api/`

#### 响应

```json
{
	"add link": {
		"POST": "/api/add",
		"body": {
			"tinyurl": "bd",
			"fullurl": "https://www.baidu.com",
			"intro": "百度"
		}
	},
	"check unique":{
		"POST": "/api/check",
		"body": {
			"tinyurl": "bd"
		}
	},
	"login": {
		"POST": "/api/login",
		"body": {
			"username": "username",
			"password": "password"
		}
	},
	"update link": {
		"PUT": "/api/update/:id",
		"body": {
			"tinyurl": "bd",
			"fullurl": "https://www.baidu.com",
			"intro": "百度"
		}
	},
	"delete link": {
		"DELETE": "/api/delete/:id"
	},
	"get all links": {
		"GET": "/api/links"
	}
}
```

<h3 id="2">2.添加短网址</h3>

#### 请求
`POST /api/add`

##### 参数描述
| 名字 | 类型 | 详细描述 |
| ----- | ----- | -------- |
| tinyurl | string | 短网址字符串 |
| fullurl | string | 完整网址 |
| intro | string | 网址简介 |

##### 参数示例
```js
tinyurl: bd
fullurl: https://www.baidu.com
intro: 百度
```

#### 响应
`code 204`

<h3 id="3">3.检查tinyurl是否被使用</h3>

#### 请求

`POST /api/check`

##### 参数描述
| 名字 | 类型 | 详细描述 |
| ----- | ----- | -------- |
| tinyurl | string | 短网址字符串 |

##### 参数示例
```js
tinyurl: bd
```

#### 响应
if used  
`unique: false`  
else  
`unique: true`

<h3 id="4">4.登录</h3>

#### 请求
`POST /api/login`

##### 参数描述
| 名字 | 类型 | 详细描述 |
| ----- | ----- | -------- |
| username | string | 用户名 |
| password | string | 密码 |

##### 参数示例
```js
username: username
password: password
```

#### 响应
`code 204`

<h3 id="5">5.修改短网址</h3>

#### 请求
`PUT /api/update/：id`

##### 参数描述
| 名字 | 类型 | 详细描述 |
| ----- | ----- | -------- |
| tinyurl | string | 短网址字符串 |
| fullurl | string | 完整网址 |
| intro | string | 网址简介 |

##### 参数示例
```js
tinyurl: bd
fullurl: https://www.baidu.com
intro: 百度
```

#### 响应
`code 204`

<h3 id="6">6.删除短网址</h3>
#### 请求
`DELETE /api/delete/:id`

#### 响应
`code 204`

<h3 id="7">7.获取所有短网址</h3>

#### 请求
`GET /api/links`

#### 响应
```json
{
  "links": [
    {
      "_id": "589f5f7fe6908f74c73869cf",
      "tinyurl": "bd",
      "fullurl": "https://www.baidu.com",
      "intro": "百度",
      "__v": 0,
      "createAt": "2017-02-11T19:01:19.583Z"
    }
  ]
}
```

