// bnmsk al3naser eli fe HTML



const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const addBtn = document.getElementById("addBtn");
const searchElement = document.getElementById("searchElement");
const tableBody = document.getElementById("tableBody");



// mot8rat sabta 


let bookMarks = [];
let mainIndex = 0;
displayBook();


// regular Expration 3la name w URL


const nameRegex = /^[A-Za-z_]{1,}$/

const isNameValid = () => nameRegex.test(nameInput.value);

const urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]/



// Fun validation 3la name w URL

function isUrlValid() {

    return urlRegex.test(urlInput.value);
}

nameInput.onkeyup = function() {
    if (isUrlValid() && isNameValid()) {
        addBtn.removeAttribute("disabled");
    } else {
        addBtn.disabled = "true";
    }
}

urlInput.onkeyup = function() {
    if (isUrlValid() && isNameValid()) {
        addBtn.removeAttribute("disabled");
    } else {
        addBtn.disabled = "true";
    }
}


// Fun 3lshan t7fz el Data ali gaya

addBtn.onclick = function() {
    const bookMark = {
        name: nameInput.value,
        url: urlInput.value
    }
    if (addBtn.innerHTML == "Update") {
        addBtn.innerHTML = "Submit";
        bookMarks.splice(mainIndex, 1, bookMark);
    } else {
        bookMarks.push(bookMark);
    }

    chrome.storage.sync.set({
        bookMarks
    });
    displayBook();
    clearData();
}


// un 3lshan t3rd aldata ali gaya w button update w Delete
function displayBook() {
    chrome.storage.sync.get("bookMarks", (data) => {
        tableBody.innerHTML = "";
        bookMarks = data.bookMarks;
        for (let i = 0; i < data.bookMarks.length; i++) {
            const bookMark = data.bookMarks[i];
            if (bookMark) {
                tableBody.innerHTML += `
                            <tr>
                            <td>${bookMark.name}</td>
                            <td><a href="${bookMark.url}" target="_blank" class="inp-color">Visit</a></td>
                            <td><button id="update-book-${i}" class="inp-color">Update</button></td>
                            <td><button id="delete-book-${i}" class="inp-color">Delete</button></td>
                            </tr>
                            `;
                const updateBookKey = document.getElementById(`update-book-${i}`);
                updateBookKey.addEventListener('click', function() {
                    updateBook(i);
                });
                const deleteBookKey = document.getElementById(`delete-book-${i}`);
                deleteBookKey.addEventListener('click', function() {
                    deleteBook(i);
                });

            }
        }
    });
}


// fun btms7 el Data ali mwgoda fe <td>
function deleteBook(index) {
    console.log(bookMarks);
    bookMarks.splice(index, 1);
    chrome.storage.sync.set({ bookMarks });
    displayBook();
}



// Fun 3lshan b3d ma ados 3la Submit y5ali name w URL faden
function clearData() {
    nameInput.value = "";
    urlInput.value = "";
}


// fun 3lshan lw 3wz a3mel Upadete ll Data ali 7ttha
function updateBook(index) {
    console.log(bookMarks, index);
    if (bookMarks.length == 0) return;
    if (bookMarks[index]) {
        nameInput.value = bookMarks[index].name;
        urlInput.value = bookMarks[index].url;
        addBtn.innerHTML = "Update";
        mainIndex = index;
    }


}




// 3lshan lw msh 3ref akr2 al Name 
document
    .getElementById('submit')
    .addEventListener('click', function() {
        const msg = document.getElementById("name").value;
        const speech = new SpeechSynthesisUtterance();

        speech.lang = "en-US";
        speech.text = msg;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    });