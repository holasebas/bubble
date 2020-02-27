var sound = new Howl({
    src: ['./sound/bubble.wav'],
});

var bg = new Howl({
    src: ['./sound/bg.mp3'],
    volume: 0.1,
});



function bubblePlayRate() {
    sound.rate(2);
    sound.volume(0.7)
    sound.play();
}
function bubblePlay() {
    sound.rate(1.5)
    sound.volume(0.6)
    sound.play();
}

function bubblePlayOut() {
    sound.rate(1)
    sound.volume(0.3)
    sound.play();
}
function bgPlay() {
    bg.play();
}