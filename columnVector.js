var Matrix = require('./matrix.js');
function ColumnVector(ary) {
    return new Matrix(ary.map(function(v) {return [v]}))
}
ColumnVector.prototype = Matrix.prototype;
 
Matrix.prototype.regression_coefficients = function(x) {
    var x_t = x.transpose();
    
    return x_t.mult(x).inverse().mult(x_t).mult(this);
}

module.exports = ColumnVector;