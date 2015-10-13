window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  context.translate(width / 2, height / 2);

  var particles = [],
    numParticles = 50;

  for (var i = 0; i < numParticles; i++) {
    var distance = Math.random() * 40 + 180,
      angle = Math.random() * Math.PI * 2;
    particles.push(particle.create(Math.cos(angle) * distance, Math.sin(angle) * distance,
      Math.random() * 6 + 4, angle + Math.PI / 2, 60, 0));
  }

  update();

  function update() {
    context.clearRect(-width / 2, -height / 2, width, height);

    context.beginPath();
    context.arc(0, 0, 25, 0, Math.PI * 2, false);
    context.fill();

    for (var i = 0; i < numParticles; i++) {
      var p = particles[i];
      toTarget = vector.create(-p.position.getX(), -p.position.getY());
      p.setTargetAttraction(toTarget.getAngle(), 1 / toTarget.getLength());
      p.update();
      p.draw(context);
    }

    requestAnimationFrame(update);
  }

};
