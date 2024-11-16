import * as me from "./melon.js";

export default {
    resources: [ // Array delle risorse utilizzate
        { name: "player",            type: "tsx",    src: "data/player.json" },
        { name: "player",            type: "image",  src: "data/player.png" },
        { name: "overworld",         type: "tmx",    src: "data/maps/overworld.json" },
        { name: "house1",            type: "tmx",    src: "data/maps/house1.json" },
        { name: "tileset-1",         type: "tsx",    src: "data/maps/tileset-1.json" },
        { name: "tileset-1",         type: "image",  src: "data/maps/tileset-1.png" },
        { name: "tileset-2",         type: "tsx",    src: "data/maps/tileset-2.json" },
        { name: "tileset-2",         type: "image",  src: "data/maps/tileset-2.png" },
        { name: "props",             type: "tsx",    src: "data/maps/props.json" },
        { name: "house",             type: "image",  src: "data/maps/house.png" },
        { name: "tree",              type: "image",  src: "data/maps/tree.png" },
        { name: "door",              type: "image",  src: "data/maps/door.png" },
        { name: "door2",             type: "image",  src: "data/maps/door2.png" },
        { name: "play_button",       type: "image",  src: "data/play_button.png" },
        { name: "enchanted_canopy",  type: "audio",  src: "data/music/" },
        { name: "forgotten_halls",   type: "audio",  src: "data/music/" }
    ],
    collision: { // Collisioni
        DOOR: me.collision.types.USER << 0
    },
    state: {
        OVERWORLD: me.state.USER + 0,
        HOUSE1: me.state.USER + 1
    }
};
