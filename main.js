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
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);

});

// toggle button
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
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
const homeContainer = document.querySelector('.home__container');
const homeHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight ;
});

//Arrow up Button
const arrowbtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight / 2){
        arrowbtn.classList.add('visible');
    }
    else{
        arrowbtn.classList.remove('visible');
    }
});

// Aroow up Button Click
arrowbtn.addEventListener('click', ()=>{
    scrollIntoView('#home');
});

// projcet fillter
const workBtnContainer = document.querySelector('.work__categories');
const projcetContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter === null){
        return ;
    }

    const select = document.querySelector('.categories__btn.selected');
    select.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');


    projcetContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach(project => {   
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });

        projcetContainer.classList.remove('anim-out');
    }, 300);
});

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
    document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};


const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if(Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight){
        selectedNavIndex = 5;
    }
    selectNavItem(navItems[selectedNavIndex]);
});