function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
        var orientation = $('#image').css('image-orientation');
        console.log("orientation: ", orientation);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}
/*
function readURL(input){
  loadImage(
    input.files[0],
    function(img) {
      $('#image-layer').append(img);
    },
    { maxWidth: 300 } // Options
  );
}*/
$("#imgInp").change(function(){
  readURL(this);
});

$("#image").on('load', function(){
  var height = $(this).css('height');
  $('#css-layer').css('height', height);
  $('#view-panel').css('height', height);
  fixExifOrientation($('#image'));
});


function fixExifOrientation($img) {
    $img.on('load', function() {
        EXIF.getData($img[0], function() {
            console.log('Exif=', EXIF.getTag(this, "Orientation"));
            switch(parseInt(EXIF.getTag(this, "Orientation"))) {
                case 2:
                    $img.addClass('flip'); break;
                case 3:
                    $img.addClass('rotate-180'); break;
                case 4:
                    $img.addClass('flip-and-rotate-180'); break;
                case 5:
                    $img.addClass('flip-and-rotate-270'); break;
                case 6:
                    $img.addClass('rotate-90'); break;
                case 7:
                    $img.addClass('flip-and-rotate-90'); break;
                case 8:
                    $img.addClass('rotate-270'); break;
            }
        });
    });
}
