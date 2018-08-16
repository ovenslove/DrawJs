"use strict";

/**
 * @function 角度转化为弧度
 * @param {number} deg
 * @returns {number} radian 
 */
function degree2radian(deg) {
    return (deg / 360) * 2 * Math.PI;
}
/**
 * @function 去除字符串前后空格
 * @param {string} str 
 * @returns {string} str
 */
function trim(str) {
    return str
        .replace(/^(\s|\u00A0)+/, '')
        .replace(/(\s|\u00A0)+$/, '');
}
/**
 * @function 按照
 * @param {*} opts 
 * @param {*} $this 
 */
function splitString(opts, $this) {
    let strArr = [];
    var lineWidth = 0;
    let lineText = '';
    let _opts = {
        fontSize: 16,
        text: '',
        maxWidth: 100,
    };
    Object.assign(_opts, opts);
    $this.ctx.setFontSize(_opts.fontSize);
    for (let i = 0; i < _opts.text.length; i++) {
        lineWidth += $this.ctx.measureText(_opts.text[i]).width;
        lineText += _opts.text[i];
        if (lineWidth > _opts.maxWidth) {
            strArr.push(lineText);
            lineWidth = 0;
            lineText = '';
        }
        if (i == _opts.text.length - 1) { //绘制剩余部分
            strArr.push(lineText);
        }
    }
    return strArr;
}

module.exports = {
    degree2radian,
    trim,
    splitString
};