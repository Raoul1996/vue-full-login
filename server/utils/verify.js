module.exports = (type) => {
  const verifyMap = {
    mobile: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    password: /^\w{6,18}$/,
    mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    stuCode: /^\d{2,}$/,
    qq: /[1-9][0-9]{4,}/,
    number: /^[0-9]\d*$/,
    age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
    chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]/,
    IDCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  }
  return verifyMap[type]
}
