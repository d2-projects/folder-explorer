![](https://cdn.d2.pub/files/image-hosting/20190926165444.png)

![](https://cdn.d2.pub/files/image-hosting/20190926165500.png)

扫描目录，分析文件结构和统计信息，给任意文件添加备注，导出带注释的树形文本和其它多种数据格式，大大方便书写技术文档。

如果你需要它，你会很爱它。如果你不需要，可能永远不会需要。

* Github：[folder-explorer](https://github.com/d2-projects/folder-explorer)
* 码云：[folder-explorer](https://gitee.com/fairyever/folder-explorer)
* 介绍：[《使用可视化界面自定义输出带注释的项目文件树形结构》](https://juejin.im/post/5d8d83656fb9a04ddb3b6630)

![](https://cdn.d2.pub/files/image-hosting/20190926165513.png)

开发这个软件的初衷是为了方便我书写我的 [项目文档](https://d2.pub/zh/doc/d2-admin)，其中有一部分内容根据用户的反馈来看，需要详细展示项目的重要目录分别的作用。

我找了一下发现能实现导出这类树形结构文字的项目大致有两种，一类是网络上分享的脚本，一类是可以读取开源仓库信息的在线工具。

我的大致需求是，1 扫描目录 2 编辑注释 3 导出美观的结构图 4 可以隐藏我希望忽略的文件。现有的方案显然都不方便，所以我忙里偷闲制作了这个软件。

## 下载

macOS | windows | Linux

[releases](https://github.com/d2-projects/folder-explorer/releases)

## 功能

![](https://cdn.d2.pub/files/image-hosting/20190926165542.png)

* 扫描指定的目录（支持拖拽）以及再次扫描当前结果中的指定目录
* 展示文件结构的树形统计，支持添加注释，隐藏单个文件或者文件夹内容
* 文件类型统计
* 文件体积分布统计
* 导出文字构成的树形结构图，支持注释和自动对齐，支持自定义内容格式
* 导出 json 文件和 xml 文件供其他软件或者程序使用
* 导出 xmind 结构图，支持自定义节点、label 和注释的内容格式化
* 自定义导出文件的名称预设
* 注释信息记忆功能
* 个性化设置的备份和导入
* 其它丰富的设置选项

## 使用场景

* 项目文档书写，附上文件结构和注释可以更清晰地让别人上手项目
* 展示课程目录，如果你是讲师，可以一口气将你的课程所有章节生成树形结构展示
* 统计某个资源文件夹中的文件大小分布，例如分析你的照片文件夹，或者一目了然磁盘里每部电影占了多大空间

## 技术方案

[vue-cli3](https://cli.vuejs.org/zh/) 生成的基础项目，使用 [vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder) 将其转化为可以使用 [electron](https://electronjs.org) 打包的桌面项目。

## 详细功能介绍

所有演示基于下述的目录结构：

```
├─.DS_Store 
├─.browserslistrc 
├─.gitignore 
├─README.md 
├─babel.config.js 
├─package.json 
├─postcss.config.js 
├─public 
│ ├─favicon.ico 
│ └─index.html 
├─src 
│ ├─App.vue 
│ ├─assets 
│ │ └─sys 
│ │   └─logo 
│ │     └─w200.png 
│ ├─components 
│ │ └─HelloWorld.vue 
│ ├─layout 
│ │ └─headerAside 
│ │   ├─components 
│ │   │ ├─aside 
│ │   │ │ ├─index.vue 
│ │   │ │ └─style.scss 
│ │   │ └─header 
│ │   │   ├─index.vue 
│ │   │   └─style.scss 
│ │   └─index.vue 
│ └─main.js 
└─yarn.lock 
```

### 编辑器

#### 展开和折叠节点

![](https://cdn.d2.pub/files/image-hosting/20190926165558.gif)

#### 移除节点

![](https://cdn.d2.pub/files/image-hosting/20190926165703.gif)

#### 添加注释

![](https://cdn.d2.pub/files/image-hosting/20190926165924.gif)

导出的结果：

```
├─README.md --------------- // 介绍
├─babel.config.js 
├─package.json 
├─postcss.config.js 
├─public ------------------ // 公共资源
│ ├─favicon.ico 
│ └─index.html 
├─src 
│ ├─App.vue --------------- // 根组件
│ ├─assets 
│ │ └─sys 
│ │   └─logo 
│ │     └─w200.png 
│ ├─components 
│ │ └─HelloWorld.vue 
│ ├─layout 
│ │ └─headerAside 
│ │   ├─components 
│ │   │ ├─aside 
│ │   │ │ ├─index.vue 
│ │   │ │ └─style.scss 
│ │   │ └─header 
│ │   │   ├─index.vue 
│ │   │   └─style.scss 
│ │   └─index.vue 
│ └─main.js 
└─yarn.lock 
```

1. 不会导出被折叠和隐藏的文件或目录，并且会根据折叠之后的状态重新计算树形结构。

2. 备注有记忆功能，例如扫描 `/a` 目录后添加了注释，之后扫描了 `/b` 目录，当再次扫描 `/a` 目录后第一次添加的注释会自动还原。

#### 打开文件

![](https://cdn.d2.pub/files/image-hosting/20190926170049.gif)

#### 打开目录

![](https://cdn.d2.pub/files/image-hosting/20190926170058.gif)

#### 扫描子文件夹

![](https://cdn.d2.pub/files/image-hosting/20190926170246.gif)

### 统计

#### 文件类型统计

![](https://cdn.d2.pub/files/image-hosting/20190926170302.png)

#### 文件大小统计

![](https://cdn.d2.pub/files/image-hosting/20190926170319.png)

### 导出

![](https://cdn.d2.pub/files/image-hosting/20190926170332.png)

目前支持以下导出方式：

#### 文本

![](https://cdn.d2.pub/files/image-hosting/20190927113304.png)

#### json

![](https://cdn.d2.pub/files/image-hosting/20190927113313.png)

#### xmind

![](https://cdn.d2.pub/files/image-hosting/20190927113337.png)

#### xml

![](https://cdn.d2.pub/files/image-hosting/20190927113352.png)

#### html

![](https://cdn.d2.pub/files/image-hosting/20190927113402.png)

### 扫描

#### 自定义扫描

支持自定义扫描忽略的文件夹和文件，并可以指定忽略的文件类型。

![](https://cdn.d2.pub/files/image-hosting/20190927113631.png)

为方便快速设置，选项会自动根据当前的扫描结果改变。

![](https://cdn.d2.pub/files/image-hosting/20190927113643.png)

![](https://cdn.d2.pub/files/image-hosting/20190927113653.png)

#### 自定义扫描深度

![](https://cdn.d2.pub/files/image-hosting/20190927113703.png)

![](https://cdn.d2.pub/files/image-hosting/20190927113709.png)

#### 只扫描文件夹

![](https://cdn.d2.pub/files/image-hosting/20190927142016.png)

#### 忽略隐藏文件

支持设置忽略 `.` 开头的文件，因为这些文件在 macOS 和 Linux 上是隐藏的

![](https://cdn.d2.pub/files/image-hosting/20190927113718.png)

### 预设文件名

几乎所有的导出都支持自定义文件名，并支持多种占位符，请注意输入框右上角的提示：

![](https://cdn.d2.pub/files/image-hosting/20190927113740.png)

点击提示之后会弹出这个位置所有可用的占位符，点击占位符可以快速复制到剪贴板：

![](https://cdn.d2.pub/files/image-hosting/20190927113747.png)

占位符示例：

![](https://cdn.d2.pub/files/image-hosting/20190927113752.png)

注：在一些其它的设置位置也支持占位符，例如设置备注的格式化，脑图的节点内容等。

## 支持

如果觉得我的代码写的还不错，或者这个项目使你收益，欢迎小小的打赏支持开源。

![](https://cdn.d2.pub/files/image-hosting/20190927144906.png)

## 技术交流

![](https://cdn.d2.pub/files/image-hosting/20190927144800.png)

## 其它开源项目

* [一个优雅的 vue.js 管理系统模板](https://github.com/d2-projects/d2-admin)

![](https://cdn.d2.pub/files/image-hosting/20190927144750.png)