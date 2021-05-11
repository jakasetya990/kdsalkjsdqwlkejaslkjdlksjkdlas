<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

/** 
 * SAMPLE
 * 'endpoint' => "https://lite-1x287006.com/cinema",
 * player
 * 'player_poster'         => "https://1.bp.blogspot.com/-5Ole9iUAwLc/X_Pxs-OS4II/AAAAAAAAM_A/xv7JVyQRNasqwXvmt-33dY8aNrbGuRYSQCLcBGAsYHQ/s0/bgr1.jpg",
 * "player_watermark"      => "https://1.bp.blogspot.com/-OUvI2iPnaNA/X-Ic0nNjesI/AAAAAAAAM3U/n23-5E1mUV8cPYI83eyaeYUfAxIQn_sywCLcBGAsYHQ/s0/DONLOAD.gif",
 * "player_watermark_link" => "https://bit.ly/apkbgibola",
 * //banner
 * "banner_img"  => "https://1.bp.blogspot.com/-bqTbshJyAuQ/YIvre4TnBWI/AAAAAAAANvA/v-wV3sdSVFg9wFI7AMY_fZLlxooloJiXQCLcBGAsYHQ/s0/800x70-3-dpbola.gif",
 * "banner_link" => "https://b.link/ddbola",
 * "banner_rel"  => "sponsored nofollow noopener noreferrer",
 * // analytic'
 * "analytic" => "UA-100565739-31",
 * "allow_domain" => "bgibola.asia",
 * "allow_direct" => true

 */

$data = include('config.php');






echo json_encode($data[$_GET['domain']]);
