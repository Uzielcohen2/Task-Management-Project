

let data = [];

loadFromLocalStorage();



/*----------------------------------Current Time & Date------------------------------------------------------*/

let today = new Date();

    
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    let formattedDate = year + '-' + month + '-' + day;

    
    document.getElementById('dateBox').value = formattedDate;



let time = document.getElementById("current-time");



setInterval(() => {
    let date = new Date();
    time.innerHTML = date.toLocaleTimeString();
}, 1000)

// --------------------------------------------------------------------------------------------------------*/

// Add task button


function addTask() {
    // Prevent refresh

    event.preventDefault();

    // /*----------------------------------Elements

    const taskTextBox = document.getElementById("taskTextBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const noteForm = document.getElementById("noteForm");


    // /*----------------------------------Values

    const note = {
        task: taskTextBox.value,
        date: dateBox.value,
        time: timeBox.value
    }

    data.push(note)
    console.log(data);
    // Save to local storage 
    saveToLocalStorage();
    showNote();
    noteForm.reset();
    taskTextBox.focus();


}

/*----------------------------------Saving localStorage------------------------------------------------------*/


function saveToLocalStorage() {
    const strData = JSON.stringify(data);
    console.log(typeof strData);
    localStorage.setItem("savedData", strData);
}

/*----------------------------------Loading localStorage------------------------------------------------------*/


function loadFromLocalStorage() {
    const strData = localStorage.getItem("savedData");
    console.log(typeof strData);
    if (strData) {
        data = JSON.parse(strData)
        console.log(strData);
        showNote();
    } else {
        console.log("No strData in local storage");
    }


}

/*----------------------------------Note Display------------------------------------------------------*/


function showNote() {
    const noteContainer = document.getElementById("noteContainer")
    let html = "";
   

    for (let i = 0; i < data.length; i++) {
        if (data.length - 1 == i) {
            html += `<div class = js-note-animation>`
        }
        html +=
            `
        <div class="js-my-note">
            <button class="js-reset-button" id="${i}" onclick="deleteNote(this)">❌</button>
        
            <span class="js-text-box">${data[i].task}</span>
        <div class="js-date-time">
            <span>📅 - ${data[i].date}</span>
        <br>
            <span>🕢 - ${data[i].time}</span>
        </div>
    </div> 
        `
        if (data.length - 1 == i) {
            html += `</div> `
        }

    }
    saveToLocalStorage();
    noteContainer.innerHTML = html;

    

}

/*----------------------------------Clear All Notes Button------------------------------------------------------*/


function clearNotes() {
    for (const item of data) {
        data.splice(data[item], 30)
    }
    showNote();
    saveToLocalStorage();
    localStorage.removeItem(data);

}

/*----------------------------------Clear Single Note Button------------------------------------------------------*/



function deleteNote(element) {
    const index = element.id;
    console.log(element)
    data.splice(index, 1);
    saveToLocalStorage();
    loadFromLocalStorage();
    showNote();

}


