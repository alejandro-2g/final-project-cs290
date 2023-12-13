function openNewPage(pageNumber) {
    // Define URLs for the new pages
    const pageUrls = [
        '/workouts/arms',
        '/workouts/shoulders',
        '/workouts/back',
        '/workouts/legs',
        '/workouts/chest',
        '/workouts/core',

    ];

    // Get the URL based on the page number
    const url = pageUrls[pageNumber - 1];

    // Open the new page
    window.location.href = url;
}

// Attach click event listeners to the buttons
document.getElementById('button').addEventListener('click', function() {
    openNewPage(1);
});

document.getElementById('button').addEventListener('click', function() {
    openNewPage(2);
});