var Node = require('./node.js');

var astar= function () {
	
	var getPath = function(start, destination, board, columns, rows, allowDiagonals){
	
  		var start = new Node(start[0], start[1], -1, -1, -1, -1);
  		var destination = new Node(destination[0], destination[1], -1, -1, -1, -1);

		var open = []; 
		var closed = []; 

		var g = 0; 
		var h = heuristic(start, destination); 
		var f = g+h; 

		open.push(start); 

		while (open.length > 0)
		{
			//Find the best open node (lowest f value)
			var bestCost = open[0].f;
			var bestNode = 0;

			for (var i = 1; i < open.length; i++)
			{
				if (open[i].f < bestCost)
				{
					bestCost = open[i].f;
					bestNode = i;
				}
			}
			var currentNode = open[bestNode];

			//Check if we've reached the destination
			if (currentNode.x == destination.x && currentNode.y == destination.y)
			{
				var path = [destination]; 

			   //recreate the path 
				while (currentNode.parentIndex != -1)
				{
					currentNode = closed[currentNode.parentIndex];
					path.unshift(currentNode);
				}

				return path;
			}
			open.splice(bestNode, 1);

			closed.push(currentNode);

		//Expand the current node
		for (var newNodeX = Math.max(0, currentNode.x-1); newNodeX <= Math.min(columns-1, currentNode.x+1); newNodeX++){
			for (var newNodeY = Math.max(0, currentNode.y-1); newNodeY <= Math.min(rows-1, currentNode.y+1); newNodeY++)
			{
				if (!allowDiagonals)
				{
					if (newNodeX != currentNode.x && newNodeY != currentNode.y)
					{
						continue;
					}
				}

				if (board[newNodeX][newNodeY] == 0 
					|| (destination.x == newNodeX && destination.y == newNodeY)) 
				{

					var foundInClosed = false;
					for (var i in closed){
						if (closed[i].x == newNodeX && closed[i].y == newNodeY)
						{
							foundInClosed = true;
							break;
						}
					}

					if (foundInClosed)
					{	
						continue;
					}
					var foundInClosed = false;
					for (var i in open){
						if (open[i].x == newNodeX && open[i].y == newNodeY)
						{
							foundInClosed = true;
							break;
						}
					}

					if (!foundInClosed)
					{
						var newNode = new Node(newNodeX, newNodeY, closed.length-1, -1, -1, -1);

						newNode.g = currentNode.g + Math.floor(Math.sqrt(Math.pow(newNode.x-currentNode.x, 2)+Math.pow(newNode.y-currentNode.y, 2)));
						newNode.h = heuristic(newNode, destination);
						newNode.f = newNode.g+newNode.h;

						open.push(newNode);
					}
				}
			}
		}
	}

	return [];
};
var heuristic = function(currentNode, destination)
{
	var x = currentNode.x-destination.x;
	var y = currentNode.y-destination.y;
	return x*x+y*y;
};

	return{
		getPath:getPath
	}
}
module.exports = astar;