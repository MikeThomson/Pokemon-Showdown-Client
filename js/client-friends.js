(function($) {

	var FriendsRoom = this.FriendsRoom = Room.extend({
		minWidth: 500,
		maxWidth: 1024,
		type: 'friends',
		title: 'Friends',
		isSideRoom: true,
		events: {
			'click .ilink': 'clickLink'
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
		
		update: function() {
			var buf = '<div class="pad"><button style="float:right" name="close">Close</button>';
			
			buf += '<div class="roomlist" style="max-width:480px">';
			var friends = Storage.friends.getList();
			buf += '<h2>Friends</h2>';
			for (var i=0; i<friends.length; i++) {
				var friend = friends[i];
				buf += '<div style="min-width:300px;"><a href="'+friend+'" class="ilink">' + '&nbsp;' +friend + '</a></div>';
			}


			buf += '</div></div>';
			this.$el.html(buf);
		},
	});

}).call(this, jQuery);