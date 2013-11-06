(function($) {

	var FriendsRoom = this.FriendsRoom = Room.extend({
		minWidth: 500,
		maxWidth: 1024,
		type: 'friends',
		title: 'Friends',
		isSideRoom: true,
		events: {
			'click .ilink': 'clickLink',
			'click .removeFriendButton': 'removeFriend'
		},
		initialize: function() {
			this.$el.addClass('ps-room-light').addClass('scrollable');
			
			this.update();
		},
		clickLink: function(e) {
			if (e.cmdKey || e.metaKey || e.ctrlKey) return;
			e.preventDefault();
			e.stopPropagation();
			var friend = $(e.currentTarget).attr('href');
			
			app.rooms[''].requestNotifications();
			this.close();
			app.focusRoom('');
			app.rooms[''].focusPM(' ' + friend);
			
		},
		updateUser: function() {
			this.update();
		},
		focus: function() {
			this.update();
		},
		
		removeFriend: function(e) {
			if (e.cmdKey || e.metaKey || e.ctrlKey) return;
			e.preventDefault();
			e.stopPropagation();
			var friend = $(e.currentTarget).attr('data-friend');
			Storage.friends.remove(friend);
			this.update();
		},
		
		update: function() {
			var buf = '<div class="pad"><button style="float:right" name="close">Close</button>';
			
			buf += '<div class="roomlist" style="max-width:480px">';
			var friends = Storage.friends.getList();
			buf += '<h2>Friends</h2>';
			for (var i=0; i<friends.length; i++) {
				var friend = friends[i];
				buf += '<div style="min-width:300px;"><a href="'+friend+'" class="ilink">' + '&nbsp;' +friend + '&nbsp;&nbsp;&nbsp;&nbsp;<button style="float:right;" class="closebutton removeFriendButton" data-friend="'+friend+'"tabindex="-1"><i class="icon-remove-sign"></i></button></a></div>';
			}

			buf += '</div></div>';
			this.$el.html(buf);
		},
	});

}).call(this, jQuery);