
/*
 * methods for cat resource
 */

var helpers = require('../helpers');

exports.getCats = function(db) {
	return function(req, res) {
		
		var model = { cats:[], messages:[] },
			collection = db.get('cats');
		
		collection.find({},{},function(e, result){
			if(typeof result === "object" && result.length > 0) {
				model.cats = result;
	        	res.json(model);
			} else {
				// no cats found
				model = helpers.addMessage(model, "no cats found");
		        res.json(model);	
			}
	    });
	};
}

exports.getCat = function(db) {
	return function(req, res) {
		
		var id = req.params.id,
			model = { cat:{}, messages:[] },
			collection = db.get('cats');
			
			
		collection.find({ _id: id },{},function(e, result){	
		console.log("result", result);
		console.log("result.length", result.length);
		console.log("typeof result", typeof result);
        	if(result.length > 0) {
				model.cat = result[0];
	        	res.json(model);
			} else {
				// no cats found
				model = helpers.addMessage(model, "cat not found");
		        res.status(404).json(model);	
			}
	    });
	};
}

exports.createCat = function(db) {
	return function(req, res) {
		
		console.log("body", req.body);
		
		var cat = req.body,
			model = { cat:{}, messages:[] },
			collection = db.get('cats');
		
		collection.insert(cat,{},function(e, result){
        	if(result) {
				model.cat = result;
	        	res.json(model);
			} 
			if (e) {
				model = helpers.addMessage(model, e);
				res.status(500).json(model);
			}
	    });
	};	
}