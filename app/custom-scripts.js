define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/

	// The application is ready
	topic.subscribe("tpl-ready", function(){
	/*
	 * Custom Javascript to be executed when the application is ready goes here
	 */
	});

	var WEBMAP_ID = "bc258d3ccf7e483795395b44b1784ef0",
		LAYER_ID = "Projects_in_the_Kaituna_Catchment_6005";

	var clickHandlerIsSetup = false;

	topic.subscribe("story-loaded-map", function(result){
		if ( result.id == WEBMAP_ID && ! clickHandlerIsSetup ) {
			var map = app.maps[result.id].response.map,
				layer = map.getLayer(LAYER_ID);

			if ( layer ) {
				
				// On mouseover, change cursor to pointer; show tooltip
				layer.on("mouse-over", function(e){
					map.setMapCursor("pointer");
					map.infoWindow.setTitle("<div style='font-weight:bold;font-size:14px'>"+e.graphic.attributes.name+"</div>"
						);
					map.infoWindow.setContent(
						"<div style='font-weight:bold;font-size:14px'>"+e.graphic.attributes.name+"</div>"
						);
					map.infoWindow.show(e.graphic.geometry);
					map.infoWindow.resize(300,200);
				});
        
        //On mouseout, revert to default cursor and hide tooltip
				layer.on("mouse-out", function(e){
					map.setMapCursor("default");
					map.infoWindow.hide();
				});
				
        
        //On click, scroll to corresponding MJ section
				layer.on("click", function(e){
					var index = e.graphic.attributes["StoryIndex"];
					topic.publish("story-navigate-section", index);
				});
			}
		}
	});
});