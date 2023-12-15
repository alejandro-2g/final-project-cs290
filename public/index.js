/* document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    let data = {
        items: []
    };

    // Compile the Handlebars template
    let templateSource = document.getElementById('exercises-container');
    let template = Handlebars.compile(templateSource);

    // Initial rendering of the list
    renderList();

    // Event listener for the button click
    document.getElementById('MyPlanButton').addEventListener('click', function () {
        // Add a new item to the data
        let newItem = 'New Item ' + (data.items.length + 1);
        data.items.push(newItem);

        // Update the list
        renderList();
    });

    // Function to render the list using Handlebars
    function renderList() {
        // Get the container element
        let itemListContainer = document.getElementById('exList');

        // Execute the Handlebars template with the data and insert into the container
        itemListContainer.innerHTML = template(data);
    }
}); */