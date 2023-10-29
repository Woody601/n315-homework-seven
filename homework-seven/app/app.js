var LISTS = [
  {
     "name":"Groceries",
     "listItems":[
        {
           "name":"milk",
           "checked":false,
           "category":"dairy"
        },
        {
           "name":"cheese",
           "checked":false,
           "category":"dairy"
        },
        {
           "name":"oranges",
           "checked":false,
           "category":"fruits"
        },
        {
         "name":"bread",
         "checked":false,
         "category":"fruits"
      },
      {
         "name":"eggs",
         "checked":false,
         "category":"dairy"
      },
      {
         "name":"pasta",
         "checked":false,
         "category":"pantry"
      },
      {
         "name":"chicken",
         "checked":false,
         "category":"poultry"
      },
      {
         "name":"rice",
         "checked":false,
         "category":"grains"
      },
      {
         "name":"corn",
         "checked":false,
         "category":"vegetables"
      },
      {
         "name":"cereal",
         "checked":false,
         "category":"breakfast"
      },
     ],
  },
  {
     "name":"Camping",
     "listItems":[
        {
           "name":"tent",
           "checked":false,
           "category":"sporting goods"
        },
        {
           "name":"chairs",
           "checked":false,
           "category":"sporting goods"
        },
        {
           "name":"bug spray",
           "checked":false,
           "category":""
        },
        {
         "name":"sleeping bag",
         "checked":false,
         "category":""
      },
      {
         "name":"flashlight",
         "checked":false,
         "category":""
      },
      {
         "name":"first aid kit",
         "checked":false,
         "category":""
      },
      {
         "name":"hiking boots",
         "checked":false,
         "category":""
      },
      {
         "name":"water purification kit",
         "checked":false,
         "category":""
      },
      {
         "name":"tarp",
         "checked":false,
         "category":""
      },
      {
         "name":"lighter",
         "checked":false,
         "category":""
      },
     ],
  },
];

function itemChecked(element, listIndex, itemIndex){
  $(element).parent().toggleClass("checked");
  let checkedValue = !LISTS[listIndex].listItems[itemIndex].checked;
  LISTS[listIndex].listItems[itemIndex].checked = checkedValue;
  // console.log("checked ", LISTS);
}

function addItem(listIndex) {
   if ($("#addItem").val() == "") {
      alert("Please enter an item to add to the list.")
   }
   else {
      let newItemName = $("#addItem").val();
      let newItemObj = {
         name: newItemName,
         checked: false,
         category: "",
      };
      // The ".push" adds the new item object to the list.
      LISTS[listIndex].listItems.push(newItemObj);
      loadListItems(listIndex);
   }
}

function deleteItem(listIndex, index) {
   if (confirm("Are you sure you want to delete this item from your list?") == true) {
      LISTS[listIndex].listItems.splice(index,1);
      loadListItems(listIndex);
   }
}

function loadListItems(listIndex) {
  // console.log(itemIndex);
  let listString = `<div class="backButton" onclick="loadLists()">Back</div><ul>`;
  $.each(LISTS[listIndex].listItems, function (index, listItem) {
    listString += `<li id="${index}" class="${listItem.checked ? "checked" : ""}"><input ${listItem.checked ? (checked = "checked") : ""} type="checkbox" id="${index}" name="${listItem.name}" 
    onclick="itemChecked(this, ${listIndex}, ${index})">
    <span>${listItem.name}</span>
    <div class="listButton" onclick="deleteItem(${listIndex}, ${index})">Delete</div>
    </li>`;
  });
  listString += `
  <li class="addItemInput">
  <input id="addItem" type="text">
  <div class="listButton" onclick="addItem(${listIndex})">Add Item</div>
  </li></ul>`;
  $("#app").html(listString); 
}

function loadLists() {
  let listString = "<ul>";
  $.each(LISTS, function (index, list) {
    listString += `<li id="${index}" onclick="loadListItems(${index})">${list.name}
    <span class="right">Items: ${list.listItems.length}</span></li>`;
  });
  listString += "</ul>";
  $("#app").html(listString);
}

function initListeners() {
   loadLists();
}

$(document).ready(function () {
  initListeners();
});