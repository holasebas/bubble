function game(min, sec, counters = [], bubbletypes = []) {

    this.min = min;
    this.sec = sec;
    // this.level = level;
    this.counters = counters;
    this.bubbleCounters = [];
    this.bubbleTypes = bubbletypes;
    this.bubble_matrix = [];


    this.gridManager = new gridManager(8)
    


    this.flag = false;
    this.shoting = false;
    this.bubble;
    this.bubble_type;
    this.bubble_speed = 20.0
    this.bl = 0;
    this.bt = 0;
    this.inclinacion = false;






    this.bubbleDistance


    this.init = () => {
        this.gridManager.init();
        
        this.counters.forEach((type, i) => {
            var counter = new bubbleCounter(type, 0);
            counter.render();
            this.bubbleCounters.push(counter);
            counter = null;
        });
        this.setTimer();
        this.start();
        
        //window.requestAnimationFrame(this.loop);
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

            // if (_bubbleCollisionLeftWall()) {
            //     if (vector().x < 0) {
            //         inclinacion = true;
            //     } else {
            //         inclinacion = false;
            //     }

            // }
            // if (_bubbleCollisionRightWall()) {
            //     if (vector().x > 0) {
            //         inclinacion = true;
            //     } else {
            //         inclinacion = false;
            //     }

            // }

            // if (_bubbleCollision()) {
            //     stopBubble();
            // } else {

                this.bubble.translate(this.bl, this.bt);

            // }

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
            this.bubble = new Bubble('pink_lined', 1, left, top, 50);
            $("main").append(this.bubble.render());
            this.flag = true;
            this.shoting = true;
        }
    }

    this.stopBubble = () => {
        // bubble_type = randomInt(1, 2);
        this.flag = false;
        // bubblePlay();
     
        //     randColor2 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        //     var space_cords = closer_space();
        //     matrix[space_cords.y][space_cords.x] = bubble;
        
        
        //     prom.push(bubbleBreak_async(space_cords.x, space_cords.y));
        
        
        //     Promise.all(prom).then((res) => {
        
        //         if (chain < 3) {
        //             bubbleBreak(space_cords.x, space_cords.y).then(function(){
        //                 shoting = false;
        //                 // $("#raycast").removeClass("hide"); 
        //             });
        //         } else {
        //             toBreak.push({ x: space_cords.x, y: space_cords.y });
        //             getBubbles(toBreak);
        //         }    
        //         chain = 0;
        //         toBreak = [];
        //         prom = [];
        //         chainX = [];
        //         chainY = [];
                
        
        //     });
    
        //     bubble.adjust(space_cords.left, space_cords.top).then(() => {
        //         bubble.setState(0);
        //         bt = 0;
        //         bl = 0;
        //         inclinacion = false;
        //         bubble = undefined;
        //         rotates(0)
                
        //     });
    
        //     var bubble_ready = new Promise((resolve)=>{
        //         $("#target").append('<div id="bubble_ready" class="bubble infinite_anim" style="width:' + bubble_width + 'px; height:' + bubble_width + 'px" data-type="' + bubble_type + '"></div>');
        //         resolve();
        //     }) 
        //     bubble_ready.then(()=>{
        //         TweenMax.fromTo($("#bubble_ready"), 0.3, {scale:0},{scale:1,ease: Power1.easeIn})
        //     })
    
        
    
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

}