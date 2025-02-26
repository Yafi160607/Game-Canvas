
var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
      

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);


    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }


    function update(dt) {
  
		function checkCollisions() {
			
            
			for (var i = 0; i < allEnemies.length; i++) {
			
				if (player.pos[0] < allEnemies[i].pos[0] + allEnemies[i].hitbox[1]  && player.pos[0] + player.hitbox[1]  > allEnemies[i].pos[0] &&
					player.pos[1] < allEnemies[i].pos[1] + allEnemies[i].hitbox[0] && player.pos[1] + player.hitbox[0] > allEnemies[i].pos[1]) {
					
					for (var k = 0; k < allBoosters.length; k++) {
						allBoosters.splice(k, 3);
						k--;
					}
					
					player.pos = [215, 460];
					score = 0;
					allBoosters.push(new Booster(80, 240), new Booster(280, 350), new Booster(380, 170));
					ctx.canvas.width = ctx.canvas.width;
				}
			}
				
           
			for (var j = 0; j < allBoosters.length; j++) {
			
				if (player.pos[0] < allBoosters[j].pos[0] + allBoosters[j].hitbox[1]  && player.pos[0] + player.hitbox[1]  > allBoosters[j].pos[0] &&
					player.pos[1] < allBoosters[j].pos[1] + allBoosters[j].hitbox[0] && player.pos[1] + player.hitbox[0] > allBoosters[j].pos[1]) {
					
					allBoosters.splice(j, 1);
					j--;
					score+= 20;
					ctx.canvas.width = ctx.canvas.width;
				}
			}
		}
		
		updateEntities(dt);		
        checkCollisions();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        var rowImages = [
                'images/water-block.png', 
                'images/stone-block.png', 
                'images/stone-block.png',  
                'images/stone-block.png',  
                'images/grass-block.png',   
                'images/grass-block.png'   
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
		
		
		allBoosters.forEach(function(booster) {
			booster.render();
		});

        player.render();
    }

    function reset() {
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-princess-girl.png',
		'images/gem-orange.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
