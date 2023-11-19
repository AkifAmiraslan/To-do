document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const res = document.querySelector(".res");
    const nameInput = document.querySelector(".name");
    const textInput = document.querySelector(".text");
    const deleteBtn = document.querySelector(".delete-btn")
    const cancelBtn = document.querySelector(".cancel-btn")
    let selectedTaskIndex;

    // If there is a "todos" key in localStorage, retrieve it; otherwise, initialize an empty array
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Display existing todos on page load
    displayTodos();

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const nameInputValue = nameInput.value;
        const textInputValue = textInput.value;

        if (nameInputValue !== "" && textInputValue !== "") {
            // Add new task to todos array
            todos.push({ name: nameInputValue, text: textInputValue });

            // Update localStorage with the new todos array
            localStorage.setItem("todos", JSON.stringify(todos));

            // Display the updated todos on the page
            displayTodos();

            // Clear input fields
            nameInput.value = "";
            textInput.value = "";
        } else {
            alert('Please enter both name and text.');
        }
    });

    function displayTodos() {
        // Clear the existing content of the "res" div
        res.innerHTML = "";

        // Iterate through the todos and display each task in the "res" div
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.innerHTML = `<strong>${todo.name}:</strong> ${todo.text}`;
            
            // Add delete button to each task
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.onclick = () => openModal(index);

            todoItem.appendChild(deleteBtn);
            res.appendChild(todoItem);
        });
    }

    function openModal(index) {
        // Set the selectedTaskIndex to the index of the task to be deleted
        selectedTaskIndex = index;
        
        // Display the modal
        const customModalOverlay = document.getElementById("custom-modal-overlay");
        customModalOverlay.style.display = "flex";
    }

    function closeModal() {
        // Close the modal
        const customModalOverlay = document.getElementById("custom-modal-overlay");
        customModalOverlay.style.display = "none";
    }

    function deleteTask() {
        // Check if a task is selected for deletion
        if (selectedTaskIndex !== undefined) {
            // Remove the selected task from the todos array
            todos.splice(selectedTaskIndex, 1);

            // Update localStorage with the modified todos array
            localStorage.setItem("todos", JSON.stringify(todos));

            // Display the updated todos on the page
            displayTodos();

            // Close the modal after deletion
            closeModal();
        }
    }
    deleteBtn.addEventListener("click",deleteTask);
    cancelBtn.addEventListener("click",closeModal)
});
