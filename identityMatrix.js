var Matrix = require("./matrix.js")

// IdentityMatrix is a "subclass" of Matrix
function IdentityMatrix(n) {
    this.height = n;
    this.width = n;
    this.mtx = [];
    for (var i = 0; i < n; i++) {
        this.mtx[i] = [];
        for (var j = 0; j < n; j++) {
            this.mtx[i][j] = (i == j ? 1 : 0);
        }
    }
}
IdentityMatrix.prototype = Matrix.prototype;
 
// the Matrix exponentiation function
// returns a new matrix
Matrix.prototype.exp = function(n) {
    var result = new IdentityMatrix(this.height);
    for (var i = 1; i <= n; i++) {
        result = result.mult(this);
    }
    return result;
}