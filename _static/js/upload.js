var s3 = new AWS.S3({
	"region": "us-west-2",
	"accessKeyId": AWS.config.credentials.accessKeyId,
	"secretAccessKey": AWS.config.credentials.secretAccessKey
});

var bucket = "studio-plur-user-photos"

function uploadImage(image, cb) {
		
		

		//console.log('image: ', image);
		// Remove header
		
		var base64Image = image.split(';base64,').pop();
  	var identityId = AWS.config.credentials.identityId;
  	var objectKey = uuid.v4();
	  console.log('identityId: ', identityId);
	 /*var body = new Buffer(base64Image, "base64")*/
	 const blob = b64toBlob(base64Image);
		var params = {
			Bucket: bucket,
			Key: "_data/photos/"+identityId+"/"+objectKey,
			ACL: "public-read",
			ContentEncoding: 'binary',
    	ContentType: 'image/png',
			Body: blob
		};
		s3.putObject(params, function(err, data) {
			if (err) {
				console.error(err);
				
				
			} else {
				return cb(identityId, objectKey);
			}
		});

}

function b64toBlob(b64Data, contentType='', sliceSize=512){
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

