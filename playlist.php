<?php

//header("Access-Control-Allow-Origin: *");
header("content-type: application/vnd.apple.mpegurl");
//header("Content-Disposition: attachment; filename=playlist_".$_GET['VI'].".m3u8");
$str = "http://edge2.xmediaget.com/edge0/xrecord/" . $_GET['VI'] . "/prog_index.m3u8";
$lines = file($str);
$last1 = implode(array_slice($lines, -2, 1));
$last2 = implode(array_slice($lines, -4, 1));
$last3 = implode(array_slice($lines, -6, 1));
$numseq = explode('Num', $last1);
$numseq = str_replace('Frag', '', $numseq['0']);

echo "#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:4
#EXT-X-MEDIA-SEQUENCE:" . $numseq . "
#EXT-X-DISCONTINUITY-SEQUENCE:0
";
echo "#EXTINF:4,\n";
echo 'http://edge2.xmediaget.com/edge0/xrecord/' . $_GET['VI'] . '/' . $last3 . '';
echo "#EXTINF:4,\n";
echo 'http://edge2.xmediaget.com/edge0/xrecord/' . $_GET['VI'] . '/' . $last2 . '';
echo "#EXTINF:4,\n";
echo 'http://edge2.xmediaget.com/edge0/xrecord/' . $_GET['VI'] . '/' . $last1 . '';
