# DrawJs

## 简介

DrawJs 专为解决小程序中 canvas 绘图操作，通过简洁的使用方法，来快速构建图形

## 使用方法

文件 _pages/index/index.js_

```js
// 引入插件DrawJs
var DrawJs = require('../../lib/DrawJs/DrawJs');
// 初始化插件
DrawJs.init();
// 创建canvas的对象
// 如果在组件内使用,需要wx.createCanvasContext("firstCanvas",this)
let ctx = wx.createCanvasContext("firstCanvas");
// 实例化插件对象
let fDrawJs = new DrawJs(ctx, {
  width: 600,
  height: 800
});
// 调用对应的方法实现功能
// 最后使用.exce()方法进行绘制
fDrawJs
  .qrcode({
    x: 50,
    y: 50,
    width: 80,
    height: 80,
    colorDark: "#ff0000",
    colorLight: "#ffffff",
    correctLevel: "Q",
    text:
      "https://img.ithome.com/newsuploadfiles/2018/8/20180810002200_6504.jpg"
  })
  .exce();
```

## 插件方法

#### init()

```js
DrawJs.init();
```

> 初始化插件

#### 实例化对象

```js
let fDrawJs = new DrawJs(ctx, [options]);
```
> 实例化对象并初始化

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注        |
  | ------- | ------ | ---- | ------ | ----------- |
  | ctx     | object | 是   | 无     | canvas 对象 |
  | options | object | 否   | {}     | 其他参数    |

- options
  
  | 参数名 | 类型   | 必填 | 默认值 | 备注             |
  | ------ | ------ | ---- | ------ | ---------------- |
  | width  | number | 否   | 600    | 画板宽度,单位rpx |
  | height | number | 否   | 800    | 画板高度,单位rpx |


#### rect()

```js
fDrawJs.rect([options])
```
> 绘制矩形或者圆角矩形,也可以用作裁剪图片和特殊形状色块

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注     |
  | ------- | ------ | ---- | ------ | -------- |
  | options | object | 否   | {}     | 配置参数 |

- options
  
  | 参数名           | 类型    | 必填 | 默认值   | 备注              |
  | ---------------- | ------- | ---- | -------- | ----------------- |
  | x                | number  | 否   | 0        | x坐标             |
  | y                | number  | 否   | 0        | y坐标             |
  | width            | number  | 否   | 150      | 二维码宽度,单位px |
  | height           | number  | 否   | 150      | 二维码高度,单位px |
  | backgroundColor  | string  | 否   | #ffffff  | 背景颜色,RGB      |
  | backgroundImage  | string  | 否   | 无       | 只支持临时路径    |
  | borderWidth      | number  | 否   | 1        | border宽度        |
  | borderColor      | string  | 否   | #dddddd  | border颜色,RGB    |
  | origin           | string  | 否   | left top | 定位中心          |
  | horizontalAligin | string  | 否   | default  | 水平预设定位位置  |
  | verticalAligin   | string  | 否   | default  | 垂直预设定位位置  |
  | clip             | boolean | 否   | false    | 是否剪裁          |

- origin
  >矩形的定位中心,支持数字，百分比和默认字符串
  - 数字：50
  - 百分比：50%
  - 默认位置：
    - 水平方向：left / center / right 
    - 垂直方向：top / center / bottom
- horizontalAligin
  >水平预设定位位置，支持数字，百分比和默认字符串
  - 数字：50
  - 百分比：50%
  - 默认位置：left / center / right
- verticalAligin
  >水平预设定位位置，支持数字，百分比和默认字符串
  - 数字：50
  - 百分比：50%
  - 默认位置：top / center / bottom
- clip
  > 是否剪裁区域

#### line()

```js
fDrawJs.line(points,[options])
```

> 绘制实线、虚线和虚点线，并支持多点组合路径

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注     |
  | ------- | ------ | ---- | ------ | -------- |
  | points  | array  | 是   | 无     | 坐标点   |
  | options | object | 否   | {}     | 其他参数 |

- options
  
  | 参数名      | 类型    | 必填 | 默认值  | 备注                                             |
  | ----------- | ------- | ---- | ------- | ------------------------------------------------ |
  | type        | string  | 否   | solid   | 连线类型,dot时lineWidth最小为2                   |
  | lineWidth   | number  | 否   | 4       | 连线宽度                                         |
  | lineCap     | string  | 否   | square  | 线条的结束端点样式                               |
  | lineJoin    | string  | 否   | bevel   | 线条转角样式                                     |
  | miterLimit  | number  | 否   | 10      | 最大斜接长度，当 setLineJoin() 为 miter 时才有效 |
  | fill        | boolean | 否   | false   | 是否填充颜色,fill为true的时候会尝试性闭合路径    |
  | fillStyle   | string  | 否   | #dddddd | 需要填充的颜色,fill为true时有效                  |
  | stroke      | boolean | 否   | false   | 是否绘制线条                                     |
  | strokeStyle | string  | 否   | #333333 | 需要绘制的线条颜色,stroke为true时有效            |
  | lineDash    | object  | 否   | 无      | 虚线参数，type为dash或者dot时有效                |
  | clip        | boolean | 否   | false   | 是否剪裁                                         |
  
- lineDash
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注                          |
  | ------- | ------ | ---- | ------ | ----------------------------- |
  | pattern | array  | 是   | [0,0]  | 虚线参数,[实线长度，空白长度] |
  | offset  | number | 否   | 0      | 预留参数                      |
#### image()

```js
fDrawJs.image(url,[options])
```

> 暂时只支持临时路径，绘制图片，支持剪裁

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注                     |
  | ------- | ------ | ---- | ------ | ------------------------ |
  | url     | string | 是   | 无     | 图片路径，只支持临时路径 |
  | options | object | 否   | {}     | 其他参数                 |

- options
  
  | 参数名 | 类型    | 必填 | 默认值 | 备注            |
  | ------ | ------- | ---- | ------ | --------------- |
  | x      | number  | 否   | 0      | x坐标           |
  | y      | number  | 否   | 0      | y坐标           |
  | width  | number  | 否   | 100    | 图片宽度,单位px |
  | height | number  | 否   | 100    | 图片高度,单位px |
  | clip   | boolean | 否   | false  | 是否剪裁        |

#### ring()

```js
fDrawJs.ring([options])
```

> 绘制圆环，扇形或者圆圈

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注     |
  | ------- | ------ | ---- | ------ | -------- |
  | options | object | 否   | {}     | 其他参数 |

- options
  
  | 参数名           | 类型    | 必填 | 默认值  | 备注            |
  | ---------------- | ------- | ---- | ------- | --------------- |
  | x                | number  | 否   | 0       | x坐标           |
  | y                | number  | 否   | 0       | y坐标           |
  | radius           | number  | 否   | 20      | 圆弧内径,单位px |
  | lineWidth        | number  | 否   | 20      | 圆环宽度,单位px |
  | lineColor        | string  | 否   | #dddddd | 圆环颜色,RGB    |
  | startAngle       | number  | 否   | 0       | 开始角度        |
  | endAngle         | number  | 否   | 360     | 结束角度        |
  | counterclockwise | boolean | 否   | false   | 是否顺时针      |

#### qrcode()

```js
fDrawJs.qrcode([options])
```

> 绘制二维码

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注     |
  | ------- | ------ | ---- | ------ | -------- |
  | options | object | 否   | {}     | 其他参数 |

- options
  
  | 参数名       | 类型    | 必填 | 默认值  | 备注                               |
  | ------------ | ------- | ---- | ------- | ---------------------------------- |
  | text         | string  | 是   | 无      | 二维码内容                         |
  | image        | string  | 否   | 无      | 二维码中间图片地址，只支持临时路径 |
  | x            | number  | 否   | 0       | x坐标                              |
  | y            | number  | 否   | 0       | y坐标                              |
  | width        | number  | 否   | 150     | 二维码宽度,单位px                  |
  | height       | number  | 否   | 150     | 二维码高度,单位px                  |
  | padding      | boolean | 否   | false   | 是否显示内边距                     |
  | border       | boolean | 否   | false   | 是否显示边框线                     |
  | radius       | boolean | 否   | false   | 边框线是否圆角                     |
  | colorDark    | string  | 否   | #000000 | 前景颜色色值                       |
  | colorLight   | string  | 否   | #ffffff | 背景颜色色值                       |
  | correctLevel | string  | 否   | Q       | 错误级别[L,M,Q,H]                  |

#### text()

```js
fDrawJs.text([options])
```
> 绘制文本，支持定位和自动换行
> 
- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注     |
  | ------- | ------ | ---- | ------ | -------- |
  | options | object | 否   | {}     | 其他参数 |

- options
  
  | 参数名       | 类型    | 必填 | 默认值  | 备注               |
  | ------------ | ------- | ---- | ------- | ------------------ |
  | text         | string  | 是   | 无      | 文本内容           |
  | x            | number  | 否   | 0       | x坐标              |
  | y            | number  | 否   | 0       | y坐标              |
  | fontSize     | number  | 否   | 32      | 字号大小           |
  | lineHeight   | number  | 否   | 40      | 行距               |
  | color        | string  | 否   | #333333 | 字体颜色           |
  | textAligin   | string  | 否   | center  | 文本水平对齐方式   |
  | textBaseline | string  | 否   | top     | 文本垂直对齐方式   |
  | wrap         | string  | 否   | nowrap  | 文本是否换行       |
  | ellipsis     | boolean | 否   | false   | 文本溢出后是否省略 |
  | maxWidth     | number  | 否   | 200     | 换行的最大宽度     |
  | maxLine      | number  | 否   | 4       | 换行的最大行数     |

- Tips
  - 经过坐标修正，去除了字体setTextBaseline的一些属性，使用*top*,*middle*,*bottom*来进行文字垂直对齐
  - 行高lineHeight的最小值为当前fontSize
#### exce()

```js
fDrawJs.exce([options])
```

> 执行绘制操作

- 参数
  
  | 参数名  | 类型   | 必填 | 默认值 | 备注     |
  | ------- | ------ | ---- | ------ | -------- |
  | options | object | 否   | {}     | 其他参数 |


<!-- ![链接](./example.jpeg) -->

### TIPS

- tips1: rect() 方法在设置过大圆角后会导致borderWidth过大时出现锯齿，原因未知，故希望通过合理的值进行避免
- tips2: ring() 方法中的宽度计算规则为 外径为radius+lineWidth/2，经过校准，使得外径=radius+lineWidth

### Feedback

> 如果在使用过程中发现问题或者有更好的建议，欢迎到 [issue](https://github.com/ovenslove/DrawJs/issues) 内留言，如果你有想法，可以fork后推送一条[PullRequest](https://github.com/ovenslove/DrawJs/pulls)给我,谢谢!!!

### 致谢

> 非常感谢其他开发者提供的开源代码
- https://github.com/davidshimjs/qrcodejs
- https://github.com/tomfriwel/weapp-qrcode