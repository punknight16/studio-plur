function readURL(input) {
  if (input.files && input.files[0]) {
    var img = input.files[0];
    var reader = new FileReader();
      
    reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
        
    }
    
    reader.readAsDataURL(input.files[0]);
  }
  exifOrientation(img);
  
}
$("#imgInp").change(function(){
  readURL(this);
});
$("#image").on('load', function(){
  /*var height = $(this).css('height');
  $('#css-layer').css('height', height);
  $('#view-panel').css('height', height);*/
  
});

function exifOrientation(img){
  EXIF.getData(img, function() {
    var allMetaData = EXIF.getAllTags(this);
    exifOrientation = allMetaData.Orientation;
    console.log('Exif orientation: ' + exifOrientation);
    
    switch (exifOrientation){
      case 2:
          alert("here in case 2");
          $('#image').addClass('flip'); 
          break;
      case 3:
          alert("here in case 3");
          $('#image').addClass('rotate-180'); break;
      case 4:
          alert("here in case 4");
          $('#image').addClass('flip-and-rotate-180'); break;
      case 5:
          alert('im here in case 5');
          $('#image').addClass('flip-and-rotate-270'); break;

      case 6:
          
          $('#image').addClass('rotate-90');  
          $('#image').removeClass('height-width-300'); 
          $('#view-panel').removeClass('height-width-300');
          $('#css-layer').removeClass('height-width-300');
          $('#image-layer').removeClass('height-width-300');
          $('#image').addClass('height-300');
          
          
          var width = $('#image').css('width');
          console.log('width: ', width);


          $('#view-panel').addClass('width-300');
          $('#view-panel').css('height', width);
          $('#image-layer').addClass('width-300');
          $('#image-layer').css('height', width);
          $('#css-layer').addClass('width-300');
          $('#css-layer').css('height', width);
         
          break;
      case 7:
          alert('im here in case 7');
          $('#image').addClass('flip-and-rotate-90');

          break;
      case 8:
          alert("here in case 8");
          $('#image').addClass('rotate-270'); break;
    }
  });
}
function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };