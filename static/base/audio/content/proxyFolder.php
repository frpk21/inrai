<?php

$url = "http".(!empty($_SERVER['HTTPS'])?"s":"")."://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
$url = substr($url, 0, strrpos($url, "/") + 1); 

$dir = (isset($_GET['dir']) ? urldecode($_GET['dir']) : null);
$decodedeURL = urldecode($dir);
$decodedeURL = ltrim($decodedeURL, "/");
$decodedeURL = rtrim($decodedeURL, "/");
$decodedeURL = $decodedeURL . "/";
$url .= $decodedeURL;

$dirHandle = opendir($dir); 
$imlBody = '{"folder":[';
$ar = array();
$i = 0;

while ($file = readdir($dirHandle)) { 
      if(!is_dir($file) && (strpos(strtolower($file), '.mp3') || strpos(strtolower($file), '.mp4') || strpos(strtolower($file), '.m4a'))){
	    $i++; 
		$ar[$i] = $file;
     } 
} 
sort($ar);

for($i=0;$i<count($ar);$i++){
	$imlBody .= '{"@attributes":{';
	$file = $ar[$i];
	$trackTitle = $file;
	
	preg_match('/^(.*)(\.mp3|\.m4a)$/i', $trackTitle, $matches);
	if($matches[1]) $trackTitle = $matches[1];
	$imlBody .='"data-path":"' . $url . $file . '",';
	$imlBody .='"data-title":"' . $trackTitle . '"';
	if($i != count($ar) - 1){
		$imlBody .= "}},";
	}else{
		$imlBody .= "}}";
	}
	
	
 };
closedir($dirHandle);
$imlBody .= ']}';
echo $imlBody; 
?>