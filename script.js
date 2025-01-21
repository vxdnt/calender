function deleteRow(button) {
    const row = button.closest('.date-row');
    row.remove();
}

function toggleAdmin() {
    // Toggle visibility of delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        if (button.style.display === 'none') {
            button.style.display = 'inline-block'; // Show the delete button
        } else {
            button.style.display = 'none'; // Hide the delete button
        }
    });

    // Toggle the button text
    const adminButton = document.querySelector('.admin-button');
    if (adminButton.textContent === 'Admin Access') {
        adminButton.textContent = 'Back to Home';
    } else {
        adminButton.textContent = 'Admin Access';
    }
}
