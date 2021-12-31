function drawGrid(color, stepx, stepy) {
  context.strokeStyle = color;
  context.lineWidth = 0.5;
  for (let i = stepx + 0.5; i < canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
  for (let i = stepy + 0.5; i < canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
}

function drawBackgroud() {
  const STEP_Y = 12;
  const TOP_MARGIN = STEP_Y * 4;
  const LEFT_MARGIN = STEP_Y * 3;
  i = context.canvas.height;

  context.strokeStyle = 'lightgray';
  context.lineWidth = 0.5;

  while (i > TOP_MARGIN) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
    i -= STEP_Y;
  }
  context.strokeStyle = 'rgba(100, 0, 0, 0.3)';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(LEFT_MARGIN, 0);
  context.lineTo(LEFT_MARGIN, context.canvas.height);
  context.stroke();
}

function windowToCanvas(e) {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: e.clientX - bbox.left * (canvas.width / bbox.width),
    y: e.clientY - bbox.top * (canvas.height / bbox.height),
  };
}
