$(document).ready(function() {
    $('#plivo').click(function() {
        let dst = $("#dst").val().trim();
        console.log("dst phone: " + dst);
        let text = $("#text").val().trim();
        console.log("text body: " + text);
        plivoData = {
            dst: dst,
            text: text
        }
        $.ajax('/send/message', {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(plivoData)
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
    });
});
