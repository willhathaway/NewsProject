let APIkey = 'a93e9eaa48f8479c927c31d2e61713c0';

// global variables:

// empty arrays to be filled by ajax request:

let sourceArray = ['foxnews.com', 'nytimes.com', 'wsj.com', 'huffpost.com', 'bbc.com/news'];

for (let i = 0; i < sourceArray.length; i++) {

    $('#dropdown1').append('<option>').val(sourceArray[i]).text(sourceArray[i]);

    $('#dropdown2').append('<option>').val(sourceArray[i]).text(sourceArray[i]);

}

let headlines1 = [];
let articles1 = [];
let headlines2 = [];
let articles2 = [];

function articleFunction() {

    let source1 = 'nytimes.com';
    let source2 = 'foxnews.com';
    let keyword = $('#searchBar').val();
    console.log(keyword);

    let query1 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source1 + '&pageSize=1&apiKey=' + APIkey + '';
    let query2 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source2 + '&pageSize=1&apiKey=' + APIkey + '';

    //let articlePair = $("<div class='jumbotron' id='articlePair'>");

    $.ajax({
            url: query1,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {

                headlines1.push(response.articles[i].title);
                articles1.push(response.articles[i].content);

                let articleDiv = $("<div id='articleContent'" + i +">");
                let sourceName = $('<h3 id="sourceName">').text(source1);


                let title = $("<h3 id='title'>");
                $(title).addClass("title");
                $(title).text(response.articles[i].title);

                let article = $("<p id='content'>");

                $(article).addClass("article");
                $(article).text(response.articles[i].content);

                $(sourceName).appendTo(articleDiv);
                $(title).appendTo(articleDiv);
                $(article).appendTo(articleDiv);
                $(articleDiv).appendTo('#articleDivLeft');


            }


            $('#article1').append('<p>' + articles1[0] + '</p>');
            console.log(articles1);


        });

    $.ajax({
            url: query2,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {
                headlines2.push(response.articles[i].title);
                articles2.push(response.articles[i].content);

                let articleDiv = $("<div id='articleContent'" + i + ">");
                let sourceName = $('<h3 id="sourceName">').text(source2);

                let title = $("<h3 id='title'>");
                $(title).addClass("title");
                $(title).text(response.articles[i].title);

                let article = $("<p id='content'>");

                $(article).addClass("article");
                $(article).text(response.articles[i].content);

                $(sourceName).appendTo(articleDiv);
                $(title).appendTo(articleDiv);
                $(article).appendTo(articleDiv);
                $(articleDiv).appendTo('#articleDivRight');

            }

            console.log(headlines2);

            


        });


};