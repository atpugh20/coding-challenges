const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
canvas.width = 400;
canvas.height = 400;
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.window.onload(() => {
  setup();
  draw();
});

function setup() {}

function draw() {}
