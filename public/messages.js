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
        const phoneNumber = $("#phone").val().trim();
        const msg = $("#msg").val().trim();
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
    
    






// modal code from getbootstrap.com
    $('#Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        let modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      })
});


// let socket = io();



