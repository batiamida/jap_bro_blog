
const postImgBigger = document.querySelectorAll('.postimg__bigger');
const postImgSmaller = document.querySelectorAll('.postimg__smaller');


const postImg = document.querySelectorAll('.postimg__img');

for (let i=0; i < postImg.length; i++) {
  if (i % 2 === 0) {
    postImg[i].classList.add('postimg__bigger');
  } else {
    postImg[i].classList.add('postimg__smaller')
  }
}

postImgSmaller.forEach(img => {
	img.addEventListener('click', function() {
		if (this.offsetWidth < this.parentElement.querySelector('.postimg__bigger').offsetWidth) {
			const bigger = this.parentElement.querySelector('.postimg__bigger');
			const smaller = this;

			const biggerWidth = bigger.offsetWidth;
			const biggerHeight = bigger.offsetHeight;

			const smallerWidth = smaller.offsetWidth;
			const smallerHeight = smaller.offsetHeight;

			var styleSmaller = smaller.currentStyle || window.getComputedStyle(smaller);
			var styleBigger = bigger.currentStyle || window.getComputedStyle(bigger);

			

			bigger.style.width = `${smallerWidth}px`;
			bigger.style.height = `${smallerHeight}px`;
			bigger.style.zIndex = '1';

			this.style.width = `${biggerWidth}px`;
			this.style.height = `${biggerHeight}px`;
			this.style.zIndex = '2';
		} else {

		}
	})
})



const postImgBigger = document.querySelectorAll('.postimg__bigger');
const postImgSmaller = document.querySelectorAll('.postimg__smaller');

postImgBigger.forEach(img => {
	img.addEventListener('click', function() {
		if (this.offsetWidth < this.parentElement.querySelector('.postimg__smaller').offsetWidth) {
			const bigger = this.parentElement.querySelector('.postimg__smaller');
			const smaller = this;

			const biggerWidth = bigger.offsetWidth;
			const biggerHeight = bigger.offsetHeight;

			const smallerWidth = smaller.offsetWidth;
			const smallerHeight = smaller.offsetHeight;

			bigger.style.width = `${smallerWidth}px`;
			bigger.style.height = `${smallerHeight}px`;
			bigger.style.zIndex = '1';

			this.style.width = `${biggerWidth}px`;
			this.style.height = `${biggerHeight}px`;
			this.style.zIndex = '2';
		} else {

		}
	})
})