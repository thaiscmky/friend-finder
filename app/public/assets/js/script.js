$(document).ready(function(){
    $('#friendMatch').modal('hide');

    $("#submit").on("click", function (e) {
        if($('form')[0].checkValidity()){
            e.preventDefault();
            $('#friendMatch').modal('show');

        };
    });

    $('#friendMatch').on('shown.bs.modal', function() {
        $(this).find('#modalBody').text('Loading Result...');
        $.post( "/api/friends", $('form').serializeArray() )
            .then(function(data){
                //TODO list compatibility as a percentage
                $("#friendMatch").find('#modalBody').empty()
                    .append($('<h3>', { text: data.name}))
                    .append($('<img>', { src: data.photo}))
            })
            .fail(function() {
            alert( "There was a problem with your data submission." );
        });
    });
});