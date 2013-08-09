function quartile(){
var lowerQuartile = function(data){
  data = sort(data);
  return getQuartile(data, .25);
};
var upperQuartile =function(data){
  data = sort(data);
  return getQuartile(data, .75);
};
var middleQuartile = function(data){
  data = sort(data);
  return getQuartile(data, .5);
};
var interQuartile = function(data){
  var up = upperQuartile(data);
  var low = lowerQuartile(data);
  return up -low;
};
var getQuartile = function(data, quart){
    var result = 0;
    var index = quart *(data.length +1);
    var remainder = index % 1;
    index = Math.floor(index) -1;

    if(remainder===0){
    	result = data[index];
    }
    else{
        var value = data[index];
        var interpolated = interpolate(value,data[index+1], remainder);
        result = value + interpolated;
    }
    return result;

};
var interpolate =function(a,b,remainder){
	return (b-a)*remainder;
};
var sort = function(data){
	return data.sort(function(a,b){return a - b});
};

return{
 lowerQuartile:lowerQuartile,
 upperQuartile:upperQuartile,
 middleQuartile:middleQuartile,
 interQuartile:interQuartile
}
}
module.exports = quartile;