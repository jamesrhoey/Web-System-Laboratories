const title = document.getElementById('title');
const artist = document.getElementById('artist');
const addBtn = document.getElementById('addBtn');
const ol = document.getElementById('songList');

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
    button.classList.add('btn', 'btn-danger'); // Added btn-lg for larger button
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
