function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta - 90;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function calc($bubble, $bubble2) {
    var circle1 = { radius: bubble_radius - 2, x: $bubble.offset().left, y: $bubble.offset().top };
    var circle2 = { radius: bubble_radius - 2, x: $bubble2.offset().left, y: $bubble2.offset().top };
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    bubbleDistance = distance;
    if (distance <= circle1.radius + circle2.radius) {
        return true;
    } else {
        return false;
    }
}

function startup() {
    var el = document.getElementById("game");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    // el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
}
function handleStart(evt){
    var touchX  =  evt.touches[0].clientX;
    var touchY  =  evt.touches[0].clientY;

    var initX = window.innerWidth / 2;
    var initY = window.innerHeight - 60;

    // $(".rule--top").css({"top":initY+"px"})
    // $(".rule--left").css({"left":initX+"px"})

    deg = angle(touchX,touchY,initX,initY);
    if(deg > 67.5){
        deg = 67.5;
    }
    if(deg < -67-5){
        deg = -67-5;
    }
    gameManager.game.rotates(deg);

}
function handleMove(evt){
    var touchX  =  evt.touches[0].clientX;
    var touchY  =  evt.touches[0].clientY;

    var initX = window.innerWidth / 2;
    var initY = window.innerHeight - 60;
    deg = angle(touchX,touchY,initX,initY);
    if(deg > 67.5){
        deg = 67.5;
    }
    if(deg < -67-5){
        deg = -67-5;
    }
    gameManager.game.rotates(deg);

}
function handleEnd(){
    gameManager.game.shoot();
}

function vector(velocity){
    x = $("#pointer").offset().left - $("#target").offset().left;
    y = $("#pointer").offset().top - $("#target").offset().top;

    var angle = Math.atan2(y, x);

    var velX = Math.cos(angle) * velocity;
    var velY = Math.sin(angle) * velocity;

    return { x: velX, y: velY }
}


startup();