/* basically a stub right now, as more features come online it will grow
 */
 
function FriendList() {
	
	this.list = [];
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
}