//$(document).ready(function() {

let APIkey = 'a93e9eaa48f8479c927c31d2e61713c0';

// an array of objects to hold the information for constructing the query:

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

// dynamically adds the sources to two dropdown menus (NOT WORKING):

$(document).ready(function () {

    for (let i = 0; i < sourceArray.length; i++) {

        $('#dropdown-menu-left').append('<a class="dropdown-item">').val(sourceArray[i].url).text(sourceArray[i].name);

        $('#dropdown-menu-right').append('<a class="dropdown-item">').val(sourceArray[i].url).text(sourceArray[i].name);

    }
});

// on-click function to make an API request and display the response data in html:

$(document).on('click', '#searchBtn', function articleFunction(event) {

    event.preventDefault();

    // placeholder values until dropdown is fixed:

    let source1 = 'nytimes.com';
    let source2 = 'foxnews.com';

    // keyword taken from user input:

    let keyword = $('#searchBar').val();

    // input validation checking for valid input:

    if (keyword == '') {
        alert('please enter a keyword')
        return;
    } else if (keyword.includes(' ')) {
        alert('please enter only one word')
        return;
    } else if (keyword.length < 3) {
        alert('please enter a longer keyword')
        return;
    } else {
        console.log(keyword);
    }

    // urls for ajax query, dynamically generated with user input:

    let query1 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source1 + '&pageSize=5&apiKey=' + APIkey + '';
    let query2 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source2 + '&pageSize=5&apiKey=' + APIkey + '';

    $.ajax({
            url: query1,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {

                // jQuery creating html elements from the response:

                let articleDivLeft = $('<div class="jumbotron" id="articleDivLeft">');
                let articleDiv = $("<div id='articleContent'" + i + ">");
                let sourceName = $('<h3 id="sourceName">').text(source1);
                let author = $('<h4 id="author">').text(response.articles[i].author);
                let datePublished = $('<h4 id="author">').text(response.articles[i].publishedAt);
                let wordCloudDiv = $('<div id="word-cloud">');
                let title = $("<h3 id='title'>");
                let article = $("<p id='content'>");

                // modifying the title and article elements:

                $(title).addClass("title");
                $(title).text(response.articles[i].title);
                $(article).addClass("article");
                $(article).text(response.articles[i].content);

                // appending the elements to the articleDiv:

                $(sourceName).appendTo(articleDiv);
                $(title).appendTo(articleDiv);
                $(author).appendTo(articleDiv);
                $(datePublished).appendTo(articleDiv);
                $(article).appendTo(articleDiv);
                $(wordCloudDiv).appendTo(articleDiv);

                // appending the div to the html:

                $(articleDiv).appendTo(articleDivLeft);
                $(articleDivLeft).appendTo('#left');

            }
        });

    $.ajax({
            url: query2,
            method: "GET"
        })

        .then(function (response) {

            console.log(response);

            for (let i = 0; i < response.articles.length; i++) {

                // jQuery creating html elements from the response:

                let articleDivRight = $('<div class="jumbotron" id="articleDivRight">');
                let articleDiv = $("<div id='articleContent'" + i + ">");
                let sourceName = $('<h3 id="sourceName">').text(source2);
                let author = $('<h4 id="author">').text(response.articles[i].author);
                let datePublished = $('<h4 id="author">').text(response.articles[i].publishedAt);
                let wordCloudDiv = $('<div id="word-cloud">');
                let title = $("<h3 id='title'>");
                let article = $("<p id='content'>");

                // modifying the title and article elements:


                $(title).addClass("title");
                $(title).text(response.articles[i].title);
                $(article).addClass("article");
                $(article).text(response.articles[i].content);

                // appending the elements to the articleDiv:

                $(sourceName).appendTo(articleDiv);
                $(title).appendTo(articleDiv);
                $(author).appendTo(articleDiv);
                $(datePublished).appendTo(articleDiv);
                $(article).appendTo(articleDiv);
                $(wordCloudDiv).appendTo(articleDiv);

                // appending the div to the html:

                $(articleDiv).appendTo(articleDivRight);
                $(articleDivRight).appendTo('#right');

            }
        });
});


// word cloud:

let width = 300;
let height = 300;
//let fill = d3.scaleOrdinal(d3.schemeCategory20);
let fill = d3.scale.category20();


d3.layout.cloud().size([300, 300])
    .words([
        "I", "love", "you"
    ].map(function (d) {
        return {
            text: d,
            size: 10 + Math.random() * 90
        };
    }))
    .padding(5)
    .rotate(function () {
        return ~~(
            Math.random() * 2
        ) * 90;
    })
    .font("Impact")
    .fontSize(function (d) {
        return d.size;
    })
    .on("end", draw)
    .start();

function draw(words) {
    d3.select("#word-cloud").append("svg")
        .attr("width", 300)
        .attr("height", 300)
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .selectAll("text")
        .style("font-size", function (d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function (d, i) {
            return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })

        .text(function (d) {
            return d.text;
        });

}