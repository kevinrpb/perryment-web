const canvas = document.getElementById("background-canvas"),
  ctx = canvas.getContext("2d"),
  gradient = new Gradient(ctx, canvas.width, canvas.height);

const stopAColor = [
	{ r: "229", g: "152", b: "155" }, //pink
	{ r: "77", g: "202", b: "237" }, //blue
    { r: "255", g: "201", b: "99" }, //yellow
  ],
  stopBColor = [
    { r: "255", g: "201", b: "99" }, //yellow
    { r: "229", g: "152", b: "155" }, //pink
    { r: "77", g: "202", b: "237" }, //blue
  ];

function loop() {
  requestFrame(loop);

  gradient.updateStops();
  gradient.draw();
}

function load() {
  gradient.addStop(0, stopAColor);
  gradient.addStop(1, stopBColor);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gradient.updateSize(window.innerWidth, window.innerHeight);

  loop();

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gradient.updateSize(window.innerWidth, window.innerHeight);
    }, 200);
  });
}
