/*
 * Creates a replay suitable for saving from a battle
 * 
 */
function Replay(battle) {
	
	function ReplayPlayer(name, battlePlayer) {
		this.name = name;
		this.pokemon = [];
		for(var i =0;i<battlePlayer.pokemon.length;i++) {
			this.pokemon[i] = battlePlayer.pokemon[i].speciesid;
		}
		
	}
	
	// get the player info
	this.player1 = null;
	this.player2 = null;
	for(var i=0;i<battle.activityQueue.length;i++ ) {
		message = battle.activityQueue[i].split('|');
		if(message.length > 0 && message[1] == 'player') {
			if(message[2] == 'p1' && !this.player1) this.player1 = new ReplayPlayer(message[3], battle.p1);
			else if(message[2] == 'p2' && !this.player2) this.player2 = new ReplayPlayer(message[3], battle.p2);
		}
	}
	
	this.activityQueue = battle.activityQueue;
	this.tier = battle.tier;
	this.gameType = battle.gameType;
}