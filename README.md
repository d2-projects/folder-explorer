![](docs/image/banner/logo.png)

![](docs/image/banner/forder-to-others-icon.png)

扫描目录，分析文件结构和统计信息，给任意文件添加备注，导出带注释的树形文本和其它多种数据格式。

![](docs/image/banner/app-preview.png)

## 功能

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

## 设置

### 编辑器

![](docs/image/guide/tree/reader/ui.png)

#### 展开和折叠节点

gif 演示：

![](docs-gif/reader-fold.gif)

#### 移除节点

gif 演示：

![](docs-gif/reader-remove.gif)

#### 添加注释

gif 演示：

![](docs-gif/reader-note.gif)

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

gif 演示：

![](docs-gif/reader-open-file.gif)

#### 打开目录

gif 演示：

![](docs-gif/reader-open-folder.gif)

#### 扫描子文件夹

gif 演示：

![](docs-gif/reader-rescan.gif)

### 统计

#### 文件类型统计

![](docs/image/guide/statistic/ext.png)

#### 文件大小统计

![](docs/image/guide/statistic/size.png)

### 导出

![](docs/image/guide/export/main.png)

### 扫描

#### 自定义扫描

支持自定义扫描忽略的文件夹和文件，并可以指定忽略的文件类型。

![](docs/image/guide/setting/scan/main.png)

为方便快速设置，选项会自动根据当前的扫描结果改变。

![](docs/image/guide/setting/scan/auto-option-folder.png)

![](docs/image/guide/setting/scan/auto-option-ext.png)

#### 自定义扫描深度

![](docs/image/guide/setting/scan/deep-0.png)
![](docs/image/guide/setting/scan/deep-2.png)

#### 只扫描文件夹

![](docs/image/guide/setting/scan/ignore-file.png)

#### 忽略隐藏文件

支持设置忽略 `.` 开头的文件，因为这些文件在 macOS 和 Linux 上是隐藏的

![](docs/image/guide/setting/scan/ignore-dot-file.png)

### 预设文件名

几乎所有的导出都支持自定义文件名，并支持多种占位符，请注意输入框右上角的提示：

![](docs/image/guide/setting/export/file-name-1.png)

点击提示之后会弹出这个位置所有可用的占位符，点击占位符可以快速复制到剪贴板：

![](docs/image/guide/setting/export/file-name-2.png)

占位符示例：

![](docs/image/guide/setting/export/file-name-demo.png)

注：在一些其它的设置位置也支持占位符，例如设置备注的格式化，脑图的节点内容等。