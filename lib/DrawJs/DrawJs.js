/*
 * MIT License
 *
 * Copyright (c) 2017 ovenslove
 *
 MIT License

Copyright (c) 2015-present, Facebook, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 
 */

/*
 * Revision History:
 *     Initial:        2018/08/16        ovenslove
 */

"use strict";
const SYS_INFO = wx.getSystemInfoSync(); // 系统信息
const K = 750 / SYS_INFO.windowWidth; // rpx缩放系数
const PI = Math.PI;
const QRCode = require('./lib/weapp-qrcode');
const Utils = require('./lib/utils');
class DrawJs {
  constructor(ctx, options = {}) {
    this.options = options;
    this.ctx = ctx;
    this.CANVAS_W = (options.width || 600) / K;
    this.CANVAS_H = (options.height || 800) / K;
  }
  /**
   * @type static
   * @function 初始化静态方法
   * @param {*} data
   * @returns {*} this
   */
  static init(data) {
    console.log('初始化插件');
    return this;
  }
}

/**
 * @function 执行绘制操作
 * @param {*} opts 
 * @returns {*} this
 */
DrawJs.prototype.exce = function exce(opts = {}) {
  console.log('执行绘制');
  this
    .ctx
    .draw(true, () => {
      console.log('绘制完成');
    });
  return this;
}
/**
 * @function 圆环、半环或者弧度
 * @param {*} opts
 * @returns {*} this
 */
DrawJs.prototype.ring = function ring(opts = {}) {
  let _opts = {
    x: 100,
    y: 100,
    radius: 20,
    lineWidth: 20,
    lineColor: '#dddddd',
    startAngle: 0,
    endAngle: 180,
    counterclockwise: false
  }
  Object.assign(_opts, opts);
  this
    .ctx
    .save();
  this
    .ctx
    .setStrokeStyle(_opts.lineColor);
  this
    .ctx
    .setLineWidth(_opts.lineWidth);
  this
    .ctx
    .beginPath();
  this
    .ctx
    .arc(_opts.x, _opts.y, _opts.radius + _opts.lineWidth / 2, Utils.degree2radian(_opts.startAngle), Utils.degree2radian(_opts.endAngle), _opts.counterclockwise);
  this
    .ctx
    .stroke();
  this
    .ctx
    .restore();
  return this;
};

/**
 * @function 绘制二维码
 * @param {*} opts 
 * @returns {*} this
 */
DrawJs.prototype.qrcode = function qrcode(opts = {}) {
  let that = this;
  opts.correctLevel = opts.correctLevel && QRCode.CorrectLevel[opts.correctLevel] || QRCode.CorrectLevel.Q;
  let _opts = {
    x: 0, // 坐标x
    y: 0, // 坐标y
    width: 200, // 二维码全部宽度
    height: 200, // 二维码全部高度
    padding: false, // 是否显示二维码内边距
    paddingWidth: 0, // 内边距大小
    border: false, // 是否显示边框
    radius: false, // 是否边框圆角
    image: '', // 中间icon图标地址-临时地址
    text: "DrawJs Is A Good Tool For You", // 二维码内容
    colorDark: "#000000", // 深色色块，用于识别
    colorLight: "#ffffff", // 浅色色块，用于背景
    correctLevel: QRCode.CorrectLevel.Q // 容错等级
  }
  Object.assign(_opts, opts);
  if (_opts.padding) {
    _opts.paddingWidth = _opts.width * .05;
    // 绘制背景色块
    let _rectOpts = {
      x: _opts.x,
      y: _opts.y,
      width: _opts.width,
      height: _opts.height,
      backgroundColor: _opts.colorLight,
      origin: 'left top'
    }
    if (_opts.border) {
      _rectOpts.borderWidth = 2;
      _rectOpts.borderColor = '#dddddd';
      if (_opts.radius) {
        _rectOpts.radius = _opts.paddingWidth;
      }
    } else {
      _rectOpts.borderWidth = 0;
    }
    this.rect(_rectOpts);
  }
  var qrcodeSize = {
    width: _opts.width - 2 * _opts.paddingWidth,
    height: _opts.height - 2 * _opts.paddingWidth
  }
  var qrcode = new QRCode(_opts);
  let qrcodeData = qrcode.getQrData();
  let nCount = qrcodeData.length;
  var nWidth = qrcodeSize.width / nCount;
  var nHeight = qrcodeSize.height / nCount;
  var nRoundedWidth = Math.round(nWidth);
  var nRoundedHeight = Math.round(nHeight);
  // 绘制二维码
  for (var row = 0; row < nCount; row++) {
    for (var col = 0; col < nCount; col++) {
      let item = qrcodeData[row][col];
      var nLeft = _opts.x + _opts.paddingWidth + col * nWidth;
      var nTop = _opts.y + _opts.paddingWidth + row * nHeight;
      that
        .ctx
        .setStrokeStyle(item ?
          _opts.colorDark :
          _opts.colorLight)
      that
        .ctx
        .setLineWidth(1)
      that
        .ctx
        .setFillStyle(item ?
          _opts.colorDark :
          _opts.colorLight)
      that
        .ctx
        .fillRect(nLeft, nTop, nWidth, nHeight);
      that
        .ctx
        .strokeRect(Math.floor(nLeft) + 0.5, Math.floor(nTop) + 0.5, nRoundedWidth, nRoundedHeight);
      that
        .ctx
        .strokeRect(Math.ceil(nLeft) - 0.5, Math.ceil(nTop) - 0.5, nRoundedWidth, nRoundedHeight);
    }
  }
  // 绘制中间的icon或者logo
  if (_opts.image) {
    let _imageSize = _opts.width * .3;
    let _ix = _opts.x + (_opts.width - _imageSize) / 2;
    let _iy = _opts.y + (_opts.height - _imageSize) / 2
    that
      .ctx
      .drawImage(_opts.image, _ix, _iy, _imageSize, _imageSize);
  }
  return this;
}
/**
 * @function 绘制图片
 * @param {*} url
 * @param {*} opts
 * @returns {*} this
 */
DrawJs.prototype.image = function image(url = '', opts = {}) {
  let _opts = {
    x: 0, // 图片坐标x
    y: 0, // 图片坐标y
    width: 100, // 宽度
    height: 100, // 高度
    clip: false // 图片是否需要剪裁,需前置路径支持clip
  }
  if (!url) {
    throw new Error('image url is required');
  }
  // 格式化数据
  opts.x = parseFloat(opts.x) || _opts.x;
  opts.y = parseFloat(opts.y) || _opts.y;
  opts.width = parseFloat(opts.width) || _opts.width;
  opts.height = parseFloat(opts.height) || _opts.height;
  // 合并数据
  Object.assign(_opts, opts);
  if (_opts.clip !== true) {
    this
      .ctx
      .save();
  }
  this
    .ctx
    .drawImage(url, _opts.x, _opts.y, _opts.width, _opts.height);
  this
    .ctx
    .restore();
  return this;
};

/**
 * @function 绘制线条
 * @param {Array} points 线条坐标数组
 * @param {Object} opt 其他参数
 * @returns {*} this
 */
DrawJs.prototype.line = function line(points = [], opt = {}) {
  // 校验opt参数
  for (const key in opt) {
    if (opt[key] === '' || opt[key] === undefined || opt[key] === null) {
      delete opt[key];
    }
  }
  let _opts = {
    type: 'solid', // 线条类型 solid-实线dash-虚线dot-点
    lineWidth: 1, // 线条宽度
    lineCap: 'square', // 线条的结束端点样式 'butt'、'round'、'square'
    lineJoin: 'bevel', // 线条转角样式 'bevel'、'round'、'miter'
    miterLimit: 10, // 最大斜接长度，当 setLineJoin() 为 miter 时才有效
    fill: false, // 是否填充颜色
    fillStyle: '#dddddd', // 需要填充的颜色
    stroke: true, // 是否需要绘制线条
    strokeStyle: "#333333", // 需要绘制的线条颜色
    lineDash: {
      pattern: [
        0, 0
      ], // [实线长度，空白长度],当type为dot时，实线长度为0,空白长度为线宽度+设置参数
      offset: 0 // 偏移量，暂无使用
    }, // dash或者dot的时候需要使用
    clip: false // 路径是否需要剪裁
  }
  Object.assign(_opts, opt);
  // 设置线条样式 dot模式下，最小lineWidth为2
  if (_opts.type === 'dot' && _opts.lineWidth < 2) {
    _opts.lineWidth = 2;
  }
  this
    .ctx
    .setLineCap(_opts.lineCap);
  this
    .ctx
    .setLineWidth(_opts.lineWidth);
  this
    .ctx
    .setLineJoin(_opts.lineJoin);
  _opts.lineJoin === 'miter' && this
    .ctx
    .setMiterLimit(_opts.miterLimit);
  // 判断线条类型
  if (_opts.type == 'dot') {
    this
      .ctx
      .setLineDash([
        0, _opts.lineWidth + _opts.lineDash.pattern[1]
      ], _opts.lineDash.offset)
  } else if (_opts.type == 'dash') {
    if (_opts.lineCap == 'round') {
      _opts.lineDash.pattern[1] = _opts.lineDash.pattern[1] + 2 * _opts.lineWidth
    }
    this
      .ctx
      .setLineDash(_opts.lineDash.pattern, _opts.lineDash.offset)
  } else {}
  this
    .ctx
    .save();
  this
    .ctx
    .beginPath();
  this
    .ctx
    .moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    this
      .ctx
      .lineTo(points[i][0], points[i][1]);
  }
  // 是否需要填充和绘制
  if (_opts.fill === true) {
    // 判断路径是否闭合
    if (points[0][0] === points[points.length - 1][0] && points[0][1] === points[points.length - 1][1]) {
      console.log('已经闭合');
    } else {
      console.warn('路径未闭合,已自动为您闭合')
      this
        .ctx
        .lineTo(points[0][0], points[0][1]);
    }
    if (_opts.fillStyle) {
      this
        .ctx
        .setFillStyle(_opts.fillStyle);
    }
    this
      .ctx
      .fill();
  }
  if (_opts.stroke === true) {
    if (_opts.fillStyle) {
      this
        .ctx
        .setStrokeStyle(_opts.strokeStyle);
    }
    this
      .ctx
      .stroke();
  }
  this
    .ctx
    .closePath();
  if (_opts.clip === true) {
    this
      .ctx
      .setFillStyle('transparent');
    this
      .ctx
      .fill();
    this
      .ctx
      .clip();
  } else {
    this
      .ctx
      .restore();
  }
  return this;
};

/**
 * @function 绘制矩形
 * @param {Object} opts
 * @returns {*} this
 */
DrawJs.prototype.rect = function rect(opts = {}) {
  let _opts = {
    x: 0, // x坐标
    y: 0, // y坐标
    width: 100, // 矩形宽度
    height: 100, // 矩形高度
    radius: '0 0 0 0', // 圆角半径
    backgroundColor: '#dddddd', // 背景颜色
    backgroundImage: '', // 背景图片
    borderWidth: 1, // border宽度
    borderColor: '#dddddd', // border颜色
    origin: 'left top', // 中心点
    horizontalAligin: 'default', // 水平默认定位
    verticalAligin: 'default', // 垂直默认定位,
    clip: false // 路径是否需要剪裁
  }
  // 预处理数据
  opts.x = parseFloat(opts.x) || _opts.x;
  opts.y = parseFloat(opts.y) || _opts.y;
  opts.width = parseFloat(opts.width) || _opts.width;
  opts.height = parseFloat(opts.height) || _opts.height;
  opts.clip = Boolean(opts.clip) || _opts.clip;
  // 合并数据
  Object.assign(_opts, opts);
  // 处理圆角半径
  let _radius = Array(4).fill(0);
  if (_opts.radius && typeof _opts.radius === 'string') {
    // 去掉前后空格
    _opts.radius = Utils.trim(_opts.radius);
    _radius = _opts
      .radius
      .split(' ');
    // 对数据进行清洗
    _radius = _radius.map(item => parseFloat(item) || 0);
    // 对数据进行补位
    if (_radius.length === 0) {
      // 空数据，给初始值
    } else if (_radius.length === 1) {
      _radius = Array(4).fill(_radius[0])
    } else if (_radius.length === 2) {
      _radius = [
        ..._radius,
        ..._radius
      ];
    } else if (_radius.length === 3) {
      _radius = [
        ..._radius,
        _radius[1]
      ];
    } else {
      _radius = _radius.slice(0, 4);
    }
  } else if (typeof _opts.radius === 'number') {
    _radius = Array(4).fill(_opts.radius);
  } else {
    // 不作处理，使用默认值
  }
  // 对radius进行大小判断，超出50%则按照50%计算
  let _harfMinWH = Math.min(_opts.width, _opts.height) / 2;
  _radius = _radius.map(item => item > _harfMinWH ?
    _harfMinWH :
    item);
  _opts.radius = _radius;

  // 支持定位中心origin
  let _origin = [0, 0];
  if (_opts.origin && typeof _opts.origin === 'string') {
    _opts.origin = Utils.trim(_opts.origin);
    _origin = _opts
      .origin
      .split(' ');
    if (_origin.length === 0) {
      _origin = ['left', 'top'];
    } else if (_origin.length === 1) {
      if (_origin[0] == 'center') {
        _origin = ['center', 'center'];
      } else {
        _origin = ['left', 'top'];
      }
    } else if (_origin.length === 2) {
      // 不用处理,直接转换
    } else {
      _origin = _origin.slice(0, 2);
    }
    _origin = _origin.map(item => {
      switch (item) {
        case 'left':
        case 'top':
          item = 0;
          break;
        case 'center':
          item = 50;
          break;
        case 'right':
        case 'bottom':
          item = 100;
          break;
        default:
          item = parseFloat(item) || 0;
          break;
      }
      return item;
    });
  } else {
    // 默认数据，不做处理
  }
  // 水平默认定位
  if (_opts.horizontalAligin && typeof _opts.horizontalAligin === 'string') {
    if (_opts.horizontalAligin === 'default') {
      // 默认值
    } else if (_opts.horizontalAligin === 'center') {
      _opts.x = this.CANVAS_W / 2;
      _origin[0] = 50;
    } else if (_opts.horizontalAligin == 'left') {
      _opts.x = 0;
      _origin[0] = 0;
    } else if (_opts.horizontalAligin == 'right') {
      _opts.x = this.CANVAS_W;
      _origin[0] = 100;
    } else {
      _opts.x = this.CANVAS_W * (parseFloat(_opts.horizontalAligin) / 100 || 0);
    }
  }
  // 垂直默认定位
  if (_opts.verticalAligin && typeof _opts.verticalAligin === 'string') {
    if (_opts.verticalAligin === 'default') {
      // 默认值
    } else if (_opts.verticalAligin === 'center') {
      _opts.y = this.CANVAS_H / 2;
      _origin[1] = 50;
    } else if (_opts.verticalAligin == 'top') {
      _opts.y = 0;
      _origin[1] = 0;
    } else if (_opts.verticalAligin == 'bottom') {
      _opts.y = this.CANVAS_H;
      _origin[1] = 100;
    } else {
      _opts.y = this.CANVAS_H * (parseFloat(_opts.verticalAligin) / 100 || 0);
    }
  }
  // 计算偏移量
  _opts.x = _opts.x - _opts.width * _origin[0] / 100;
  _opts.y = _opts.y - _opts.height * _origin[1] / 100;
  console.log(_opts);
  // 开始绘制矩形
  this
    .ctx
    .save();
  this
    .ctx
    .setFillStyle(_opts.backgroundColor);
  this
    .ctx
    .setStrokeStyle(_opts.borderColor);
  this
    .ctx
    .beginPath();
  this
    .ctx
    .moveTo(_opts.x + _opts.radius[0], _opts.y); //p1点
  this
    .ctx
    .lineTo(_opts.x + _opts.width - _opts.radius[1], _opts.y); //p2点
  this
    .ctx
    .arc(_opts.x + _opts.width - _opts.radius[1], _opts.y + _opts.radius[1], _opts.radius[1], 3 * PI / 2, 2 * PI, false); // c1点画1/4弧到p3
  this
    .ctx
    .lineTo(_opts.x + _opts.width, _opts.y + _opts.height - _opts.radius[2]); // p4点
  this
    .ctx
    .arc(_opts.x + _opts.width - _opts.radius[2], _opts.y + _opts.height - _opts.radius[2], _opts.radius[2], 0, PI / 2, false); // c2点画1/4弧到p5
  this
    .ctx
    .lineTo(_opts.x + _opts.radius[3], _opts.y + _opts.height); // p6点
  this
    .ctx
    .arc(_opts.x + _opts.radius[3], _opts.y + _opts.height - _opts.radius[3], _opts.radius[3], 3 * PI / 2, PI, false); // c3点画1/4弧到p7
  this
    .ctx
    .lineTo(_opts.x, _opts.y + _opts.radius[0]); // p8点
  this
    .ctx
    .arc(_opts.x + _opts.radius[0], _opts.y + _opts.radius[0], _opts.radius[0], PI, 3 * PI / 2, false); // c3点画1/4弧到p1
  this
    .ctx
    .closePath();
  if (_opts.borderWidth) {
    let _borderWidth = parseFloat(_opts.borderWidth) || 1;
    this
      .ctx
      .setLineWidth(_borderWidth);
    this
      .ctx
      .stroke();
  }
  // 是否需要剪裁
  if (_opts.clip === true) {
    // this.ctx.setFillStyle('transparent');
    this
      .ctx
      .fill();
    this
      .ctx
      .clip();
  }
  // 是否需要绘制背景
  if (_opts.backgroundImage && typeof _opts.backgroundImage === 'string') {
    // 如果有背景图片，则优先使用背景图
    this
      .ctx
      .drawImage(_opts.backgroundImage, _opts.x, _opts.y, _opts.width, _opts.height);
    this
      .ctx
      .restore();
  } else if (_opts.clip !== true) {
    // 没有背景图则正常填充色块
    this
      .ctx
      .fill();
    this
      .ctx
      .restore();
  } else {}
  // 返回当前对象，以供链式调用
  return this;
};

/**
 * @function 绘制文本
 * @param {*} opts 
 */
DrawJs.prototype.text = function text(opts = {}) {
  let _opts = {
    text: '默认文案', // 文字内容
    x: 100, // 坐标x
    y: 100, // 坐标y
    fontSize: 32, // 字号大小
    fontFamily: '', // 字体
    color: '#333333', // 字体颜色
    maxWidth: 200, // 最大宽度
    maxLine: 4, // 最大行数
    textAligin: 'center', // 左右对齐方式
    textBaseline: 'top', // 垂直对齐方式
    wrap: 'nowrap', // 换行
    lineHeight: 40, // 行距
    ellipsis: false // 是否省略
  };
  Object.assign(_opts, opts);
  this.ctx.save();
  this.ctx.setTextBaseline('middle');
  this.ctx.setTextAlign(_opts.textAligin);
  let textArr = [];
  if (_opts.wrap === 'wrap') {
    textArr = Utils.splitString(_opts, this);
  } else {
    // 不换行不做处理
  }
  // 计算坐标
  if (_opts.textBaseline === 'top') {
    _opts.y = _opts.y + _opts.fontSize / 2;
  } else if (_opts.textBaseline === 'bottom') {
    _opts.y = _opts.y - _opts.fontSize / 2;
  } else {
    // middle不作处理
  }
  // 设置文字属性
  this.ctx.setFillStyle(_opts.color);
  this.ctx.setFontSize(_opts.fontSize);
  // 绘制文字
  if (textArr.length > 0) {
    let _len = textArr.length;
    if (_opts.maxLine > 0 && _opts.maxLine < textArr.length) {
      _len = _opts.maxLine;
    } else {
      // 其他情况不做处理
    }
    for (let i = 0; i < _len; i++) {
      let _stext = textArr[i];
      let _lineHeight = _opts.lineHeight || 0;
      if (_len === i + 1 && _opts.ellipsis && textArr.length > _len) {
        // 省略且行数溢出，则需要省略号
        _stext = _stext.substr(0, _stext.length - 1) + '...';
      }
      // 兼容lineHeight小于fontSize的情况
      if (_lineHeight < _opts.fontSize) {
        _lineHeight = _opts.fontSize;
      }
      this.ctx.fillText(_stext, _opts.x, _opts.y + _lineHeight * i);
    }
  } else {
    this.ctx.fillText(_opts.text, _opts.x, _opts.y);
  }
  this.ctx.fill();
  this.ctx.restore();
  return this;
};
module.exports = DrawJs;