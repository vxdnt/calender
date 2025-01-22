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

    // Enable or disable draggable functionality for rows
    toggleDragAbility();
}

// Function to toggle draggable attribute and handle visibility of drag handle
function toggleDragAbility() {
    const adminButton = document.querySelector('.admin-button');
    const dateRows = document.querySelectorAll('.date-row');

    dateRows.forEach(row => {
        const dragHandle = row.querySelector('.drag-handle');
        if (adminButton.textContent === 'Back to Home') {
            row.setAttribute('draggable', 'true');
            dragHandle.style.display = 'inline'; // Show drag handle
        } else {
            row.setAttribute('draggable', 'false');
            dragHandle.style.display = 'none'; // Hide drag handle
        }
    });

    // Re-activate drag events for rows if draggable is enabled
    enableDragAndDrop();
}

// Function to add a new event row
document.getElementById('add-category').addEventListener('click', function() {
    // Create a new date-row div
    const newRow = document.createElement('div');
    newRow.classList.add('date-row');
    
    // Set the content for the new row
    newRow.innerHTML = `
        <div class="row-box">
            <span class="drag-handle" style="display: none;">☰</span> <!-- Initially hidden -->
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
    
    // Check if admin access is enabled, then allow drag functionality
    toggleDragAbility();
});

// Enable drag-and-drop functionality only for draggable rows
function enableDragAndDrop() {
    const rows = document.querySelectorAll('.date-row[draggable="true"]');
    rows.forEach(row => {
        row.removeEventListener('dragstart', handleDragStart);
        row.removeEventListener('dragover', handleDragOver);
        row.removeEventListener('dragenter', handleDragEnter);
        row.removeEventListener('dragleave', handleDragLeave);
        row.removeEventListener('drop', handleDrop);
        row.removeEventListener('dragend', handleDragEnd);
        
        // Add the drag event listeners
        row.addEventListener('dragstart', handleDragStart);
        row.addEventListener('dragover', handleDragOver);
        row.addEventListener('dragenter', handleDragEnter);
        row.addEventListener('dragleave', handleDragLeave);
        row.addEventListener('drop', handleDrop);
        row.addEventListener('dragend', handleDragEnd);
    });
}

let draggedRow = null;

// Handle the start of dragging
function handleDragStart(event) {
    draggedRow = event.target;
    setTimeout(() => {
        event.target.style.display = 'none';
    }, 0);
}

// Handle drag over event
function handleDragOver(event) {
    event.preventDefault();
}

// Handle entering the drop target
function handleDragEnter(event) {
    event.target.classList.add('over');
}

// Handle leaving the drop target
function handleDragLeave(event) {
    event.target.classList.remove('over');
}

// Handle the drop event
function handleDrop(event) {
    event.preventDefault();
    event.target.classList.remove('over');

    if (draggedRow !== event.target) {
        const allRows = [...document.querySelectorAll('.date-row')];
        const draggedIndex = allRows.indexOf(draggedRow);
        const targetIndex = allRows.indexOf(event.target);

        // Move the dragged row before or after the target row based on the index
        if (draggedIndex < targetIndex) {
            event.target.parentNode.insertBefore(draggedRow, event.target.nextSibling);
        } else {
            event.target.parentNode.insertBefore(draggedRow, event.target);
        }
    }
}

// Handle the end of dragging
function handleDragEnd(event) {
    event.target.style.display = 'block';
    draggedRow = null;
    document.querySelectorAll('.date-row').forEach(row => row.classList.remove('over'));
}

// Call enableDragAndDrop on initial load
document.addEventListener('DOMContentLoaded', function() {
    toggleDragAbility();  // Ensure draggable state is correct on page load
});
