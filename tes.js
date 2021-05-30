$(function() {



    var data = '{"ch":"74"}';
    axios.post("https://falling-brook-eec9.doppelgangerr02.workers.dev/?https://55goal.com/api/streaming/getStreamingLink.php", data)
        .then((r) => {
            console.log(r.data)
        })
        .catch((e) => {
            console.log(e);
        });




});;