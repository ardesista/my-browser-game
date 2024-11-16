import * as me from "./melon.js";

export default class TiledMelonPlugin extends me.plugin.BasePlugin {
  constructor() {
    super();

    // Minimum MelonJS version expected to run this plugin
    this.version = "15.2.1";

    me.TMXOrthogonalRenderer.prototype.adjustPosition = function(obj) {};
    me.TMXTileMap.prototype.getObjects = function(flatten) {
      const objects = [];
      let isCollisionGroup = false;
      let targetContainer;

      // Parse the map for objects
      this.readMapObjects(this.data);

      for(let g = 0; g < this.objectGroups.length; g++) {
        const group = this.objectGroups[g];

        // Check if this is the collision shape group
        isCollisionGroup = group.name.toLowerCase().includes(me.COLLISION_GROUP);

        if(flatten === false) {
          // create a new container
          targetContainer = new me.Container(0, 0, this.width, this.height);

          // tiled uses 0,0 by default
          targetContainer.anchorPoint.set(0, 0);

          // set additional properties
          targetContainer.name = group.name;
          targetContainer.pos.z = group.z;
          targetContainer.setOpacity(group.opacity);
          targetContainer.sortOn = group.sortOn || "z";
          if(targetContainer.sortOn == "y")
            me.event.eventEmitter.addListener(me.event.TICK, targetContainer.sort.bind(targetContainer));
    
          // disable auto-sort and auto-depth
          targetContainer.autoSort = false;
          targetContainer.autoDepth = false;
        }

        // iterate through the group and add all object into their
        // corresponding target Container
        for(let o = 0; o < group.objects.length; o++) {
          // TMX object settings
          const settings = group.objects[o];

          // reference to the instantiated object
          let obj;
          // a reference to the default shape
          let shape;

          // Tiled uses 0,0 by default
          if(typeof settings.anchorPoint === "undefined") {
            settings.anchorPoint = { x: 0.5, y: 0.5 };
          }
          // convert to melonJS renderable argument name
          if(typeof settings.tintcolor !== "undefined") {
            settings.tint = colorPool.get();
            settings.tint.parseHex(settings.tintcolor, true);
          }

          // groups can contains either text, objects or layers
          if(settings instanceof me.TMXLayer) {
            // layers are already instantiated & initialized
            obj = settings;
            // z value set already
          }
          else if(typeof settings.text === "object") {
            // Tiled uses 0,0 by default
            if(typeof settings.text.anchorPoint === "undefined") {
              settings.text.anchorPoint = settings.anchorPoint;
            }
            if(settings.text.bitmap === true) {
              obj = me.pool.pull(
                "BitmapText",
                settings.x,
                settings.y,
                settings.text,
              );
            }
            else {
              obj = me.pool.pull("Text", settings.x, settings.y, settings.text);
            }
            // set the obj z order
            obj.pos.z = settings.z;
          }
          else {
            // pull the corresponding object from the object pool
            let _class = undefined;
            if (typeof settings.type !== "undefined" && settings.type !== "")
              _class = settings.type;
            else if(typeof settings.name !== "undefined" && settings.name !== "")
              _class = settings.name;
            
            if(_class !== undefined) {
              obj = me.pool.pull(_class, settings.x, settings.y, settings);
            }
            else {
              // unnamed shape object
              obj = me.pool.pull(
                "Renderable",
                settings.x,
                settings.y,
                settings.width,
                settings.height,
              );
              // create a default shape if none is specified
              shape = settings.shapes;
              if(typeof shape === "undefined") {
                shape = polygonPool.get(0, 0, [
                  vector2dPool.get(0, 0),
                  vector2dPool.get(this.width, 0),
                  vector2dPool.get(this.width, this.height),
                ]);
              }
              obj.anchorPoint.setMuted(0, 0);
              if(settings.rotation) {
                console.log(settings.rotation);
                obj.rotation = settings.rotation;
              }
              obj.name = settings.name;
              obj.type = settings.type;
              // for backward compatibility
              obj.class = settings.class || settings.type;
              obj.id = settings.id;
              obj.body = new me.Body(obj, shape);
              obj.body.setStatic(true);
              obj.resize(obj.body.getBounds().width, obj.body.getBounds().height);
            }
            // set the obj z order
            obj.pos.z = settings.z;
          }

          if(isCollisionGroup && !settings.name && obj.body) {
            // configure the body accordingly
            obj.body.collisionType = me.collision.types.WORLD_SHAPE;
            obj.body.setCollisionMask(me.collision.types.ALL_OBJECT & ~me.collision.types.WORLD_SHAPE);
            obj.body.setStatic(true);
          }

          //apply group opacity value to the child objects if group are merged
          if(flatten !== false) {
            if(obj.isRenderable === true) {
              obj.setOpacity(obj.getOpacity() * group.opacity);
              // and to child renderables if any
              if(typeof obj.renderable !== "undefined" && obj.renderable.isRenderable === true) {
                obj.renderable.setOpacity(obj.renderable.getOpacity() * group.opacity);
              }
            }
            // directly add the obj into the objects array
            objects.push(obj);
          }
          else {
            // add it to the new container
            targetContainer.addChild(obj);
          }
        }

        // if we created a new container
        if(flatten === false && targetContainer.children.length > 0) {
          // re-enable auto-sort and auto-depth
          targetContainer.autoSort = true;
          targetContainer.autoDepth = true;

          // add our container to the world
          objects.push(targetContainer);
        }
      }
      return objects;
    }
  }
};
