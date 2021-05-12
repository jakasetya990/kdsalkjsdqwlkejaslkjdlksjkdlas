<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("content-type: application/vnd.apple.mpegurl");
//header("Content-Disposition: attachment; filename=playlist_".$_GET['streamid'].".m3u8");
$str = "https://edge2.xmediaget.com:8443/xrecord?id=" . $_GET['streamid'];
$get_url_for_parsing = substr(file_get_contents($str), 3);
$edgelinknum = substr($get_url_for_parsing, 1, 5);
$str = "https://edge3.xmediaget.com:8443" . $get_url_for_parsing;
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
echo '#EXTINF:4,
';
echo 'https://edge3.xmediaget.com:8443/' . $edgelinknum . '/xrecord/' . $_GET['streamid'] . '/' . $last3 . '';
echo '#EXTINF:4,
';
echo 'https://edge3.xmediaget.com:8443/' . $edgelinknum . '/xrecord/' . $_GET['streamid'] . '/' . $last2 . '';
echo '#EXTINF:4,
';
echo 'https://edge3.xmediaget.com:8443/' . $edgelinknum . '/xrecord/' . $_GET['streamid'] . '/' . $last1 . '';
