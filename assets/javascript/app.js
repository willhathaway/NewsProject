$(document).on('ready', function () {

    let queryURL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a93e9eaa48f8479c927c31d2e61713c0';

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            // a93e9eaa48f8479c927c31d2e61713c0

        });

});