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