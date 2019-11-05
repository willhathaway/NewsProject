//$(document).ready(function() {

let APIkey = 'a93e9eaa48f8479c927c31d2e61713c0';

// global variables:

// empty arrays to be filled by ajax request:

let sourceArray = [
    fox = {
        name: 'Fox News',
        url: 'foxnews.com',
        logo: 'fox.jpg'
    },
    nytimes = {
        name: 'The New York Times',
        url: 'nytimes.com',
        logo: ''
    },
    wsj = {
        name: 'The Wall Street Journal',
        url: 'wsj.com',
        logo: ''
    },
    huffpo = {
        name: 'The Huffington Post',
        url: 'huffpost.com',
        logo: ''
    },
    bbc = {
        name: 'BBC News',
        url: 'bbc.com/news',
        logo: ''
    }
];

$(document).ready(function(){

for (let i = 0; i < sourceArray.length; i++) {

    $('#dropdown-menu-left').append('<a class="dropdown-item">').val(sourceArray[i].url).text(sourceArray[i].name);

    $('#dropdown-menu-right').append('<a class="dropdown-item">').val(sourceArray[i].url).text(sourceArray[i].name);

}
});

$(document).on('click', '#searchBtn', function articleFunction(event) {

    event.preventDefault();

    let source1 = 'nytimes.com';
    let source2 = 'foxnews.com';
    let keyword = $('#searchBar').val();
    console.log(keyword);

    let query1 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source1 + '&pageSize=1&apiKey=' + APIkey + '';
    let query2 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source2 + '&pageSize=1&apiKey=' + APIkey + '';

    $.ajax({
            url: query1,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {

                let articleDiv = $("<div id='articleContent'" + i + ">");
                let sourceName = $('<h3 id="sourceName">').text(source1);
                let author = $('<h4 id="author">').text(response.articles[i].author);
                let datePublished = $('<h4 id="author">').text(response.articles[i].publishedAt);

                let title = $("<h3 id='title'>");
                $(title).addClass("title");
                $(title).text(response.articles[i].title);

                let article = $("<p id='content'>");

                $(article).addClass("article");
                $(article).text(response.articles[i].content);

                $(sourceName).appendTo(articleDiv);
                $(title).appendTo(articleDiv);
                $(author).appendTo(articleDiv);
                $(datePublished).appendTo(articleDiv);
                $(article).appendTo(articleDiv);
                $(articleDiv).appendTo('#articleDivLeft');

            }

        });

    $.ajax({
            url: query2,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {

                let articleDiv = $("<div id='articleContent'" + i + ">");
                let sourceName = $('<h3 id="sourceName">').text(source2);
                let author = $('<h4 id="author">').text(response.articles[i].author);
                let datePublished = $('<h4 id="author">').text(response.articles[i].publishedAt);

                let title = $("<h3 id='title'>");
                $(title).addClass("title");
                $(title).text(response.articles[i].title);

                let article = $("<p id='content'>");

                $(article).addClass("article");
                $(article).text(response.articles[i].content);

                $(sourceName).appendTo(articleDiv);
                $(title).appendTo(articleDiv);
                $(author).appendTo(articleDiv);
                $(datePublished).appendTo(articleDiv);
                $(article).appendTo(articleDiv);
                $(articleDiv).appendTo('#articleDivRight');

            }





        });


});