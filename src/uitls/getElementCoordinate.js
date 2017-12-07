function getElementCoordinate (elem) {
  let x = 0;
  let y = 0;
  while (elem.offsetParent) {
    x += elem.offsetLeft;
    y += elem.offsetTop;
    elem = elem.offsetParent;
  }
  return { x, y };
}
module.exports = getElementCoordinate;
