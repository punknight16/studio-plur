function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imgInp").change(function(){
  readURL(this);
});
$("#image").on('load', function(){
	var height = $(this).css('height');
	$('#css-layer').css('height', height);
	$('#view-panel').css('height', height);
});