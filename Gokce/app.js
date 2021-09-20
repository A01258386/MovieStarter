// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const movieHistoryCard = document.querySelector("#movieHistoryCard");
const filterInput = document.getElementById('filter');


const createMovieTable = () => {
    //Creates the foundation of the table element.
    const table = document.createElement('table');
    table.className = 'table';
    const tableHead = document.createElement('thead');
    const nameColumn = document.createElement('th');
    nameColumn.innerText = 'Movie';
    const watchedColumn = document.createElement('th');
    watchedColumn.innerText = 'Watched';
    tableHead.appendChild(nameColumn);
    tableHead.appendChild(watchedColumn);
    const tableBody = document.createElement('tbody');
    tableBody.setAttribute('id', 'history-body');
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    movieHistoryCard.appendChild(table);
}




const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
const movieHistory = JSON.parse(localStorage.getItem('movieHistory')) || [];

document.body.onload = () => {
    createMovieTable();
    drawMovies();
    drawHistory();
    createFilterResultBox();   
}


const syncHistory = () => {
    localStorage.setItem('movieHistory', JSON.stringify(movieHistory));
}
const syncMovieList = () => {
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

// Example of a simple function that clears the input after a user types something in
const clearInput = () => inp.value = "";

const clearMovies = () =>
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';

const inputValidator = (user_inp) => {
    //Checks if the user's input is empty 
    if (user_inp.length < 1) { //if the user's input is empty
        alert('Please enter an input'); //alerts the user 
        return false; //returns false
    }
    return true; //if the input is not empty, returns true
}



// This function is executed when the user clicks [ADD MOVIE] button.
const addMovie = () => {
    // Step 1: Get value of input
    let userTypedText = inp.value;
    userTypedText = userTypedText.toLowerCase();


    if (!inputValidator(userTypedText)) return;

    if (movieList.includes(userTypedText)) {
        movieHistory.forEach((movie) => {
            if (movie.name == userTypedText) {
                movie.watched++;
            }
        })
    } else {
        movieList.push(userTypedText);
        movieHistory.push({ name: userTypedText, watched: 1 });
    }

    syncMovieList();
    syncHistory()

    drawMovies();
    drawHistory();
    // Step 6: Call the clearInput function to clear the input field
    clearInput();
}

const drawMovies = () => {
    myMovieList.innerHTML = '';
    movieList.forEach((movie) => {
        // Step 2: Create an empty <li></li>
        const li = document.createElement("li"); // <li></li>

        // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
        const textToInsert = document.createTextNode(movie);

        // Step 4: Insert text into li
        // <li>Harry Potter </li>
        li.appendChild(textToInsert);

        // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
        myMovieList.appendChild(li);
    })
}

const drawHistory = () => {
    const historyTable = document.querySelector("#history-body");
    historyTable.innerHTML = '';
    movieHistory.forEach((history) => {
        historyTable.innerHTML += `<tr> <td>${history.name}</td> <td>${history.watched}</td> </tr>`;
    })
}

const createFilterResultBox = () => {
    const filterResultBox = document.createElement('div');
    filterResultBox.setAttribute('id', 'filterResultBox');
    filterResultBox.innerHTML = '<h3>Filter Result</h3>';
    filterInput.autocomplete = 'off';
    filterInput.parentNode.insertBefore(filterResultBox, filterInput.nextSibling);
}

const filterMovie = () => {
    const resultBox = document.querySelector('#filterResultBox');
    let filter = filterInput.value;
    filter.trim();
    if(filter.length < 1 || filter == "") {
        resultBox.innerHTML = "";
        return;
    }
    let filteredList = movieList.filter((movie) => {
         return movie.includes(filter);
    });
  
    resultBox.innerHTML = '';
    filteredList.forEach((movie) => {
        resultBox.innerHTML += `<li>${movie}</li>`;
    })
}

filterInput.onkeyup = filterMovie;

