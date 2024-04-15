document.addEventListener('DOMContentLoaded', function () {
    // Function to show the lightbox
    function showLightbox(content, lightboxType) {
        var lightboxClass = lightboxType === 'reward' ? 'lightbox-reward' : 'lightbox-product';
        var lightboxContent = `<div class="lightbox ${lightboxClass} active">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>${content}
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxContent);
        var closeButton = document.querySelector(`.${lightboxClass} .lightbox-close`);
        closeButton.addEventListener('click', function () {
            document.querySelector(`.${lightboxClass}`).remove();
            if (lightboxType === 'reward') openRewardButton.disabled = false;
        });
    }


    // Function to handle form submission
    function handleFormSubmission(email) {
        console.log('Email submitted:', email);
        document.querySelector('.lightbox').remove();
        showLightbox("Thank you for subscribing!", "reward");
    }


    // Function to show the reward claim lightbox
    function showRewardClaimLightbox() {
        openRewardButton.disabled = true;
        var lightboxContent = `<div class="lightbox reward active">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <h2>Claim your reward!</h2>
                    <p>Put your email to claim your reward:</p>
                    <form id="claimRewardForm">
                        <input type="email" id="emailInput" name="email" placeholder="Enter your email" required>
                        <button type="submit">Claim</button>
                    </form>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxContent);
        var claimRewardForm = document.getElementById('claimRewardForm');
        claimRewardForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var email = document.getElementById('emailInput').value;
            handleFormSubmission(email);
        });
        var closeButton = document.querySelector('.lightbox.reward .lightbox-close');
        closeButton.addEventListener('click', function () {
            document.querySelector('.lightbox.reward').remove();
            openRewardButton.disabled = false;
        });
    }


    // Function to show the lightbox with product details
    function showProductLightbox(productName, productTasteBuds, productIngredients) {
        var content = `<h2>${productName}</h2><h4>${productTasteBuds}</h4><p class="ingredients">${productIngredients}</p>`;
        showLightbox(content, "product");
    }


    // Event listener for open-reward button
    var openRewardButton = document.querySelector('.open-reward');
    openRewardButton.addEventListener('click', showRewardClaimLightbox);


    // Event listener for MORE INFO buttons
    var infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var productDiv = button.closest('.full-width-grid-con');
            var productName = productDiv.querySelector('h3').textContent;
            var productTasteBuds = productDiv.querySelector('.taste-buds').textContent;
            var productIngredients = productDiv.querySelector('.ingredients').textContent;
            showProductLightbox(productName, productTasteBuds, productIngredients);
            console.log("Product Name:", productName);
            console.log("Taste Buds:", productTasteBuds);
            console.log("Ingredients:", productIngredients);
        });
    });


    // Hide specific tags initially
    document.querySelectorAll('.product-name, .taste-buds, .ingredients').forEach(function (elem) {
        elem.style.display = 'none';
    });


   
    // Event listener for info icons
    var infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            var parentDiv = icon.parentElement;
            var productName = parentDiv.querySelector('h3').textContent;
            var productDescription = parentDiv.querySelector('p').textContent;
            var productAdditionalInfo = parentDiv.querySelector('h4').textContent;
            console.log("Product Name:", productName);
            console.log("Product Description:", productDescription);
            console.log("Product Additional Info:", productAdditionalInfo);
            var content = `<h2>${productName}</h2><h4>${productAdditionalInfo}</h4><p>${productDescription}</p>`;
            showLightbox(content, "product");
        });
    });


    // Hide h4 and p tags inside product divs
    var productDivs = document.querySelectorAll('#blueberry, #peachy, #apple, #scarlet');
    productDivs.forEach(function (div) {
        div.querySelectorAll('h4, p').forEach(function (elem) {
            elem.style.display = 'none';
        });
    });


    // Console log for reviews
    const reviewsWrapper = document.getElementById('reviews');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    if (reviewsWrapper && reviewsWrapper.querySelector('article')) {
        let currentPosition = 0;
        const articleWidth = reviewsWrapper.querySelector('article').offsetWidth;
        const maxPosition = -580;
        function slide(direction) {
            currentPosition += direction * articleWidth;
            currentPosition = Math.max(Math.min(currentPosition, 0), maxPosition);
            reviewsWrapper.style.transform = `translateX(${currentPosition}px)`;
        }
        prevButton.addEventListener('click', () => slide(1));
        nextButton.addEventListener('click', () => slide(-1));
    }
});