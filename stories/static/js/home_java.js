
//elements
const topImages = document.querySelectorAll('.topblock__item');
const bottomImages = document.querySelectorAll('.bottomblock__item');
const bottomTitle = document.querySelectorAll('.bottomblock__item_text h2');
const topTitle = document.querySelectorAll('.topblock__item_text h2');


function detectMob() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}
console.log(detectMob());
if (detectMob() === true) {
	document.querySelectorAll('.images__container_content').forEach(img => {
		img.classList.add('hide_effects');
	})
	document.querySelectorAll('.topmenu a').forEach(a => {
		a.addEventListener('click', function() {
			this.style.textDecoration = 'none';
		})
	})
}

//elements
const sliderContainer = document.querySelectorAll('.slider__container');
const sliderText = document.querySelectorAll('.slider__container_content p');
const sliderLink = document.querySelectorAll('.main__block_links a');
const sliderLinkIcon = document.querySelectorAll('.main__block_links i');

if (document.body.offsetWidth > 800) {
  sliderLink.forEach(link => {
    link.addEventListener('mouseover', function() {
      let i = this.querySelector('i');
      let button = this.querySelector('button');
      var tl = gsap.timeline()
        .fromTo(i, {opacity:0, width:0, height:0, margin:0}, {duration:0.3, opacity:1, rotate:270, width:'20px', height:'25px', margin:'0 0 0 10px'}, 0)
        .fromTo(button, {background:"rgba(15, 144, 216, .96)"}, {duration:0.3, background:"linear-gradient(88.44deg, #391BF2 -5.1%, rgba(173, 0, 255, 0.77) 84.13%)"}, 0)
    })
    link.addEventListener('mouseout', function() {
      let i = this.querySelector('i');
      let button = this.querySelector('button');
      var tl = gsap.timeline()
        .fromTo(i, {opacity:1}, {duration:0.3, opacity:0, rotate:0, width:0, height:0, margin:0}, 0)
        .fromTo(button, {background:"linear-gradient(88.44deg, #391BF2 -5.1%, rgba(173, 0, 255, 0.77) 84.13%)"}, {duration:0.3, background:"rgba(15, 144, 216, .96)"}, 0)
    })
  })
}else if (document.body.offsetWidth < 660) {

}else if (document.body.offsetWidth <= 800) {
  sliderLinkIcon.forEach(icon => {
    icon.style.cssText = `
      width:20px;
      height:25px;
      margin:0 0 0 10px;
      opacity:1;
      transform:rotate(270deg);
    `
  })
}

sliderLink[1].style.opacity = '1';
sliderLink[1].style.pointerEvents = 'auto';

let sliderArrayContainer = [];
sliderContainer.forEach(slider => {
	sliderArrayContainer.push(slider);
})
let sliderArrayLink = [];
sliderLink.forEach(link => {
	sliderArrayLink.push(link);
})

let canClick = true;

//for the slider

let maxWidth2; //width of 2 smaller images
let maxWidth; //width of main image

//change position of the first and third images
if (document.querySelector('body').offsetWidth < 1300) {
	maxWidth2 = '28vw';
	maxWidth = '35vw';
} else if (document.querySelector('body').offsetWidth > 1300) {
	maxWidth2 = '18vw';
	maxWidth = '21vw';
}

sliderContainer[0].style.left = '10%';
sliderContainer[0].style.maxWidth = maxWidth2;
sliderContainer[2].style.right = '10%';
sliderContainer[2].style.maxWidth = maxWidth2;
sliderContainer[1].style.cssText = `
	z-index:10;
	opacity: 1;
	max-width:${maxWidth};
`

//change style, like onclicked image
sliderText[1].style.opacity = '1';

//start slider
sliderContainer.forEach(slider => {
	//if click on image
	slider.addEventListener('click', function() {
		if (canClick === true) {
			//all of image get the identical style
			sliderContainer.forEach(slider => {
				slider.style.cssText = `
					z-index:0;
					opacity:0.2;
					max-width:${maxWidth2};
				`
				slider.querySelector('p').style.opacity = '0';
				//delete 'active' if there was
				if (slider.classList.contains('active')) {
					slider.classList.remove('active');
				}
			})
			//add active and change image that have clicked
			this.style.zIndex = '10';
			this.style.maxWidth = maxWidth;

			//find index and make element be visible
			sliderArrayLink.forEach(link => {
				link.classList.remove('active');
				link.style.opacity = 0;
				link.style.pointerEvents = 'none';

			})
			let index = sliderArrayContainer.indexOf(this, 0);
			sliderArrayLink[index].classList = 'active';
			var tl = gsap.timeline()
				.to(sliderArrayLink[index], {duration:0.5, opacity:1})
			sliderArrayLink[index].style.pointerEvents = 'auto';

			var tl = gsap.timeline()
				.fromTo(this, {opacity:0.1}, {duration:0.5, opacity:1});
			this.classList.add('active');
			this.querySelector('p').style.opacity = '1';


			//change position depending on which element have class 'active'
			canClick = false;
			if (document.querySelector('body').offsetWidth < 968) {
				if (sliderContainer[0].classList.contains('active')) {
					sliderContainer[1].style.zIndex = '1';
					var tl = gsap.timeline()
						.fromTo(sliderContainer[1], {right:'10%', opacity:0.1}, {duration:0.5, right:'20%', opacity:1}, 0)
						.fromTo(sliderContainer[2], {right:'10%', maxWidth:'18vw', opacity:0}, {duration:0.5, right:'35%', opacity:1, maxWidth:'16vw'}, 0)
					setTimeout(function() {
						canClick = true;
					},500)
				//if clicked on second element
				} else if (sliderContainer[1].classList.contains('active')) {
					var tl = gsap.timeline()
						.fromTo(sliderContainer[0], {left:0}, {duration:0.5, left:'10%'}, 0)
						.fromTo(sliderContainer[2], {right:0}, {duration:0.5, right:'10%'}, 0)
					setTimeout(function() {
						canClick = true;
					},500)
				//if clicked on third element
				} else if (sliderContainer[2].classList.contains('active')) {
					sliderContainer[1].style.zIndex = '1';
					var tl = gsap.timeline()
						.fromTo(sliderContainer[0], {opacity:0, left:'10%', maxWidth:'18vw'}, {duration:0.5, opacity:1, left:'35%', maxWidth:'16vw'}, 0)
						.fromTo(sliderContainer[1], {opacity:0, left:'10%'}, {duration:0.5, opacity:1, left:'20%'}, 0)
					setTimeout(function() {
						canClick = true;
					},500)
				}
			} else {
				//if clicked on first element
				if (sliderContainer[0].classList.contains('active')) {
					sliderContainer[1].style.zIndex = '1';
					var tl = gsap.timeline()
						.fromTo(sliderContainer[1], {right:'10%', opacity:0.1}, {duration:0.5, right:'20%', opacity:1}, 0)
						.fromTo(sliderContainer[2], {right:'10%', maxWidth:'18vw', opacity:0}, {duration:0.5, right:'35%', opacity:1, maxWidth:'11vw'}, 0)
					setTimeout(function() {
						canClick = true;
					},500)
				//if clicked on second element
				} else if (sliderContainer[1].classList.contains('active')) {
					var tl = gsap.timeline()
						.fromTo(sliderContainer[0], {left:0}, {duration:0.5, left:'10%'}, 0)
						.fromTo(sliderContainer[2], {right:0}, {duration:0.5, right:'10%'}, 0)
					setTimeout(function() {
						canClick = true;
					},500)
				//if clicked on third element
				} else if (sliderContainer[2].classList.contains('active')) {
					sliderContainer[1].style.zIndex = '1';
					var tl = gsap.timeline()
						.fromTo(sliderContainer[0], {opacity:0, left:'10%', maxWidth:'18vw'}, {duration:0.5, opacity:1, left:'35%', maxWidth:'11vw'}, 0)
						.fromTo(sliderContainer[1], {opacity:0, left:'10%'}, {duration:0.5, opacity:1, left:'20%'}, 0)
					setTimeout(function() {
						canClick = true;
					},500)
				}
			}
		}
	})	
})


let images = document.querySelectorAll('.images'); //block with elements
let mainBlock = document.querySelector('.main__block');
const destination = document.querySelector('.main__block_newimages');

while (images[images.length-1].childElementCount > 5) {

	//create new block
	const newElement = document.createElement('div');

	//give him class
	newElement.className = 'main__block_images images';

	//append 
	mainBlock.appendChild(newElement);
	images = document.querySelectorAll('.images');

	//transfer in new block
	while (images[images.length-2].childElementCount > 5) {
		newElement.insertAdjacentElement('afterbegin', images[images.length-2].lastElementChild);
	}

	if (newElement.childElementCount === 1) {
		newElement.lastElementChild.classList.add('images__containerAfter');
	} else if (newElement.childElementCount === 2) {
		newElement.firstElementChild.classList.add('images__containerAfter2');
		newElement.lastElementChild.classList.add('images__containerAfter2');
	} else if (newElement.childElementCount === 3) {
		newElement.children[0].classList.add('images__containerAfter3');
		newElement.children[1].classList.add('images__containerAfter3');
		newElement.children[2].classList.add('images__containerAfter3');
	} else if (newElement.childElementCount === 4) {
		newElement.children[0].classList.add('images__containerAfter4');
		newElement.children[1].classList.add('images__containerAfter4');
		newElement.children[2].classList.add('images__containerAfter4');
		newElement.children[3].classList.add('images__containerAfter4');
	}

}

let imagesContainer = document.querySelectorAll('.images__container'); //elements

if (imagesContainer.length === 1) {
	imagesContainer[0].classList.add('images__containerFirst');
} else if (imagesContainer.length === 2) {
	imagesContainer[0].classList.add('images__containerFirst2');
	imagesContainer[1].classList.add('images__containerFirst2');
} else if (imagesContainer.length === 3) {
	imagesContainer[0].classList.add('images__containerFirst3');
	imagesContainer[1].classList.add('images__containerFirst3');
	imagesContainer[2].classList.add('images__containerFirst3');
} else if (imagesContainer.length === 4) {
	imagesContainer[0].classList.add('images__containerFirst4');
	imagesContainer[1].classList.add('images__containerFirst4');
	imagesContainer[2].classList.add('images__containerFirst4');
	imagesContainer[3].classList.add('images__containerFirst4');
}

//for the 4 images
imagesContainer.forEach(img => {
	//if you took your mouse on image
	img.addEventListener('mouseover', function() {
		var tl = gsap.timeline()
			.fromTo(this.querySelector('img'), {height:'110%', opacity:0.1}, {duration:0.4, height:'100%', opacity:1}, 0)
			.fromTo(this.querySelector('p'), {bottom:'40%', opacity:'0'}, {duration:0.2, bottom:"10%", opacity:'1'}, 0)
	})
	//if you take off your mouse from the image
	img.addEventListener('mouseout', function() {
		var tl = gsap.timeline()
			.fromTo(this.querySelector('img'), {height:'100%', opacity:1}, {duration:0.4, height:'110%', opacity:0.1}, 0)
			.fromTo(this.querySelector('p'), {bottom:'10%', opacity:'1'}, {duration:0.2, bottom:"40%", opacity:'0'}, 0)
	})
})

//buttons 
const tagsButton = document.querySelector('.topmenu__tags > a');
const citiesButton = document.querySelector('.topmenu__cities > a');

//elements
const tagsUl = document.querySelector('.topmenu__tags ul');
const citiesUl = document.querySelector('.topmenu__cities ul');

function buttonClick(e) {
	if (e.style.display === 'block') {
		e.style.display = '';
	} else {
		e.style.display = 'block'
	}
}

tagsButton.addEventListener('click', function() {
	buttonClick(tagsUl);
})
citiesButton.addEventListener('click', function() {
	buttonClick(citiesUl);
})


const themes = document.getElementById('id_themes');
const cities = document.getElementById('id_cities');

const listThemes = document.querySelector('.topmenu__tags ul');
const listCities = document.querySelector('.topmenu__cities ul');

function inList(e, b) {
  if (e.children.length > 0) {
    for (let i=0; i < e.children.length; i++) {
      b.insertAdjacentHTML('beforeend', `<a href="" onclick='return false'><li>${e.children[i].text}</li></a>`);
    }
  }
}

inList(themes, listThemes);
inList(cities, listCities);

const listThemesChildren = document.querySelectorAll('.topmenu__tags ul a');
const listCitiesChildren = document.querySelectorAll('.topmenu__cities ul a');
const buttonSubmitFilter = document.getElementById('button_submit_filter');

let abc = false;
function clickList(e, b) {
  e.forEach(a => {
    a.addEventListener('click', function() {
      for (let i=0; i < b.children.length; i++) {
        if (this.text === b.options[i].text) {
        	if (b.options[i].selected === true) {
        		b.options[i].selected = false;
        	} else {
        		 b.options[i].selected = true;
        	}
          buttonSubmitFilter.click();
        }
      }
    })
  })
	for (let i=0; i < b.children.length; i++) {
		if (b.options[i].selected) {
			e.forEach(a => {
				if (a.text === b.options[i].text) {
						document.querySelector('.main__block').scrollIntoView();
						let abc = true;
						a.classList.add('selected');
						a.style.background = 'rgba(0,0,0,0.3)';
				}
			})
		} 
	}
}

function ifSelected(e, b) {
	for (let i=0; i<b.children.length; i++) {
		if (b.options[i].selected) {
			e.click();
		}
	}
}

clickList(listThemesChildren, themes);
clickList(listCitiesChildren, cities);

ifSelected(tagsButton, themes);
ifSelected(citiesButton, cities);

document.querySelectorAll('.welcome__images_image p')[1].style.margin = '20px 0 0 -30px';
document.querySelectorAll('.welcome__images_image p')[2].style.margin = '20px 0 0 -70px';

const main = document.querySelector('.main');
const welcome = document.querySelector('.welcome');

let false1 = false;
let false2 = false;

if (document.documentElement.scrollTop === 0) {
	window.addEventListener('scroll', function() {
		if (document.documentElement.scrollTop > document.querySelector('.welcome__bottom').offsetTop && false1 === false) {
			false1 = true;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, 0)
		} else if (document.documentElement.scrollTop > document.querySelector('.welcome__images').offsetTop && false2 === false) {
			false2 = true;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
		} else if (document.documentElement.scrollTop < document.querySelector('.welcome__images').offsetTop && false2 === true) {
			false2 = false;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, 0)
		} else if (document.documentElement.scrollTop < document.querySelector('.welcome__bottom').offsetTop && false1 === true) {
			false1 = false;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
		}
	})
}else {
	false1 = true;
	false2 = true;
	welcome.style.background = 'linear-gradient(0deg, rgba(29,32,33,0), rgba(29,32,33,0))';
	main.style.background = 'linear-gradient(0deg, rgba(29,32,33,0), rgba(29,32,33,0))';
	window.addEventListener('scroll', function() {
		if (document.documentElement.scrollTop > document.querySelector('.welcome__bottom').offsetTop && false1 === false) {
			false1 = true;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, 0)
		} else if (document.documentElement.scrollTop > document.querySelector('.welcome__images').offsetTop && false2 === false) {
			false2 = true;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
		} else if (document.documentElement.scrollTop < document.querySelector('.welcome__images').offsetTop && false2 === true) {
			false2 = false;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.5), rgba(29, 32, 33, 0.5))'}, 0)
		} else if (document.documentElement.scrollTop < document.querySelector('.welcome__bottom').offsetTop && false1 === true) {
			false1 = false;
			var tl = gsap.timeline()
				.fromTo(welcome, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
				.fromTo(main, {background:'linear-gradient(0deg, rgba(29, 32, 33, 0), rgba(29, 32, 33, 0))'}, {duration:0.5, background:'linear-gradient(0deg, rgba(29, 32, 33, 0.3), rgba(29, 32, 33, 0.3))'}, 0)
		}
	})
}
