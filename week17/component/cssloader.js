let css = require("css");

module.exports = function (souse, map) {
  let stylesheet = css.parse(souse);
  // 获取css文件名
  let name = this.resourcePath.match(/([^/]+).css$/)[1];
  console.log(name);

  for (let rule of stylesheet.stylesheet.rules) {
    // 不是以文件名开头的样式，添加上类名
    rule.selectors = rule.selectors.map((selector) =>
      selector.match(new RegExp(`^.${name}`))
        ? selector
        : `.${name} ${selector}`
    );
  }
  
  return `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))};
    document.documentElement.appendChild(style);
  `;
};
