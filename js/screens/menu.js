import * as me from "../melon.js";
import Consts from "../consts.js";

// Menu iniziale
//
export default class MenuScreen extends me.Stage {
    onResetEvent() {
        // Aggiungi il bottone al centro della scena
        me.game.world.addChild(
            new MenuButton(me.game.renderer.width / 2, me.game.renderer.height / 2, "play_button", new me.Color(127, 255, 127), this.onClickPlay)
        );
    }

    onClickPlay() {
        me.state.change(Consts.state.OVERWORLD);
    }
};

class MenuButton extends me.UISpriteElement {
    constructor(x, y, image, hoverTint, clickCallback) {
        super(x, y, { image: image });
        this.hoverTint = hoverTint;
        this.clickCallback = clickCallback;
        this.floating = false;
    }

    onOver() {
        this.tint.copy(this.hoverTint);
    }

    onOut() {
        this.tint.setColor(255, 255, 255);
    }

    onClick(event) {
        this.clickCallback();
        return false; // ferma la propagazione
    }
};
