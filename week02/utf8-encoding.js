function toUTF8(item) {
  const binary = item.codePointAt().toString(2);
  if (binary.length < 8) {
    return binary.padStart(8, "0");
  }
  const headers = ["0", "110", "1110", "11110"];
  const arr = [];
  for (let i = binary.length; i > 0; i -= 6) {
    const sub = binary.slice(Math.max(i - 6, 0), i);
    if (sub.length === 6) {
      arr.unshift(`10${sub}`);
    } else {
      const header = headers[arr.length];
      arr.unshift(`${header}${sub.padStart(8 - header.length, "0")}`);
    }
  }
  return arr.join(" ");
}

function utf8Encoding(str) {
  return Array.from(str).map((item) => toUTF8(item));
}
console.log(utf8Encoding("严"));
// utf8和unicode关系 http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

// Unicode符号范围     |        UTF-8编码方式
// (十六进制)          |            （二进制）
// ----------------------+---------------------------------------------
// 0000 0000-0000 007F | 0xxxxxxx
// 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
// 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
// 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
