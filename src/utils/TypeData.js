var TypeData = {
  areaArray: {
    '0': '常住',
    '1':'流动',
    '2':'重点',
    '3':'黄赌毒',
    '4':'诈骗犯',
    '6':'出所',
    '7':'非法集资',
    '8':'外地飞抢',
    '9':'扒窃人口'
  },
  getTypeBycode:function(code){
    var TypeName;
    TypeName = this.areaArray[code];

    return TypeName;
  }
}
export { //很关键
  TypeData
}
