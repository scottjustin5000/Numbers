function Id3(){
	var targetAttributeValues = [];
	var target;
	
	var buildTree = function(d, targ, features){
 		target = targ;
    	var values = getTargetValues(d, targ);
    	var attValues = [];
    	for (var p in values) {
        	attValues.push(p);
    	}
    	if (attValues.length === 1) {
        	var v = first(values);
        	return { type: "result", val: v, name: v, alias: v + randomTag() };
    	}
    	if (features.length === 0) {
        	var maxValue = 0;
        	var topValue = '';
        	for (var p in values) {
            	attValues.push(p);
            	if (values[p] > maxValue) {
                	maxValue = values[p];
                	topValue = p;
            	}
        	}
        	return { type: "result", val: topValue, name: topValue, alias: topValue + randomTag() };
    	}
   
   	 	targetAttributeValues = attValues;
    	var best = getMaxGain(d, features, targ);
    	var remainingFeatures = getRemainingAttributes(features, best);
    	var rawPossibleValues = calculateTargetFrequency(d, best);
    	var possibleValues = [];
    	for (var p in rawPossibleValues) {
        	possibleValues.push(p);
    	}
    	var node = { name: best, alias: best + randomTag() };
    	node.type = "feature";
    	node.vals = [];
    	for (var u = 0; u < possibleValues.length; u++) {
        	var news = getItems(d, best, possibleValues[u]);
        	var child_node = { name: possibleValues[u], alias: possibleValues[u] + randomTag(), type: "feature_value" };
        	child_node.child = buildTree(news, targ, remainingFeatures);
        	node.vals.push(child_node);
    	}
    	return node;
};
var getMaxGain = function (instances, remainingAttributes, target) {
    console.log('here');
    console.log(remainingAttributes);
    var globalEntropy = 0;
    var tfreq = calculateTargetFrequency(instances, target);

    for (var p = 0; p < targetAttributeValues.length; p++) {

        var value = targetAttributeValues[p];

        var freq = tfreq[value] / instances.length;
        globalEntropy -= freq * Math.log(freq) / Math.log(2);
    }
    var attributeWithHighestGain;
    var highestGain = -99999;
    for (var i = 0; i < remainingAttributes.length; i++) {
         console.log(remainingAttributes[i]);
        var gain = calculateGain(remainingAttributes[i], instances, globalEntropy);
         console.log(gain);
        if (gain >= highestGain) {
            highestGain = gain;
            attributeWithHighestGain = remainingAttributes[i];
        }

    }
    return attributeWithHighestGain;
};
var calculateTargetFrequency = function(data, output){

  var values ={};
  for(var i=0; i<data.length; i++){

          if(!values[data[i][output]]){
            values[data[i][output]] =1;
          }
          else{
             values[data[i][output]]++;
          }

      //if(classValues.indexOf(data[i][output])===-1){
      //  classValues.push(data[i][output])
      //}
    }
    return values;
};
var getTargetValues = function (data, output) {

   // console.log(data);
    var targetValuesFrequency = {};
    for (var i = 0; i < data.length; i++) {

        if (!targetValuesFrequency[data[i][output]]) {
            targetValuesFrequency[data[i][output]] = 1;
        }
        else {
            targetValuesFrequency[data[i][output]]++;
        }
    }
    return targetValuesFrequency;
};
var calculateGain = function (att, instances, globalEntropy) {
    var valFreq = calculateFrequencyOfAttributeValues(instances, att);
    var sum = 0;
    for (var p in valFreq) {

        var fr = valFreq[p] / instances.length;
        //console.log(fr);
        sum += (valFreq[p] / instances.length) * calculateEntropyIfValue(instances, att, p);
    }
    console.log(globalEntropy);
    console.log(sum);
    return globalEntropy - sum;

};
var calculateEntropyIfValue = function (instances, attributeIF, valueIF) {
    var values = {};
    var instanceCount = 0;
    for (var p = 0; p < instances.length; p++) {


        if (instances[p][attributeIF] === valueIF) {
            console.log(instances[p][attributeIF]);

            var targetVal = instances[p][target];
            if (!values[targetVal]) {
                values[targetVal] = 1;
            }
            else {
                values[targetVal]++;
            }

            instanceCount++;
        }

    }
    var entropy = 0;
    console.log(targetAttributeValues);
    for (var v = 0; v < targetAttributeValues.length; v++) {
        var val = targetAttributeValues[v];
        if (values[val]) {
            var count = values[val];
            var frequency = (count / instanceCount);
            entropy -= frequency * Math.log(frequency) / Math.log(2);
        }

    }
    //console.log("entropy " + entropy);
    return entropy;
};
var calculateFrequencyOfAttributeValues = function (data, output) {

    var targetValuesFrequency = {};
    for (var i = 0; i < data.length; i++) {

        if (!targetValuesFrequency[data[i][output]]) {
            targetValuesFrequency[data[i][output]] = 1;
        }
        else {
            targetValuesFrequency[data[i][output]]++;
        }
    }
    return targetValuesFrequency;
};
var getItems = function (data, best, tar) {
    var items = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i][best] === tar) {
            items.push(data[i]);
        }
    }
    return items;
};
var getRemainingAttributes = function (list, target) {
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i] != target) {
            newArray.push(list[i]);
        }
    }
    return newArray;
}
var first = function (obj) {
    for (var a in obj) return a;
};
var randomTag = function(){
    return "_r"+Math.round(Math.random()*1000000).toString();
}
var predict = function (id3Model, sample) {
  var root = id3Model;
    while (root.type != "result") {
        var attr = root.name;
        var sampleVal = sample[attr];
        console.log(root.vals);
        var childNode = getItems(root.vals, 'name', sampleVal);
        console.log(childNode);
        var item = childNode[0];

        root = item.child;
    }
    return root.val;
}
return{
	buildTree:buildTree,
	predict:predict
}

};
module.exports  = Id3;