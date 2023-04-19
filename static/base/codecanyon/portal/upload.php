<?php

/*
 * DZS Upload
 * version: 1.0
 * author: digitalzoomstudio
 * website: http://digitalzoomstudio.net
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

$disallowed_filetypes = array('.php', '.exe', '.htaccess', '.asp', '.py', '.jsp', '.pl');
$upload_dir = dirname(__FILE__) . '/upload';

function get_theheaders() {
    //$headers = array();
    //print_r($_SERVER);
    return $_SERVER;
}

//print_r($_POST); print_r($HTTP_POST_FILES); print_r($_FILES);

if (isset($_FILES['file_field']['tmp_name'])) {
    $file_name = $_FILES['file_field']['name'];
    $file_name = str_replace(" ", "_", $file_name); // strip spaces
    $path = $upload_dir . "/" . $file_name;
    //print_r($HTTP_POST_FILES);
    //==== checking for disallowed file types
    $sw = false;

    foreach ($disallowed_filetypes as $dft) {
        $pos = strpos($file_name, $dft);
        if ($pos !== false) {
            $sw = true;
        }
    }

    if ($sw == true) {
        die('<div class="error">invalid extension - disallowed_filetypes</div><script>hideFeedbacksCall()</script>');
    }
    if (!is_writable($upload_dir)) {
        die('<div class="error">dir not writable - check permissions</div><script>hideFeedbacksCall()</script>');
    }




    if (copy($_FILES['file_field']['tmp_name'], $path)) {
        echo '<div class="success">file uploaded</div><script>top.hideFeedbacksCall();</script>';
    } else {
        echo '<div class="error">file could not be uploaded</div><script>window.hideFeedbacksCall()</script>';
    }
} else {
    $headers = get_theheaders();
    if (isset($headers['HTTP_X_FILE_NAME'])) {
        //print_r($headers);
        $file_name = $headers['HTTP_X_FILE_NAME'];
        $file_name = str_replace(" ", "_", $file_name); // strip spaces
        $target = $upload_dir . "/" . $file_name;


        //==== checking for disallowed file types
        $sw = false;

        foreach ($disallowed_filetypes as $dft) {
            $pos = strpos($file_name, $dft);
            if ($pos !== false) {
                $sw = true;
            }
        }
        
        $auxindex = 0;
        $auxname = $file_name;
        $auxpath = $target;
        if(file_exists($target)){
            
//            die('<div class="error">file already exists</div>');
            
            $part1_target = $target;
            $part2_target = '';
            
            
            
            $part1_name = $auxname;
            $part2_name = '';
            
            if(strpos($target, '.png')!==false || strpos($target, '.jpg')!==false || strpos($target, '.mp4')!==false || strpos($target, '.m4v')!==false
                    || strpos($target, '.ogg')!==false || strpos($target, '.ogv')!==false || strpos($target, '.gif')!==false || strpos($target, '.mp3')!==false
                     || strpos($target, '.gif')!==false){
                $part1_target = substr($target, 0, -4);
                $part2_target = substr($target, -4);
            }
            
            
            if(strpos($auxname, '.png')!==false || strpos($auxname, '.jpg')!==false || strpos($auxname, '.mp4')!==false || strpos($auxname, '.m4v')!==false
                    || strpos($auxname, '.ogg')!==false || strpos($auxname, '.ogv')!==false || strpos($auxname, '.gif')!==false || strpos($auxname, '.mp3')!==false
                     || strpos($auxname, '.gif')!==false){
                $part1_name = substr($auxname, 0, -4);
                $part2_name = substr($auxname, -4);
            }
            
            while(file_exists($auxpath)===true){
                $auxindex++;
                
                $auxpath = $part1_target.'_'.$auxindex.$part2_target;
                $auxname = $part1_name.'_'.$auxindex.$part2_name;
            }
        }
        
        $target = $auxpath;

        if ($sw == true) {
            die('<div class="error">invalid extension - disallowed_filetypes</div>');
        }

        if (!is_writable($upload_dir)) {
            die('<div class="error">dir not writable - check permissions</div>');
        }


        //echo $target;
        $content = file_get_contents("php://input");

        if (file_put_contents($target, $content)) {
            echo 'success - file written {{filename-'.$auxname.'}}';
        } else {
            die('<div class="error">error at file_put_contents</div>');
        }
    } else {
        die('not for direct access');
    }
}