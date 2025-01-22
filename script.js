// Function to delete a row
function deleteRow(button) {
    const row = button.closest('.date-row');
    row.remove();
}

// Function to toggle admin features
function toggleAdmin() {
    // Toggle visibility of delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
    });

    // Toggle visibility of "Add Event" button
    const addEventButton = document.getElementById('add-category');
    if (addEventButton) {
        addEventButton.style.display = addEventButton.style.display === 'none' ? 'block' : 'none';
    }

    // Toggle the button text
    const adminButton = document.querySelector('.admin-button');
    if (adminButton.textContent === 'Admin Access') {
        adminButton.textContent = 'Back to Home';
    } else {
        adminButton.textContent = 'Admin Access';
    }
}

// Function to add a new event row
document.getElementById('add-category').addEventListener('click', function() {
    // Create a new date-row div
    const newRow = document.createElement('div');
    newRow.classList.add('date-row');
    
    // Set the content for the new row
    newRow.innerHTML = `
        <div class="row-box">
            <div class="event-date" contenteditable="true">New Date</div>
            <div class="event-name" contenteditable="true">New Event Name</div>
            <div class="event-action">
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </div>
        </div>
    `;
    
    // Append the new row to the container
    document.querySelector('.add-event-container').insertAdjacentElement('beforebegin', newRow);
    
    // Show the Delete button
    const deleteButton = newRow.querySelector('.delete-btn');
    deleteButton.style.display = 'inline-block';
});
