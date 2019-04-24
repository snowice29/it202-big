$(document).ready(() => {

    // event for form submission
    $('#search').on('submit', (e) => {
        let text = $('#text').val();
        // function that takes the text from the form as a parameter and then returns the expected output, for example: where to watch a certain show/movie
        getContent(text);
        e.preventDefault();
    });
});

function onClick() {
    document.getElementById("doSearch");
}

let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImgURL = null;

let getConfig = function () {
    let url = "".concat(baseURL, 'configuration?api_key=', apiKey);
    fetch(url).then((result) => {
        return result.json();
    })
    .then((data) => {
        baseImgURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        runSearch('terminator')
    })
    .catch(function(err){
        alert(err);
    });
}

let runSearch = function(keyword){
    let url = ''.concat(baseURL, 'search/movie?api_key=', apiKey, '&query=', keyword);
    fetch(url).then(result=>result.json()).then((data)=>{
        document.getElementById('output').innerHTML = JSON.stringify(data,null,4);
    })
}
document.addEventListener('DOMContentLoaded', getConfig);

