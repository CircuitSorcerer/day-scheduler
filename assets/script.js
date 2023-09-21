
$(function () {
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


//Get the current day and hour
var dateDisplayEl = document.getElementById("currentDay");

function today() {
  var todayDate = dayjs().format('dddd, D of MMMM');
  dateDisplayEl.textContent = "Today's date is " + todayDate;
}

setInterval(function (){
  currentHour();
}, 60000);



// Fetch the hour for the section colouring

let x = "";

function currentHour() {
  let hour = dayjs().format("ha");
      if (hour.includes("pm")) {
      hour = hour.trim("pm");
      hour = parseInt(hour);
      hour += 12;
      return hour;
    }  else {
      hour = hour.trim("am");
      hour = parseInt(hour);
      return hour;
  }
  }



// Create a Division for each hour of the day

function colourSelect(i) {
      
  let current = currentHour();

  if (i > current) {
    return "future";
  } else if (i == current) {
    return "present";
  } else {
    return "past";
  }
}

var divs = []

function createDiv(x) {
  hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]
  
  hours.forEach (i => {
    console.log(i);
    let x = colourSelect(i);
    var ourContent = storageRetrieval(i)
    


    let thisDiv = $("<div></div>");
    thisDiv.attr("id", `hour-${i}`);
    console.log(x)
    thisDiv.addClass(`row time-block ${x}`);
    let thisHour = $("<div></div>");
    thisHour.attr("class", "col-2 col-md-1 hour text-center py-3");
    thisHour.text(`${i}:00`);
    let thisTextArea = $("<textarea>");
    thisTextArea.attr("class", "col-8 col-md-10 description");
    if(ourContent != null){thisTextArea.text(ourContent)}
    let thisBtn = $("<button>");
    thisBtn.attr("class", "btn saveBtn col-2 col-md-1")
    thisBtn.html("<i class='fas fa-save' aria-hidden='true'></i>")

    thisDiv.append(thisHour);
    thisDiv.append(thisTextArea);
    thisDiv.append(thisBtn);

    let hourObject = {element: thisDiv, content:""};
    window[`no.${i}`] = hourObject;
    //console.log(window["no."+i]);
    //console.log(divs[i].element());
    divs.push(hourObject);
    
  })
}

today()
createDiv();
//console.log(divs);


// storage handling

function storageRetrieval(i) {
  try {
    var retrievedJSON = localStorage.getItem("objectToStore");
    var retrievedDiv = JSON.parse(retrievedJSON);
    var ourContent = retrievedDiv[i].content;
    return ourContent;
  } catch {
    (exception) => {}
  }
}



// render divs

const containerEl = $(".container-lg");

function divRender() {
  divs.forEach (hourObject => {
    containerEl.append(hourObject.element);
  })
}
divRender();

// handle the click of the save button and storage of the content added to 
// the text areas

$("button").on("click", function() {
  var divId = $(this).parent().attr("id");
  var content = $(this).prev('textarea').val();
  
  console.log(divId);
  divId = divId.replace("hour-", "");
  divId = parseInt(divId);
  console.log(divId);
  if (content != "") {
    console.log(divs)
    console.log(divId);
    divs[divId-9].content = content;
    console.log(divId);
  }
  
  console.log(divId);
  console.log(divs[divId-9].content);
  JSON.stringify(divs)
  localStorage.setItem("objectToStore", divs)
})



});
