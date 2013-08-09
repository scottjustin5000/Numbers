function Matrix(ary) {
    this.mtx = ary
    this.height = ary.length;
    this.width = ary[0].length;
}
Matrix.prototype.toString = function() {
    var s = []
    for (var i = 0; i < this.mtx.length; i++) 
        s.push( this.mtx[i].join(",") );
    return s.join("\n");
}
 
// returns a new matrix
Matrix.prototype.transpose = function() {
    var transposed = [];
    for (var i = 0; i < this.width; i++) {
        transposed[i] = [];
        for (var j = 0; j < this.height; j++) {
            transposed[i][j] = this.mtx[j][i];
        }
    }
    return new Matrix(transposed);
}
 


// returns a new matrix
Matrix.prototype.mult = function(other) {
    if (this.width != other.height) {
        throw "error: incompatible sizes";
    }
 
    var result = [];
    for (var i = 0; i < this.height; i++) {
        result[i] = [];
        for (var j = 0; j < other.width; j++) {
            var sum = 0;
            for (var k = 0; k < this.width; k++) {
                sum += this.mtx[i][k] * other.mtx[k][j];
            }
            result[i][j] = sum;
        }
    }
    return new Matrix(result); 
}
 

Matrix.prototype.toReducedRowEchelonForm = function() {
    var lead = 0;
    for (var r = 0; r < this.rows(); r++) {
        if (this.columns() <= lead) {
            return;
        }
        var i = r;
        while (this.mtx[i][lead] == 0) {
            i++;
            if (this.rows() == i) {
                i = r;
                lead++;
                if (this.columns() == lead) {
                    return;
                }
            }
        }
 
        var tmp = this.mtx[i];
        this.mtx[i] = this.mtx[r];
        this.mtx[r] = tmp;
 
        var val = this.mtx[r][lead];
        for (var j = 0; j < this.columns(); j++) {
            this.mtx[r][j] /= val;
        }
 
        for (var i = 0; i < this.rows(); i++) {
            if (i == r) continue;
            val = this.mtx[i][lead];
            for (var j = 0; j < this.columns(); j++) {
                this.mtx[i][j] -= val * this.mtx[r][j];
            }
        }
        lead++;
    }
    return this;
}


module.exports= Matrix;