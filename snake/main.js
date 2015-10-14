window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight,
	frames = 0,
	everyN = 5,
	canChange = true,
	tileSize = 40,
	gridWidth = Math.floor(width / tileSize),
	gridHeight = Math.floor(height / tileSize),
	startLength = 5,
	numFruits = 5,
	snake = [], // snake[0] to snake[numFruits - 1] = fruits
	currDir = 0, // 0 = up, 1 = right, 2 = down, 3 = left
	status = 0; // 0 = nothing, 1 = dead, 2 to n + 2 = fruit n eaten

	context.translate((width - gridWidth * tileSize) / 2, (height - gridHeight * tileSize) / 2);

	init();
	update();

	function init() {
		frames = 0;
		snake = [];
		currDir = 1;
		status = 0;
		for (var i = numFruits; i < startLength + numFruits; i++) {
			snake[i] = snakeTile.create(startLength - (i - numFruits) - 1, 0, i - numFruits + 1);
		}
		for (var j = numFruits - 1; j >= 0; j--) {
			newFruit(j);
		}
	}

	function newFruit(n) {
		var x = Math.floor(Math.random() * gridWidth),
		y = Math.floor(Math.random() * gridHeight),
		empty = true;
		for (var i = n + 1; i < snake.length && empty; i++) {
			var tile = snake[i];
			if (x == tile.xPos && y == tile.yPos) {
				empty = false;
			}
		}
		if (empty) {
			snake[n] = snakeTile.create(x, y, 0);
		} else {
			newFruit(n); // breaks if you win the game
		}
	}

	function update() {
		if (frames % everyN === 0) {
			context.clearRect(0, 0, gridWidth * tileSize, gridHeight * tileSize);

			context.fillStyle = "#c40e08";
			for (var j = 0; j < numFruits; j++) {
				context.fillRect(snake[j].xPos * tileSize + 1, snake[j].yPos * tileSize + 1, tileSize - 2, tileSize - 2);
			}

			context.fillStyle = "#383838";
			for (var i = numFruits; i < snake.length; i++) {
				var tile = snake[i];
				var currStatus = tile.update(snake, currDir, numFruits, gridWidth, gridHeight);
				context.fillRect(tile.xPos * tileSize + 1, tile.yPos * tileSize + 1, tileSize - 2, tileSize - 2);
				status = currStatus > status ? currStatus : status;
			}

			if (status >= 2) {
				var newTile = snakeTile.create(snake[snake.length-1].prevX, snake[snake.length-1].prevY, snake.length - (numFruits-1));
				snake.push(newTile);
				newFruit(status-2);
			} else if (status == 1) {
				init();
			}

			status = 0;
			canChange = true;
		}
		frames++;
		requestAnimationFrame(update);
	}

	document.body.addEventListener("keydown", function(event) {
		if (canChange) {
			switch(event.keyCode) {
				case 38: // up
					if (currDir != 2) currDir = 0;
					break;
				case 39: // right
					if (currDir != 3) currDir = 1;
					break;
				case 40: // down
					if (currDir !== 0) currDir = 2;
					break;
				case 37: // left
					if (currDir != 1) currDir = 3;
					break;
				default:
			}
			canChange = false;
		}
	});

};
