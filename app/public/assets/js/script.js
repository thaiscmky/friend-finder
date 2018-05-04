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
                var $title = $('h1').append(`Meet your match: ${data.name}`);
                var $img = $('img').attr('src', data.photo);
                //TODO list compatibility as a percentage
                //var $score = $('p')
                $("#friendMatch").find('#modalBody').html(
                    $title+$img
                );
            })
            .fail(function() {
            alert( "There was a problem with your data submission." );
        });
    });
});