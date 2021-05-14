document.cookie = "SameSite=None; Secure";

const resultsContainer = document.querySelector(".blog-results");
const loader = document.querySelector(".blog-results > div");
const loadButton = document.querySelector(".load-more-button");
const searchInput = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
const closeSearch = document.querySelector(".search-container i");

let postAmount = 10;



async function fetchBlog(postAmount) {
    console.log(postAmount);
    

    const urlpost = `https://keano.one/wp-json/wp/v2/posts?per_page=${postAmount.toString()}`;
    const urlmedia = `https://keano.one/wp-json/wp/v2/media?per_page=${postAmount.toString()}`;
    

    try {
        const responsePost = await fetch(urlpost);
        const responseMedia = await fetch(urlmedia);
        
        const jsonPosts = await responsePost.json();
        const jsonMedias = await responseMedia.json();

        console.log(jsonPosts);
        console.log(jsonMedias);
        
        // remove the loader animation from the picture
        loader.classList.remove("loader");

        // disable the "load post" button when there's no more posts
        if (postAmount > jsonPosts.length) {
            loadButton.disabled = true;
            console.log(loadButton.disabled);
            loadButton.style.color = "#717171";
            loadButton.style.border = "2px solid lightgray";
            loadButton.value = "No more posts";
            
        }

        // Make variable for array of blog titles (for search function)
        createHtml(jsonPosts, jsonMedias);
        

        
        // when search button is clicked, use the compare function
        searchButton.onclick = function() {
            const titleFiltered = jsonPosts.filter(compareSearch);

            // initialize an array for the media object, to map the filtered post object with
            const mediaFiltered = [];

            // Loop as long as the filtered post object is
            for (let i = 0; i < titleFiltered.length; i++) {
                
                let mediaId = titleFiltered[i].featured_media;
                
                // Loop and map the post objects against the media objects to get the correct picture to the correct post
                for (let j = 0; j < jsonMedias.length; j++) {
                    if (jsonMedias[j].id === mediaId) {
                        
                        mediaFiltered.push(jsonMedias[j]);
                        
                    }   
                }
            
            }
            createHtml(titleFiltered, mediaFiltered);
        }



    }
    catch(error) {
        console.log(error);
        resultsContainer.innerHTML = message("error", error);
    }
    
    
}

fetchBlog(postAmount);

// load 5 more posts when button pressed
loadButton.onclick = loadPosts;

function loadPosts() {
    fetchBlog(postAmount += 5);
    console.log("postamount " + postAmount);
}

// create the html
function createHtml(jsonPosts, jsonMedias) {

    
    resultsContainer.innerHTML = "";

    for (let i = 0; i < jsonPosts.length; i++) {
        
        
        // Change the API post date to different format
        const noformatDate = jsonPosts[i].date;
        const formatDate = noformatDate.replace("T", " - ");

        resultsContainer.innerHTML +=  `<a href="blog-spesific.html?id=${jsonPosts[i].id}&featured_media=${jsonPosts[i].featured_media}" class="blog-item">
                                        <div class="blog-image" style="background-image: url(${jsonMedias[i].media_details.sizes.medium_large.source_url});"></div>
                                        <div class="blog-details">
                                        <h2 class="blog-title">${jsonPosts[i].title.rendered}</h2>
                                        <p> ${jsonPosts[i].excerpt.rendered} </p>
                                        <p class="blog-dates"> ${formatDate} </p>                                                                                                                                                      
                                        </div>
                                        </a>`;
                                                                       
    }
    
  
}




// function for comparing search input with blog's
function compareSearch(blog) {
   
    let n = blog.title.rendered.toLowerCase().search(searchInput.value.toLowerCase());
    
    // the search method gives -1 if no match. 
    if (n >= 0) {
        return blog.title.rendered;
    }
    
}


// add a close icon in the search field when search length more than 5
searchInput.addEventListener("keyup", function() {
    if (searchInput.value.length > 5) {
        closeSearch.style.opacity = "1";
    }
    else {
        closeSearch.style.opacity = "0";
    }
  });



// clear the search input with the close icon
closeSearch.onclick = function() {
    console.log("hello");
    searchInput.value = "";
}

// code for making the "Enter" search the blog's (in addition to the search button)
searchInput.addEventListener("keyup", function(event) {
  // Number 13 is the number for Enter
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // make the button click when pressing Enter
    searchButton.click();
  }
});
