const menu = document.querySelector('#songList');
const addBtn = document.querySelector('#addBtn');
const titleInput = document.querySelector('#title');
const artistInput = document.querySelector('#artist');
const editTitleInput = document.getElementById('editTitle');
const editArtistInput = document.getElementById('editArtist');
const editSongModal = new bootstrap.Modal(document.getElementById('editSongModal'));
const searchInput = document.querySelector('#searchInput');
const hideCheckbox = document.querySelector('#hide');

let songs = [];

const getData = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/songs");
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

const createSongItem = (song) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.setAttribute('data-id', song._id);

    li.innerHTML = `
        <div>
            <strong>Title:</strong> ${song.title} <br>
            <strong>Artist:</strong> ${song.artist}
        </div>
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-flex', 'gap-2');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => deleteSong(song._id);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-warning');
    editBtn.innerHTML = 'Edit';
    editBtn.onclick = () => editSong(song);

    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(editBtn);

    li.appendChild(buttonContainer);
    return li;
};

const addSongsToList = (songs) => {
    menu.innerHTML = '';
    songs.forEach(song => {
        const songItem = createSongItem(song);
        menu.appendChild(songItem);
    });
};

getData().then(fetchedSongs => {
    if (fetchedSongs && fetchedSongs.length > 0) {
        songs = fetchedSongs;
        addSongsToList(songs);
    } else {
        console.log("No songs found.");
    }
}).catch(err => {
    console.log(err);
});

const addSong = async (title, artist) => {
    try {
        const response = await fetch("http://localhost:4000/api/songs", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, artist }),
        });

        if (response.ok) {
            const newSong = await response.json();
            songs.push(newSong);
            addSongsToList(songs);

            Swal.fire({
                title: "Success!",
                text: "Song added successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            alert("Error adding song.");
        }
    } catch (error) {
        console.log(error);
    }
};

addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();

    if (title && artist) {
        addSong(title, artist);
        titleInput.value = '';
        artistInput.value = '';
    } else {
        alert("Please provide both title and artist.");
    }
});

hideCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => {
        return song.title.toLowerCase().includes(searchText) || song.artist.toLowerCase().includes(searchText);
    });
    addSongsToList(filteredSongs);
});

const deleteSong = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/api/songs/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    songs = songs.filter(song => song._id !== id);
                    addSongsToList(songs);

                    Swal.fire({
                        title: "Deleted!",
                        text: "The song has been deleted successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the song.",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error("Delete request failed:", error);
                Swal.fire({
                    title: "Server Error!",
                    text: "Failed to delete the song due to a server error.",
                    icon: "error",
                });
            }
        }
    });
};

const editSong = (song) => {
    currentSongId = song._id;
    editTitleInput.value = song.title;
    editArtistInput.value = song.artist;
    editSongModal.show();
};

saveEditBtn.onclick = async () => {
    const newTitle = editTitleInput.value.trim();
    const newArtist = editArtistInput.value.trim();

    if (newTitle && newArtist) {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to save these changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, save it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateSong(currentSongId, newTitle, newArtist);
                editSongModal.hide();
            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Please fill out both the title and artist fields.",
            icon: "error"
        });
    }
};

const updateSong = async (id, title, artist) => {
    try {
        const response = await fetch(`http://localhost:4000/api/songs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, artist }),
        });

        if (response.ok) {
            const updatedSong = await response.json();
            const songItem = document.querySelector(`[data-id='${id}']`);
            if (songItem) {
                const songDetails = songItem.querySelector('div');
                if (songDetails) {
                    songDetails.innerHTML = `
                        <strong>Title:</strong> ${updatedSong.title} <br>
                        <strong>Artist:</strong> ${updatedSong.artist}
                    `;
                }
            }

            Swal.fire({
                title: "Success!",
                text: "Song updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Failed to update the song.",
                icon: "error",
            });
        }
    } catch (error) {
        console.error("Error updating song:", error);
        Swal.fire({
            title: "Server Error!",
            text: "Failed to update the song due to a server error.",
            icon: "error",
        });
    }
};

