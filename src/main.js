//Drop down 

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

//Date range

const dateInput = document.getElementById('display-date');
const prevDay = document.getElementById('arrow-prev');
const nextDay = document.getElementById('arrow-next');

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}

function displayRange(date) {
    const nextDate = new Date(date); 
    nextDate.setDate(nextDate.getDate() + 1);
    return `${formatDate(date)} - ${formatDate(nextDate)}`;
}

dateInput.value = displayRange(new Date());

function adjustDate(days) {
    const [startDateString] = dateInput.value.split('-').map(part => part.trim());

    let currentDate = new Date(startDateString);

    currentDate.setDate(currentDate.getDate() + days);
    dateInput.value = displayRange(currentDate);
}


prevDay.addEventListener('click', () => adjustDate(-1));
nextDay.addEventListener('click', () => adjustDate(1));

//Saving/Displaying entries

let entries = JSON.parse(localStorage.getItem('sleepEntries')) || [];
const entriesContainer = document.getElementById('entries-container');


function renderEntries() {
    //Clear out existing HTML
    entriesContainer.innerHTML = '';

    //For each entry, add <div>
    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('sleep-entry');
        entryDiv.innerText = `Date: ${entry.dateRange} | Start: ${entry.startTime} | End: ${entry.endTime}`;
        entriesContainer.appendChild(entryDiv);
    });
}

//Call render initially (to show entries if they already exist in localStorage)
renderEntries();

const newEntryButton = document.getElementById('new-entry');

//Handle click -> gather data -> add entry -> save -> re-render
newEntryButton.addEventListener('click', () => {
    //Grab the current date range
    const dateRange = dateInput.value;

    //Grab start time from the dropdowns
    const startHour = document.querySelector('.start-time .input-hour .selected').innerText;
    const startMin = document.querySelector('.start-time .input-min .selected').innerText;
    const startAMPM = document.querySelector('.start-time .twelve-hour .selected').innerText;
    const startTime = `${startHour}:${startMin} ${startAMPM}`;

    //Grab end time from the dropdowns
    const endHour = document.querySelector('.end-time .input-hour .selected').innerText;
    const endMin = document.querySelector('.end-time .input-min .selected').innerText;
    const endAMPM = document.querySelector('.end-time .twelve-hour .selected').innerText;
    const endTime = `${endHour}:${endMin} ${endAMPM}`;

    //Make a new entry object
    const newEntry = {
        dateRange,
        startTime,
        endTime
    };

    //Push to our array in memory
    entries.push(newEntry);

    //Save the updated array to localStorage
    localStorage.setItem('sleepEntries', JSON.stringify(entries));

    //Re-render the list
    renderEntries();
});