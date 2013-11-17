
/*
 * methods for player resource
 */

var helpers = require("../helpers");
 	tv4 = require("tv4"),
	schemas = require("../schemas/player.js");

exports.getPlayers = function(db) {
	return function(req, res) {
		
		var model = {},
			collection = db.get('players');
		
		collection.find({},function(e, result){
			if(typeof result === "object" && result.length > 0) {
				model.players = result;
	        	res.status(200).json(model);
			} else {
				// no players found
				model = helpers.addMessage(model, "no players found");
		        res.status(404).json(model);	
			}
	    });
	};
};

exports.getPlayer = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			model = {},
			collection = db.get('players');
			
		collection.find({ _id: id },function(e, result){	
        	if(result.length > 0) {
				model.player = result[0];
	        	res.status(200).json(model);
			} else {
				// no players found
				model = helpers.addMessage(model, "player not found");
		        res.status(404).json(model);	
			}
	    });
	};
};

exports.createPlayer = function(db) {
	return function(req, res) {
		
		var player = req.body,
			model = {},
			collection = db.get('players'),
			schema = schemas.player;
		
		if(tv4.validate(player, schema)) {
			collection.insert(player,function(e, result){
	        	if(result) {
					model.player = result;
		        	res.status(200).json(model);
				} 
				if (e) {
					model = helpers.addMessage(model, e);
					res.status(500).json(model);
				}
		    });
		} else {
			// no valid schema
			model = helpers.addMessage(model, "invalid input received");
			res.status(500).json(model);
		}
	};
};

exports.updatePlayer = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			player = req.body,
			model = {},
			collection = db.get('players'),
			schema = schemas.player;
		
		if(tv4.validate(player, schema)) {
			collection.updateById(id, player,function(e, result){
	        	if(result) {
					res.status(200).json(model);
				} 
				if (e) {
					model = helpers.addMessage(model, e);
					res.status(500).json(model);
				}
		    });
		} else {
			// no valid schema
			model = helpers.addMessage(model, "invalid input received");
			res.status(500).json(model);
		}
	};
};

exports.deletePlayer = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			model = {},
			collection = db.get('players');
			
		collection.remove({ _id: id },function(e, result){
        	if(result > 0) {
				res.status(200).json(model);
			} else {
				// no players found
				model = helpers.addMessage(model, "player not found");
		        res.status(404).json(model);	
			}
	    });
	};
};



