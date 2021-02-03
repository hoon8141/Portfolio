'use strict';

//MAKE NAVBAR
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }
    else{
        navbar.classList.remove('navbar--dark');
    }
});

// Handle navbar_menu
const navbarMenu = navbar.querySelector('.navbar__menu');
addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    else{
        const scrollToId = document.querySelector(link);
        scrollToId.scrollIntoView({behavior: "smooth"});
        
    }
})
