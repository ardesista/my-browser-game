import * as me from "../melon.js";
import Consts from "../consts.js"
import Prop from "./prop.js"

// Porta
//
export default class Door extends Prop {
    constructor(x, y, settings) {
        super(x, y, settings);

        // Destinazione di questa porta
        this.dest = settings.dest;
        this.destPos = settings.destPos;

        // Crea l"oggetto fisico per le collisioni
        const area = settings.area;
        this.body = new me.Body(this, me.getPool("rectangle").get(area.x, area.y, area.w, area.h));
        this.body.setStatic(true);

        // La porta può rilevare il giocatore
        this.body.collisionType = Consts.collision.DOOR;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }

    onCollision(response) {
        const player = (response.a == this ? response.b : response.a);
        player.pause();
        this.body.setCollisionMask(0);
        me.state.change(Consts.state[this.dest], false, this.destPos);
        return false;
    }
};
