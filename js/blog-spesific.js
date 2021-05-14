document.cookie = "SameSite=None; Secure";

const resultsContainer = document.querySelector(".blog-spesific-container");



const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");
const media = params.get("featured_media");



const urlPosts = "https://keano.one/wp-json/wp/v2/posts/" + id;
const urlMedias = "https://keano.one/wp-json/wp/v2/media/" + media;





async function fetchBlogSpesific() {
    
    
    
    try {
        const responsePost = await fetch(urlPosts);
        const responseMedia = await fetch(urlMedias);
        
        const jsonPost = await responsePost.json();
        const jsonMedia = await responseMedia.json();
        

        // Set the document title dynamically
        document.title = "Cool Surf Spots | " + jsonPost.title.rendered;



        console.log(jsonPost);
        console.log(jsonMedia);
        
    
        createHtml(jsonPost);

        // Get the modal
        const modal = document.querySelector("#myModal");
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        const img = document.querySelector(".blog-spesific-image img");
        const modalImg = document.querySelector("#img01");
        const figCapt = document.querySelector(".blog-spesific-image figcaption").innerText;
        const captionText = document.querySelector("#caption");

        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = `${figCapt}`;
          }

        // Get the <span> element that closes the modal
        const closeModal = document.querySelector(".close");

        // When the user clicks on (x), close the modal
        closeModal.onclick = function() { 
        modal.style.display = "none";
        }
      
    }
    catch(error) {
        console.log(error);
        resultsContainer.innerHTML = message("error", error);
    }
    
    
}

fetchBlogSpesific();


// create the html
function createHtml(jsonPost) {

    
        
        const noformatDate = jsonPost.date;
        const formatDate = noformatDate.replace("T", " - ");

        resultsContainer.innerHTML =  `<div class="blog-spesific-item">
                                            <h2 class="blog-spesific-title">${jsonPost.title.rendered}</h2>
                                            ${jsonPost.content.rendered}
                                            <div id="myModal" class="modal">
                                                <span class="close">&#10005</span>
                                                <img class="modal-content" id="img01">
                                                <div id="caption"></div>
                                            </div>
                                            <p class="blog-spesific-dates"> ${formatDate} </p> 
                                        </div>
                                        `;
                                                                       
    
}








