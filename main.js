'use strict'

// 네비게이션바 맨위에서 벗어나면 그림자 생성

const navbar = document.querySelector('#navbar')

document.addEventListener('scroll', () => {
  if(window.scrollY > 0) {
    navbar.classList.add('shadow')
  } else {
    navbar.classList.remove('shadow')
  }
})

// 토글 버튼 누르면 네비게이션바 메뉴 출현

const toggleBtn = document.querySelector('.toggle_btn')
const navbarMenu = document.querySelector('.navbar__menu')

toggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open')
})

// 네비게이션바 탭 클릭하면 해당 탭으로 이동

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector)
  scrollTo.scrollIntoView({behavior: "smooth"})
  selectNavItem(navItems[sectionId.indexOf(selector)])
}
navbarMenu.addEventListener('click', (event) => {
  const target = event.target
  const link = target.dataset.link
  scrollIntoView(link)
})

// 화살표 버튼 누르면 맨위로 이동, 스크롤 내리면 보이게
const home = document.querySelector('.home__container')
const homeHeight = home.getBoundingClientRect().height
const arrowBtn = document.querySelector('.arrowBtn')

arrowBtn.addEventListener('click', () => {
  scrollIntoView('#home')
})

document.addEventListener('scroll', () => {
  arrowBtn.style.opacity = window.scrollY / homeHeight
})



// 해당 탭 버튼 활성화

const sectionId = ['#home', '#featured', '#women', '#new']
const sections = sectionId.map(id => document.querySelector(id))
const navItems = sectionId.map(id => document.querySelector(`[data-link="${id}"]`))

let selectedNavIndex = 0
let selectedNavItem = navItems[0]

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active')
  selectedNavItem = selected
  selectedNavItem.classList.add('active')
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionId.indexOf(`#${entry.target.id}`)
      console.log(entry.boundingClientRect.y)
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1
        console.log(index, selectedNavIndex)
      } else {
        selectedNavIndex = index - 1
        console.log(index, selectedNavIndex)
      }
    }
  })
}, options)

sections.forEach(section => observer.observe(section))

// 탭 활성화
window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0
  } else if(Math.round(window.scrollY + window.innerHeight + 150) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1
  }
  selectNavItem(navItems[selectedNavIndex])
})