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