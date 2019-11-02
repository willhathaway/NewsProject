$(document).ready(function () {

    // API key: a93e9eaa48f8479c927c31d2e61713c0

    // global variables:

    // empty arrays to be filled by ajax request:


    NYTheadlines = [];
    FOXheadlines = [];
    NYTarticles = [];
    FOXarticles = [];

    // seperate query URLs:

    let queryNYT = 'https://newsapi.org/v2/everything?language=en&domains=nytimes.com&apiKey=a93e9eaa48f8479c927c31d2e61713c0';
    let queryFox = 'https://newsapi.org/v2/everything?language=en&domains=foxnews.com&apiKey=a93e9eaa48f8479c927c31d2e61713c0';

    $.ajax({
            url: queryNYT,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {
                NYTheadlines.push(response.articles[i].title);
                NYTarticles.push(response.articles[i].content);
            }

            console.log(NYTheadlines);
            // console.log(NYTarticles);

        });

    $.ajax({
            url: queryFox,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {
                FOXheadlines.push(response.articles[i].title);
                FOXarticles.push(response.articles[i].content);
            }

            console.log(FOXheadlines);
            // console.log(FOXarticles);

        });

    // unfinished:

    // function compareArticles(array1, array2) {

    //     for (let i = 0; i < array1.length; i++) {



    //     }



});