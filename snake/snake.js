var snakeTile = {
	xPos: 0,
	yPos: 0,
	prevX: 0,
	prevY: 0,
	tileID: 0, // 0 = fruit, 1 = snake head, 2, 3, 4, .. = rest of snake

	create: function(x, y, id) {
		var obj = Object.create(this);
		obj.xPos = x;
		obj.yPos = y;
		obj.tileID = id;
		return obj;
	},

	update: function(snake, dir, fruits, width, height) {
		this.prevX = this.xPos;
		this.prevY = this.yPos;
		if (this.tileID == 1) {
			switch (dir) {
				case 0:
					if (this.yPos > 0) this.yPos--;
					else return 1;
					break;
				case 1:
					if (this.xPos < (width - 1)) this.xPos++;
					else return 1;
					break;
				case 2:
					if (this.yPos < (height - 1)) this.yPos++;
					else return 1;
					break;
				case 3:
					if (this.xPos > 0) this.xPos--;
					else return 1;
					break;
				default:
			}
			for (var i = 0; i < snake.length; i++) {
				if (this.xPos == snake[i].xPos && this.yPos == snake[i].yPos) {
					if (i < fruits) return (i+2);
					else if (i != fruits) return 1;
				}
			}
		}  else if (this.tileID > 1) {
			var prevTile = snake[this.tileID + fruits - 2];
			this.xPos = prevTile.prevX;
			this.yPos = prevTile.prevY;
		}
		return 0;
	}
};
