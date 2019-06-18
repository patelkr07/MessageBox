$(document).ready(function() {
    $('#plivo').click(function() {
        $.ajax('/send/message', {
            method: "POST",
            data: {
                src: "+14843093891",
                dst: "+17133960120",
                text: "Test Message" 
            }
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
    });
});