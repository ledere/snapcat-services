
// JSON Schemas


exports.cat = {
	"title": "cat",
	"type" : "object",
	"properties": {
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "level": {
            "type": "number",
            "minimum": 1
        }
    },
	"required": ["name", "level"]
}