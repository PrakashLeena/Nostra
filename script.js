var offerbar= document.getElementById("offerbar")
var close__icon = document.getElementById("close__icon")
close__icon.addEventListener("click",function(){
    offerbar.remove()
})

// Image Slider 
var images = [
    document.getElementById('img1'),
    document.getElementById('img2'),
    document.getElementById('img3')
];
var currentImage = 0;

function showImage(index, direction) {
    images.forEach(function(img, i) {
        img.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    });
    images.forEach(function(img, i) {
        if (i === index) {
            img.style.display = 'block';
            if (direction === 'next') {
                img.classList.add('slide-in-right');
            } else if (direction === 'prev') {
                img.classList.add('slide-in-left');
            }
        } else {
            if (img.style.display === 'block') {
                if (direction === 'next') {
                    img.classList.add('slide-out-left');
                } else if (direction === 'prev') {
                    img.classList.add('slide-out-right');
                }
                setTimeout(function() {
                    img.style.display = 'none';
                    img.classList.remove('slide-out-left', 'slide-out-right');
                }, 2000);
            } else {
                img.style.display = 'none';
            }
        }
    });
}

// Always ensure buttons are visible
function ensureSliderButtonsOnTop() {
    var btn1 = document.getElementById('sliderbutton1');
    var btn2 = document.getElementById('sliderbutton2');
    if (btn1) btn1.style.zIndex = 10;
    if (btn2) btn2.style.zIndex = 10;
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function() {
    showImage(currentImage);
    ensureSliderButtonsOnTop();
    
    // Scroll to New Arrival section
    var newArrivalBtn = document.getElementById('navbar__newarrival');
    var newArrivalSection = document.getElementById('newarrival-section');
    if (newArrivalBtn && newArrivalSection) {
        newArrivalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            newArrivalSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Scroll to Most Wanted section
    var mostWantedBtn = document.getElementById('navbar__mostwanted');
    var mostWantedSection = document.getElementById('mostwanted-section');
    if (mostWantedBtn && mostWantedSection) {
        mostWantedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mostWantedSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function nextImage() {
    var prev = currentImage;
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage, 'next');
}

function prevImage() {
    var prev = currentImage;
    currentImage = (currentImage - 1 + images.length) % images.length;
    showImage(currentImage, 'prev');
}

// Heart/Add to cart functionality
var addtocard1 = document.getElementById("addtocard1")
var addtocard2 = document.getElementById("addtocard2")
var addtocard3 = document.getElementById("addtocard3")
var addtocard4 = document.getElementById("addtocard4")
var hart1 = document.querySelector(".hart1")
var hart2 = document.querySelector(".hart2")
var hart3 = document.querySelector(".hart3")
var hart4 = document.querySelector(".hart4")

if (addtocard1 && hart1) {
    addtocard1.addEventListener("click", function() {
        hart1.classList.toggle("hartred")
    })
}

if (addtocard2 && hart2) {
    addtocard2.addEventListener("click", function() {
        hart2.classList.toggle("hartred")
    })
}

if (addtocard3 && hart3) {
    addtocard3.addEventListener("click", function() {
        hart3.classList.toggle("hartred")
    })
}

if (addtocard4 && hart4) {
    addtocard4.addEventListener("click", function() {
        hart4.classList.toggle("hartred")
    })
} 

// Collection filtering functionality
var collection = document.getElementById("collection__image--container")
var searchInput = document.querySelector("#collectionsite__searchbar input")
var productlist = collection.querySelectorAll("div[data-occasion]")
var occasionCheckboxes = document.getElementsByName("Occasion")
var colourCheckboxes = document.getElementsByName("colours")
var arrivalCheckboxes = document.getElementsByName("Arrivals")

var activeFilters = {
    occasion: [],
    colour: [],
    arrival: []
}

// Original search functionality restored
var collectionsite__searchbar = document.querySelector("#collectionsite__searchbar input")
if (collectionsite__searchbar) {
    collectionsite__searchbar.addEventListener("keyup", function(event) {
        var enteredvalue = event.target.value.toUpperCase()
        
        for (var count = 0; count < productlist.length; count++) {
            var productname = productlist[count].querySelector("h3").textContent
            
            if (productname.toUpperCase().indexOf(enteredvalue) < 0) {
                productlist[count].style.display = "none"
            } else {
                productlist[count].style.display = "block"
            }
        }
    })
}

// Filter function
function applyFilters() {
    for (var i = 0; i < productlist.length; i++) {
        var product = productlist[i]
        var shouldShow = true
        
        // Check occasion filter
        if (activeFilters.occasion.length > 0) {
            var productOccasion = product.getAttribute('data-occasion')
            if (!activeFilters.occasion.includes(productOccasion)) {
                shouldShow = false
            }
        }
        
        // Check colour filter
        if (activeFilters.colour.length > 0) {
            var productColour = product.getAttribute('data-color')
            if (!activeFilters.colour.includes(productColour)) {
                shouldShow = false
            }
        }
        
        // Check arrival filter
        if (activeFilters.arrival.length > 0) {
            var productArrival = product.getAttribute('data-arrival')
            if (!activeFilters.arrival.includes(productArrival)) {
                shouldShow = false
            }
        }
        
        // Show or hide product
        if (shouldShow) {
            product.style.display = "block"
        } else {
            product.style.display = "none"
        }
    }
}

// Occasion filter event listeners
for (var i = 0; i < occasionCheckboxes.length; i++) {
    occasionCheckboxes[i].addEventListener("change", function(event) {
        var value = event.target.value
        
        if (event.target.checked) {
            activeFilters.occasion.push(value)
        } else {
            var index = activeFilters.occasion.indexOf(value)
            if (index > -1) {
                activeFilters.occasion.splice(index, 1)
            }
        }
        
        applyFilters()
    })
}

// Colour filter event listeners
for (var i = 0; i < colourCheckboxes.length; i++) {
    colourCheckboxes[i].addEventListener("change", function(event) {
        var value = event.target.value
        
        if (event.target.checked) {
            activeFilters.colour.push(value)
        } else {
            var index = activeFilters.colour.indexOf(value)
            if (index > -1) {
                activeFilters.colour.splice(index, 1)
            }
        }
        
        applyFilters()
    })
}

// Arrival filter event listeners
for (var i = 0; i < arrivalCheckboxes.length; i++) {
    arrivalCheckboxes[i].addEventListener("change", function(event) {
        var value = event.target.value
        
        if (event.target.checked) {
            activeFilters.arrival.push(value)
        } else {
            var index = activeFilters.arrival.indexOf(value)
            if (index > -1) {
                activeFilters.arrival.splice(index, 1)
            }
        }
        
        applyFilters()
    })
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    var mobileMenuToggle = document.getElementById('mobile-menu-toggle')
    var mobileSideMenu = document.getElementById('mobile-side-menu')
    var closeMenuBtn = document.querySelector('.close-menu')
    var hamburger = document.querySelector('.hamburger')
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileSideMenu.classList.toggle('active')
            hamburger.classList.toggle('active')
        })
    }
    
    // Close menu button
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mobileSideMenu.classList.remove('active')
            hamburger.classList.remove('active')
        })
    }
    
    // Mobile menu smooth scrolling for New Arrival and Most Wanted
    var mobileNewArrivalBtn = document.getElementById('mobile-navbar__newarrival')
    var mobileMostWantedBtn = document.getElementById('mobile-navbar__mostwanted')
    var newArrivalSection = document.getElementById('newarrival-section')
    var mostWantedSection = document.getElementById('mostwanted-section')
    
    if (mobileNewArrivalBtn && newArrivalSection) {
        mobileNewArrivalBtn.addEventListener('click', function(e) {
            e.preventDefault()
            newArrivalSection.scrollIntoView({ behavior: 'smooth' })
            // Close mobile menu after clicking
            mobileSideMenu.classList.remove('active')
            hamburger.classList.remove('active')
        })
    }
    
    if (mobileMostWantedBtn && mostWantedSection) {
        mobileMostWantedBtn.addEventListener('click', function(e) {
            e.preventDefault()
            mostWantedSection.scrollIntoView({ behavior: 'smooth' })
            // Close mobile menu after clicking
            mobileSideMenu.classList.remove('active')
            hamburger.classList.remove('active')
        })
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileSideMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            mobileSideMenu.classList.remove('active')
            hamburger.classList.remove('active')
        }
    })
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu()
})
