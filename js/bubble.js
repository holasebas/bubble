function Bubble(style, type, x, y, w, state = 1) {
    this.width = w;
    this.height = w;
    this.id = '_' + Math.random().toString(36).substr(2, 9);
    this.type = type;
    this.HTMLelemet = '<div class="bubble ' + style + ' check" data-bubble="' + this.id + '" data-type="' + this.type + '" data-state="' + state + '" style="top:' + y + 'px; left:' + x + 'px; width:' + this.width + 'px; height:' + this.height + 'px;"><div class="anchor"></div></div>';

    this.me = undefined;


    this.delete = (x, y) => {

        $(this.me()).remove();
        gameManager.game.bubble_matrix[y][x] = undefined;

    }

    this.render = () => {
        return this.HTMLelemet;
    }

    this.translate = (x, y) => {
        this.me().css({ 'transform': 'translate(' + x + 'px,' + y + 'px)' })
    }

    this.me = (anchor = false) => {
        if (anchor) {
            return $(".bubble[data-bubble='" + this.id + "'] .anchor");
        }
        return $(".bubble[data-bubble='" + this.id + "']");
    }

    this.setState = (state) => {
        this.me().attr("data-state", state)
    }

    this.getRect = () => {
        return document.querySelector(".bubble[data-bubble='" + this.id + "'] .anchor").getBoundingClientRect();
    }

    this.adjust = (x, y) => {

        return new Promise((resolve, reject) => {
            this.collisionAnimate();
            TweenMax.to(this.me(), 0.15, { css: { top: y + 'px', left: x + 'px' } })
            TweenMax.to(this.me(), 0.15, { x: 0, y: 0 })
            resolve();
        });

    }

    this.collisionAnimate = () => {
        TweenMax.to(this.me(), 0.1, { scale: 0.8 })
        TweenMax.to(this.me(), 0.1, { scale: 1, delay: 0.1 })
    }

    this.bubbleGet = (x, y) => {

        this.me().css({ 'z-index': '11' });
        // var bubbleUI = $(".bubble--ui[data-type='" + this.type + "']");
        var bubbleUI_rect = document.querySelector(".bubble--ui[data-type='" + this.type + "']").getBoundingClientRect();

        var r = randomInt(1, 2);
        TweenMax.to(this.me(), 0.1, { css: { top: (this.getRect().y + (r * 15)) + 'px', left: (this.getRect().x - (r * 15)) + 'px', scale: 0.7 } })
        TweenMax.to(this.me(), 0.2, {
            css: { top: bubbleUI_rect.y + 'px', left: bubbleUI_rect.x + 'px', scale: 0.3 }, ease: Power4.easeIn, delay: 0.1, onComplete: () => {

                this.delete(x, y)
                bubblePlayRate();
                gameManager.game.bounceBubble(this.type)
                gameManager.game.addBubble(this.type);
             
            }
        });
    }
}
