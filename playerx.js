// log on 05152021
var referer = document.referrer;
var url_config = "https://cdn.livestreamapi.xyz/getconfig.php?domain=" + domain;
var webconfig, player;


try {
    axios.get(url_config)
        .then((r) => {
            webconfig = r.data
                // console.log(webconfig.banner_img)
            if (webconfig.banner_img != "") {

                $('#ads_overlay').html('<button onclick="myClosebtn()"><span class="icon-cancel-circled">X</span></button> <div class="ads_code"><a href="' + webconfig.banner_link + '" title="' + webconfig.banner_title + '" alt="' + webconfig.banner_alt + '" target="_blank" rel="' + webconfig.banner_rel + '"><img src="' + webconfig.banner_img + '" /></a></div>')
            } else {
                var x = document.getElementById("ads_overlay");
                x.style.display = "none";
            }


            // console.log(webconfig.allow_direct)
            if (webconfig.allow_direct != true) {
                var domain = document.referrer;
                var allowDomain = webconfig.allow_domain;
                // console.log(webconfig.allow_domain);
                if (domain.includes(allowDomain)) {
                    console.log("Authorized, continue playing ");
                } else {
                    window.location.href = "https://" + webconfig.allow_domain;
                    window.location.replace("https://" + webconfig.allow_domain);
                    document.getElementById("app").innerHTML = "";
                }
            }

            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", webconfig.analytic);



            // player
            const urlParams = new URLSearchParams(window.location.search);
            // console.log(urlParams);
            if (urlParams.has("type") && urlParams.has("src")) {
                let type = urlParams.get("type");
                let src = urlParams.get("src");
                let param = urlParams.get("param");
                switch (type) {
                    case "flv":
                        playFlv(src);

                        break;
                    case "iframe":
                        playIframe(atob(src));

                        break;
                    case "hls":
                        playNormal(atob(src));
                        break;
                    default:
                        playNormal(atob(src));
                }
            } else if (urlParams.has("server") && urlParams.has("param")) {
                let server = urlParams.get("server");
                let param = urlParams.get("param");
                switch (server) {
                    case "alpha":
                        axios.get("https://v1.mirrorstream.xyz/hls365.php?id=" + param + "&mode=sources")
                            .then((r) => {

                                playHls(r.data, webconfig.endpoint);
                                // playNormal('https://live.livestreamapi.xyz/playlist.php?VI=' + r.data);
                                // playNormal('https://edge2.xmediaget.com:8443/edge0/xrecord/' + r.data + '/prog_index.m3u8')
                                // playNormal('https://cdn.livestreamapi.xyz/playlist.php?streamid=' + r.data)
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                        break;
                    case "beta":
                        axios
                            .get(
                                "https://apk150.xyz/sportpanel/json/bigmatch/details/" +
                                param +
                                "?clear=1"
                            )
                            .then((r) => {
                                if (r.data.sources[0].type == "iframe") {
                                    playIframe(r.data.sources[0].value);
                                } else {
                                    playNormal(r.data.sources[0].value);
                                }
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                        break;

                    default:
                        console.log(param);
                        break;
                }
            }

        })
        .catch((e) => {
            console.log(e);
        });
    axios.get;
} catch (error) {
    console.log(error)
}
// document.addEventListener("DOMContentLoaded", function(event) {
//     // get the config for domain

// });




let adsConfig = {
    preRoll: {
        src: ["http://techslides.com/demos/sample-videos/small.mp4"],
        skip: true,
        timeout: 6,
    },

    text: {
        wait: "Wait % seconds...",
        skip: "Skip >",
    },
};

function playHls(id, endpoint) {

    var corsbypass = 'https://cors.livestreamapi.xyz/https://1xbet.com/cinema'
        // var url = (bypass == true) ? corsbypass + webconfig.endpoint : webconfig.endpoint;
    var url = corsbypass;


    // console.log(endpoint)
    axios({
            method: "post",
            headers: {
                'Content-Type': 'application/json',

            },
            url: url,
            data: '{"VideoId":"' + id + '","Token":null,"AppId":2,"OS":"","AppVer":"","Language":"ru","Record":false}',
        })
        .then((response) => {
            playNormal('https://cors.livestreamapi.xyz/' + response.data.URL)
                // playNormal((bypass == true) ? corsbypass + response.data.URL : response.data.URL)
        }, (error) => {
            console.log(error);
        });

    axios.post()




}



function playIframe(iframesource) {
    var player = document.getElementById("player");
    player.innerHTML +=
        '<div class="container"><iframe scrolling="no" class="responsive-iframe" width="560" height="315" src="' +
        iframesource +
        '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
}

function playNormal(sourcex) {
    if (sourcex.includes(".flv")) {
        console.log("itsflv");
        playFlv(sourcex);
    } else {
        var player = new Clappr.Player({
            autoPlay: true,
            source: sourcex,
            mute: true,
            plugins: [DashShakaPlayback],

            poster: webconfig.player_poster,
            mimeType: "application/vnd.apple.mpegurl",

            watermark: webconfig.player_watermark,
            watermarkLink: webconfig.player_watermark_link,
            position: "top-right",
            language: "en",
            strings: {
                en: {
                    default_error_title: "Mohon Maaf...",
                    default_error_message: "Live Streaming Error - Silakan Refresh atau Pilih Channel lainnya dibawah..",
                },
            },

            preload: "true",
            height: "100%",
            width: "100%",
            playInline: true,
            levelSelectorConfig: {
                title: "Quality",
                labels: {
                    2: "High", // 500kbps
                    1: "Med", // 240kbps
                    0: "Low", // 120kbps
                },
                labelCallback: function(playbackLevel, customLabel) {
                    return customLabel + playbackLevel.level.height + "p"; // High 720p
                },
            },
            shakaOnBeforeLoad: function(shaka_player) {},
            parentId: "#player",
        });
    }
}

function playFlv(sourcex) {
    var player = new Clappr.Player({
        autoPlay: true,
        mute: true,
        source: sourcex,
        poster: webconfig.poster,
        mimeType: "video/flv",

        watermark: webconfig.player_watermark,
        watermarkLink: webconfig.player_watermark_link,
        position: "top-right",

        language: "en",
        strings: {
            en: {
                default_error_title: "Mohon Maaf...",
                default_error_message: "Live Streaming Error - Silakan Refresh atau Pilih Channel lainnya dibawah..",
            },
        },

        plugins: [FLVJSPlayback],

        preload: "true",
        height: "100%",
        width: "100%",
        parentId: "#player",
    });
}


var url_string = window.location.href;
var url = new URL(url_string);
var param = url.searchParams.get("param");
var server = url.searchParams.get("server");

function myClosebtn() {
    var x = document.getElementById("ads_overlay");
    x.style.display = "none";
}