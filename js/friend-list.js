/* basically a stub right now, as more features come online it will grow
 */
 
function FriendList() {
	
	this.list = [];
	this.statuses = {};
	this.lastWhois = null;
	
	this.getList = function() {
		return this.list;
	};
	
	this.contains = function(name) {
		var i = this.list.length;
		while (i--) {
			if (this.list[i].toLowerCase() == name.toLowerCase()) {
				return true;
			}
		}
		return false;
	};
	
	this.add = function(name) {
		if(!this.contains(name))
			this.list.push(name);
		// probably change this to an event listener?
		Storage.saveFriends();
	};
	
	this.remove = function(name) {
		var index = this.list.indexOf(name);
		if (index > -1) 
			this.list.splice(index, 1);
		Storage.saveFriends();
	};
	
	this.getStatus = function(name) {
		if(name.toLowerCase() in this.statuses)
			return this.statuses[name.toLowerCase()];
		return 'unknown';
	};
	
	this.setStatus = function(name, status) {
		this.statuses[name.toLowerCase()] = status;
	};
	
	this.processStatusMessage = function(message) {
		if(message.substring(0,6) == 'User: ') {
			// user is online, rest of the message is the name
			friend = message.substring(6);
			if(this.contains(friend)) {
				this.setStatus(friend, 'online');
				this.lastWhois = friend;
				return true;
			}
		} else if(message.substr(0,5) == 'User ') {
			// User xxx yyy not found.
			if(message.substr(-11) == ' not found.') {
				friend = message.substr(5,message.length-16);
				if(this.contains(friend)) {
					this.setStatus(friend, 'offline');
				}
				return true;
				
			}
		} else if(message.substring(0,15) == '|raw|In rooms: ') {
			// a["|raw|In rooms: <a href=\"/pokemonxy\" room=\"pokemonxy\">pokemonxy</a> | <a href=\"/oldgens\" room=\"oldgens\">oldgens</a> | <a href=\"/othermetas\" room=\"othermetas\">othermetas</a> | <a href=\"/thestudio\" room=\"thestudio\">thestudio</a> | <a href=\"/wouldyourather\" room=\"wouldyourather\">wouldyourather</a> | <a href=\"/doubles\" room=\"doubles\">doubles</a> | <a href=\"/thehappyplace\" room=\"thehappyplace\">thehappyplace</a> | <a href=\"/lobby\" room=\"lobby\">lobby</a>"]
			var rooms = message.substring(5);
			if(this.lastWhois) {
				this.setStatus(this.lastWhois, rooms.replace(/<(?:.|\n)*?>/gm, ''));
				this.lastWhois = null;
			} 
		}
		return false;
	};
}