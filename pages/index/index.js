var DrawJs = require('../../lib/DrawJs/DrawJs');
DrawJs.init();
/**
 * @function 下载图片到本地
 * @param {*} imageUrl
 * @returns {*} Promise
 */
function downLoadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: imageUrl,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {}
    });
  });
}
Page({
  data: {},
  onLoad: function () {
    let that = this;
    downLoadImage('https://static-oven.b0.upaiyun.com/static-image/simProductImage.jpg').then((result) => {
      that.setData({
        avatarUrl: result.tempFilePath
      })
      that.draw();
    }).catch((err) => {
      console.log(err);
    });
    // that.draw();

  },
  draw() {
    let ctx = wx.createCanvasContext('firstCanvas');
    let fDrawJs = new DrawJs(ctx, {
      width: 600,
      height: 800
    });

    fDrawJs
      .line([
        [170, 100],
        [150, 100],
        [150, 128]
      ], {
        type: 'solid',
        lineWidth: 1,
        fill: false
      })
      .exce()
      .text({
        text: '我是测试文档内容,我sjjkshfk 奥斯卡哈克文档内容我是测试文档内容斯 hello word 文档内容我是测试文档内容,我是测试文档内容',
        x: 150, // 坐标x
        y: 100, // 坐标y
        fontSize: 18, // 字号大小
        fontFamily: '', // 字体
        color: '#333333', // 字体颜色
        maxWidth: 100, // 最大宽度
        textAligin: 'left', // 左右对齐方式
        textBaseline: 'top', // 垂直对齐方式
        wrap: 'wrap', // 换行
        lineHeight: 10, // 行距
        maxLine: 21, // 最大行数
        ellipsis: false // 超出是否溢出
      }).exce();


    // let linePoints = [
    //   [60, 20],
    //   [20, 100],
    //   [100, 100]
    // ];
    // fDrawJs.line(linePoints, {
    //   type: 'dot',
    //   lineWidth: 1,
    //   lineCap: 'round',
    //   lineJoin: 'round',
    //   lineDash: {
    //     pattern: [10, 5],
    //     offset: 0
    //   },
    //   fill: false,
    //   fillStyle: '#dddddd',
    //   stroke: true,
    //   strokeStyle: "#ff0000",
    //   clip: true
    // }).exce();

    // fDrawJs.ring({
    //   x: 150,
    //   y: 150,
    //   startAngle: -30,
    //   endAngle: 30,
    //   radius: 0,
    //   lineWidth: 20,
    //   lineColor: '#ff0000',
    //   counterclockwise: true
    // }).exce();

    // fDrawJs
    //   .image(this.data.avatarUrl, {
    //     x: 0,
    //     y: 0,
    //     width: 300,
    //     height: 300,
    //     clip: true
    //   })
    //   .exce();

    // fDrawJs
    //   .rect({
    //     x: 120,
    //     y: 120,
    //     width: 100,
    //     height: 100,
    //     radius: '50',
    //     backgroundColor: '#ffffff',
    //     backgroundImage: this.data.avatarUrl,
    //     borderWidth: 2,
    //     borderColor: '#dddddd',
    //     origin: '50 50%',
    //     horizontalAligin: '40%',
    //     verticalAligin: '50%',
    //     clip: true
    //   })
    //   .exce();


    // fDrawJs.qrcode({
    //   x: 50,
    //   y: 50,
    //   width: 120,
    //   height: 120,
    //   padding: true, // 二维码内边距
    //   border: true,
    //   radius: true,
    //   colorDark: "#0000ff",
    //   colorLight: "#ffffff",
    //   correctLevel: 'Q',
    //   text: 'https://img.ithome.com/newsuploadfiles/2018/8/20180810002200_6504.jpg',
    //   image: this.data.avatarUrl
    // }).exce();

    // fDrawJs.ring({
    //   x: 150,
    //   y: 150,
    //   startAngle: -30,
    //   endAngle: 30,
    //   radius: 0,
    //   lineWidth: 50,
    //   lineColor: '#ff0000',
    //   counterclockwise: true
    // }).ring({
    //   x: 200,
    //   y: 150,
    //   startAngle: 0,
    //   endAngle: 360,
    //   radius: 0,
    //   lineWidth: 6,
    //   lineColor: '#0000ff',
    //   counterclockwise: true
    // }).ring({
    //   x: 230,
    //   y: 150,
    //   startAngle: 0,
    //   endAngle: 360,
    //   radius: 0,
    //   lineWidth: 6,
    //   lineColor: '#ffff00',
    //   counterclockwise: true
    // }).ring({
    //   x: 260,
    //   y: 150,
    //   startAngle: 0,
    //   endAngle: 360,
    //   radius: 0,
    //   lineWidth: 6,
    //   lineColor: '#00ff00',
    //   counterclockwise: true
    // }).exce();

    // fDrawJs
    //   .ring({
    //     x: 150,
    //     y: 240,
    //     startAngle: -140,
    //     endAngle: -40,
    //     radius: 0,
    //     lineWidth: 10,
    //     lineColor: '#00ffff',
    //     counterclockwise: false
    //   })
    //   .ring({
    //     x: 150,
    //     y: 240,
    //     startAngle: -140,
    //     endAngle: -40,
    //     radius: 20,
    //     lineWidth: 20,
    //     lineColor: '#00ffff',
    //     counterclockwise: false
    //   })
    //   .ring({
    //     x: 150,
    //     y: 240,
    //     startAngle: -140,
    //     endAngle: -40,
    //     radius: 50,
    //     lineWidth: 20,
    //     lineColor: '#00ffff',
    //     counterclockwise: false
    //   })
    //   .ring({
    //     x: 150,
    //     y: 240,
    //     startAngle: -140,
    //     endAngle: -40,
    //     radius: 80,
    //     lineWidth: 20,
    //     lineColor: '#00ffff',
    //     counterclockwise: false
    //   })
    //   .exce();

    // let linePoints = [
    //   [60, 20],
    //   [20, 100],
    //   [100, 100]
    // ];
    // fDrawJs.line(linePoints, {
    //     type: 'solid',
    //     lineWidth: 2,
    //     lineCap: 'round',
    //     lineJoin: 'round',
    //     lineDash: {
    //       pattern: [10, 5],
    //       offset: 0
    //     },
    //     fill: true,
    //     fillStyle: '#dddddd',
    //     stroke: true,
    //     strokeStyle: "#dddddd",
    //     clip: true
    //   })
    //   .image(this.data.avatarUrl, {
    //     x: 30,
    //     y: 30,
    //     width: 100,
    //     height: 100,
    //     clip: true
    //   }).rect({
    //     x: 140,
    //     y: 140,
    //     width: 100,
    //     height: 100,
    //     radius: 20,
    //     backgroundColor: '#dddddd',
    //     clip: true
    //   })
    //   .image(this.data.avatarUrl, {
    //     x: 130,
    //     y: 130,
    //     width: 100,
    //     height: 100,
    //     clip: true
    //   }).rect({
    //     x: 200,
    //     y: 240,
    //     width: 100,
    //     height: 100,
    //     radius: 80,
    //     backgroundColor: 'red'
    //   })
    //   .image(this.data.avatarUrl, {
    //     x: 30,
    //     y: 270,
    //     width: 100,
    //     height: 100
    //   }).exce();
  }
})