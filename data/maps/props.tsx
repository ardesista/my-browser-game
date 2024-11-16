<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.0" name="props" tilewidth="208" tileheight="208" tilecount="4" columns="0" objectalignment="topleft">
 <editorsettings>
  <export target="props.json" format="json"/>
 </editorsettings>
 <grid orientation="orthogonal" width="1" height="1"/>
 <tile id="0">
  <properties>
   <property name="anchorPoint" value="json:{&quot;x&quot;:0.5,&quot;y&quot;:0.76}"/>
  </properties>
  <image source="house.png" width="208" height="208"/>
  <objectgroup draworder="index" id="2">
   <object id="6" x="120.003" y="139" width="17.9972" height="36"/>
   <object id="11" x="138" y="139" width="61" height="25"/>
   <object id="13" x="22" y="139" width="64" height="48"/>
   <object id="14" x="108" y="139" width="12" height="48"/>
   <object id="15" x="86" y="139" width="22" height="40.6281"/>
  </objectgroup>
 </tile>
 <tile id="1">
  <properties>
   <property name="anchorPoint" value="json:{&quot;x&quot;:0.5,&quot;y&quot;:0.9}"/>
  </properties>
  <image source="tree.png" width="28" height="29"/>
  <objectgroup draworder="index" id="2">
   <object id="1" x="12" y="26" width="6" height="2"/>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="anchorPoint" value="json:{&quot;x&quot;:0.5,&quot;y&quot;:0.7}"/>
   <property name="area" value="json:{&quot;x&quot;:-11,&quot;y&quot;:-4,&quot;w&quot;:22,&quot;h&quot;:2}"/>
  </properties>
  <image source="door.png" width="38" height="71"/>
 </tile>
 <tile id="3">
  <properties>
   <property name="anchorPoint" value="json:{&quot;x&quot;:0.5,&quot;y&quot;:0}"/>
   <property name="area" value="json:{&quot;x&quot;:-16,&quot;y&quot;:18,&quot;w&quot;:32,&quot;h&quot;:2}"/>
  </properties>
  <image source="door2.png" width="32" height="24"/>
 </tile>
</tileset>
