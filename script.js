const colleagues = []

const gd = (v) => {
    return document.getElementById(v);
};

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    return null;
}



let visited = getCookie("visited")
if(!visited){
    var date = new Date();
    date.setFullYear(date.getFullYear() + 100);
    document.cookie = "visited=false; expires=" + date.toUTCString() + "; path=/";

    tutorialsForUserDetails()
}
else if(visited === "false"){
    tutorialsForUserDetails()
}



let addInfo = true

const animation_addColleague = async () => {

    const mainForm = gd("mainForm");

    // Apply disintegration animation
    mainForm.style.animation = 'disintegrateAnimation 0.5s ease forwards';

    // Set a timeout slightly longer than the animation duration
    await new Promise(resolve => setTimeout(resolve, 600));

    // Reset the form after animation completes
    mainForm.style.animation = '';
    mainForm.style.opacity = '1'; // Ensure the form is visible
    mainForm.style.animation = 'reintegrateAnimation 0.5s ease forwards';

    if(addInfo){

        const info = document.createElement('div')
        info.innerHTML = `
            <span class="label">If you don't wish to add more colleagues please click on "Next"</span>
        `
        info.className = "info"

        mainForm.append(info)

        addInfo = false
    }



    getDetails()

};

const resetFields = () => {
    const mainForm = gd("mainForm");

    // Reset all input fields
    const inputFields = mainForm.querySelectorAll('input');
    inputFields.forEach(input => {
        if (input.type === 'text') {
            input.value = '';
        } else if (input.type === 'radio') {
            input.checked = false; // Uncheck radio buttons
        }
    });
};

const getDetails = () => {
    const mainForm = gd("mainForm");

    // Retrieve input values
    const name = mainForm.querySelector('.name').value;
    const jobTitle = mainForm.querySelector('.jobTitle').value;
    const costCenter = mainForm.querySelector('.costCenter').value;
    const reason = mainForm.querySelector('.reason').value

    // Retrieve selected radio button values
    const transferInlandRadios = mainForm.querySelectorAll('input[name="transferInlandRadio"]');
    let transferInland = '';
    transferInlandRadios.forEach(radio => {
        if (radio.checked) {
            transferInland = radio.value;
        }
    });

    const transferOtherCountryRadios = mainForm.querySelectorAll('input[name="transferOtherCountryRadio"]');
    let transferOtherCountry = '';
    transferOtherCountryRadios.forEach(radio => {
        if (radio.checked) {
            transferOtherCountry = radio.value;
        }
    });

    // Construct object with form details
    const colleagueDetails = {
        name: name,
        jobTitle: jobTitle,
        costCenter: costCenter,
        transferInland: transferInland,
        transferOtherCountry: transferOtherCountry,
        reason: reason
    };

    // Push details to the colleagues array
    colleagues.push(colleagueDetails);

    
    resetFields();
    
};


const checkFormCompletion = () => {
    const mainForm = document.getElementById("mainForm");
    let isValid = true;

    // Reset all input fields and textarea borders
    mainForm.querySelectorAll('input[type="text"], textarea').forEach(element => {
        element.classList.remove('invalid-input');
    });

    // Reset radio buttons containers borders
    mainForm.querySelectorAll('.radioButtons').forEach(container => {
        container.classList.remove('invalid-input');
    });

    // Check text input fields and textarea
    const textInputs = mainForm.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('invalid-input'); // Add class to highlight invalid input
            isValid = false;
        }
    });

    // Check radio buttons
    mainForm.querySelectorAll('input[type="radio"]').forEach(radio => {
        const groupName = radio.getAttribute('name');
        const radiosInGroup = mainForm.querySelectorAll(`input[name="${groupName}"]`);
        let checked = false;

        radiosInGroup.forEach(radioInGroup => {
            if (radioInGroup.checked) {
                checked = true;
            }
        });

        if (!checked) {
            const container = radio.closest('.radioButtons');
            container.classList.add('invalid-input'); 
            isValid = false;
        }
    });

    return isValid;
};




const addColleague = async () => {
    if(checkFormCompletion()){
        await animation_addColleague();
        displayAddedColleages()
    }
    else{
        
    }

   
    
};

const calendarGrid = document.getElementById('calendarGrid');
const currentMonthYear = document.getElementById('currentMonthYear');

let startDate = null;
let endDate = null;

function changeMonth(delta) {
currentMonth += delta;
if (currentMonth === 12) {
currentMonth = 0;
currentYear++;
} else if (currentMonth === -1) {
currentMonth = 11;
currentYear--;
}
generateCalendar(currentMonth, currentYear);
}

function generateCalendar(month, year) {
const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = new Date(year, month, 1).getDay();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Clear previous calendar
calendarGrid.innerHTML = '';

// Update current month and year display
currentMonthYear.textContent = `${monthNames[month]} ${year}`;

// Generate HTML for days before the first day of the month
for (let i = 0; i < firstDayOfMonth; i++) {
const emptyDay = document.createElement('div');
emptyDay.classList.add('calendar-day', 'empty');
calendarGrid.appendChild(emptyDay);
}

for (let i = 1; i <= daysInMonth; i++) {
const calendarDay = document.createElement('div');
calendarDay.classList.add('calendar-day');
calendarDay.textContent = i;
calendarDay.addEventListener('click', () => handleDateSelection(new Date(year, month, i)));
calendarGrid.appendChild(calendarDay);
}

updateCalendar();
}

function handleDateSelection(selectedDate) {

let visited = getCookie("visited")
if(tutorialBoxIndex === 3 || tutorialBoxIndex === 4){
    if(!visited){
      
        displayTutorial()
        
    }
    else if(visited === "false"){
        displayTutorial()
    }
  
}






// If no start date is selected or both start and end dates are already selected
if (!startDate || (startDate && endDate)) {
startDate = selectedDate;
endDate = null; // Reset the end date
} else if (selectedDate < startDate) {
// If a date earlier than the start date is selected
endDate = startDate;
startDate = selectedDate;
} else {
// If a date later than the start date is selected
endDate = selectedDate;
}



// Update calendar immediately after selection
updateCalendar();

if (!gd("detailSaveButton").innerHTML.includes('Visszaút')) {

const travelTitle = gd("travelTitle")
travelTitle.innerHTML = `<div id="travelTitleLayout">Day of return <span id="titleDate">(${formatDate(endDate)})</span></div>`
} 
else {

const travelTitle = gd("travelTitle")
travelTitle.innerHTML = `<div id="travelTitleLayout">Day of departure <span id="titleDate">(${formatDate(startDate)})</span></div>`

}

}



function updateCalendar() {

// Loop through each day in the calendar
document.querySelectorAll('.calendar-day').forEach(day => {
const dayDate = new Date(currentYear, currentMonth, parseInt(day.textContent));

// Check if the day is the current start date
if (startDate && isSameDay(dayDate, startDate)) {
    // Add class to mark the start date
    day.classList.add('selected-start');
} else {
    // Remove the selected-start class if the day is not the current start date
    day.classList.remove('selected-start');
}

// Check if the day is the end date
if (endDate && isSameDay(dayDate, endDate)) {
    // Add class to mark the end date
    day.classList.add('selected-end');
} else {
    // Remove the selected-end class if the day is not the end date
    day.classList.remove('selected-end');
}

// Check if the day falls within the selected range
if (startDate && endDate && dayDate > startDate && dayDate < endDate) {
    // Add class to mark dates in between start and end date
    day.classList.add('selected-range');
} else {
    // Remove the selected-range class if the day is not within the selected range
    day.classList.remove('selected-range');
}
});
}


function isSameDay(date1, date2) {
return (
date1.getFullYear() === date2.getFullYear() &&
date1.getMonth() === date2.getMonth() &&
date1.getDate() === date2.getDate()
);
}


// Initialize calendar with current month and year
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Function to switch to the calendar view
function selectDate() {


if(checkFormCompletion()){
getDetails()
}


if(colleagues.length<1){

return;
}

mainForm.style.display = "none";
calendarView.style.display = "flex"; 
generateCalendar(currentMonth, currentYear);
$("#fromWhere").countrySelect({
defaultCountry: "hu",
preferredCountries: ['hu', 'de'],
responsiveDropdown: true,
localizedCountries: {
'hu': 'Hungary',
'de': 'Germany'
}
});

$("#whereTo").countrySelect({
defaultCountry: "de",
preferredCountries: ['hu', 'de'],
responsiveDropdown: true,
localizedCountries: {
'hu': 'Hungary',
'de': 'Germany'
}
});

let visited = getCookie("visited")
if(!visited){

    displayTutorial()
    
}
else if(visited === "false"){
    displayTutorial()
}









}



let saveIndex = 0;

const handle_saveDate = () => {
const saveButton = gd("detailSaveButton");
const saveHTML = `<i class="fa-solid fa-bookmark"></i>Mentés`;
const nextHTML = `<i class="fa-solid fa-angles-right"></i>Visszaút`;

const departureCountry = $("#fromWhere").countrySelect("getSelectedCountryData").iso2;
const arrivalCountry = $("#whereTo").countrySelect("getSelectedCountryData").iso2;

$("#fromWhere").countrySelect("selectCountry", arrivalCountry);
$("#whereTo").countrySelect("selectCountry", departureCountry);

// Toggle button text
if (saveIndex % 2 != 0) {

saveButton.innerHTML = saveHTML;


} else {
saveButton.innerHTML = nextHTML;



}
};

const travelData = [];


const saveTime = () => {

if(travelData.length === 4){
alert("You can enter a maximum of two trips.")
return
}


const departureTimeInput = gd("fromWhere_time");
const arrivalTimeInput = gd("whereTo_time");


const departureCountryData = $("#fromWhere").countrySelect("getSelectedCountryData");
const arrivalCountryData = $("#whereTo").countrySelect("getSelectedCountryData");


if (!departureTimeInput.value.trim() || !arrivalTimeInput.value.trim() || !departureCountryData || !arrivalCountryData) {
// Shake the empty input fields
departureTimeInput.classList.add('shake', 'invalid-input');
arrivalTimeInput.classList.add('shake', 'invalid-input');

departureTimeInput.classList.add('invalid-input');
arrivalTimeInput.classList.add('invalid-input');

// Shake the radio buttons container
document.querySelector('.travelType').classList.add('shake', 'invalid-input');

// Delay the removal of the shake animation and error borders
setTimeout(() => {
    departureTimeInput.classList.remove('shake', 'invalid-input');
    arrivalTimeInput.classList.remove('shake', 'invalid-input');
    document.querySelector('.travelType').classList.remove('shake', 'invalid-input');
}, 1000);

return; // Exit the function early if any input is empty
}

if (!document.querySelector('input[name="travelOption"]:checked')) {
// Shake the radio buttons container
document.querySelector('.travelType').classList.add('shake', 'invalid-input');

// Delay the removal of the shake animation
setTimeout(() => {
    document.querySelector('.travelType').classList.remove('shake', 'invalid-input');
}, 1000);

return; // Exit the function early if travel type is not selected
}

if (!startDate || !endDate) {
alert("Please mark your departure and arrival dates in the calendar!");
return;
}





const validation = validateTimes(departureTimeInput.value,arrivalTimeInput.value,startDate,endDate)

if(validation === false){
return;
}

// If all inputs are filled, proceed with saving the data
const travelType = document.querySelector('input[name="travelOption"]:checked').value;

const fromWhere_city = gd("fromWhere_city").value
const whereTo_city = gd("whereTo_city").value


travelData.push({
departureTime: departureTimeInput.value,
departureCountry: departureCountryData.name,
departureFlag: departureCountryData.iso2,
arrivalTime: arrivalTimeInput.value,
arrivalCountry: arrivalCountryData.name,
arrivalFlag: arrivalCountryData.iso2,
travelType: travelType,
date: travelData.length%2==0? formatDate(startDate):formatDate(endDate),
fromWhere_city: fromWhere_city,
whereTo_city: whereTo_city,


});

// Clear input fields
departureTimeInput.value = "";
arrivalTimeInput.value = "";
saveIndex++;

handle_saveDate();

if (saveIndex % 2 === 0) {
generateTicket();
}


if(tutorialBoxIndex === 5 || tutorialBoxIndex == 6){
    let visited = getCookie("visited")
    if(!visited){
       

        showTutorialBox()
    }
    else if(visited === "false"){
        showTutorialBox()
    }

}


if (!gd("detailSaveButton").innerHTML.includes('return')) {

const travelTitle = gd("travelTitle")
travelTitle.innerHTML = `<div id="travelTitleLayout">Day of return <span id="titleDate">(${formatDate(endDate)})</span></div>`
} 
else {

const travelTitle = gd("travelTitle")
travelTitle.innerHTML = `<div id="travelTitleLayout">Day of departure<span id="titleDate">(${formatDate(startDate)})</span></div>`

}


switchCities()



};

const switchCities = () =>{

const fromWhere= gd("fromWhere_city")
const whereTo = gd("whereTo_city")
const temp = fromWhere.value

fromWhere.value = whereTo.value
whereTo.value = temp





}


const validateTimes = (departureTime,arrivalTime,endDate,startDate) =>{

const [depHours, depMinutes] = departureTime.split(':').map(Number);
const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);

const totalDepartureMinutes = depHours * 60 + depMinutes;
const totalArrivalMinutes = arrHours * 60 + arrMinutes;

const differenceInMinutes = totalArrivalMinutes - totalDepartureMinutes;


const endDateTime = new Date(endDate);
const startDateTime = new Date(startDate);



if(departureTime>arrivalTime && endDateTime!=startDateTime){
alert("Az indulási idő nem lehet később, mint az érkezés")
return false
}

if(differenceInMinutes === 0 && endDateTime!=startDateTime){
    alert("The departure date and time cannot be the same as the arrival date and time at the same time.")
    return false
}


if (endDateTime.getTime() === startDateTime.getTime()) {
if(differenceInMinutes === 0){
    alert("The departure date and time cannot be the same as the arrival date and time at the same time.")
    return false
}
}

if(differenceInMinutes<50){
const alert = confirm(`Is it really ${differenceInMinutes} minutes?`)
if(alert === true){
    return true
}
else{
    return false
}

}



}

const generateTicket = () => {
const tickets = gd("tickets");
const ticket = document.createElement('div');
ticket.className = "ticket";

// Get the flag URLs from the provided website
const departureFlagURL1 = `https://flagicons.lipis.dev/flags/4x3/${travelData[saveIndex-2].departureFlag.toLowerCase()}.svg`;
const arrivalFlagURL1 = `https://flagicons.lipis.dev/flags/4x3/${travelData[saveIndex-2].arrivalFlag.toLowerCase()}.svg`;
const departureFlagURL2 = `https://flagicons.lipis.dev/flags/4x3/${travelData[saveIndex-1].departureFlag.toLowerCase()}.svg`;
const arrivalFlagURL2 = `https://flagicons.lipis.dev/flags/4x3/${travelData[saveIndex-1].arrivalFlag.toLowerCase()}.svg`;

// Create inner HTML for the ticket
const ticketHTML = `
<div class="ticketContent">
    <div class="travelSummary">
        ${carOrPlane(travelData[saveIndex-2].travelType,saveIndex-2)}
        <span class="label">${formatDate(startDate)}</span>
       
        <div class="countryDetails">
            <div class="ticketColumn">
                <div class="flag">
                  
                    <img src="${departureFlagURL1}" alt="${travelData[saveIndex-2].departureFlag}">
                    <div class="time">${travelData[saveIndex-2].departureTime}</div>
                </div>
            </div>
            <div class="ticketColumn">
                <div class="flag">
                    <img src="${arrivalFlagURL1}" alt="${travelData[saveIndex-2].arrivalFlag}">
                    <div class="time">${travelData[saveIndex-2].arrivalTime}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="travelSummary">
        ${carOrPlane(travelData[saveIndex-1].travelType,saveIndex-1)}
        <span class="label">${formatDate(endDate)}</span>
        
        <div class="countryDetails">
            <div class="ticketColumn">
                <div class="flag">
                    <img src="${departureFlagURL2}" alt="${travelData[saveIndex-1].departureFlag}">
                    <div class="time">${travelData[saveIndex-1].departureTime}</div>
                </div>
            </div>
            <div class="ticketColumn">
                <div class="flag">
                    <img src="${arrivalFlagURL2}" alt="${travelData[saveIndex-1].arrivalFlag}">
                    <div class="time">${travelData[saveIndex-1].arrivalTime}</div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// Set inner HTML of the ticket div
ticket.innerHTML = ticketHTML;

tickets.append(ticket);

if(saveIndex<3){

const mainContainer = gd("mainContainer")

const ticketActionsContainer = document.createElement('div')
ticketActionsContainer.classList = "ticketActionsContainer"

const ticketSaveButton = document.createElement('div')

ticketSaveButton.innerHTML = `
<div class="button" onclick="checkBeforeSubmit()" id="checkButton">Ellenőrzés</div>
`
ticketActionsContainer.append(ticketSaveButton)

mainContainer.append(ticketActionsContainer)
}


};

function formatDate(date) {
try{
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
}
catch{
return ""
}

}

const carOrPlane= (type,index) =>{
if(type === "car"){
    return `<i class="fa-solid fa-car-side"></i>`
}
else{
    if(index%2===0){
        return `<i class="fa-solid fa-plane"></i>`
    }
    else{
        return `<i class="fa-solid fa-plane mirror"></i>`
    } 


}
}


const checkBeforeSubmit = () => {
gd("checkButton").style.display = "none"

const tickets = gd("tickets").innerHTML;
gd("tickets").style.display = "none";

const calendarView = gd("calendarView");
calendarView.style.display = "none";

const colleagueCards = document.createElement('div');
colleagueCards.classList = "colleagueCards"

colleagues.forEach(colleague => {
colleagueCards.append(colleagueCard(colleague));
});

colleagueCards.innerHTML+=`<div class="button" id="submitButton" onclick="submit()"><i class="fa-regular fa-paper-plane"></i>
Submit</div>`

const checkBlock = document.createElement('div');
checkBlock.classList = "checkBlock";
checkBlock.id = "checkBlock"

checkBlock.appendChild(colleagueCards);
checkBlock.innerHTML += tickets;


const mainContainer = gd("mainContainer");
mainContainer.append(checkBlock);

if(tutorialBoxIndex == 7){
    let visited = getCookie("visited")
    if(!visited){
        

        displayTutorial()
    }
    else if(visited === "false"){
        displayTutorial()
    }

}
}



const colleagueCard = (colleague) => {
const card = document.createElement('div');
card.classList = "colleagueCard";

const html = `
<span class="label labelTitle">${colleague.name}</span>
<span class="label">${displayInland(colleague.transferInland)}</span>
<span class="label">${displayOutTransfer(colleague.transferOtherCountry)}</span>
`;


card.innerHTML = html;

return card;
}

const displayInland = (value) =>{
if(value === "true"){
return `<i class="fa-solid fa-check check_yes"></i> 
        <span class="label">Transfer inland</span>`
}
else if(value === "false"){
return `<i class="fas fa-times icon check_no"></i></i>
        <span class="label">Transfer abroad</span>`
}
else{
return `
<i class="fa-solid fa-car-side check_company"></i>
<span class="label">Company car</span>`
}
}

const displayOutTransfer = (value) =>{
if(value === "true"){
return `<i class="fa-solid fa-check check_yes"></i> 
        <span class="label">Transfer abroad</span>`
}
else{
return `<i class="fas fa-times icon check_no"></i></i>
        <span class="label">Transfer abroad</span>`
}

}

const handleUserSearch = () =>{
const userResults = gd("userResults")
userResults.style.display = "none"

const name = gd("user0_name").value

site_getUserProfileProperties(
    "sharepointSite.com/yoursite",
    function(result) {
    userProperties =  result

    const department = result.DepartmentNumber
    const jobTitle = result.SPS_JobTitle

    gd("user0_jobTitle").value = jobTitle
    gd("user0_costCenter").value = department

}, name);



}
const submit = async() => {
const checkBlock = gd("checkBlock");
checkBlock.style.display = "none";

const mainContainer = gd("mainContainer");

// Add the loading container
const loadingContainer = document.createElement('div');
loadingContainer.className = 'loadingContainer';

if (travelData[0].travelType === "plane") {
const planeFlying = document.createElement('div');
planeFlying.className = "planeFlying";
planeFlying.innerHTML = `
    <img src="https://static.vecteezy.com/system/resources/previews/014/493/371/original/passenger-plane-flying-in-the-sky-side-view-travel-concept-png.png" alt="planeFlying">
`;
loadingContainer.appendChild(planeFlying);
} else {
// Set the dimensions and background image for the main container
mainContainer.style.width = "550px";
mainContainer.style.height = "250px";
mainContainer.style.backgroundImage = "url('https://images.squarespace-cdn.com/content/v1/54bc6cffe4b0fee4b02bd3c5/1520533858653-EL1OZQBC1PR49D66FES8/Highway-5-animation-studio-sophy.gif')";
mainContainer.style.backgroundSize = "cover";
mainContainer.style.backgroundPosition = "center";
mainContainer.style.backgroundRepeat = "no-repeat";

}

mainContainer.appendChild(loadingContainer);

// Apply background animation to the main container
mainContainer.classList.add('loading');


try{

await saveTravelData() 

}
catch(err){
console.log(err)
return 
}


mainContainer.innerHTML = ``

mainContainer.classList.remove('loading');

mainContainer.style.backgroundImage = "none";
mainContainer.style.backgroundSize = "initial";
mainContainer.style.backgroundPosition = "initial";
mainContainer.style.backgroundRepeat = "initial";

mainContainer.style.width = "fit-content"
mainContainer.style.height = "fit-content"


const successContainer = document.createElement('div')
successContainer.className = "success"
successContainer.innerHTML = `
<i class="fa-solid fa-square-check"></i>
<span class="label">Travel request successfully sent.</span>

`



mainContainer.append(successContainer)





};



const EventListeners = () =>{
const user = gd("user0_name")
const userResults = gd("userResults")
user.addEventListener('input',(e)=>{
if(e.target.value!=""){
    userResults.style.display = "block"
}
else{
    userResults.style.display = "none"
}
})
}

EventListeners()



const highlight = (e) =>{

let element = gd(e)

if(!element){
   element = document.getElementsByClassName(e)[0]
   element.classList.add("highlighted")
}
else{
    element.classList.add("highlighted")
}



} 


const hideTutorial = (currentBoxID,boxIndex) =>{

const box = gd(currentBoxID)
box.remove()

let highlightedElement = gd(tutorials[boxIndex].highlight)

if(!highlightedElement){
    highlightedElement = document.getElementsByClassName(tutorials[boxIndex].highlight)[0]
}

highlightedElement.classList.remove("highlighted")

}


let tutorialBoxIndex = 0

function showTutorialBox() {
// Remove previous tutorial box if exists
if (tutorialBoxIndex > 0) {
const previousBox = document.getElementById(`tutorialBox${tutorialBoxIndex - 1}`);
if (previousBox) {
    previousBox.remove();
}
}

let targetElement = document.getElementById(tutorials[tutorialBoxIndex].name);

if (!targetElement) {
targetElement = document.getElementsByClassName(tutorials[tutorialBoxIndex].name)[0];
}

if (!targetElement) {
console.error(`Element '${tutorials[tutorialBoxIndex].name}' not found.`);
return;
}

// Create the box element dynamically
const box = document.createElement('div');
const boxIndex = tutorialBoxIndex; // Store current index for dynamic ID
box.id = `tutorialBox${boxIndex}`;
box.innerHTML = tutorials[boxIndex].content;
box.classList.add("tutorialBox");

highlight(tutorials[boxIndex].highlight)

// Append the box element to the body
document.body.appendChild(box);

// Get position and dimensions of the target element
const targetRect = targetElement.getBoundingClientRect();

// Set position of the box directly over the target element
const boxLeft = targetRect.left + window.pageXOffset; // Account for horizontal scroll
const boxTop = targetRect.top + window.pageYOffset; // Account for vertical scroll

// Set position of the box
box.style.right = `${boxLeft}px`;
box.style.top = `${boxTop}px`;
box.style.display = 'block'; // Display the box

// Create and append the close button
const infoBoxButton = document.createElement('div');
infoBoxButton.classList = "button";
infoBoxButton.innerText = "Értem!";
infoBoxButton.onclick = () => {
hideTutorial(`tutorialBox${boxIndex}`, boxIndex);
};
box.appendChild(infoBoxButton);

tutorialBoxIndex++;
}


const tutorials = [
{
step: 0,
content: `
    First, provide the colleague's name. 📝 The position and cost center will be automatically filled in based on the selected colleague.
`,
name: "userDetails",
highlight: "userDetails"
},
{
step: 1,
content: `
    If multiple colleagues are traveling together, you can add more colleagues to the request using the "Add" button ➕. 
    If you don't want to add more colleagues, proceed to the next step with the "Next" button ➡️ (after filling out the required information).
`,
name: "buttonContainer",
highlight: "buttonContainer"
},
{
step: 2,
content: `
    First, select the departure date! 📅
`,
name: "calendar",
highlight: "calendar"
},
{
step: 3,
content: `
    Now, select the return date! If it's the same as the departure date, you can click the same date twice. 📆
`,
name: "calendar",
highlight: "calendar"
},
{
step: 4,
content: `
    Great! 👏 <br>You've set the departure and return dates. <br>The calendar highlights the departure date in green and the return date in red. 
    In the next step, provide the country, city, and time for the departure date. <br>Below that, specify the arrival time, destination country, and city.
    If traveling by plane, include the departure and arrival details for the flight.
`,
name: "calendarDetails",
highlight: "calendarDetails"
},
{
step: 5,
content: `
    Now, provide the return trip details: where you're traveling from, when, and where you're arriving. 🚆
`,
name: "calendarDetails",
highlight: "calendarDetails"
},
{
step: 6,
content: `
    Here you can see the travel details you've added to the request. If you'd like to add more, include a new departure and return trip. You can also update the dates for the new destination. 
    To continue, click the "Review" button. ✔️
`,
name: "tickets",
highlight: "tickets"
},
{
step: 7,
content: `
    Here is a summary of the information you’ve provided so far. If everything looks good, submit the request using the submit button 📤.
`,
name: "checkBlock",
highlight: "colleagueCards"
}
];




const displayTutorial = () =>{
if(tutorialBoxIndex>6){
var date = new Date();
date.setFullYear(date.getFullYear() + 100);
document.cookie = "visited=true; expires=" + date.toUTCString() + "; path=/";

console.log("vége")
showTutorialBox()

}
else{
showTutorialBox()
}


}


if(getCookie("visited")!=="true"){
showTutorialBox()
}





function tutorialsForUserDetails(){
 
const textInput = document.getElementById('user0_name');
const radioInland = document.querySelectorAll('input[name="transferInlandRadio"]');
const radioOtherCountry = document.querySelectorAll('input[name="transferOtherCountryRadio"]');

function checkInputs() {
    const textFilled = textInput.value.trim() !== '';
    const radioInlandFilled = Array.from(radioInland).some(radio => radio.checked);
    const radioOtherCountryFilled = Array.from(radioOtherCountry).some(radio => radio.checked);

    if (textFilled && radioInlandFilled && radioOtherCountryFilled) {
        if(tutorialBoxIndex<2){
            displayTutorial()
        }
      
        
    }
}

// Add event listeners to inputs
textInput.addEventListener('input', checkInputs);
radioInland.forEach(radio => radio.addEventListener('change', checkInputs));
radioOtherCountry.forEach(radio => radio.addEventListener('change', checkInputs));
}


const saveTravelData = async() =>{

const siteURL = "yourSharepointSite.url"
const listName = "DummyListForGithub"
const data = await chainData()


const fieldNames =[
    "dummyfieldForGithub",
     "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub",
    "dummyfieldForGithub"
]






for(let i = 0;i<data.length;i++){
const repeatingSection = await generateRepeatingSection(data[i]) //generate repeating section for the indexed user

let startPeriod = data[i].travelData[0].date;
let endPeriod;

if(data[i].travelData.length<3){
    
    endPeriod = data[i].travelData[1].date
}
else{
    endPeriod = data[i].travelData[3].date
}


const itemValues = [
    data[i].userData.name,
    data[i].userData.jobTitle,
    data[i].userData.costCenter,
    data[i].userData.reason,
    translateTypeToHungarian(data[i].userData.transferInland),
    translateTypeToHungarian(data[i].userData.transferOtherCountry),
    repeatingSection,
    data[i].travelData[0].arrivalCountry,
    startPeriod,
    endPeriod
]



try{
    await async_createListItem(siteURL, listName, fieldNames, itemValues)
}
catch(err){
    console.log(err)
}

}








}


const chainData = async() =>{

let data = []

for(let i=0;i<colleagues.length;i++){
let tempObj = {
    userData: colleagues[i],
    travelData: travelData
}

data.push(tempObj)

}

return data


}

const generateRepeatingSection = async(data) => {
let currentTravelData = data.travelData;
let items = "";

for (let i = 0; i < currentTravelData.length; i++) {
const item = `    
    <Item>
        <dummyfieldForGithub type="System.String">${currentTravelData[i].fromWhere_city} - ${currentTravelData[i].departureCountry}</dummyfieldForGithub>
        <dummyfieldForGithub type="System.String">${translateTypeToHungarian(currentTravelData[i].travelType)}</dummyfieldForGithub>
        <dummyfieldForGithub type="System.String">${currentTravelData[i].date} ${currentTravelData[i].departureTime}</dummyfieldForGithub>
        <dummyfieldForGithub type="System.String">${currentTravelData[i].whereTo_city} - ${currentTravelData[i].arrivalCountry}</dummyfieldForGithub>
        <dummyfieldForGithub type="System.String">${currentTravelData[i].date} ${currentTravelData[i].arrivalTime}</dummyfieldForGithub>
    </Item>
`;
items += item;
}

const repeatingSection = `    
<?xml version="1.0" encoding="utf-8"?>
<RepeaterData>
    <Version />
    <Items>
        ${items}
    </Items>
</RepeaterData>
`;

return repeatingSection
.trim()
.replace(/>\s+</g, '><'); // Remove spaces between tags
};





function translateTypeToHungarian(type){

switch(type){
    case "companyCar":
        return "Céges autó"
    case "false":
        return "Nem"
    case "true":
        return "Igen"
    case "plane":
        return "repülő"
    case "car":
        return "autó" 
        
}


}

const displayAddedColleages = () =>{
if(colleagues.length>0){
    let colleaguesElement = gd("addedColleagues")

    let colleaguesHTML = "<span class='label'>Added colleagues:</span>"

    colleagues.map((colleague,i) =>{

        console.log(i)

        if(i>0){
            colleaguesHTML+= `
            <span class="label">, ${colleague.name}</span>
        `
        }
        else{
            colleaguesHTML+= `
            <span class="label">
                ${colleague.name} 
            </span>
        `
        }

     
    })

    colleaguesElement.innerHTML = colleaguesHTML


}
}



