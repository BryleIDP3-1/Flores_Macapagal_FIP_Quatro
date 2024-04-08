document.addEventListener('DOMContentLoaded', function() {
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

    // Function to show the lightbox
    function showLightbox(title, content) {
        // Create HTML content for the lightbox
        var lightboxContent = `
            <div class="lightbox active">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <h2>${title}</h2>
                    <p>${content}</p>
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

    // Get the open-reward button
    var openRewardButton = document.querySelector('.open-reward');

    // Add click event listener to the open-reward button
    openRewardButton.addEventListener('click', function() {
        // Call the function to show the reward claim lightbox
        showRewardClaimLightbox();
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