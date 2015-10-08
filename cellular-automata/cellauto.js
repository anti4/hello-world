window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    pxSize = 20,
    input = "0000000000000000000000001000000000000000000000000".split(''),
    left,
    right,
    iterations = Math.floor(height / pxSize) + 1;
  context.translate((width / 2) - (input.length / 2 * pxSize), 0);

  for (var f = 0; f < input.length; f++) {
    if (input[f] == '1') {
      context.fillRect(f * pxSize, 0, pxSize, pxSize);
    }
  }

  for (var i = 1; i < iterations; i++) {
    var next = "0000000000000000000000001000000000000000000000000".split('');
    for (var k = 1; k < input.length - 1; k++) {
      left = between(k - 1, 0, input.length);
      right = between(k + 1, 0, input.length);
      if (input[left] != input[right]) {
        next[k] = '1';
      } else {
        next[k] = '0';
      }
    }
    for (var j = 0; j < input.length; j++) {
      if (next[j] == '1') {
        context.fillRect(j * pxSize, i * pxSize, pxSize, pxSize);
      }
    }
    input = next;
  }

  function between(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
  }
};
