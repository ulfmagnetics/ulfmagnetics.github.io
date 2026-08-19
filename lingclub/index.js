let clicks = 0;
const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
const dayOfMonth = new Date().getDate();
const monthLength = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
const container = document.querySelector(".container");
const curMonth = new Date().getMonth();
const nextMeetingText = document.getElementById("nextMeetingText");
const monthText = document.getElementById("monthText");
const monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// document.body.appendChild(dayText);
let numSquares = 0;
for (let i = 1; i < firstDay + 1;i++) {

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
for (let i = 1; i < monthLength+1;i++) {

    let low = 7 - firstDay;
    let high = 8 - firstDay;
    let mid = (firstDay < 5) ? low - 3 : high + 3;
    const newDay = document.createElement("div")


    if (i % 7 === low || i % 7 === high) {
        newDay.className = "weekend";
    }
    else if (firstDay === 1 && i % 7 === 0) {
        newDay.className = "weekend";
    }
    else if (i % 7 === mid) {
        let mon = curMonth;
        if (mon > 4 && mon < 8) {
            // first and last days of school :3
            if (mon === 7) {
                if (i > 24) {
                    lastWed = i;
                    newDay.className = "wed";
                    if (nextDay === 0 && dayOfMonth <= i) {
                        nextDay = i;
                    }
                }
                else {
                    newDay.className = "weekday";
                }
            }
            else if (mon === 5) {
                if (i < 12) { // excluding the last day bc prolly no club then lol
                    lastWed = i;
                    newDay.className = "wed";
                    if (nextDay === 0 && dayOfMonth <= i) {
                        nextDay = i;
                    }
                }
                else {
                    newDay.className = "weekday";
                }
            }
            else {
                newDay.className = "weekday";
            }
        }
        else {
            lastWed = i;
            newDay.className = "wed";
            if (nextDay === 0 && dayOfMonth <= i) {
                        nextDay = i;
            }
        }
    }
    else {
        newDay.className = "weekday";
    }
    //
    if (i === dayOfMonth) {
        newDay.className = "today";
        newDay.style.fontWeight = "bold";
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

monthText.textContent = monthsList[curMonth];
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
    nextMeetingText.textContent = "Our next meeting is: next Wednesday, at 2:40pm in room 271";
}
nextMeetingText.style.fontWeight = "bold";

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