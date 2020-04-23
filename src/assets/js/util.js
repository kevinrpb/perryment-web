//interpolation
function lerp(a, b, u) {
  return (1 - u) * a + u * b;
}

// shim layer with setTimeout fallback
window.requestFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
