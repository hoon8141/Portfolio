'use strict';

//MAKE NAVBAR
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }
    else{
        navbar.classList.remove('navbar--dark');
    }
});

// Handle navbar_menu
const navbarMenu = navbar.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    else{
       scrollIntoView(link);
    }
});

//Handle home button
const homebutton = document.querySelector('.home__button');
homebutton.addEventListener('click', (event) =>{
    scrollIntoView('#contact');
    
});

function scrollIntoView(selector){
    const scrollToId = document.querySelector(selector);
    scrollToId.scrollIntoView({behavior: "smooth"});
}

//Transparent Home
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    home.style.opacity = 1 - window.scrollY / homeHeight ;
});