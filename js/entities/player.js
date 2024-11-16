import * as me from "../melon.js";
import Consts from "../consts.js"
import Prop from "./prop.js"

// Il personaggio del giocatore
//
export default class Player extends Prop {
    constructor(x, y, settings) {
        if(me.game.world.spawnPoint) {
            x = me.game.world.spawnPoint.x;
            y = me.game.world.spawnPoint.y;
        }

        super(x, y, settings);

        // Crea l"oggetto fisico per le collisioni
        this.body = new me.Body(this, me.getPool("ellipse").get(0, 0, 12, 8));

        // Il giocatore collide con tutti gli oggetti fisici
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ALL_OBJECT & ~me.collision.types.PLAYER_OBJECT);

        // Proprietà fisiche della camminata (x, y)
        this.body.setMaxVelocity(1.5, 1.5);
        this.body.setFriction(0.4, 0.4);

        // La viewport segue questo oggetto
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // Definizione dei tasti
        // https://melonjs.github.io/melonJS/functions/input.bindKey.html
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // Animazioni
        // https://melonjs.github.io/melonJS/classes/Sprite.html#addAnimation
        this.addAnimation("idle", [ 0, 1 ], 800);
        this.addAnimation("walk", [ 0, 1 ], 180);
        this.setCurrentAnimation("idle");
    }

    update(dt) {
        if(this.animationpause)
            return;

        // Gestione degli input da tastiera
        if(me.input.isKeyPressed("left")){
            this.body.force.x = -1.0;
        }
        if(me.input.isKeyPressed("right")) {
           this.body.force.x = 1.0;
        }
        if(me.input.isKeyPressed("up")) {
           this.body.force.y = -1.0;
        }
        if(me.input.isKeyPressed("down")) {
           this.body.force.y = 1.0;
        }

        // Gestione delle animazioni
        if(this.body.force.x != 0 || this.body.force.y != 0) {
            if(!this.isCurrentAnimation("walk")) {
                this.setCurrentAnimation("walk");
            }
        }
        else if(!this.isCurrentAnimation("idle")) {
            this.setCurrentAnimation("idle");
        }

        return super.update(dt);
    }

    onCollision(response) {
        // Gestione delle collisioni
        // https://melonjs.github.io/melonJS/classes/Sprite.html#onCollision

        return true;
    }
};
