var paletteObject = {
	"colorId": "color-0",
	"color-0": "#FFFFFF",
	"color-1": "#006BA6",
	"color-2": "#0496FF",
	"color-3": "#FFBC42",
	"color-4": "#D81159",
	"color-5": "#8F2D56"
};

$('#gridOption1').on('click', function(){
	$('#css-layer').empty();
	$('#css-layer').css( "display", "grid" );
	$('#css-layer').css( "grid-template-columns", "1fr");
	$('#css-layer').css( "grid-template-rows", "1fr" );
	var test = `
		<div class='g color-1'></div>
	`;
	$( "#css-layer" ).append(test);
	
});
$('#gridOption2').on('click', function(){
	$('#css-layer').empty();
	$('#css-layer').css( "display", "grid" );
	$('#css-layer').css( "grid-template-columns", "1fr 1fr 1fr 1fr");
	$('#css-layer').css( "grid-template-rows", "1fr 1fr 1fr 1fr" );
	var test = `
		<div class='g color-3'></div>
		<div class='g color-1'></div>
		<div class='g color-2'></div>
		<div class='g color-5'></div>
		<div class='g color-1'></div>
		<div class='g color-2'></div>
		<div class='g color-5'></div>
		<div class='g color-1'></div>
		<div class='g color-3'></div>
		<div class='g color-1'></div>
		<div class='g color-4'></div>
		<div class='g color-1'></div>
		<div class='g color-1'></div>
		<div class='g color-3'></div>
		<div class='g color-5'></div>
		<div class='g color-4'></div>
		`;
	$( "#css-layer" ).append(test);	
});
$('#gridOption3').on('click', function(){
	$('#css-layer').empty();
	$('#css-layer').css( "display", "grid" );
	$('#css-layer').css( "grid-template-columns", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr");
	$('#css-layer').css( "grid-template-rows", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" );
	var test2 = `
		<div class='g color-3'></div><div class='g color-5'></div><div class='g color-3'></div><div class='g color-3'></div>
		<div class='g color-1'></div><div class='g color-4'></div><div class='g color-1'></div><div class='g color-5'></div>
		<div class='g color-2'></div><div class='g color-5'></div><div class='g color-2'></div><div class='g color-2'></div>
		<div class='g color-5'></div><div class='g color-1'></div><div class='g color-3'></div><div class='g color-3'></div>
		<div class='g color-1'></div><div class='g color-3'></div><div class='g color-1'></div><div class='g color-4'></div>
		<div class='g color-2'></div><div class='g color-2'></div><div class='g color-2'></div><div class='g color-2'></div>
		<div class='g color-5'></div><div class='g color-5'></div><div class='g color-5'></div><div class='g color-4'></div>
		<div class='g color-1'></div><div class='g color-2'></div><div class='g color-5'></div><div class='g color-5'></div>
		<div class='g color-3'></div><div class='g color-5'></div><div class='g color-3'></div><div class='g color-3'></div>
		<div class='g color-1'></div><div class='g color-2'></div><div class='g color-1'></div><div class='g color-1'></div>
		<div class='g color-4'></div><div class='g color-1'></div><div class='g color-4'></div><div class='g color-4'></div>
		<div class='g color-1'></div><div class='g color-3'></div><div class='g color-1'></div><div class='g color-1'></div>
		<div class='g color-1'></div><div class='g color-4'></div><div class='g color-1'></div><div class='g color-3'></div>
		<div class='g color-3'></div><div class='g color-2'></div><div class='g color-3'></div><div class='g color-3'></div>
		<div class='g color-5'></div><div class='g color-1'></div><div class='g color-5'></div><div class='g color-5'></div>
		<div class='g color-4'></div><div class='g color-5'></div><div class='g color-4'></div><div class='g color-4'></div>
		`;
	$( "#css-layer" ).append(test2);	
});
$('.btn').on('click', function(e){
	var backgroundRGBColor = $(this).css('background-color');

	var rgb_arr = backgroundRGBColor.substring(4, backgroundRGBColor.length-1).split(',');
	console.log(rgb_arr);
	var hex_color = '#';
	for (var i = 0; i < rgb_arr.length; i++) {
		hex_color += rgbToHex(rgb_arr[i]).toUpperCase();
	};
	$('#paletteInput').val(hex_color);
	paletteObject.colorId = $(this).attr('id');
	console.log(paletteObject.colorId);
});
function rgbToHex (rgb) { 
	var hex = Number(rgb).toString(16); 
	if (hex.length < 2) { 
		hex = "0" + hex; 
	} 
	return hex; 
};
$("#paletteInput").on("change paste keyup", function() {
		var str = $(this).val();
		var patt = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
		if(patt.test(str)){
			var curr_key = paletteObject.colorId;
			paletteObject[curr_key] = str;
			$("#custom-colors").remove();
			var customStyle = `<style id="custom-colors">
				
				.color-1 {
				background: ${paletteObject["color-1"]};
			}
			.color-2 {
				background: ${paletteObject["color-2"]};
			}
			.color-3 {
				background: ${paletteObject["color-3"]};
			}
			.color-4 {
				background: ${paletteObject["color-4"]};
			}
			.color-5 {
				background: ${paletteObject["color-5"]};
			}
			.color-0 {
				background: ${paletteObject["color-0"]};	
			}
			</style>`;

			$( customStyle ).appendTo( "head" )
		}
});
$('#css-layer').on('click', function (event) {
  if (event.target != this) {
  	console.log('event.target: ', event.target);
    var curr_key = paletteObject.colorId;
 		var newClass = 'g '+curr_key;
 		console.log("newClass: ", newClass);
 		$(event.target).attr('class', newClass);
  } else {
    alert('Congrats! You are clicked the css-layer instead of a colorful grid block.');
  }
});