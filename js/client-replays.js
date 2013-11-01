(function($) {

	var ReplaysRoom = this.ReplaysRoom = Room.extend({
		minWidth: 320,
		maxWidth: 1024,
		type: 'replays',
		title: 'Replays',
		isSideRoom: true,
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
			myRoom.battle.reset();
			myRoom.battle.play();
			
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
			var replays = Storage.replays;
			buf += '<h2>Replays</h2>';
			for (var i=0; i<replays.length; i++) {
				var replay = replays[i];
				teamHtml = '';
				for(var j=0;j<6;j++) {
					teamHtml += '<span class="pokemonicon" style="float:left;'+Tools.getIcon(replay.player1.pokemon[j])+'"></span>';
				}
				teamHtml += '<span><small>vs.</small></span>';
				for(var j=0;j<6;j++) {
					teamHtml += '<span class="pokemonicon" style="float:left;'+Tools.getIcon(replay.player2.pokemon[j])+'"></span>';
				}
				
				buf += '<div><a href="'+i+'" class="ilink"><small style="float:right">Replay</small><strong><i class="icon-comment-alt"></i> ' + replay.id + '<br /></strong>'+teamHtml+'</a></div>';
			}


			buf += '</div></div>';
			this.$el.html(buf);
		},
		replaysLoaded:function() {
			this.replays = Storage.replays;
			
		},
	});

}).call(this, jQuery);