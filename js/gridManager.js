function gridManager(matrixLength){

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

            this.creatematrix(this.matrixLength);
            this.setRaycast();

            //set_raycast();
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
        $("#target").append('<div id="bubble_ready" class="bubble infinite_anim" style="width:' + this.bubble_width + 'px; height:' + this.bubble_width + 'px" data-type="' + this.bubble_type + '"></div>');
    }

}