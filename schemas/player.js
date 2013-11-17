
// JSON Schemas

exports.player = {
	"title": "player",
	"type" : "object",
	"properties": {
        "name": {
            "type": "string"
        },
		"numberOfCats" : {
			"type" : "number"
		},
		"cats" : {
			"type" : "array",
			"uniqueItems" : true
		}
    },
	"required" : ["name", "numberOfCats"];
}