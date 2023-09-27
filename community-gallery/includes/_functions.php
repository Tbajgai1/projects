<?php 
 function resizeImage($file, $folder, $newwidth) {
	list($width, $height) = getimagesize($file);
	if($newwidth >= $width){// hack for images smaller than our resize
		$newwidth = $width;
	}
	$imgRatio = $width/$height;
	$newheight = $newwidth / $imgRatio;
	$thumb = imagecreatetruecolor($newwidth, $newheight);
	$source = imagecreatefromjpeg($file);
	imagecopyresampled($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

   


	$newFileName = $folder .  basename($file);// get original filename for dest filename

	imagejpeg($thumb,$newFileName,80);
	imagedestroy($thumb); 
	imagedestroy($source); 
}

function createSquareImageCopy($file, $folder, $newWidth){

    $thumb_width = $newWidth;
    $thumb_height = $newWidth;

    list($width, $height) = getimagesize($file);

    $original_aspect = $width / $height;
    $thumb_aspect = $thumb_width / $thumb_height;

    if($original_aspect >= $thumb_aspect) {
    
    $new_height = $thumb_height;
    $new_width = $width / ($height / $thumb_height);
    } else {
    
    $new_width = $thumb_width;
    $new_height = $height / ($width / $thumb_width);
    }

    if($_FILES['myfile']['type'] === "image/jpeg" ){

        $source = imagecreatefromjpeg($file);

        $thumb = imagecreatetruecolor($thumb_width, $thumb_height);

        setTransparency($thumb, $source);
    
        imagecopyresampled($thumb,
                        $source,0 - ($new_width - $thumb_width) / 2, 
                        0 - ($new_height - $thumb_height) / 2, 
                        0, 0,
                        $new_width, $new_height,
                        $width, $height);
    
        $newFileName = $folder. "/" .basename($file);
        imagejpeg($thumb, $newFileName, 80);

    }elseif($_FILES['myfile']['type'] === "image/png"){
        $source = imagecreatefrompng($file);

        $thumb = imagecreatetruecolor($thumb_width, $thumb_height);
    
        imagecopyresampled($thumb,
                        $source,0 - ($new_width - $thumb_width) / 2, 
                        0 - ($new_height - $thumb_height) / 2, // 
                        0, 0,
                        $new_width, $new_height,
                        $width, $height);
    
                        $newFileName = $folder. "/" .basename($file);
                        imagepng($thumb, $newFileName, 9);
    }

    }

    //Transparency
    function setTransparency($new_image,$image_source){
    
    $transparencyIndex = imagecolortransparent($image_source);
    $transparencyColor = array('red' => 255, 'green' => 255, 'blue' => 255);

    if ($transparencyIndex >= 0) {
        $transparencyColor    = imagecolorsforindex($image_source, $transparencyIndex);   
    }

    $transparencyIndex    = imagecolorallocate($new_image, $transparencyColor['red'], $transparencyColor['green'], $transparencyColor['blue']);
    imagefill($new_image, 0, 0, $transparencyIndex);
        imagecolortransparent($new_image, $transparencyIndex);

    }








 ?>