document.addEventListener('DOMContentLoaded', function() {
    // Function to show the lightbox
    function showLightbox(title, tasteBuds, ingredients) {
        // Create HTML content for the lightbox
        var lightboxContent = `
            <div class="lightbox active">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <h2>${title}</h2>
                    <h4>${tasteBuds}</h4>
                    <p class="ingredients">${ingredients}</p>
                </div>
            </div>
        `;


        // Append the lightbox content to the body
        document.body.insertAdjacentHTML('beforeend', lightboxContent);


        // Add click event listener to close the lightbox
        var closeButton = document.querySelector('.lightbox .lightbox-close');
        closeButton.addEventListener('click', function() {
            var lightbox = document.querySelector('.lightbox');
            lightbox.remove();
            // Re-enable the open-reward button
            openRewardButton.disabled = false;
        });
    }


    // Function to show the reward claim lightbox
    function showRewardClaimLightbox() {
        // Disable the open-reward button
        openRewardButton.disabled = true;


        // Create HTML content for the lightbox
        var lightboxContent = `
            <div class="lightbox active">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <h2>Claim your reward!</h2>
                    <p>Put your email to claim your reward:</p>
                    <form id="claimRewardForm">
                        <input type="email" id="emailInput" name="email" placeholder="Enter your email" required>
                        <button type="submit">Claim</button>
                    </form>
                </div>
            </div>
        `;


        // Append the lightbox content to the body
        document.body.insertAdjacentHTML('beforeend', lightboxContent);


        // Add submit event listener to the claimRewardForm
        var claimRewardForm = document.getElementById('claimRewardForm');
        claimRewardForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            var email = document.getElementById('emailInput').value;
            handleFormSubmission(email);
        });


        // Add click event listener to close the lightbox
        var closeButton = document.querySelector('.lightbox .lightbox-close');
        closeButton.addEventListener('click', function() {
            var lightbox = document.querySelector('.lightbox');
            lightbox.remove();
            // Re-enable the open-reward button
            openRewardButton.disabled = false;
        });
    }


    // Function to handle form submission
    function handleFormSubmission(email) {
        console.log('Email submitted:', email);
        // Optionally, you can close the current lightbox
        var lightbox = document.querySelector('.lightbox');
        lightbox.remove();
        // Show the subscription confirmation lightbox
        showSubscriptionConfirmation();
    }


    // Function to show the "Thank you for subscribing!" lightbox
    function showSubscriptionConfirmation() {
        showLightbox("Thank you for subscribing!", "We've received your email. Enjoy your reward!");
    }


    // Get the open-reward button
    var openRewardButton = document.querySelector('.open-reward');


    // Add click event listener to the open-reward button
    openRewardButton.addEventListener('click', function() {
        // Call the function to show the reward claim lightbox
        showRewardClaimLightbox();
    });


    // Hide h4 and p tags initially
    var tasteBuds = document.querySelectorAll('.taste-buds');
    var ingredients = document.querySelectorAll('.ingredients');


    tasteBuds.forEach(function(tasteBud) {
        tasteBud.style.display = 'none';
    });


    ingredients.forEach(function(ingredient) {
        ingredient.style.display = 'none';
    });


    // Get all the "MORE INFO" buttons
    var infoButtons = document.querySelectorAll('.info-button');


    // Add click event listener to each "MORE INFO" button
    infoButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent product div
            var productDiv = button.closest('.full-width-grid-con');


            // Retrieve product information
            var productName = productDiv.querySelector('h3').textContent;
            var productTasteBuds = productDiv.querySelector('.taste-buds').textContent;
            var productIngredients = productDiv.querySelector('.ingredients').textContent;


            // Call the function to show the lightbox with product details
            showLightbox(productName, productTasteBuds, productIngredients);
        });
    });


    // Array to store clicked button information
    var clickedButtonsInfo = [];


    // Get all the info icons
    var infoIcons = document.querySelectorAll('.info-icon');


    // Add click event listener to each info icon
    infoIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            // Get the parent div containing the product information
            var parentDiv = icon.parentElement;


            // Retrieve product information
            var productName = parentDiv.querySelector('h3').textContent;
            var productDescription = parentDiv.querySelector('p').textContent;
            var productAdditionalInfo = parentDiv.querySelector('h4').textContent; // Include h4 content


            // Log product information to console
            console.log("Product Name:", productName);
            console.log("Product Description:", productDescription);


            // Store clicked button information in the array
            clickedButtonsInfo.push({
                productName: productName,
                productDescription: productDescription,
                productAdditionalInfo: productAdditionalInfo
            });


            // Create HTML content for the lightbox
            var lightboxContent = `
                <div class="lightbox active">
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <h2>${productName}</h2>
                        <h4>${productAdditionalInfo}</h4> <!-- Include h4 content -->
                        <p>${productDescription}</p>
                    </div>
                </div>
            `;


            // Append the lightbox content to the body
            document.body.insertAdjacentHTML('beforeend', lightboxContent);


            // Add click event listener to close the lightbox
            var closeButton = document.querySelector('.lightbox .lightbox-close');
            closeButton.addEventListener('click', function() {
                var lightbox = document.querySelector('.lightbox');
                lightbox.remove();
                // Re-enable the open-reward button
                openRewardButton.disabled = false;
            });
        });
    });


    // Hide h4 and p tags inside product divs
    var productDivs = document.querySelectorAll('#blueberry, #peachy, #apple, #scarlet');
    productDivs.forEach(function(div) {
        var h4Tag = div.querySelector('h4');
        if (h4Tag) {
            h4Tag.style.display = 'none';
        }


        var pTag = div.querySelector('p');
        if (pTag) {
            pTag.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const reviewsWrapper = document.getElementById('reviews');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    let currentPosition = 0;
    const articleWidth = reviewsWrapper.querySelector('article').offsetWidth;
    const numArticles = reviewsWrapper.childElementCount;
    const maxPosition = -580; // Maximum translateX value

    function slide(direction) {
        currentPosition += direction * articleWidth;
        currentPosition = Math.max(Math.min(currentPosition, 0), maxPosition);
        reviewsWrapper.style.transform = `translateX(${currentPosition}px)`;
    }

    prevButton.addEventListener('click', function () {
        slide(1);
    });

    nextButton.addEventListener('click', function () {
        slide(-1);
    });
});


