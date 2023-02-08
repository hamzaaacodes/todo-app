// To take input new To-do:
        function getAnUpdate() {
            console.log("Updating..")
            tit = document.getElementById('title').value;
            desc = document.getElementById('description').value;
            if (localStorage.getItem('itemsJson')==null) {
                itemJsonArray = [];
                itemJsonArray.push([tit,desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            } else {
                itemJsonArrayStr = localStorage.getItem('itemsJson');
                itemJsonArray = JSON.parse(itemJsonArrayStr);
                itemJsonArray.push([tit,desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            }
            update();
        }

        // To update and Refresh the latest List:
        function update() {
            if (localStorage.getItem('itemsJson')==null) {
                itemJsonArray = [];
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            } else {
                itemJsonArrayStr = localStorage.getItem('itemsJson');
                itemJsonArray = JSON.parse(itemJsonArrayStr);
            }
            // Populate the table:
            tableBody = document.getElementById('tableBody');
            let str = "";
            itemJsonArray.forEach((element, index) => {
                str += `<tr>
                    <th scope="row">${index + 1 }</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
                  </tr>`;
            })
            tableBody.innerHTML = str;
        }

        // What should happen when you click the "Add To-do" button:
        add = document.getElementById("add");
        add.addEventListener("click", getAnUpdate);
        update();

        // When you click on "Delete" button:
        function deleted(itemIndex) {
            console.log("Delete", itemIndex);
            itemJsonArrayStr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            // Delete itemIndex Element from the Array
            itemJsonArray.splice(itemIndex, 1);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            update();
        }

        // When you click the "Clear List" button:
        function clearList() {
            if(confirm("Do you want to clear the list?")) {
            console.log("Cleared storage!")
            localStorage.clear();
            update();
            } 
        }
