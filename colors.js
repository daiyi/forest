// thx https://twitter.com/jbum
// http://krazydad.com/tutorials/makecolors.php

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function makeColorGradient(i,
                           frequency1, frequency2, frequency3,
                           phase1, phase2, phase3,
                           center=128, width=127, len=10) {
  const red = Math.sin(frequency1 * i + phase1) * width + center;
  const green = Math.sin(frequency2 * i + phase2) * width + center;
  const blue = Math.sin(frequency3 * i + phase3) * width + center;
  return RGB2Color(red, green, blue);
}

function getMatColor(n) {
  return makeColorGradient(n, .9, .3, .9, 0, 2, 4);
}
