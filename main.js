// 네비게이션바 맨위에서 벗어나면 그림자 생성

const navbar = document.querySelector('#navbar')

document.addEventListener('scroll', () => {
  if(window.scrollY > 0) {
    navbar.classList.add('shadow')
  } else {
    navbar.classList.remove('shadow')
  }
})