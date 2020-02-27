var e = $('html');


var bubble;
// var shoting = false;
var inclinacion = false;
var bubbleDistance = 1000;
var velocity = 22.0;
var bl = 0;
var bt = 0;
// var flag = false;
var obs;

var matrix;
var matrixLength = 8;
var matrixX = 8;
var matrixY = 8;

// var width = window.innerWidth;
// var bubble_dimention;
// var bubble_complent;
// var bubble_width;
// var grid_spacing;
// var gird_width;
// var bubble_radius;
var bubble_type;
var randColor2;



var prom = [];
var bubbleNext = [];
var chainX = [];
var chainY = [];

var chain = 0;
var toBreak = []


function creatematrix(length) {
    matrix = [];
    for (var i = 0; i < length; i++) {
        matrix[i] = [];
        var left = 0;
        var top = 6;
        if (i % 2 != 0) {
            left = bubble_radius + grid_spacing / 2;
        } else {
            left = grid_spacing / 2;
        }
        $("#matrix").append('<div class="grid" data-row="' + i + '" style="height:' + bubble_width + 'px; top:-' + i * top + 'px; left:' + left + 'px;"></div>');

        for (var j = 0; j < length; j++) {

            if (i % 2 != 0) {
                if (j < matrixLength - 1) {
                    $(".grid[data-row='" + i + "']").append('<div class="grid_bubble" style="width:' + bubble_width + 'px; height:' + bubble_width + 'px;" data-column="' + j + '" data-row="' + i + '" data-empty="1">' + j + ',' + i + '</div>');
                    matrix[i][j] = undefined;
                } else {
                    matrix[i][j] = undefined;
                }
            } else {
                $(".grid[data-row='" + i + "']").append('<div class="grid_bubble" style="width:' + bubble_width + 'px; height:' + bubble_width + 'px;" data-column="' + j + '" data-row="' + i + '" data-empty="1">' + j + ',' + i + '</div>');
                matrix[i][j] = undefined;
            }

        }
    }
}
function closer_space() {
    var menor = 2048;
    var bubble_space;
    $(".grid_bubble[data-empty='1']").each(function () {
        if (get_distance(bubble.me('anchor'), $(this)) < menor) {
            menor = get_distance(bubble.me('anchor'), $(this))
            bubble_space = $(this);
        }
    })
    var space_cords = {
        x: bubble_space.attr('data-column'),
        y: bubble_space.attr('data-row'),
        top: bubble_space.offset().top,
        left: bubble_space.offset().left
    }
    bubble_space.attr("data-empty", "0");
    return space_cords;
}


// function shoot() {
//     if (!flag && !shoting) {
//         var targ = document.querySelector("#target").getClientRects();
//         var top = targ[0].top;
//         var left = targ[0].left;
//         $("#bubble_ready").removeClass("infinite_anim");
//         $("#bubble_ready").remove();
//         bubble = new Bubble('pink_lined', bubble_type , left, top, bubble_width);
//         $("main").append(bubble.render());
//         flag = true;
//         shoting = true;
//     }
// }


// function rotates(deg) {
//     if (!flag) {
//         $("#_buchaca").css({
//             'transform': 'rotate(' + deg + 'deg)',
//         });

//         $("#target, #pointer").css({
//             'transform': 'rotate(' + (deg * -1) + 'deg)',
//         });

//         $("#raycast").css({
//             'transform': 'rotate(' + deg + 'deg)',
//         });
//     }
// }

function get_distance(bubble, bubble_grid) {
    var dx = bubble.offset().left - bubble_grid.offset().left - bubble_radius;
    var dy = bubble.offset().top - bubble_grid.offset().top - bubble_radius;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}
function _bubbleCollision() {

    var collision = false;
    $(".bubble[data-state='0'] .anchor").each(function (index) {
       
        if (calc(bubble.me('anchor'), $(this))) {
            obs = $(this)
            collision = true;
            return false;
        }
    });
    return collision;
}
function _bubbleCollisionLeftWall() {

    var leftWall = bubble.me().offset().left - $("#left_wall").offset().left
    if (leftWall <= 0) {
        return true;
    }
}
function _bubbleCollisionRightWall() {


    var rightWall = bubble.me().offset().left + bubble_width - $("#right_wall").offset().left
    // console.log(rightWall)
    if (rightWall >= 0) {
        return true;
    }
}
function _bubbleCollisionTopWall() {


    var topWall = bubble.me().offset().top - $("#top_wall").offset().top;
    bubbleDistance = topWall;
    if (topWall <= 0) {
        return true;
    }


}
function vector(reverse = false) {


    x = $("#pointer").offset().left - $("#target").offset().left;
    y = $("#pointer").offset().top - $("#target").offset().top;

    var angle = Math.atan2(y, x);

    var velX = Math.cos(angle) * velocity;
    var velY = Math.sin(angle) * velocity;

    return { x: velX, y: velY }

}
function stopBubble() {
    bubble_type = randomInt(1, 2);
    flag = false;
    bubblePlay();
 
        randColor2 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        var space_cords = closer_space();
        matrix[space_cords.y][space_cords.x] = bubble;
    
    
        prom.push(bubbleBreak_async(space_cords.x, space_cords.y));
    
    
        Promise.all(prom).then((res) => {
    
            if (chain < 3) {
                bubbleBreak(space_cords.x, space_cords.y).then(function(){
                    shoting = false;
                    // $("#raycast").removeClass("hide"); 
                });
            } else {
                toBreak.push({ x: space_cords.x, y: space_cords.y });
                getBubbles(toBreak);
            }    
            chain = 0;
            toBreak = [];
            prom = [];
            chainX = [];
            chainY = [];
            
    
        });

        bubble.adjust(space_cords.left, space_cords.top).then(() => {
            bubble.setState(0);
            bt = 0;
            bl = 0;
            inclinacion = false;
            bubble = undefined;
            rotates(0)
            
        });

        var bubble_ready = new Promise((resolve)=>{
            $("#target").append('<div id="bubble_ready" class="bubble infinite_anim" style="width:' + bubble_width + 'px; height:' + bubble_width + 'px" data-type="' + bubble_type + '"></div>');
            resolve();
        }) 
        bubble_ready.then(()=>{
            TweenMax.fromTo($("#bubble_ready"), 0.3, {scale:0},{scale:1,ease: Power1.easeIn})
        })

    

}

// function loop(timestamp) {

//     if (flag) {

//         if (_bubbleCollisionLeftWall()) {
//             if (vector().x < 0) {
//                 inclinacion = true;
//             } else {
//                 inclinacion = false;
//             }

//         }
//         if (_bubbleCollisionRightWall()) {
//             if (vector().x > 0) {
//                 inclinacion = true;
//             } else {
//                 inclinacion = false;
//             }

//         }

//         if (_bubbleCollision()) {
//             stopBubble();
//         } else {

//             bubble.translate(bl, bt);

//         }

//         if (flag) {
//             if (_bubbleCollisionTopWall()) {

//                 stopBubble();

//             }
//         }


//         if (flag) {
//             if (!inclinacion) {
//                 bt = bt + (vector().y);
//                 bl = bl + (vector().x);

//             } else {
//                 bt = bt + (vector().y);
//                 bl = bl - (vector().x);
//             }
//         }




//     }
//     window.requestAnimationFrame(loop)
// }
// window.requestAnimationFrame(loop);

function bubbleBreak(x, y) {

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
                collideAnimation((parseInt(x) + mx), (parseInt(y) + my));
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
                collideAnimation((parseInt(x) + mx), (parseInt(y) + my));
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
function bubbleBreak_async(x, y) {
    chainX.push(parseInt(x));
    chainY.push(parseInt(y));

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

                var type = matrixPath((parseInt(x) + mx), (parseInt(y) + my))
                if (type === bubble.type) {

                    // $(".grid_bubble[data-column='" + (parseInt(x) + mx) + "'][data-row='" + (parseInt(y) + my) + "']").css({ 'background-color': randColor2 });

                    if (!chainExists((parseInt(x) + mx), (parseInt(y) + my))) {
                        chain++;
                        toBreak.push({ x: parseInt(x) + mx, y: parseInt(y) + my })
                        prom.push(bubbleBreak_async((parseInt(x) + mx), (parseInt(y) + my)))


                    }
                }

                chainX.push(parseInt(x) + mx);
                chainY.push(parseInt(y) + my);


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

                var type = matrixPath((parseInt(x) + mx), (parseInt(y) + my))
                if (type === bubble.type) {
                    // $(".grid_bubble[data-column='" + (parseInt(x) + mx) + "'][data-row='" + (parseInt(y) + my) + "']").css({ 'background-color': randColor2 });

                    if (!chainExists((parseInt(x) + mx), (parseInt(y) + my))) {
                        chain++;
                        toBreak.push({ x: parseInt(x) + mx, y: parseInt(y) + my })
                        prom.push(bubbleBreak_async((parseInt(x) + mx), (parseInt(y) + my)))



                    }
                }

                chainX.push(parseInt(x) + mx);
                chainY.push(parseInt(y) + my);



                if (Number.isInteger(i / 2)) {
                    my = my + 1;
                }

            }

            resolve()

        }

        //resolve(matrix[y][x])

    })
}
function chainExists(x, y) {
    for (let i = 0; i < chainX.length; i++) {
        if (chainX[i] === x && chainY[i] === y) {
            return true;
        }

    }
    return false;

}
function matrixPath(x, y) {
    if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {
        if (matrix[y][x] != undefined) {
            //console.log(matrix[y][x].type)
            return matrix[y][x].type;
        }
    }
    return 0;

}
function collideAnimation(x, y) {
    if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {
        if (matrix[y][x] != undefined) {
            matrix[y][x].collisionAnimate()
            return true;
        }
    }
}

function set_raycast() {
    $("#raycast").css({
        "width": bubble_width + "px",
        "left": "calc(50% - " + bubble_width / 2 + "px)"
    })
    $("#raycast #target, #pointer").css({
        "width": bubble_width + "px",
        "height": bubble_width + "px"
    });
}


// function grid_manager() {

//     bubble_dimention = width / matrixLength;
//     bubble_complent = bubble_dimention % 1;
//     bubble_width = bubble_dimention - bubble_complent;
//     grid_spacing = bubble_complent * matrixLength;
//     gird_width = bubble_width * matrixLength
//     bubble_radius = bubble_width / 2;

//     if (grid_spacing + gird_width == width) {
//         //console.log("GRID DONE")
//     }

//     creatematrix(matrixLength);
//     set_raycast();

// }

// function init() {

//     grid_manager();
//     bubble_type = randomInt(1, 2);
//     $("#target").append('<div id="bubble_ready" class="bubble infinite_anim" style="width:' + bubble_width + 'px; height:' + bubble_width + 'px" data-type="' + bubble_type + '"></div>');

// }
function clearSpace(x, y) {
    $(".grid_bubble[data-column='" + x + "'][data-row='" + y + "']").attr("data-empty", "1").css({ 'background-color': 'rgba(255,255,255,0.3)' })
}
function getBubbles(bubbles) {
    var i = 0;
    var delay = 100;

    bubbles.forEach((item) => {
        
        if (matrix[item.y][item.x] != undefined) {
            setTimeout(() => {

                matrix[item.y][item.x].bubbleGet(item.x, item.y);
                clearSpace(item.x, item.y);
            
            }, i * delay);
            i++;
        }
        
    });
    bubblePlayOut();
    setTimeout(function(){
        shoting = false;
        // $("#raycast").removeClass("hide"); 
    },i*delay)

}

// init()

function run() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            shoot();
        }, i * 1500)

    }
}








