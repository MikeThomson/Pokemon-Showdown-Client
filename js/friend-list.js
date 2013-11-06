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
}