const title = document.getElementById('title');
const artist = document.getElementById('artist');
const addBtn = document.getElementById('addBtn');
const ol = document.getElementById('songList');
const list = document.querySelector('#songList');
const hideBox = document.querySelector('#hide');

const searchBar = document.querySelector('#search');
const searchInput = searchBar.querySelector('input[type="search"]'); // Ensure we get the correct input element

// Prevent form submission when searching
searchBar.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
});

searchInput.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase(); 
    const songs = songList.getElementsByTagName('li'); 

    Array.from(songs).forEach(function (song) {
        const title = song.querySelector('p').textContent.toLowerCase(); 
        const artist = song.querySelector('small').textContent.toLowerCase(); 

        // Check if the title or artist contains the search term
        if (title.includes(term) || artist.includes(term)) { 
            song.style.display = 'flex'; // Show matching song
        } else {
            song.style.display = 'none'; // Hide non-matching song
        }
    });
});




addBtn.addEventListener('click', () => {
    // Get value from the input
    const newTitle = title.value; // Fixed typo from newTtitle to newTitle
    const newArtist = artist.value;

    // Create elements
    const p = document.createElement('p');
    const small = document.createElement('small');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const li = document.createElement('li');

    // Set value to the elements
    p.innerHTML = newTitle;
    small.innerHTML = newArtist;
    button.innerHTML = 'DELETE'

    // Add classes to elements
    p.classList.add('fw-bold');
    small.classList.add('fw-light');
    button.classList.add('delete','btn', 'btn-danger'); // Added btn-lg for larger button
    div.classList.add('ms-2', 'me-auto');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

    // Create container
    div.append(p);
    div.append(small);
    li.append(div);
    li.append(button);
    

    ol.append(li);

    console.log(ol);
});
hideBox.addEventListener('change',function(e){
    if(hideBox.checked){
        list.style.display = "none";
    }else{
        list.style.display = "initial";

    }
})

list.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.closest('li');
        list.removeChild(li);
    }
});


