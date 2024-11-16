import * as me from "../melon.js";

// Schermata principale di gioco
//
export default class MapScreen extends me.Stage {
    constructor(map_id) {
        super();
        this.map_id = map_id;
    }

    onResetEvent(spawnPoint) {
        // Dove deve comparire il giocatore
        me.game.world.spawnPoint = spawnPoint;

        // Carica la mappa       
        const level = new me.TMXTileMap(this.map_id, me.loader.getTMX(this.map_id));
        level.addTo(me.game.world, false, true);

        // this._fadeOut.tween = tweenPool.get(this._fadeOut.color).to({ alpha: 0 }, { duration }).onComplete(onComplete || null);
        // this._fadeOut.tween.isPersistent = true;
        // this._fadeOut.tween.start();
    
        if(level.music && me.audio.getCurrentTrack() != level.music) {
            me.audio.stopTrack();
            me.audio.playTrack(level.music, 0.5);
        }
    }
};
