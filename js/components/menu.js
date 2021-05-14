const menuState = document.querySelector("#hamburger-menu");



menuState.onclick = toggleMenuClass;

function toggleMenuClass () {

    const menuClass = document.querySelectorAll(".costum-menu > i");
    for (let i = 0; menuClass.length; i++) {
        menuClass[i].classList.toggle("active");
    }
          
}





