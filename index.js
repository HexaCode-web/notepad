let myLeads = [];
let listItems = "";
const input = document.querySelector("#input-El");
const listEl = document.querySelector("#ul-EL");
const saveBTN = document.querySelector("#saveBTN");
const saveTABBTN = document.querySelector("#saveTABBTN");
const deleteBTN = document.querySelector("#deleteBTN");
let removeItem = "";
const leadsFromStorage = JSON.parse(localStorage.getItem("myList"));

if (leadsFromStorage) {
  //^leads from storage isnt empty
  myLeads = leadsFromStorage;
  myLeads[1];
  for (i = 0; i < myLeads.length; i++) {
    if (test(myLeads[i]) === true) {
      listItems = document.createElement("li");
      listItems.innerHTML = `
          <a target='_blank' href='${myLeads[i]}'>
              ${myLeads[i]}
          </a>
          <button  id='${i}' onclick="DeleteItem(${i})" class="removeItem"><img src="delete.svg"></i></button>
        `;
      listItems.setAttribute("onclick", `DeleteItem(${i})`);
      listItems.setAttribute(`id`, `${i}`);
      listItems.classList.add(`link`);
      listEl.appendChild(listItems);
    } else {
      listItems = document.createElement("li");
      listItems.innerHTML = `
                  ${myLeads[i]}
                  <button id='${i}'onclick="DeleteItem(${i})" class="removeItem"><img src="delete.svg"></i></button>
            `;
      listItems.setAttribute(`id`, `${i}`);
      listItems.classList.add(`link`);
      listEl.appendChild(listItems);
    }
  }
  removeItem = document.getElementsByClassName("removeItem");
  ("storage isnt empty");
}

function test(input) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (input.match(regex)) {
    return true;
  } else {
    return false;
  }
}

function render(leads) {
  let listItems = "";
  listItems = document.createElement("li");
  if (test(input.value) === true) {
    ("");
    listItems.innerHTML = `
          <a target='_blank' href='${leads}'>
              ${leads}
          </a>
          <button id='${i}'onclick="clicked()" class="removeItem"><img src="delete.svg"></i></button>
          `;
    listItems.setAttribute(`id`, `${i}`);
    listItems.classList.add(`link`);
    listEl.appendChild(listItems);
  } else {
    listItems.innerHTML = `
                  ${leads}
                  <button id='${i}'onclick="clicked()" class="removeItem"><img src="delete.svg"></i></button> 
                  `;
    listEl.appendChild(listItems);
  }
}

function Save(pushedValue) {
  myLeads.push(pushedValue);
  localStorage.setItem("myList", JSON.stringify(myLeads));
  render(pushedValue);
  input.value = "";
}

function Delete() {
  localStorage.clear();
  myLeads = [];
  listEl.innerHTML = "";
}
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    Save(input.value);
  }
});
saveBTN.addEventListener("click", function () {
  Save(input.value);
});
deleteBTN.addEventListener("click", function () {
  Delete();
});
saveTABBTN.addEventListener("click", function saveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    Save(tabs[0].url);
  });
});

function DeleteItem(num) {
  let object = document.getElementById(`${num}`);
  console.log(object);
  object.remove();
  myLeads.splice(num, 1);
  localStorage.setItem("myList", JSON.stringify(myLeads));
}
