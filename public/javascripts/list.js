/**
 * Created by Rachel on 2017. 11. 24..
 */
$(document).ready( function () {

    $.ajax({
        type: 'GET',
        url: 'http://192.168.137.130:3000/users/tweet/friends',
        dataType: 'application/json',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        complete: function(data) {
            var users = JSON.parse(data.responseText).users;
            $.each(users, function(key, value) {
                var tag = '<a href="#" class="list-group-item">' + value.name + '</a>';
                $('#friends').append(tag)
            });
        }
    });

});