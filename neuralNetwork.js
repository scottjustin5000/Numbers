var Particle = require("./particle.js");

function neuralNetwork(){

var numInput;
var numHidden;
var numOutput;

var inputs;
var ihWeights;
var ihSums;
var ihBiases;
var ihOutputs;
var hoWeights;
var hoSums;
var hoBiases;
var outputs;

var EPSILON = 1e-10;

 var init = function(numIn, numHid, numOut){
     numImput = numIn;
     numHidden = numHid;
     numOutput = numOut;

 };
 var setWeights = function(weights){
      var numWeights = (numImput * numHidden) +(numHidden * numOutput)+numHidden +numOutput;
      if(weights.length !=numWeights){
      	throw new Error("weights number mismatch");
      }
      var k = 0;

      for(var = 0; i<numImput;i++){
      	for(var j =0; j <numHidden; j++){
      		ihWeights[i][j] = weights[k++];
      	}
      }
      for(var = 0; i < numHidden; i++){
      	ihBiases[i] = weights[k++];
      }
      for (var i = 0; i < numHidden; i++){
         for (var j = 0; j < numOutput; j++){
              hoWeights[i][j] = weights[k++];
          }
      }
      for (var i = 0; i < numOutput; i++){
           hoBiases[i] = weights[k++];
       }
 };
 var computeOptions = function(currInputs){
 		for(var i=0;i<numHidden; i++){
 			inSums[i] = 0.0;
 		}
 		for(var i=0; i< numOuput; i++){
 			hoSums[i] = 0.0;
 		}
 		for(var i = 0; i<currInputs.length; i++){
 			inputs[i] = currInputs[i];
 		}
 		for(var j = 0; j<numHidden;j++){
 			for(var i=0; i<numInput; i++){
 				ihSums[j] +=inputs[i] * ihWeights[i][j];
 			}
 		}
 		for(var i=0; i <numHidden; i++){
 			ihSums[i] +=ihBiases[i];
 		}
 		for(var i =0; i <numHidden; i++){
 			ihOutputs[i] = sigmoidFunction(ihSums[i]);
 		}

 		for(var j=0; j<numOutput; j++){
 			for(var i=0; i<numHidden;i++){
 				hoSums[j] +=ihOutputs[i] * hoWeights[i][j];
 			}
 		}
 		for(var i =0; i <numOutput;i++){
 			hoSums[i] +=hoBiases[i];
 		}

 	   var res = softmax(hoSums);
 	   outputs = res;

 	   return res;
 };
 var sigmoidFunction= function(x){
      if(x < -45.0){return 0.0;}
      if(x > 45.0){return 1.0;}

      return 1.0 / (1.0 + Math.exp(-x));
 };
 var softmax= function(hoSums){
     var max = Math.max.apply(Math, hoSums);

     var scale = 0;
     for(var i = 0; i hoSums.length; i++){
     	scale += Math.exp(hoSums[i] -max);
     }
     result =[];

     for(var i = 0; i < hoSums.length; i++){
     	result[i] = Math.exp(hoSums[i] - max) / scale;
     }
     return result;
 };
 var train = function(trainMatrix){
 	var numWeights = (numInput * numHidden) + (numHidden * numOutput) + numHidden + numOutput;
 	var numberParticles = 10;
    var numberIterations = 500;
    var iteration = 0;
    var dim = numWeights; // number of values to solve for
    var minX = -5.0; // for each weight
    var maxX = 5.0;
    var swarm = [];
    var bestGlobalPosition =[];
    var bestGlobalFitness = Number.MAX_VALUE;

    var minV = -0.1 * maxX;
    var maxV = 0.1*maxX;

    for(var i=0; i <numberParticles;i++){

    	var randomPosition =[];
    	for(var j = 0; j < dim; j++){
    		var lo = minX;
    		var hi = maxX;
    		randomPosition[j] = (hi - lo) * Math.random() + lo;
    	}
    	var fitness = crossEntropy(trainMatrix,randomPosition);
    	var randomVelocity = [];
    	for(var j = 0; j < dim; j++){
    		var lo = -1.0 * Math.abs(maxX- minX);
    		var hi = Math.abs(maxX-minX);
    		randomVelocity[j] =(hi - lo) * Math.random() + lo;
    	}
    	swarm[i] = new Particle(randomPosition,fitness,randomVelocity,randomPosition,fitness);

    	if(swarm[i].fitness < bestGlobalFitness){
    		bestGlobalFitness = swarm[i].fitness;
    		swarm[i].position = bestGlobalFitness;
    	}
    }
    var w = 0.729; // inertia weight.
    var c1 = 1.49445; // cognitive/local weight
    var c2 = 1.49445; // social/global weight
    var r1; // cognitive and social randomizations
    var r2; // cognitive and social randomizations
     while (iteration < numberIterations)
     {
          ++iteration;
          var newVelocity = [];
          var newPosition = [];
          var newFitness;
          for(var z = 0; z < swarm.length; z++){
          	var currentParticle = swarm[i];
          	for(var j = 0; j < currentParticle.velocity.length; j++){

          		r1 = Math.random();
          		r2 = Math.random();
          		newVelocity[j] = (w * currentParticle.velocity[j]) +
                                         (c1 * r1 * (currentParticle.bestPosition[j] - currentParticle.position[j])) +
                                         (c2 * r2 * (bestGlobalPosition[j] - currentParticle.position[j])); // new velocity depends on old velocity, best position of parrticle, and best position of any particle

                  if (newVelocity[j] < minV){
                       newVelocity[j] = minV;
                   }
                   else if (newVelocity[j] > maxV){
                            newVelocity[j] = maxV; 
                  } 

          	}
          	currentParticle.velocity = newVelocity;
            for (int j = 0; j < currP.Position.Length; ++j)
             {
                 newPosition[j] = currP.Position[j] + newVelocity[j];  // compute new position
                  if (newPosition[j] < minX){
                       newPosition[j] = minX;
                   }
                    else if (newPosition[j] > maxX){
                       newPosition[j] = maxX;
                   }
             }

             currentParticle.position = newPosition;

             newFitness = crossEntropy(trainMatrix,newPosition);

             currentParticle.fitness = newFitness;

             if (newFitness < currentParticle.bestFitness) // new particle best?
             {
                    currentParticle.bestPosition = newPosition;
                    currentParticle.bestFitness = newFitness;
             }
             if (newFitness < bestGlobalFitness) // new global best?
              {
                   bestGlobalPosition = newPosition;
                   bestGlobalFitness = newFitness;
              }

          }


     }
     return bestGlobalPosition;

 };
 var crossEntropy = function(trainData,weights){
    setWeights(weights);
    var sce = 0;
    for(var i =0; i < trainData; i++){
    	var entry = trainData[i];
    	var currInputs =[];
    	currInputs[0] = entry[0];
    	currInputs[1] = entry[1]; 
    	currInputs[2] = entry[2]; 
    	currInputs[3] = entry[3];

    	var currExpected =[];
    	currExpected[0] = entry[4]; 
    	currExpected[1] = entry[5]; 
    	currExpected[2] = entry[6]; 

    	var currOutputs = computeOutputs(currInputs);
    	var currSum = 0;

    	for(var i = 0; i < currOutputs.length; i++){
    		if(Math.abs(currExpected[i]- 0)> EPSILON){
    			currSum +=currExpected[i] * Math.log(currOutputs[i]);
    		}
    	}
    	sce +=currSum;

    }
    return -sce;
 };
 var test = function(testMatrix){
 	 var numCorrect = 0;
      var numWrong = 0;

       for (var i = 0; i < testMatrix.length; ++i) // walk thru each test case. looks like (6.9 3.2 5.7 2.3) (0 0 1)  where the parens are not really there
       {
       		 var currInputs = []; 
       		 currInputs[0] = testMatrix[i][0]; 
       		 currInputs[1] = testMatrix[i][1]; 
       		 currInputs[2] = testMatrix[i][2]; 
       		 currInputs[3] = testMatrix[i][3];
             
             var currOutputs = []; 
             currOutputs[0] = testMatrix[i][4]; 
             currOutputs[1] = testMatrix[i][5]; 
             currOutputs[2] = testMatrix[i][6]; // not really necessary
             var currPredicted = computeOutputs(currInputs); 

           var indexOfLargest = indexOfLargest(currPredicted); 

           /*if(i<=3){
              
           }*/
           if (Math.abs(currOutputs[indexOfLargest] - 1) < EPSILON){
                 ++numCorrect;
            }
            else{
                ++numWrong;
            }


       }
       var percentCorrect = (numCorrect * 1.0) / (numCorrect + numWrong);

       return percentCorrect;

 };
 var indexOfLargest = function(vector){
 	 int indexOfLargest = 0;
     var maxVal = vector[0];
     for (var i = 0; i < vector.length; ++i)
     {
          if (vector[i] > maxVal)
          {
               maxVal = vector[i];
               indexOfLargest = i;
          }
      }
      return indexOfLargest;
 }
return{
	init:init,
	setWeights:setWeights,
	computeOptions:computeoptions,
	train:train,
	test:test
}
}
module.exports = neuralNetwork;