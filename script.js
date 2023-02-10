// To take input new To-do:
const getAnUpdate = () => {
  console.log("Updating..");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}

// To Update and Refresh the latest List:
const update = () => {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  // Populate the table:
  tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `<tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        onclick="currentData(${index})"
                    >
                        Update
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">Delete</button>   
                </td>
            </tr>`;
  });
  tableBody.innerHTML = str;
}

// What should happen when you click the "Add To-do" button:
add = document.getElementById("add");
add.addEventListener("click", getAnUpdate);
update();

// When you click on "Delete" button:
const deleteTodo = (itemIndex) => {
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemIndex Element from the Array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

// When you click "Edit" button
var todoNumber;
const currentData = (itemIndex) => {
    console.log("Update", itemIndex);
    todoNumber = itemIndex;
    document.getElementById("todo-number").innerHTML = itemIndex + 1;
    itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
    document.getElementById("updatedTitle").value = itemJsonArray[itemIndex][0] // 2D aray.
    document.getElementById("updatedDescription").value = itemJsonArray[itemIndex][1] // 2D aray.
}
const saveChanges = () => {
    console.log("Saved", todoNumber);
    // Read new values from modal
    updatedTit = document.getElementById("updatedTitle").value;
    updatedDesc = document.getElementById("updatedDescription").value;
    // Update the particular array
    itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
    itemJsonArray[todoNumber] = [updatedTit, updatedDesc];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
}

// When you click the "Clear List" button:
const clearList = () => {
    console.log("Cleared storage!");
    localStorage.clear();
    update();
}
