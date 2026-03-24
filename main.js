let textElement = document.querySelector(".animated-word");
let words = ["Web Developer", "Commerce Student", "Software Engineer"];
let wordIndex = 0;
let charIndex = 0;
let typeSpeed = 0;
let isDeleting = false

function type() {
  const currentWord = words[wordIndex];
  

  if(isDeleting){
    textElement.textContent = currentWord.slice(0, charIndex - 1)
    charIndex--;
    typeSpeed = 100;
  }else{
    textElement.textContent = currentWord.slice(0, charIndex + 1)
    charIndex++;
    typeSpeed = 100;
  }

  if(!isDeleting && charIndex === currentWord.length){
    typeSpeed = 800;
    isDeleting = true;
  }else if(isDeleting && charIndex === 0){
    wordIndex = (wordIndex + 1) % words.length;
    isDeleting = false;
  }

  setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);



// =========================
//---Theme-------------
// =========================
class Theme{
  constructor(){
    this.styleBtn = document.querySelector(".mode"); //Btn
    this.styleIcon = document.querySelector(".mode i");//Icon => To change it with click

    if(this.styleBtn && this.styleIcon){
      this.init()
    }
  }
  init(){
    this.styleBtn.addEventListener("click", () => this.updateThemeAndIcon())
    this.lsChk()
  }

  updateThemeAndIcon(){
    if (document.body.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
    } else {
      document.body.dataset.theme = "dark";
    }
    this.updateModeIcon(document.body.dataset.theme)
    localStorage.setItem("style", document.body.dataset.theme);
  }

  updateModeIcon(theme){
    // this.styleIcon.classList
    if(theme === "dark"){
      this.styleIcon.classList.replace("fa-moon", "fa-sun");
    }else{
      this.styleIcon.classList.replace("fa-sun" , "fa-moon");
    }
  }

  lsChk(){
    let themeStatus = localStorage.getItem("style");
    if(themeStatus){
      document.body.dataset.theme = themeStatus;
      this.updateModeIcon(themeStatus);
    }
  }
}
new Theme()



// =========================
//----NavMenu-------------
// =========================
class NavMenu{
  constructor(){
    //Nav Menu
    this.nav = document.querySelector("nav")
    this.navIcon = document.querySelector("#nav-icon")
    this.navMenu = document.querySelector(".nav-menu")
    //Action
    if(this.navIcon && this.navMenu){
      this.init()
    }
  }

  init(){
    this.toggleAction()
  }

  toggleAction(){
    document.documentElement.addEventListener("click" , (e) => {
      if(e.target === this.navIcon){
        this.navMenu.classList.toggle("active")
        this.updateIcon()
      }else{
        this.removeMenu()
      }
    })
    window.addEventListener("resize", () => {
      this.removeMenu()
    })
  }

  removeMenu(){
    this.navMenu.classList.remove("active")
    this.navIcon.classList.replace("fa-xmark", "fa-bars")
  }

  updateIcon(){
    this.navMenu.classList.contains("active")
    ? this.navIcon.classList.replace("fa-bars", "fa-xmark")
    : this.navIcon.classList.replace("fa-xmark", "fa-bars")
  }
}
new NavMenu()




// =========================
//----Color Btn-------------
// =========================

class AccetnAction{
  constructor(){
    //Color Menu
    this.colorMenuBtn = document.querySelector(".colorSettingsIc");// Menu Btn
    this.colorMenu = document.querySelector(".colorSettingMenu");//Menu

    if(this.colorMenu && this.colorMenuBtn){
      this.init()
    }
  }

  init(){
    this.render();
    window.addEventListener("resize", () => {
      if(this.colorMenu.classList.contains("ClrSetMenuActive")){
        this.menuPositionChanger();
      }
    })
  }

  colorMenuToggle(){
    this.colorMenu.classList.toggle("active");
    this.menuPositionChanger();
  }

  menuPositionChanger(){
    let btnPosition = this.colorMenuBtn.getBoundingClientRect();
    this.colorMenu.style.top = `${btnPosition.top + 61}px`;
    this.colorMenu.style.left = `${btnPosition.left -37}px`;
  }

  setBodyColor(color){
  document.body.setAttribute("data-accent", color);
  }

  render(){
    document.documentElement.addEventListener("click", (e) => {
      if(e.target.closest(".colorSettingsIc")){
        this.colorMenuToggle();
      }else if(!e.target.closest(".colorSettingMenu")){
        this.colorMenu.classList.remove("active");
      }
      if(e.target.dataset.color){
        this.setBodyColor(e.target.dataset.color)
        localStorage.setItem("accent", e.target.dataset.color);
      }
    })

    let lsChk = localStorage.getItem("accent")
    if(lsChk){
      this.setBodyColor(lsChk);
    }
  }
  
}
new AccetnAction()

// =========================
//----Animated Scroll-------
// =========================

class ElementAnimation{
  constructor(){
    this.init()
  }
  init(){
    this.catchElements()
    window.addEventListener("scroll", () => {
      this.animateAboutSec()
      this.animateSkillsSec()
      this.upButton()
    })
    
    this.upBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    })
  }
  catchElements(){
    //About-Section
    this.aboutSection = document.querySelector(".about")
    this.imageWrapper = document.querySelector(".image-wrapper")
    this.myh5 = document.querySelector(".about .text h5")
    this.myh1 = document.querySelector(".about .text h1")
    this.myP = document.querySelector(".about .text p")
    this.cards = document.querySelectorAll(".about .card")
    //Skills-Section
    this.skillsSectionLocation = document.querySelector(".tech-skills")
    this.progressBar = Array.from(document.getElementsByClassName("progress"))
    this.cardOne = document.querySelector(".card-one")
    this.cardTwo = document.querySelector(".card-two")
    //Up Btn
    this.upBtn = document.querySelector(".upBtn");
  }

  animateAboutSec(){
      if (window.scrollY >= this.aboutSection.offsetTop - 800) {
        this.imageWrapper.classList.add("active")
        this.myh5.classList.add("active")
        this.myh1.classList.add("active")
        this.myP.classList.add("active")
        this.cards.forEach((el, index) => {
          el.style.transitionDelay = `${index * 0.1}s`
          el.classList.add("active")
          setTimeout(() => {
            el.style.transitionDelay = "";
          }, 1000)
        })
      }else {
        this.cards.forEach(e => e.classList.remove("active"))
        this.imageWrapper.classList.remove("active")
        this.myh5.classList.remove("active")
        this.myh1.classList.remove("active")
        this.myP.classList.remove("active")
      }
  }


  animateSkillsSec(){
      if (window.scrollY >= this.skillsSectionLocation.offsetTop - 800) {
        this.progressBar.forEach(ele => {ele.style.width = ele.dataset.width})
        this.cardOne.classList.add("show")
        this.cardTwo.classList.add("show")
      } else {
        this.progressBar.forEach(e => e.style.width = "0%")
        this.cardOne.classList.remove("show")
        this.cardTwo.classList.remove("show")
      }
  }
  
  upButton(){
    this.upBtn.classList.toggle("showBtn", window.scrollY >= 1000)
  }
}
new ElementAnimation()