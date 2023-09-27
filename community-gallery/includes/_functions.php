<?php
function resizeImage($file, $folder, $newwidth) {
    list($width, $height) = getimagesize($file);
    if ($newwidth >= $width) {
        $newwidth = $width;
    }
    $imgRatio = $width / $height;
    $newheight = $newwidth / $imgRatio;
    $thumb = imagecreatetruecolor($newwidth, $newheight);

    $source = getImageFromType($file);

    imagecopyresampled($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    $newFileName = $folder . basename($file);
    saveImageBasedOnType($thumb, $newFileName);

    imagedestroy($thumb);
    imagedestroy($source);
}

function createSquareImageCopy($file, $folder, $newWidth) {
    $thumb_width = $newWidth;
    $thumb_height = $newWidth;

    list($width, $height) = getimagesize($file);
    $original_aspect = $width / $height;
    $thumb_aspect = $thumb_width / $thumb_height;

    if ($original_aspect >= $thumb_aspect) {
        $new_height = $thumb_height;
        $new_width = $width / ($height / $thumb_height);
    } else {
        $new_width = $thumb_width;
        $new_height = $height / ($width / $thumb_width);
    }

    $source = getImageFromType($file);
    $thumb = imagecreatetruecolor($thumb_width, $thumb_height);

    setTransparency($thumb, $source);

    $dest_x = 0 - ($new_width - $thumb_width) / 2;
    $dest_y = 0 - ($new_height - $thumb_height) / 2;

    imagecopyresampled($thumb, $source, $dest_x, $dest_y, 0, 0, $new_width, $new_height, $width, $height);

    $newFileName = $folder . '/' . basename($file);
    saveImageBasedOnType($thumb, $newFileName);

    imagedestroy($thumb);
    imagedestroy($source);
}

function getImageFromType($file) {
    $type = exif_imagetype($file);
    switch ($type) {
        case IMAGETYPE_JPEG:
            return imagecreatefromjpeg($file);
        case IMAGETYPE_PNG:
            return imagecreatefrompng($file);
        default:
            // Handle other image types if needed
            return null;
    }
}

function saveImageBasedOnType($image, $fileName) {
    $type = exif_imagetype($fileName);
    switch ($type) {
        case IMAGETYPE_JPEG:
            imagejpeg($image, $fileName, 80);
            break;
        case IMAGETYPE_PNG:
            imagepng($image, $fileName, 9);
            break;
        default:
            // Handle other image types if needed
            break;
    }
}

// Transparency
// Transparency
function setTransparency($new_image, $image_source) {
    $transparencyIndex = imagecolortransparent($image_source);
    
    if ($transparencyIndex !== -1) {
        $transparencyColor = imagecolorsforindex($image_source, $transparencyIndex);
        $transparencyIndex = imagecolorallocate($new_image, $transparencyColor['red'], $transparencyColor['green'], $transparencyColor['blue']);
        imagefill($new_image, 0, 0, $transparencyIndex);
        imagecolortransparent($new_image, $transparencyIndex);
    }
}

?>
