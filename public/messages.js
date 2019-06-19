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

    $(document).on('click', '#whatsapp', function() {
        event.preventDefault();
        const phoneNumber = $("#dst").val().trim();
        const msg = $("#text").val().trim();
        console.log(phoneNumber);
        console.log(msg);
        twilioData = {
            phoneNumber: phoneNumber,
            msg: msg
        }
console.log(twilioData);
        $.ajax('send/message/whatsapp', {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(twilioData)
        }).then(function(response){
            console.log(response);
        }).catch(function(err) {
            console.log(err)
        }); 
    
    });
    
    






});


// let socket = io();



