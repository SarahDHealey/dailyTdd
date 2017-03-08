
'use strict';
function getBlocks(directions) {
	directions = directions.split(", ");
	let facing = "north";
	const compass = {};
	compass.north = 0;
	compass.east = 0;
	compass.south = 0;
	compass.west = 0;

	while (directions.length >=1) {
		var right = directions[0].match(/([R])\w+/g)
		var left = directions[0].match(/([L])\w+/g)

		if (facing === "south" && right || facing === "north" && left ) {
			addWest(directions)
		}
		else if (facing === "south" && left || facing === "north" && right) {
			addEast(directions)
		}
		else if (facing === "east" && left || facing === "west" && right) {
			addNorth(directions)
		}
		else if (facing === "east" && right || facing === "west" && left) {
			addSouth(directions)
		}
	};
	var x = (Math.abs(compass.east - compass.west));
	var y = (Math.abs(compass.north - compass.south));
	var total = x + y
	return total;

		
	function addWest(directions) {
		compass.west += Number(directions[0].slice(1));
		directions.shift();
		facing = "west";
	}
	function addEast(directions) {
		compass.east += Number(directions[0].slice(1));
		directions.shift();
		facing = "east";
	}
	function addNorth(directions) {
		compass.north += Number(directions[0].slice(1));
		directions.shift();
		facing = "north";
	}
	function addSouth(directions) {
		compass.south += Number(directions[0].slice(1));
		directions.shift();
		facing = "south";
	}
}

module.exports = {
	getBlocks: getBlocks
};

