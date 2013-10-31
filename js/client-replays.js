(function($) {

	var ReplaysRoom = this.ReplaysRoom = Room.extend({
		minWidth: 320,
		maxWidth: 1024,
		type: 'replays',
		title: 'Replays',
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
			var roomid = $(e.currentTarget).attr('href').substr(app.root.length);
			app.tryJoinRoom(roomid);
		},
		updateUser: function() {
			this.update();
		},
		focus: function() {
			if (new Date().getTime() - this.lastUpdate > 60*1000) {
				this.lastUpdate = new Date().getTime();
			}
		},
		update: function(rooms) {
			if (rooms) {
				this.lastUpdate = new Date().getTime();
				app.roomsData = rooms;
			} else {
				rooms = app.roomsData;
			}
			var buf = '<div class="pad"><button style="float:right" name="close">Close</button>';
			
			buf += '<div class="roomlist" style="max-width:480px">';
			var replays = [];
			replays.push({id: 2});
			replays.push({id: 3});
			replays.push({id: 10});
			replays.push({id: 4});
			buf += '<h2>Replays</h2>';
			for (var i=0; i<replays.length; i++) {
				var replay = replays[i];
				
				teamHtml = '';
				
				for(var j=0;j<6;j++) {
					teamHtml += '<span class="pokemonicon" style="float:left;'+Tools.getIcon()+'"></span>';
				}
				teamHtml += '<span><small>vs.</small></span>';
				for(var j=0;j<6;j++) {
					teamHtml += '<span class="pokemonicon" style="float:left;'+Tools.getIcon()+'"></span>';
				}
				
				buf += '<div><a href="#" class="ilink"><small style="float:right">Replay</small><strong><i class="icon-comment-alt"></i> ' + replay.id + '<br /></strong>'+teamHtml+'</a></div>';
			}


			buf += '</div></div>';
			this.$el.html(buf);
		}
	});

}).call(this, jQuery);