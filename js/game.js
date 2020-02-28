function game(min, sec, counters = [], bubbletypes = []) {

    this.min = min;
    this.sec = sec;
    // this.level = level;
    this.counters = counters;
    this.bubbleCounters = [];
    this.bubbleTypes = bubbletypes;
    

    this.gridManager = new gridManager(8);
    this.bubble_matrix = [];


    this.flag = false;
    this.shoting = false;
    this.bubble;
    console.log(bubbletypes);
    console.log(counters);

    this.bubble_type = bubbletypes[randomInt(0,bubbletypes.length - 1)];


    this.bubble_speed = 20.0
    this.bl = 0;
    this.bt = 0;
    this.inclinacion = false;

    this.bubbleDistance

    this.prom = [];
    this.chainX = [];
    this.chainY = [];
    this.chain = 0;
    this.toBreak = [];

    this.init = () => {
        this.bubble_matrix = this.gridManager.init();
        this.bubble_width = this.gridManager.bubble_width;
        $("#target").append('<div id="bubble_ready" class="bubble infinite_anim" style="width:' + this.bubble_width + 'px; height:' + this.bubble_width + 'px" data-type="' + this.bubble_type + '"></div>');


        this.counters.forEach((type, i) => {
            var counter = new bubbleCounter(type, 0);
            counter.render();
            this.bubbleCounters.push(counter);
            counter = null;
        });
        this.setTimer();
        this.start();

    }
    this.start = () => {
        window.requestAnimationFrame(this.loop);
        return new Promise((resolve) => {

            var flag = 0;
            var timer = setInterval(function () {


                if (this.sec == 0) {
                    this.min--;
                    this.sec = 59;
                    $("#timer .timer_min").text(this.minTxt(this.min));
                    $("#timer .timer_sec").text(this.secTxt(this.sec));

                } else {
                    this.sec--;
                    $("#timer .timer_min").text(this.minTxt(this.min));
                    $("#timer .timer_sec").text(this.secTxt(this.sec));
                }

                if (this.min == 0 && this.sec == 0) {
                    resolve();
                    clearInterval(timer);
                }


            }.bind(this), 1000);
        })

    }
    this.loop = (timestamp) => {
 
        if (this.flag) {

            if (this._bubbleCollisionLeftWall()) {
                if (vector(this.bubble_speed).x < 0) {
                    this.inclinacion = true;
                } else {
                    this.inclinacion = false;
                }

            }
            if (this._bubbleCollisionRightWall()) {
                if (vector(this.bubble_speed).x > 0) {
                    this.inclinacion = true;
                } else {
                    this.inclinacion = false;
                }

            }

            if (this._bubbleCollision()) {
                 this.stopBubble();
            } else {

                this.bubble.translate(this.bl, this.bt);

            }

            if (this.flag) {
                if (this._bubbleCollisionTopWall()) {

                    this.stopBubble();

                }
            }

            if (this.flag) {
                if (!this.inclinacion) {
                    this.bt = this.bt + (vector(this.bubble_speed).y);
                    this.bl = this.bl + (vector(this.bubble_speed).x);

                } else {
                    this.bt = this.bt + (vector(this.bubble_speed).y);
                    this.bl = this.bl - (vector(this.bubble_speed).x);
                }
            }


        }
        window.requestAnimationFrame(this.loop)
    }
    this.shoot = () => {
        if (!this.flag && !this.shoting) {
            var targ = document.querySelector("#target").getClientRects();
            var top = targ[0].top;
            var left = targ[0].left;
            $("#bubble_ready").removeClass("infinite_anim");
            $("#bubble_ready").remove();
            this.bubble = new Bubble('pink_lined', this.bubble_type, left, top, this.bubble_width);
            $("main").append(this.bubble.render());
            this.flag = true;
            this.shoting = true;
        }
    }
    this.stopBubble = () => {
        this.bubble_type = bubbletypes[randomInt(0,bubbletypes.length - 1)];
        this.flag = false;
     
        // bubblePlay();
     
        //     randColor2 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                var space_cords = this.gridManager.closer_space();
                this.bubble_matrix[space_cords.y][space_cords.x] = this.bubble;
        
        
            prom.push(this.bubbleBreak_async(space_cords.x, space_cords.y));
        
        
            Promise.all(prom).then(function(res){
        
                if (this.chain < 3) {
                    this.bubbleBreak(space_cords.x, space_cords.y).then(function(){
                        this.shoting = false;
                        // $("#raycast").removeClass("hide"); 
                    }.bind(this));
                } else {
                    this.toBreak.push({ x: space_cords.x, y: space_cords.y });
                    this.getBubbles(this.toBreak);
                }    
                this.chain = 0;
                this.toBreak = [];
                this.prom = [];
                this.chainX = [];
                this.chainY = [];
                
        
            }.bind(this));


            // this.bubbleBreak(space_cords.x, space_cords.y).then(function(){
            //     this.shoting = false;
            // }.bind(this));
    
            this.bubble.adjust(space_cords.left, space_cords.top).then(() => {
                this.bubble.setState(0);
                this.bt = 0;
                this.bl = 0;
                this.inclinacion = false;
                this.bubble = undefined;
                this.rotates(0)
            });
    
            var bubble_ready = new Promise((resolve)=>{
                $("#target").append('<div id="bubble_ready" class="bubble infinite_anim" style="width:' + this.bubble_width + 'px; height:' + this.bubble_width + 'px" data-type="' + this.bubble_type + '"></div>');
                resolve();
            }) 
            bubble_ready.then(()=>{
                TweenMax.fromTo($("#bubble_ready"), 0.3, {scale:0},{scale:1,ease: Power1.easeIn})
            })
    
        
    
    }
    this.bubbleBreak = (x, y) => {

        return new Promise((resolve, reject) => {
            var randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            // var randColor = 'rgba(255,255,255,0.3);';
    
            var mx;
            var my;
    
            if (y % 2 == 0) {
                my = -1
                mx = -1
                for (let i = 1; i <= 6; i++) {
                    if (i == 6) {
                        mx = -1;
                    }
                    if (mx == 2) {
                        mx = -1;
                    }
    
                    //$(".grid_bubble[data-column='" + (parseInt(x) + mx) + "'][data-row='" + (parseInt(y) + my) + "']").css({ 'background-color': randColor });
                    this.collideAnimation((parseInt(x) + mx), (parseInt(y) + my));
                    if (Number.isInteger(i / 2)) {
                        my = my + 1;
                    }
                    mx = mx + 1;
                }
            } else {
                my = -1;
                mx = 0;
                for (let i = 1; i <= 6; i++) {
                    if (i == 1 || i == 6) {
                        mx = 0;
                    }
                    if (i == 3) {
                        mx = -1;
                    }
                    if (i == 2 || i == 4 || i == 5) {
                        mx = +1;
                    }
    
                    //$(".grid_bubble[data-column='" + (parseInt(x) + mx) + "'][data-row='" + (parseInt(y) + my) + "']").css({ 'background-color': randColor });
                    this.collideAnimation((parseInt(x) + mx), (parseInt(y) + my));
                    if (Number.isInteger(i / 2)) {
                        my = my + 1;
                    }
    
                }
            }
            setTimeout(function(){
                resolve();
            },150)
    
            
    
    
        })
    }
    this.bubbleBreak_async = (x, y) => {
        this.chainX.push(parseInt(x));
        this.chainY.push(parseInt(y));
        return new Promise((resolve, reject) => {
            var bubbleNext = [];
    
            var mx;
            var my;
    
    
            if (y % 2 == 0) {
    
                my = -1
                mx = -1
                for (let i = 1; i <= 6; i++) {
    
                    if (i == 6) {
                        mx = -1;
                    }
                    if (mx == 2) {
                        mx = -1;
                    }
    
                    var type = this.matrixPath((parseInt(x) + mx), (parseInt(y) + my))
                    if (type === this.bubble.type) {
    
                        // $(".grid_bubble[data-column='" + (parseInt(x) + mx) + "'][data-row='" + (parseInt(y) + my) + "']").css({ 'background-color': randColor2 });
    
                        if (!this.chainExists((parseInt(x) + mx), (parseInt(y) + my))) {
                            this.chain++;
                            this.toBreak.push({ x: parseInt(x) + mx, y: parseInt(y) + my })
                            this.prom.push(this.bubbleBreak_async((parseInt(x) + mx), (parseInt(y) + my)))
    
                        }
                    }
    
                    this.chainX.push(parseInt(x) + mx);
                    this.chainY.push(parseInt(y) + my);
    
    
                    if (Number.isInteger(i / 2)) {
                        my = my + 1;
                    }
                    mx = mx + 1;
                }
                resolve()
    
    
            } else {
    
                my = -1;
                mx = 0;
                for (let i = 1; i <= 6; i++) {
    
                    if (i == 1 || i == 6) {
                        mx = 0;
                    }
                    if (i == 3) {
                        mx = -1;
                    }
                    if (i == 2 || i == 4 || i == 5) {
                        mx = +1;
                    }
    
                    var type = this.matrixPath((parseInt(x) + mx), (parseInt(y) + my))
                    if (type === this.bubble.type) {
                        // $(".grid_bubble[data-column='" + (parseInt(x) + mx) + "'][data-row='" + (parseInt(y) + my) + "']").css({ 'background-color': randColor2 });
    
                        if (!this.chainExists((parseInt(x) + mx), (parseInt(y) + my))) {
                            this.chain++;
                            this.toBreak.push({ x: parseInt(x) + mx, y: parseInt(y) + my })
                            this.prom.push(this.bubbleBreak_async((parseInt(x) + mx), (parseInt(y) + my)))
    
    
    
                        }
                    }
    
                    this.chainX.push(parseInt(x) + mx);
                    this.chainY.push(parseInt(y) + my);
    
    
    
                    if (Number.isInteger(i / 2)) {
                        my = my + 1;
                    }
    
                }
    
                resolve()
    
            }
    
        })
    }
    this.getBubbles = (bubbles) => {
        var i = 0;
        var delay = 100;
    
        bubbles.forEach(function(item){
            
            if (this.bubble_matrix[item.y][item.x] != undefined) {
                setTimeout(() => {
    
                    this.bubble_matrix[item.y][item.x].bubbleGet(item.x, item.y);
                    this.gridManager.clearSpace(item.x, item.y);
                
                }, i * delay);
                i++;
            }
            
        }.bind(this));
        bubblePlayOut();
        setTimeout(function(){
            this.shoting = false;
    
        }.bind(this),i*delay)
    
    }
    this.rotates = (deg) => {
        if (!this.flag) {
            $("#_buchaca").css({
                'transform': 'rotate(' + deg + 'deg)',
            });

            $("#target, #pointer").css({
                'transform': 'rotate(' + (deg * -1) + 'deg)',
            });

            $("#raycast").css({
                'transform': 'rotate(' + deg + 'deg)',
            });
        }
    }
    this.addBubble = (type) => {
        this.bubbleCounters.map(function (bubble) {
            if (bubble.type == type) {
                bubble.add();
                return;
            }
        });
    }
    this.bounceBubble = (type) => {
        this.bubbleCounters.map(function (bubble) {
            if (bubble.type == type) {
                bubble.bounce();
                return;
            }
        });
    }
    this.getCounters = () => {
        return this.bubbleCounters;
    }
    this.getbubbleTypes = () => {
        return bubbleTypes;
    }
    this.setTimer = () => {
        var min = this.min;
        var sec = this.sec;
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        $("#timer .timer_min").text(min);
        $("#timer .timer_sec").text(sec);
    }
    this.minTxt = (min) => {
        if (min < 10) {
            return min = "0" + min;
        }
        return min;
    }
    this.secTxt = (sec) => {
        if (sec < 10) {
            sec = "0" + sec;
            return sec;
        }
        return sec;
    }
    this._bubbleCollisionTopWall = () => {
        var topWall = this.bubble.me().offset().top - $("#top_wall").offset().top;
        this.bubbleDistance = topWall;
        if (topWall <= 0) {
            return true;
        }    
    }
    this._bubbleCollisionLeftWall = () => {

        var leftWall = this.bubble.me().offset().left - $("#left_wall").offset().left
        if (leftWall <= 0) {
            return true;
        }
    }
    this._bubbleCollisionRightWall = () => {
    
    
        var rightWall = this.bubble.me().offset().left + this.bubble_width - $("#right_wall").offset().left
        // console.log(rightWall)
        if (rightWall >= 0) {
            return true;
        }
    }
    this._bubbleCollision = () => {

        var collision = false;
        $(".bubble[data-state='0'] .anchor").each(function (i, bubble) {
           
            if (calc(this.bubble.me('anchor'), $(bubble))) {
                obs = $(this)
                collision = true;
                return false;
            }
        }.bind(this));

        return collision;
    }
    this.collideAnimation = (x, y) => {
        if (x >= 0 && y >= 0 && x <= this.bubble_matrix.length - 1 && y <= this.bubble_matrix.length - 1) {
            if (this.bubble_matrix[y][x] != undefined) {
                this.bubble_matrix[y][x].collisionAnimate()
                return true;
            }
        }
    }
    this.chainExists = (x, y) => {
        for (let i = 0; i < this.chainX.length; i++) {
            if (this.chainX[i] === x && this.chainY[i] === y) {
                return true;
            }
        }
        return false;
    }
    this.matrixPath = (x, y) => {
        if (x >= 0 && y >= 0 && x <= this.bubble_matrix.length - 1 && y <= this.bubble_matrix.length - 1) {
            if (this.bubble_matrix[y][x] != undefined) {
                //console.log(matrix[y][x].type)
                return this.bubble_matrix[y][x].type;
            }
        }
        return 0;
    
    }

}