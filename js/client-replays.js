(function($) {

	var ReplaysRoom = this.ReplaysRoom = Room.extend({
		minWidth: 500,
		maxWidth: 1024,
		type: 'replays',
		title: 'Replays',
		isSideRoom: false,
		replays: [],
		events: {
			'click .ilink': 'clickLink'
		},
		initialize: function() {
			this.$el.addClass('ps-room-light').addClass('scrollable');
			app.on('init:loadreplays', this.replaysLoaded);
			Storage.loadReplays();
			
			this.update();
		},
		clickLink: function(e) {
			if (e.cmdKey || e.metaKey || e.ctrlKey) return;
			e.preventDefault();
			e.stopPropagation();
			var repId = $(e.currentTarget).attr('href');
			
			app.addRoom('Replay ' + repId, 'replay');
			var myRoom = app.rooms['Replay ' + repId];
			myRoom.setReplay(Storage.replays[repId]);
			app.focusRoom('Replay ' + repId, 'replay');
			myRoom.battle.reset();
			myRoom.battle.play();
			
		},
		updateUser: function() {
			this.update();
		},
		focus: function() {
			this.update();
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
			var replays = Storage.replays;
			buf += '<h2>Replays</h2>';
			for (var i=0; i<replays.length; i++) {
				var replay = replays[i];
				teamHtml = '';
				teamHtml += '<div style="float:left;">';
				teamHtml += '<small style="float:left">'+replay.player1.name+'</small>';
				teamHtml += '<div><br />';
				for(var j=0;j<6;j++) {
					teamHtml += '<span class="pokemonicon" style="float:left;'+Tools.getIcon(replay.player1.pokemon[j])+'"></span>';
				}
				teamHtml += '</div>';
				teamHtml += '</div>';
				teamHtml += '<div style="float:left;"><br /><small>vs.</small></div>';
				teamHtml += '<div style="float:left;">';
				teamHtml += '<small style="float:right">'+replay.player2.name+'</small>';
				teamHtml += '<div><br />';
				for(var j=0;j<6;j++) {
					teamHtml += '<span class="pokemonicon" style="float:left;'+Tools.getIcon(replay.player2.pokemon[j])+'"></span>';
				}
				teamHtml += '</div>';
				teamHtml += '</div>';
				
				buf += '<div style="min-width:300px;"><a href="'+i+'" class="ilink replayLink">' + '&nbsp;' + ''+teamHtml+'</a></div>';
			}


			buf += '</div></div>';
			this.$el.html(buf);
		},
		replaysLoaded:function() {
			this.replays = Storage.replays;
			
		},
	});

}).call(this, jQuery);