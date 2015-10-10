window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  var fl = 300,
    centerZ = 1500,
    points = [],
    rotX = 0,
    rotY = 0;

  context.translate(width / 2, height / 2);

  points[0] = { x: -500 , y: -500 , z:  500 };
  points[1] = { x:  500 , y: -500 , z:  500 };
  points[2] = { x:  500 , y: -500 , z: -500 };
  points[3] = { x: -500 , y: -500 , z: -500 };
  points[4] = { x: -500 , y:  500 , z:  500 };
  points[5] = { x:  500 , y:  500 , z:  500 };
  points[6] = { x:  500 , y:  500 , z: -500 };
  points[7] = { x: -500 , y:  500 , z: -500 };

  function project() {
    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        scale = fl / (fl + p.z + centerZ);
      p.sx = p.x * scale;
      p.sy = p.y * scale;
    }
  }

  function drawLine() {
    var p = points[arguments[0]];
    context.moveTo(p.sx, p.sy);

    for (var i = 1; i < arguments.length; i++) {
      p = points[arguments[i]];
      context.lineTo(p.sx, p.sy);
    }
  }

  function translatePoints(x, y, z) {
    for (var i = 0; i < points.length; i++) {
      points[i].x += x;
      points[i].y += y;
      points[i].z += z;
    }
  }

  function rotateX(angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle);
    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        y = p.y * cos - p.z * sin,
        z = p.z * cos + p.y * sin;
      p.y = y;
      p.z = z;
    }
  }

  function rotateY(angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle);
    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        x = p.x * cos - p.z * sin,
        z = p.z * cos + p.x * sin;
      p.x = x;
      p.z = z;
    }
  }

  function rotateZ(angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle);
    for (var i = 0; i < points.length; i++) {
      var p = points[i],
        x = p.x * cos - p.y * sin,
        y = p.y * cos + p.x * sin;
      p.x = x;
      p.y = y;
    }
  }

  update();

  function update() {
    context.clearRect(-width / 2, -height / 2, width, height);
    project();

    context.beginPath();
    drawLine(0, 1, 2, 3, 0);
    drawLine(4, 5, 6, 7, 4);
    drawLine(0, 4);
    drawLine(1, 5);
    drawLine(2, 6);
    drawLine(3, 7);
    context.stroke();

    rotateX(rotX);
    rotateY(rotY);

    requestAnimationFrame(update);
  }

  document.body.addEventListener("mousemove", function(event) {
    var dx = width / 2 - event.clientX,
      dy = height / 2 - event.clientY;
    rotX = -dy / 4000;
    rotY = -dx / 4000;
  });
};
