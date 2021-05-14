document.cookie = "SameSite=None; Secure";

const resultsContainer = document.querySelector(".posts-result");

// Corousel slides for modal "crazy waves"
const crazyWavesSlides = document.querySelector(".modal-slideshow-crazy-waves-mySlides");

// Get the modal
const crazyWavesmodal = document.querySelector("#modal-slideshow-crazy-waves");

// Corousel slides for blogs
const slides1 = document.querySelector(".mySlides1");
const slides2 = document.querySelector(".mySlides2");
const slides3 = document.querySelector(".mySlides3");
const slides4 = document.querySelector(".mySlides4");

const urlpost = "https://keano.one/wp-json/wp/v2/posts?per_page=12";
const urlmedia = "https://keano.one/wp-json/wp/v2/media?per_page=12";

async function fetchPosts() {
    

    try {
        const responsePost = await fetch(urlpost);
        const responseMedia = await fetch(urlmedia);
        
        const jsonPosts = await responsePost.json();
        const jsonMedias = await responseMedia.json();

        console.log(jsonPosts);
        console.log(jsonMedias);


    
        createHtml(jsonPosts, jsonMedias);   
      
    }
    catch(error) {
        console.log(error);
        slides1.innerHTML = message("error", error);
    }
    
    
}

fetchPosts();

function createHtml(jsonPosts, jsonMedias) {

    slides1.innerHTML = "";
    slides2.innerHTML = "";
    slides3.innerHTML = "";
    slides4.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        
        const noformatDate = jsonPosts[i].date;
        console.log(noformatDate);
        const formatDate = noformatDate.replace("T", " - ");

        slides1.innerHTML +=            `<a href="blog-spesific.html?id=${jsonPosts[i].id}&featured_media=${jsonPosts[i].featured_media}" class="post-item">
                                        <div class="post-image" style="background-image: url(${jsonMedias[i].media_details.sizes.medium_large.source_url});"></div>
                                        <div class="details">
                                        <h2 class="post-title">${jsonPosts[i].title.rendered}</h2>
                                        <p> ${jsonPosts[i].excerpt.rendered} </p>
                                        <p class="post-dates"> ${formatDate} </p>                                                                                                                                                      
                                        </div>
                                        </a>`;
                                                                       
    }
    for (let i = 3; i < 6; i++) {
        slides2.innerHTML +=            `<a href="blog-spesific.html?id=${jsonPosts[i].id}&featured_media=${jsonPosts[i].featured_media}" class="post-item">
                                        <div class="post-image" style="background-image: url(${jsonMedias[i].media_details.sizes.medium_large.source_url});"></div>
                                        <div class="details">
                                        <h2 class="post-title">${jsonPosts[i].title.rendered}</h2>
                                        <p> ${jsonPosts[i].excerpt.rendered} </p>
                                        <p class="post-dates"> ${jsonPosts[i].date} </p>                                                                                                                                                      
                                        </div>
                                        </a>`;
                                                                       
    }
    for (let i = 6; i < 9; i++) {
        slides3.innerHTML +=            `<a href="blog-spesific.html?id=${jsonPosts[i].id}&featured_media=${jsonPosts[i].featured_media}" class="post-item">
                                        <div class="post-image" style="background-image: url(${jsonMedias[i].media_details.sizes.medium_large.source_url});"></div>
                                        <div class="details">
                                        <h2 class="post-title">${jsonPosts[i].title.rendered}</h2>
                                        <p> ${jsonPosts[i].excerpt.rendered} </p>
                                        <p class="post-dates"> ${jsonPosts[i].date} </p>                                                                                                                                                      
                                        </div>
                                        </a>`;
                                                                       
    }
    for (let i = 9; i < 12; i++) {
        slides4.innerHTML +=            `<a href="blog-spesific.html?id=${jsonPosts[i].id}&featured_media=${jsonPosts[i].featured_media}" class="post-item">
                                        <div class="post-image" style="background-image: url(${jsonMedias[i].media_details.sizes.medium_large.source_url});"></div>
                                        <div class="details">
                                        <h2 class="post-title">${jsonPosts[i].title.rendered}</h2>
                                        <p> ${jsonPosts[i].excerpt.rendered} </p>
                                        <p class="post-dates"> ${jsonPosts[i].date} </p>                                                                                                                                                      
                                        </div>
                                        </a>`;
                                                                       
    }
}




// code for corousel "crazy waves" modal
let crazyWavesslideIndex = 1;



// Set next and previouse on "crazy waves" modal
function countSlide(n) {
    showSlidesCrazyWaves(crazyWavesslideIndex += n);
}


// Open the crazy wave modal when link is clicked (give it a predefined index)
function crazyWaveSlideLink(n) {
    showSlidesCrazyWaves(crazyWavesslideIndex = n);
    crazyWavesmodal.style.display = "block";
}

// logic for which crazy wave to be shown in the modal
function showSlidesCrazyWaves(n) {
    let i;
    const crazyWavesSlides = document.querySelectorAll(".modal-slideshow-crazy-waves-mySlides");
    if (n > crazyWavesSlides.length) {crazyWavesslideIndex = 1}
    if (n < 1) {crazyWavesslideIndex = crazyWavesSlides.length}
    for (i = 0; i < crazyWavesSlides.length; i++) {
        crazyWavesSlides[i].style.display = "none";
    }
    crazyWavesSlides[crazyWavesslideIndex-1].style.display = "block";
  }

 // Get the <span> element that closes the modal
 const closeCrazyWaveModal = document.querySelector(".crazy-waves-modal-close");

 // When the user clicks on (x), close the modal
 closeCrazyWaveModal.onclick = function() { 
 crazyWavesmodal.style.display = "none";
 }




// code for corousel Blogs
let slideIndex = 1;
showSlides(slideIndex);


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}



function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

