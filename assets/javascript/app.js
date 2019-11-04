$(document).ready(function () {

    // API key: a93e9eaa48f8479c927c31d2e61713c0

    // global variables:

    // empty arrays to be filled by ajax request:


    NYTheadlines = [];
    FOXheadlines = [];
    NYTarticles = [];
    FOXarticles = [];

    // seperate query URLs:

    let queryNYT = 'https://newsapi.org/v2/everything?language=en&domains=nytimes.com&pageSize=10&apiKey=a93e9eaa48f8479c927c31d2e61713c0';
    let queryFox = 'https://newsapi.org/v2/everything?language=en&domains=foxnews.com&pageSize=10&apiKey=a93e9eaa48f8479c927c31d2e61713c0';

    $.ajax({
            url: queryNYT,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {
                NYTheadlines.push(response.articles[i].title);
                NYTarticles.push(response.articles[i].content);
                let article = $("<div id='articleDivLeft'" + i + ">");
                $(article).addClass("article");
                $(article).text(response.articles[i].content);
                let title = $("<h3 id='title'>");
                $(title).text(response.articles[i].title);
                $(title).appendTo("#left");
                $(article).appendTo("#left");
            }


            $('#article1').append('<p>' + NYTarticles[0] + '</p>');
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
                let article = $("<div id='articleDivRight'" + i + ">");
                $(article).addClass("article");
                $(article).text(response.articles[i].content);
                let title = $("<h3 id='title'>");
                $(title).text(response.articles[i].title);
                $(title).appendTo("#right");
                $(article).appendTo("#right");
            }

            console.log(FOXheadlines);
            // console.log(FOXarticles);

        });



    //unfinished:

    // articles (array of objects) [
    // 0 {
    //     title: 'string string string',
    //     content: 'string string string'
    // }
    // 1 {
    //     title: 'string string string',
    //     content: 'string string string'
    // }
    // 2 {
    //     title: 'string string string',
    //     content: 'string string string'
    // }
    // ]

    // Need to split the headline into an array, then check if any headline from the second object contains that word


    function compareArticles(array1, array2) {

        let matches = [];

        for (let i = 0; i < array1.length; i++) {

            let keywords = [];

            let splitHeadline = array1[i].split();

            for (let i = 0; i < splitHeadline.length; i++) {
                if (splitHeadline[i] != 'and' || 'the' || 'in' || 'of' || 'on' || 'with') {
                    keywords.push(splitHeadline[i]);
                }
            }

            for (let i = 0; i < keywords.length; i++) {
                for (let i = 0; i < array2.length; i++) {
                    if (array2[i].includes(keywords[i])) {
                        matches.push('match');
                    }

                }
            }
        }

        console.log(matches);



    }


    compareArticles(NYTheadlines, FOXheadlines);





});