//elements
  const header = document.querySelector('.header');
  const headerList = document.querySelector('.header__list');
  const headerListLink = document.querySelectorAll('.header__list_link');
    
  const burgerBtn = document.querySelector('.burger__icon');


  //click on burger button
burgerBtn.addEventListener('click', function() {

  //click to return to the first variant
  if(header.classList.contains('header_active')) {
    header.classList.remove('header_active');
    header.classList.add('header_inactive');

    burgerBtn.classList.remove('burger__icon_active');
    burgerBtn.classList.add('burger__icon_inactive');

    headerListLink.forEach(link => {
      link.classList.remove('header__list_link_active');
    })
    document.body.style.overflow = '';
  //click to open menu
  } else if (header.classList.contains('header_inactive')) {
    header.classList.remove('header_inactive');
    header.classList.add('header_active');

    burgerBtn.classList.remove('burger__icon_inactive');
    burgerBtn.classList.add('burger__icon_active');

    setTimeout(() => {
      for(let i = 0; i < headerListLink.length; i++) {
        if (burgerBtn.classList.contains('burger__icon_inactive')) {
          return;
        }
        headerListLinkActive(i);
      }
      function headerListLinkActive(i) {
        clrTimeout = setTimeout(() => {
          if (burgerBtn.classList.contains('burger__icon_inactive')) {
            clearTimeout(clrTimeout);
            return;
          } else if(burgerBtn.classList.contains('burger__icon_active')) {
            headerListLink[i].classList.add('header__list_link_active');
          }
        },500*i)
      return;
      }
    },2000)
    document.body.style.overflow = 'hidden';
  //first time click
  } else {
    header.classList.add('header_active');
    burgerBtn.classList.add('burger__icon_active');


    setTimeout(() => {
      for(let i = 0; i < headerListLink.length; i++) {
        if (burgerBtn.classList.contains('burger__icon_inactive')) {
          return;
        }
        headerListLinkActive(i);
      }
      function headerListLinkActive(i) {
        clrTimeout = setTimeout(() => {
          if (burgerBtn.classList.contains('burger__icon_inactive')) {
            clearTimeout(clrTimeout);
            return;
          } else if(burgerBtn.classList.contains('burger__icon_active')) {
            headerListLink[i].classList.add('header__list_link_active');
          }
        },500*i)
      return;
      }
    },2000)
    document.body.style.overflow = 'hidden';
  }
})