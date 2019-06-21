$(document).ready(function() {

    let $newItemInput = $("input.new-item");
    var $postContainer = $(".post-container");
    const posts = [];

    getPosts();

    function initializeRows(posts) {
        // console.log("this is row data" + posts);
        $postContainer.empty();
        const rowsToAdd = [];
        for(i=0; i<posts.length; i++) {
            // console.log("loop of posts: " + posts[0]);
            rowsToAdd.push(createNewRow(posts[i]));
        }
        $postContainer.prepend(rowsToAdd);
    }

    function getPosts() {
        console.log("getPosts function is running");
        $.get("/get/messages", function(dbPost) {
            // console.log("this is data: " + data);
            console.log("db: " + dbPost);
            let posts = dbPost;
            initializeRows(posts);
        });
    };

    function createNewRow(dbPost) {
        // console.log("create new row: " + dbPost);
        let $newInputRow = $(
            [
                //dynamic html in quotes here
            "<div class='card' style='width: 18rem;'>",
            "<i class='fas fa-sms' aria-hidden='true'></i>",
            "<div class='card-body'>",
              "<h5 class='card-title'>From Phone Number</h5>",
              "<p class='card-text'>",
              "<span>",
              dbPost.body,
            "</span>",
              "</p>",
              "<a href='#' class='btn btn-primary'>Send Message</a>",
            "</div>",
          "</div>"
            ].join("")
    );
    $newInputRow.data("post", dbPost);
    return $newInputRow;
};

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