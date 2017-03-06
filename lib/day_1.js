
function getBlocks(directions) {
	directions = directions.split(", ");
	var facing = "north"
		var north = 0;
		var east = 0;
		var south = 0;
		var west = 0;

	for (var i=0; i<directions.length; i++) {
		if (facing === "north" && directions[i] == directions[i].match(/([R])\w+/g)) {
			east += directions[0].slice(1);
			directions.shift();
			facing = "east";
		}
		if (facing === "east" && directions[i] == directions[i].match(/([L])\w+/g)) {
			north += directions[0].slice(1);
			directions.shift();
			facing = "north";
		}
	}
	return Number(east) + Number(north);
}


module.exports = {
	getBlocks: getBlocks
};