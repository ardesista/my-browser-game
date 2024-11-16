import * as me from "../melon.js";

// Un oggetto di scena preso da un tileset
//
export default class Prop extends me.Sprite {
    constructor(x, y, settings) {
        const tile = settings.tile;
        const tileset = tile.tileset;
    
        if(settings.anchorPoint && settings.width && settings.height) {
            const adj = me.getPool("vector2d").get((settings.anchorPoint.x - 0.5) * settings.width, (settings.anchorPoint.y - 0.5) * settings.height).rotate(settings.rotation || 0);
            x += adj.x;
            y += adj.y;
        }
    
        if(tileset.isCollection) {
            settings.image = tile.tileset.getTileImage(tile.tileId);
        }
        else {
            settings.image = tileset.texture.getTexture("default");
            settings.region = tile.tileId - tileset.firstgid;
            settings.framewidth = tile.width;
            settings.frameheight = tile.height;
        }
    
        super(x, y, settings);
    }
};
