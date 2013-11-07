/* basically a stub right now, as more features come online it will grow
 */
 
function FriendList() {
	
	this.list = [];
	this.statuses = {};
	
	this.getList = function() {
		return this.list;
	};
	
	this.contains = function(name) {
		var i = this.list.length;
		while (i--) {
			if (this.list[i] == name) {
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
		if(name in this.statuses)
			return this.statuses[name];
		return 'unknown';
	};
	
	this.setStatus = function(name, status) {
		this.statuses[name] = status;
	};
	
	this.processStatusMessage = function(message) {
		if(message.substring(0,6) == 'User: ') {
			// user is online, rest of the message is the name
			friend = message.substring(6);
			if(this.contains(friend)) {
				this.setStatus(friend, 'online');
				return true;
			}
		} else if(message.substr(0,5) == 'User ') {
			// User zerojin not found.
			if(message.substr(-11) == ' not found.') {
				friend = message.substr(5,message.length-16);
				this.setStatus(friend, 'offline');
				return true;
			}
		}
		return false;
	};
}