
/*
 * methods for cat resource
 */

var helpers = require("../helpers");
 	tv4 = require("tv4"),
	schemas = require("../schemas/cat.js");

exports.getCats = function(db) {
	return function(req, res) {
		
		var model = {},
			collection = db.get('cats');
		
		collection.find({},function(e, result){
			if(typeof result === "object" && result.length > 0) {
				model.cats = result;
	        	res.status(200).json(model);
			} else {
				// no cats found
				model = helpers.addMessage(model, "no cats found");
		        res.status(404).json(model);	
			}
	    });
	};
};

exports.getCat = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			model = {},
			collection = db.get('cats');
			
		collection.find({ _id: id },function(e, result){	
        	if(result.length > 0) {
				model.cat = result[0];
	        	res.status(200).json(model);
			} else {
				// no cats found
				model = helpers.addMessage(model, "cat not found");
		        res.status(404).json(model);	
			}
	    });
	};
};

exports.createCat = function(db) {
	return function(req, res) {
		
		var cat = req.body,
			model = {},
			collection = db.get('cats'),
			schema = schemas.cat;
		
		if(tv4.validate(cat, schema)) {
			collection.insert(cat,function(e, result){
	        	if(result) {
					model.cat = result;
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

exports.updateCat = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			cat = req.body,
			model = {},
			collection = db.get('cats'),
			schema = schemas.cat;
		
		if(tv4.validate(cat, schema)) {
			collection.updateById(id, cat,function(e, result){
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

exports.deleteCat = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			model = {},
			collection = db.get('cats');
			
		collection.remove({ _id: id },function(e, result){
        	if(result > 0) {
				res.status(200).json(model);
			} else {
				// no cats found
				model = helpers.addMessage(model, "cat not found");
		        res.status(404).json(model);	
			}
	    });
	};
};



