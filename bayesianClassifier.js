function bayesianClassifier(){

var data = {};
var totalCount;

var train = function(item, category){
  if (!data[category]) {
  	data[category] = {};
    }
     for (var k in item) {
         var v = item[k];
         
         if (data[category][k] === undefined) {
           	data[category][k] = {};
         }
         if (data[category][k][v] === undefined) {
           	data[category][k][v] = 0;
         }  
         
         data[category][k][item[k]]++;
       
       }
       totalCount++;
};
var score = function(item){
	var odds ={};
	var category;

	for(var k in item){
		var v = item[k];
		for(category in data){
           if(odds[category]===undefined){
           	odds[category] = {};
           }
           if(data[category][k]){
           	odds[category][k +'_'+v] = (data[category][k][v] || 0)/totalCount;
           }
           else{
           	odds[category][k +'_'+v]=0;
           }
		}
	}
	var oddsSums = {};
	for(category in odds){
		for (var combination in odds[category]) {
             if(oddsSums[category] === undefined){ 
             	oddsSums[category] = 0;
             }
             oddsSums[category] += odds[category][combination];
         }
	}

	return oddsSum;
}

	return{
train:train,
score:score

	}
}
module.exports = bayesianClassifier;