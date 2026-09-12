let clicks = 0;
const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
const dayOfMonth = new Date().getDate();
const monthLength = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
const container = document.querySelector(".container");
const curMonth = new Date().getMonth();
const nextMeetingText = document.getElementById("nextMeetingText");
const monthText = document.getElementById("monthText");
const monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const spreadsheetId2 = '11bVwIgamf-boMEBp3MnZkhgDeJU1NIHouVpELfVy8ys';
const url2 = `https://docs.google.com/spreadsheets/d/${spreadsheetId2}/gviz/tq?tqx=out:json`;

let displayMonth = curMonth;
let displayFirstDay = firstDay;
let displayMonthLength = monthLength;


const meeting_days = [];
const meeting_months = [];
console.log(curMonth + "is the current month");

fetch(url2)
  .then((res) => res.text())
  .then((data) => {
    // Google returns JSON wrapped in a function call; strip wrapper
    const json = JSON.parse(data.substring(47, data.length - 2));
    console.log('Sheet Columns:', json.table.cols);
    console.log('Sheet Rows:', json.table.rows);
    console.log(json);

    //gets days of the meetings
    for (var i = 0; i < json.table.rows.length; ++i) {
        meeting_days.push(json.table.rows[i].c[1].v);
    } $("#meeting_days").text(meeting_days)

    //gets months of the meetings
    for (var i = 0; i < json.table.rows.length; ++i){
        meeting_months.push(json.table.rows[i].c[0].v);
    } $("#meeting_months").text(meeting_months)

    const next_day = meeting_days[0];
    const next_month = meeting_months[0];
    const next_meeting = next_month + '-' + next_day + '-2026';
    // $("#next_meeting").text(notification)
    // next_meeting.textContent("hello")
    MakeCalendar(curMonth);
    

});


function changeMonthAndUpdate(amount) {
    displayMonth += amount;
    if (displayMonth > 11) {displayMonth=0}
    if (displayMonth < 0) {displayMonth=11}
    displayFirstDay = new Date(new Date().getFullYear(), displayMonth, 1).getDay();
    displayMonthLength = new Date(new Date().getFullYear(), displayMonth + 1, 0).getDate();
    MakeCalendar(displayMonth);
}

function MakeCalendar(monthNum){
    
container.replaceChildren();
let d = document.createElement("div");
//
d.textContent = "Sun";
d.className = "weekend";
container.appendChild(d);
//
d = document.createElement("div");
d.textContent = "Mon";
d.className = "wed";
container.appendChild(d);
//
d = document.createElement("div");
d.textContent = "Tue";
d.className = "weekday";
container.appendChild(d);
//
d = document.createElement("div");
d.textContent = "Wed";
d.className = "weekday";
container.appendChild(d);
//
d = document.createElement("div");
d.textContent = "Thu";
d.className = "weekday";
container.appendChild(d);
//
d = document.createElement("div");
d.textContent = "Fri";
d.className = "weekday";
container.appendChild(d);
//
d = document.createElement("div");
d.textContent = "Sat";
d.className = "weekend";
container.appendChild(d);


console.log(dayOfMonth);
console.log(curMonth);
console.log("this month is " + meeting_months[0]);

// document.body.appendChild(dayText);
let numSquares = 0;
let c = 0;
for (let i = 1; i < displayFirstDay + 1;i++) {

    const newDay = document.createElement("div")
    if (i % 7 === 0 || i % 7 === 1) {
        newDay.className = "weekend";
    }
    else {
        newDay.className = "weekday";
    }
    newDay.textContent = "-";
    
    numSquares += 1;
    container.appendChild(newDay);

}
let nextDay = 0;
let lastWed = 0;
for (let i = 1; i < displayMonthLength+1;i++) {

    let low = 7 - displayFirstDay;
    let high = 8 - displayFirstDay;
    //calculates wednesday
    let mid = (displayFirstDay < 5) ? low - 3 : high + 3;
    const newDay = document.createElement("div")


    if (i % 7 === low || i % 7 === high) {
        newDay.className = "weekend";
    }
    else if (displayFirstDay === 1 && i % 7 === 0) {
        newDay.className = "weekend";
    }
    else if ((i % 7 === 0 || i % 7 === 1) && displayFirstDay === 0) {
        newDay.className = "weekend";
    }
    else {

        let numMeetings = meeting_days.length;

        newDay.className="weekday";
        for (let a = 0; a<numMeetings; a++){
            if (i === meeting_days[a] && monthNum === meeting_months[a]-1){
                // && curMonth === meeting_months[a] + 1
                console.log("meeting month is " + meeting_months[a]);
                console.log("current month is " + monthNum);
                console.log(meeting_days[a]);
                console.log("found meeting day " + i );
                newDay.className = "wed";
                newDay.addEventListener ("mouseenter", () => {
                    newDay.textContent = "Meeting Day!";
                    // showImage()
                });
                newDay.addEventListener ("mouseleave", () =>{
                    newDay.textContent = i;
                });
            }
        }
        //working here   
  
    }
    //
    if (i === dayOfMonth && curMonth == displayMonth) {
        newDay.className = "today";
        newDay.style.fontWeight = "bold";
        newDay.addEventListener ("mouseenter", () => {
            newDay.textContent = "Today!";
            newDay.style.fontWeight = "normal";
        });
        newDay.addEventListener ("mouseleave", () =>{
            newDay.textContent = i;
        });
        if (nextDay === i) {
                        nextDay = i;
        }
    }
    newDay.textContent = i;

    numSquares += 1;
    container.appendChild(newDay);

}

// part im trying to make work
if (numSquares %7 !== 0){
    let totalSquares = Math.ceil(numSquares/7)*7;
    let squaresNeeded = totalSquares - numSquares;
    for (let i=1; i<squaresNeeded; i++){
        const newDay = document.createElement("div")
        newDay.className = "weekday";
        newDay.textContent = "-";
        // newDay.className;
        // newDay.textContent;
        container.appendChild(newDay);
    }
    const newDay = document.createElement("div")
    newDay.className = "weekend";
    newDay.textContent = "-";
    container.appendChild(newDay);
}


if (nextDay === 0) {
    nextDay = "<Cannot Load Day>";
}

// monthText.textContent = monthsList[monthNum] + " " + new Date().getFullYear();
monthText.innerHTML = `${monthsList[monthNum]}<span style="font-size: 12px;"> ${new Date().getFullYear()}</span>`;
// monthText.style.anchorName = "monthText";
if (nextDay === dayOfMonth) {
    nextMeetingText.textContent = "Our next meeting is: " + "Today, "+ monthText.textContent +" "+ nextDay +", at 2:40pm in room 271";
}
else if (nextDay === dayOfMonth + 1){
    nextMeetingText.textContent = "Our next meeting is: " + "Tomorrow, "+ monthText.textContent +" "+ nextDay +", at 2:40pm in room 271";
}
else {
    nextMeetingText.textContent = "Our next meeting is: " + "Wednesday, "+ monthText.textContent +" "+ nextDay +", at 2:40pm in room 271";
}
//
if (dayOfMonth > lastWed) {
    nextMeetingText.textContent = "Our next meeting is: next Monday, at 2:40pm in room 271";
}
nextMeetingText.style.fontWeight = "bold";
}


function Click() {
    clicks += 1;
    document.getElementById("Clicks-Text").textContent = "Clicks: "+clicks;
    // Select the element
    document.getElementById("boom").style.display = "block";
    
    // Set a timer to run after 3000 milliseconds (3 seconds)
    setTimeout(function() {
        document.getElementById("boom").style.display = "none";
// Completely removes it from layout
    // Or use: element.style.visibility = "hidden"; (Leaves a blank space)
    }, 750);
};

function ToggleBackground() {
    // Find the image by its specific ID
    const isHuePaused = document.body.classList.contains('hue-paused');

    // Change the display style to make it visible
    if (isHuePaused) {
        document.body.classList.remove('hue-paused');
    }
    else {
        document.body.classList.add('hue-paused');
    }
}

function showImage() {
    // Find the image by its specific ID
    const image = document.getElementById("diceLogo");
    
    // Change the display style to make it visible
    if (image.style.display === "none") {
    image.style.display = "block"
    }
    else {
        image.style.display = "none"
    }
}