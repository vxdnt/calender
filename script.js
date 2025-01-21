function deleteRow(button) {
    const row = button.closest('.date-row');
    row.remove();
}

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
