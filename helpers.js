
/**
 * Helper functions
 */

// Add message to output

exports.addMessage = function(object, message) {
	if(!object) { return new Error("no object specified");  }
	if(!message) { return new Error("no message specified");  }
	if(!object.messages) { object.messages = []; }
	object.messages.push({"message" : message});
	return object;
}