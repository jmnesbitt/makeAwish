import { supabase } from '/supabaseClient.mjs';

let selectedPostIt = null;

// Load wishes when the page loads
window.onload = function() {
    console.log("Page loaded, loading wishes...");
    loadWishes();
};

// Function to save a wish
async function saveWish(wish) {
    try {
        const { data, error } = await supabase.from('wishes').insert([{ wish }]);
        if (error) {
            throw error;
        }
        console.log('Wish saved successfully!');
    } catch (error) {
        console.error('Failed to save wish:', error.message);
    }
}

// Function to load wishes
async function loadWishes() {
    try {
        const { data, error } = await supabase.from('wishes').select('*');
        if (error) {
            throw error;
        }
        console.log('Loaded wishes:', data);
        data.forEach(wish => {
            renderPostIt(wish.wish);
        });
    } catch (error) {
        console.error('Failed to load wishes:', error.message);
    }
}

function makeWish() {
    var wishInput = document.getElementById("wish-input").value;
    if (wishInput.trim() !== "") {
        renderPostIt(wishInput);
        saveWish(wishInput);
        clearInput();
    } else {
        alert("Please type your wish!");
    }
}

function renderPostIt(wish) {
    console.log("Rendering post-it for wish:", wish);
    var postItContainer = document.getElementById('post-it');
    var postIt = document.createElement('div');
    postIt.className = 'post-it';
    var randomX = Math.floor(Math.random() * (window.innerWidth - 200));
    var randomY = Math.floor(Math.random() * (window.innerHeight - 200));
    postIt.style.left = randomX + 'px';
    postIt.style.top = randomY + 'px';

    postIt.innerHTML = `<p>${wish}</p>`;
    postItContainer.appendChild(postIt);

    var height = postIt.offsetHeight;
    postIt.style.height = height + 'px';

    var randomColor = getRandomPastelColor();
    postIt.style.backgroundColor = randomColor;

    postIt.addEventListener('mousedown', onMouseDown);
    postIt.addEventListener('touchstart', onTouchStart);
}

function onMouseDown(event) {
    selectedPostIt = this;
    let shiftX = event.clientX - this.getBoundingClientRect().left;
    let shiftY = event.clientY - this.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        selectedPostIt.style.left = pageX - shiftX + 'px';
        selectedPostIt.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        selectedPostIt.onmouseup = null;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onTouchStart(event) {
    selectedPostIt = this;
    let shiftX = event.touches[0].clientX - this.getBoundingClientRect().left;
    let shiftY = event.touches[0].clientY - this.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        selectedPostIt.style.left = pageX - shiftX + 'px';
        selectedPostIt.style.top = pageY - shiftY + 'px';
    }

    function onTouchMove(event) {
        moveAt(event.touches[0].pageX, event.touches[0].pageY);
    }

    function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        selectedPostIt.ontouchend = null;
    }

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
}

function clearInput() {
    document.getElementById("wish-input").value = "";
}

function resetWishes() {
    console.log("Reset button clicked");
    console.log("Wishes removed from local storage");
    localStorage.removeItem('wishes');
    let postItContainer = document.getElementById('post-it');
    while (postItContainer.firstChild) {
        postItContainer.removeChild(postItContainer.firstChild);
    }
}

function getRandomPastelColor() {
    var hue = Math.floor(Math.random() * 360);
    var pastel = 'hsl(' + hue + ', 100%, 80%)';
    return pastel;
}
