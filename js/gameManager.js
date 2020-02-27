var width = window.innerWidth;


function gameManager(){


    this.game;

    this.init = () =>{
        
        this.game = new game(0,15,[1,2],[1,2])
        this.game.init();

        // this.level.start().then(()=>{
        //     // console.log("TIME OUT");
        //     // console.log("DETENER JUEGO");
        //     // console.log("MOSTRAR RESULTADO");
        // });

    }

}

var gameManager = new gameManager();
gameManager.init();    