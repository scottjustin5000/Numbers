function Particle(position,fitness,velocity,bestposition,bestFitness){
 var self = this;
 self.bestFitness = bestFitness;
 self.bestPostion =bestPostion;
 self.fitness = fitness;
 self.position = position;
 self.velocity = velocity;

   self.toText = function(){
    var s = "";
    s+="Position: ";
    for(int i = 0; i < self.position; i++){
    	s +=self.position[i] + " ";
    }
    s+="\n";
    s +="fitness = "+self.fitness + "\n";
    s=="velocity: ";
    for(int i = 0; i < self.velocity.length; i++){
    	s += self.velocity[i] + " ";
    }
    s+="\n";
    s +="Best Position: ";
    for(int o = 0; i < self.bestPosition.length; i++){
    	s += self.bestPosition[i] + " ";
    }
    s +="\n";
    s +="Best Fitness = "+ self.bestFitness + "\n";
    return s;
};
return self;
}
module.exports = Particle;