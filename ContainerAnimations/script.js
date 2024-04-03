"use strict";
let cnt = document.getElementById("prlx");
const stopTracking = () => {
  cnt.style.transform = `rotateY(0deg)`;
  cnt.style.background = `linear-gradient(0, rgba(0,0,89,1) 100%)`;
};

const getDeg = (cf, axis, length) => {
  return Math.round(
    (1 - (axis <= length / 2 ? axis : length - axis) / length) * cf,
  );
};

function getAngle(centerX, centerY, pX, pY) {
  var x = pX - centerX;
  var y = pY - centerY;
  if (x == 0) return y > 0 ? 180 : 0;
  var a = (Math.atan(y / x) * 180) / Math.PI;
  a = x > 0 ? a + 90 : a + 270;
  return a;
}

const getConditionDeg = (deg, axis, length) =>
  deg * (axis <= length / 2 ? -1 : 1);

const animation = (event) => {
  const x = event.clientX - cnt.offsetLeft + 1;
  const y = event.clientY - cnt.offsetTop + 1;

  const width = cnt.offsetWidth;
  const height = cnt.offsetHeight;

  const degY = getDeg(100, x, width);
  const degX = getDeg(5, y, height);
  cnt.style.transform = `rotateY(${getConditionDeg(degY, x, width)}deg) rotateX(${-getConditionDeg(degX, y, height)}deg)`;

  const centerX = width / 2;
  const centerY = height / 2;

  const grDeg = getAngle(centerX, centerY, x, y);
  const maxRadius = 355 + 80;
  const grLen = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  //   const grDeg = Math.round(
  //     (Math.atan((x - centerX) / (y - centerY)) * 180) / Math.PI,
  //   );
  console.log(x, centerX, y, centerY);
  cnt.style.background = `linear-gradient(${grDeg}deg, rgba(0,0,0,1) 0%, rgba(89,0,89,1) ${maxRadius - grLen}%)`;
};
