function gridManager(matrixLength, bubble_types){

    this.matrixLength = matrixLength
    this.bubble_dimention;  
    this.bubble_complent;
    this.bubble_width;
    this.grid_spacing;
    this.gird_width;
    this.bubble_radius;



    this.init = () =>{

            this.bubble_dimention = width / this.matrixLength;
            this.bubble_complent = this.bubble_dimention % 1;
            this.bubble_width = this.bubble_dimention - this.bubble_complent;
            this.grid_spacing = this.bubble_complent * this.matrixLength;
            this.gird_width = this.bubble_width * this.matrixLength
            this.bubble_radius = this.bubble_width / 2;

            this.setRaycast();
            return this.creatematrix(this.matrixLength);
            
    }

    this.creatematrix = (length) => {

        var matrix = [];
        for (var i = 0; i < length; i++) {
            matrix[i] = [];
            var left = 0;
            var top = 6;
            if (i % 2 != 0) {
                left = this.bubble_radius + this.grid_spacing / 2;
            } else {
                left = this.grid_spacing / 2;
            }
            $("#matrix").append('<div class="grid" data-row="' + i + '" style="height:' + this.bubble_width + 'px; top:-' + i * top + 'px; left:' + left + 'px;"></div>');
    
            for (var j = 0; j < length; j++) {
    
                if (i % 2 != 0) {
                    if (j < length - 1) {
                        $(".grid[data-row='" + i + "']").append('<div class="grid_bubble" style="width:' + this.bubble_width + 'px; height:' + this.bubble_width + 'px;" data-column="' + j + '" data-row="' + i + '" data-empty="1">' + j + ',' + i + '</div>');
                        matrix[i][j] = undefined;
                    } else {
                        matrix[i][j] = undefined;
                    }
                } else {
                    $(".grid[data-row='" + i + "']").append('<div class="grid_bubble" style="width:' + this.bubble_width + 'px; height:' + this.bubble_width + 'px;" data-column="' + j + '" data-row="' + i + '" data-empty="1">' + j + ',' + i + '</div>');
                    matrix[i][j] = undefined;
                }
    
            }
        }
        return matrix;

    }
    this.setRaycast = () =>{
        $("#raycast").css({
            "width": this.bubble_width + "px",
            "left": "calc(50% - " + this.bubble_width / 2 + "px)"
        })
        $("#raycast #target, #pointer").css({
            "width": this.bubble_width + "px",
            "height": this.bubble_width + "px"
        });
    }
    this.closer_space = () => {
        var menor = 2048;
        var bubble_space;
        $(".grid_bubble[data-empty='1']").each(function (i, bubble_grid) {
        
            if (this.get_distance(gameManager.game.bubble.me('anchor'), $(bubble_grid)) < menor) {
                menor = this.get_distance(gameManager.game.bubble.me('anchor'), $(bubble_grid))
                bubble_space = $(bubble_grid);
            }

        }.bind(this))

        var space_cords = {
            x: bubble_space.attr('data-column'),
            y: bubble_space.attr('data-row'),
            top: bubble_space.offset().top,
            left: bubble_space.offset().left
        }
        bubble_space.attr("data-empty", "0");
        return space_cords;
    }   
    this.get_distance = (bubble, bubble_grid) => {
        var dx = bubble.offset().left - bubble_grid.offset().left - this.bubble_radius;
        var dy = bubble.offset().top - bubble_grid.offset().top - this.bubble_radius;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }
    this.clearSpace = (x, y) => {
        $(".grid_bubble[data-column='" + x + "'][data-row='" + y + "']").attr("data-empty", "1").css({ 'background-color': 'rgba(255,255,255,0.3)' })
    }

}