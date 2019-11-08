const db = firebase.firestore();


$(document).ready(() => {


    const savedArticlesList = document.getElementById('Saved-Articles');
    // create element and render Saved Articles
    function renderArticles(doc) {
        let li = document.createElement('li');
        let headline = document.createElement('span');
        li.setAttribute('data-id', doc.id);
        headline.textContent = doc.data().Headline;

        li.appendChild(headline);
        savedArticlesList.appendChild(li);
    }
    // Getting Data
    db.collection('Articles').get().then((snapshot) => {
        // console.log(snapshot.docs);
        snapshot.docs.forEach(doc => {
            renderArticles(doc);
        })
    })

    //Saving data
    // const form = document.getElementById('addArt');
    // form.addEventListener('submit', (evt) => {
    //     evt.preventDefault();
    //     db.collection('Articles').add({
    //         headline: form.news.value // use "news" reenable text input if doesn't work. This is where I need to input information from news article that user wants to save.
    //     });
    //     form.news.value = '';
    // });

    $("#addArt").click(e => {
        console.log(e)
        e.preventDefault();
        // console.log($(this).attr("articleTitle"));

    })
})