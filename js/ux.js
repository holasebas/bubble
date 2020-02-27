$(".cta").on("touchstart", function(){
    TweenMax.to($(this),0.05,{scale:0.95});
})
$(".cta").on("touchend", function(){
    TweenMax.to($(this),0.05,{scale:1});
})

