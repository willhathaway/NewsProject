// the api key for the news api:
let api_key = 'a93e9eaa48f8479c927c31d2e61713c0';

// universal variables for the query:
let logo1;
let logo2;
const commonStr = "i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";
const common = commonStr.trim().split(",");


// universal variables for the query:
let keyword = '';
let source1 = '';
let source2 = '';




// an array of objects to hold the information for constructing the query:

let sourceArray = [
    fox = {
        name: 'Fox News',
        url: 'foxnews.com',
        logo: '../NewsProject/assets/images/fox-news-logo.jpg'
    },
    nytimes = {
        name: 'The New York Times',
        url: 'nytimes.com',
        logo: '../NewsProject/assets/images/new-york-times-logo.jpg'
    },
    wsj = {
        name: 'The Wall Street Journal',
        url: 'wsj.com',
        logo: '../NewsProject/assets/images/wsj-logo.png'
    },
    huffpo = {
        name: 'The Huffington Post',
        url: 'huffpost.com',
        logo: '../NewsProject/assets/images/huffpost-logo.png'
    },
    bbc = {
        name: 'BBC News',
        url: 'bbc.co.uk',
        logo: '../NewsProject/assets/images/bbc-logo.gif'
    },
    aljazeera = {
        name: 'Al Jazeera',
        url: 'aljazeera.com',
        logo: '../NewsProject/assets/images/aljazeera-logo.png'
    }
];

// dynamically adds the sources to two dropdown menus:

$(document).ready(function () {

    for (let i = 0; i < sourceArray.length; i++) {

        $('#left').append('<option value="' + sourceArray[i].url + '" class="dropdown-item"' + ' id= ' + sourceArray[i].logo + '>' + sourceArray[i].name + '</option>'); //.val(sourceArray[i].url).text(sourceArray[i].name);
        $('#right').append('<option value="' + sourceArray[i].url + '" class="dropdown-item"' + ' id= ' + sourceArray[i].logo + '>' + sourceArray[i].name + '</option>');
    }

    for (let i = 0; i < 5; i++) {
        let compareDiv = $('<div class="jumbotron compare">');
        $(compareDiv).attr('id', "compareDiv" + i);
        $(compareDiv).appendTo('#articleDiv');
    }

});

// functions called when a source is chosen, assigns the source url to a variable for the ajax request:

function selectFunctionLeft(selection) {
    source1 = (selection.options[selection.selectedIndex].value);
    logo1 = (selection.options[selection.selectedIndex].id);
}

function selectFunctionRight(selection) {
    source2 = (selection.options[selection.selectedIndex].value);
    logo2 = (selection.options[selection.selectedIndex].id);
}

// on-click function to make an API request and display the response data in html:

$(document).on('click', '#searchBtn', function articleFunction(event) {

    event.preventDefault();

    console.log(source1);
    console.log(source2);
    console.log(logo1);
    console.log(logo2);

    // keyword taken from user input:

    keyword = $('#searchBar').val();

    // input validation checking for valid keyword input:

    function commonWord(w) {
        for (i = 0; i > common.length; i++) {
            if (w === common[i]) {
                return false;
            } else {
                return true;
            }
        }
    }

    if (keyword == '') {
        alert('please enter a keyword')
        return;
    } else if (keyword.includes(' ')) {
        alert('please enter only one word')
        return;
    } else if (keyword.length < 3) {
        alert('please enter a longer keyword')
        return;
    } else if (commonWord(keyword) === false) {
        alert('please enter a different keyword')
        return;
    } else {
        console.log(keyword);
    }

    // input validation for valid source selection:

    if (source1 === '') {
        alert('please select a source');
        return;
    } else if (source2 === '') {
        alert('please select a source');
        return;
    } else {

        // urls for ajax query, dynamically generated with user input:

        let query1 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source1 + '&pageSize=5&apiKey=' + api_key + '';
        let query2 = 'https://newsapi.org/v2/everything?language=en&qinTitle=' + keyword + '&domains=' + source2 + '&pageSize=5&apiKey=' + api_key + '';

        $.ajax({
            url: query1,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);

                for (let i = 0; i < 5; i++) {

                    // jQuery creating html elements from the response:

                    let articleDivLeft = $('<div class="jumbotron parent" id="articleDivLeft">');
                    let logoImg = $('<img src=' + logo1 + ' class="logoImg">');
                    let articleContent = $("<div id='articleContent'" + i + ">");
                    let sourceName = $('<a id="sourceName" href=' + source1 + '>');
                    let author = $('<h4 id="author">').text(response.articles[i].author);
                    let datePublished = $('<h4 id="author">').text(response.articles[i].publishedAt);
                    let wordCloudDiv = $('<div class="child"id="word-cloud">');
                    let title = $("<a id='title' href=" + response.articles[i].url + ">");
                    let article = $("<p id='content'>");
                    


                    // modifying the title and article elements:

                    $(title).addClass("title");
                    $(title).text(response.articles[i].title);
                    $(article).addClass("article");
                    $(article).text(response.articles[i].content);
                    $(logoImg).append(logo1);

                    // appending the elements to the articleDiv:

                    $(logoImg).appendTo(articleContent);
                    $(sourceName).appendTo(articleContent);
                    $(title).appendTo(articleContent);
                    $(author).appendTo(articleContent);
                    $(datePublished).appendTo(articleContent);
                    $(article).appendTo(articleContent);
                    $(wordCloudDiv).appendTo(articleContent);

                    // appending the div to the html:

                    let target = ('#compareDiv' + i);
                    console.log(target);

                    $(articleContent).appendTo(articleDivLeft);
                    $(articleDivLeft).appendTo(target);

                }
            });

        $.ajax({
            url: query2,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);

                for (let i = 0; i < 5; i++) {

                    // jQuery creating html elements from the response:

                    let articleDivRight = $('<div class="jumbotron parent" id="articleDivRight">');
                    let logoImg = $('<img src=' + logo2 + ' class="logoImg">');
                    let articleContent = $("<div id='articleContent'" + i + ">");
                    let sourceName = $('<a id="sourceName" href=' + source2 + '>');
                    let author = $('<h4 id="author">').text(response.articles[i].author);
                    let datePublished = $('<h4 id="author">').text(response.articles[i].publishedAt);
                    let wordCloudDiv = $('<div class= "child" id="word-cloud">');
                    let title = $("<a id='title' href=" + response.articles[i].url + ">");
                    let article = $("<p id='content'>");

                    // modifying the title and article elements:


                    $(title).addClass("title");
                    $(title).text(response.articles[i].title);
                    $(article).addClass("article");
                    $(article).text(response.articles[i].content);
                    $(logoImg).append(logo2);

                    // appending the elements to the articleDiv:

                    $(logoImg).appendTo(articleContent);
                    $(sourceName).appendTo(articleContent);
                    $(title).appendTo(articleContent);
                    $(author).appendTo(articleContent);
                    $(datePublished).appendTo(articleContent);
                    $(article).appendTo(articleContent);
                    $(wordCloudDiv).appendTo(articleContent);

                    // appending the div to the html:

                    let target = ('#compareDiv' + i);
                    console.log(target);

                    $(articleContent).appendTo(articleDivRight);
                    $(articleDivRight).appendTo(target);

                }
            });
    }
});


// word cloud:

let text_string = "Sing in me, Muse, and through me tell the story of that man skilled in all ways of contending, the wanderer, harried for years on end, after he plundered the stronghold on the proud height of Troy. He saw the townlands and learned the minds of many distant men, and weathered many bitter nights and days in his deep heart at sea, while he fought only to save his life, to bring his shipmates home.";

drawWordCloud(text_string);

function drawWordCloud(text_string) {
    var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

    var word_count = {};

    var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    if (words.length == 1) {
        word_count[words[0]] = 1;
    } else {
        words.forEach(function (word) {
            var word = word.toLowerCase();
            if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
                if (word_count[word]) {
                    word_count[word]++;
                } else {
                  word_count[word] = 1;
                }
              }
            })
          }

        var svg_location = "#chart";
        var width = $('#word-cloud').width();
        var height = $('#word-cloud').height();

        var fill = d3.scale.category20();

    var svg_location = "#chart";
    var width = $('#word-cloud').width();
    var height = $('#word-cloud').height();

    var fill = d3.scale.category20();

    var word_entries = d3.entries(word_count);

    var xScale = d3.scale.linear()
        .domain([0, d3.max(word_entries, function (d) {
            return d.value;
        })
        ])
        .range([10, 100]);

    d3.layout.cloud().size([width, height])
        .timeInterval(20)
        .words(word_entries)
        .fontSize(function (d) { return xScale(+d.value); })
        .text(function (d) { return d.key; })
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select(svg_location).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return xScale(d.value) + "px"; })
            .style("font-family", "Impact")
            .style("fill", function (d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.key; });
    }

    d3.layout.cloud().stop();
}

let wordCloudTest = $('<div>');
wordCloudTest.append(drawWordCloud(text_string));
$('#meow').append(wordCloudTest);

