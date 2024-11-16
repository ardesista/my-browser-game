import * as me from "../melon.js";

// Schermata di caricamento iniziale
// 
export default class LoadingScreen extends me.Stage {
    onResetEvent() {
        // Setta il background e carica l"immagine logo
        me.game.world.backgroundColor.parseCSS("#202020");
        me.loader.load({ name: "logo", type: "image", src: "../../data/logo.png" }, this.onLogoLoaded);
    }

    onLogoLoaded() {
        // Aggiungi il logo al centro della scena
        me.game.world.addChild(
            new me.Sprite(me.game.renderer.width / 2, me.game.renderer.height / 2, {
                image: "logo"
            })
        );
    }

    onDestroyEvent() {
        // Rimuovi il logo
        me.loader.unload({ name: "logo", type: "image" });
    }
};
