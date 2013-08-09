function linearRegression() {
        this.data = [];
        this.regress ={};

        this.mb = function() {
            var m;
            var b;

            if (this.data.length == 1) {
                m = 0;
                b = this.data[0][1];
            } else {

                var sum_x = 0, sum_y = 0,
                    sum_xx = 0, sum_xy = 0;

    
                for (var i = 0; i < this.data.length; i++) {
                    sum_x += this.data[i][0];
                    sum_y += this.data[i][1];

                    sum_xx += this.data[i][0] * this.data[i][0];
                    sum_xy += this.data[i][0] * this.data[i][1];
                }

                m = ((this.data.length * sum_xy) - (sum_x * sum_y)) /
                    ((this.data.length * sum_xx) - (sum_x * sum_x));

                b = (sum_y / this.data.length) - ((m * sum_x) / this.data.length);
            }
            return { m: m, b: b };
        };
       this.m = function() {
            return this.mb().m;
        };
        this.b = function() {
            return this.mb().b;
        };
    }
    linearRegression.prototype = {
        run: function(dat){
          if (!arguments.length) return this.data;
            this.data = dat.slice();
  

            var mbe = this.mb();
             var   m = mbe.m;
             var   b = mbe.b;

            return function(x) {
                return b + (m * x);
            };
       },
       rSqrd:function(data, fn){
        if(data.length<2) return 1;

           var sum = 0;
           var average = 0;
           for(var i = 0; i<data.length; i++){
            sum +=data[i][1];
           }
           average = sum / data.length;

        var sum_of_squares = 0;
        for (var j = 0; j < data.length; j++) {
            sum_of_squares += Math.pow(average - data[j][1], 2);
        }

        var err = 0;
        for (var k = 0; k < data.length; k++) {
            err += Math.pow(data[k][1] - fn(data[k][0]), 2);
        }

        return 1 - (err / sum_of_squares);

       }

    };
module.exports = linearRegression;