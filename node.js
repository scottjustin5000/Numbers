var Node = function(x, y, parentIndex, g, h, f)
{
	this.x = x;
	this.y = y;
	this.parentIndex = parentIndex;
	this.g = g;
	this.h = h;
	this.f = f;
}
module.exports = Node;