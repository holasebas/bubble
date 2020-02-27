function bubbleCounter(type, counter){

    this.id = '_' + Math.random().toString(36).substr(2, 9);
    this.type = type;
    this.counter = counter;
    this.bubble;


    this.render = () =>{

        $("#bubbleCounters").append('<div class="bubblecounter"><div class="bubblecounter_text" data-type="'+this.type+'">0</div><div class="bubble bubble--ui" data-type="'+this.type+'"></div></div>');
        this.bubble = $(".bubble--ui[data-type='" + this.type + "']");
    }

    this.add = () =>{
        this.counter++;
        $(".bubblecounter_text[data-type='"+this.type+"']").text(this.counter);
       
    }

    this.bounce = () => {
        TweenMax.to(this.bubble, 0.05, { scale: 1.2 })
        TweenMax.to(this.bubble, 0.05, { scale: 1, delay: 0.05 });
    }

    

    
}