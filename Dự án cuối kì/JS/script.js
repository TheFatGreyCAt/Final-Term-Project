const userProfile = localStorage.getItem('Accdangnhap');
const profiles = document.querySelectorAll('.profile');
const userBtnImg = document.querySelectorAll('#user-btn .image');
let indexUser = 0;

function check(){
    localStorage.setItem('check', 1);
}

if (userProfile) {
    const user = JSON.parse(userProfile);
    
    if (user.role == 'Admin') indexUser = 1;
    else if (user.role == 'Student') indexUser = 2;
    
    profiles.forEach(item => {
        item.classList.remove('active');
    });

    let activeUser = profiles[indexUser];
    activeUser.querySelector('.name').innerHTML = user.username;
    activeUser.querySelector('.role').innerHTML = user.role;
}

userBtnImg.forEach(item => {
    item.classList.remove('active');
});

userBtnImg[indexUser].classList.add('active');

document.querySelector('#user-btn').onclick = () => {
    if (profiles[indexUser]) {
        profiles[indexUser].classList.toggle('active');
    }
}

function dangxuat(){
    window.location.href = 'Index.html';
    localStorage.removeItem('Accdangnhap');
}

let profileSubmit = document.querySelector('.title-submit');
profileSubmit.onclick = () => {
    if (indexUser != 0) {
        window.location.href = 'Hosotuyensinh.html';
    } else window.location.href = 'Dangky-Dangnhap.html';
};



let searchBox = document.querySelector('#search-box input');
let navBtn = document.querySelector('.nav-bar-adjust');

document.querySelector('#search-box a').onmouseover = (event) => {
    searchBox.classList.add('search-active');
    navBtn.classList.add('hidden');
    event.stopPropagation();
}

document.body.onclick = () => {
    if (searchBox.classList.contains('search-active')) {
        searchBox.classList.remove('search-active');
        navBtn.classList.remove('hidden');
    }
}

searchBox.onclick = (event) => {
    event.stopPropagation();
}

// add event

const newsData = JSON.parse(localStorage.getItem('NewsData')) || [];

const newsSlideshow = document.querySelector('.news-slideshow');

const slideSize = 3;
const slides = [];

for (let i = 0; i < newsData.length; i += slideSize) {
    slides.push(newsData.slice(i, i + slideSize));
}
slides.forEach((slide, slideIndex) => {
    const slideBox = document.createElement('div');
    slideBox.classList.add('slide-box');

    slide.forEach((item, itemIndex) => {
        const newsBox = document.createElement('div');
        newsBox.classList.add('news-box');
        if (item.img == "Chưa chọn hình ảnh"){
            item.img = 'thongbao.png'
        }
        newsBox.innerHTML = `
            <div>
                <img src="Storage/${item.img}" alt="${item.title}" class="news-img">
            </div>
            <div class="news">
                <i class="fa-regular fa-calendar"><b>${item.day || 'Chưa có ngày'}</b></i>
                <h2><a href="#" class="news-link" data-slide="${slideIndex}" data-item="${itemIndex}">${item.title || 'Không có tiêu đề'}</a></h2>
            </div>
        `;
        
        const newsLink = newsBox.querySelector('.news h2 a');
        newsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const slideId = e.target.dataset.slide;
            const itemId = e.target.dataset.item;
            detailNews(slideId, itemId);
        });

        slideBox.appendChild(newsBox);
    });

    newsSlideshow.appendChild(slideBox);
});

const modal = document.getElementById('news-modal');
const modalContent = document.getElementById('modal-body');
const closeBtn = document.querySelector('.modal .close');

document.querySelectorAll('.news-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const slideIndex = e.target.dataset.slide;
        const itemIndex = e.target.dataset.item;  
        const selectedNews = slides[slideIndex][itemIndex];
        if (selectedNews) {
            modalContent.innerHTML = `
                <pre>${selectedNews.content || 'Chưa có nội dung.'}</pre>
            `;
            modal.style.display = 'block';
        }
    });
});

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};


//


let list = document.querySelector('.slider .stg-box');
let items = document.querySelectorAll('.slider .stg-box .slide-show');
let dots = document.querySelectorAll('.admission-slide-show .dots li');
let prev = document.getElementById('prev-slide');
let next = document.getElementById('next-slide');

let active = 0;
let lengthItems = items.length - 1;

next.onclick = function(){
    if(active + 1 > lengthItems) active = 0;
    else active += 1;
    reloadSlider();
}

prev.onclick = function(){
    if(active - 1 < 0) active = lengthItems;
    else active -= 1;
    reloadSlider();
}

let autoSlide = setInterval( () => {next.click()}, 7000);

function reloadSlider()
{
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';
    
    let lastActive = document.querySelector('.admission-slide-show .dots li.dot-active');
    lastActive.classList.remove('dot-active');
    dots[active].classList.add('dot-active');

    clearInterval(autoSlide);
    autoSlide = setInterval( () => {next.click()}, 7000);
}



dots.forEach((li, index) => {
    li.addEventListener('click', function(){
        active = index;
        reloadSlider();
    } )

} )

//admission-method

let firstMethod = document.querySelectorAll('.method-title')[0];
firstMethod.classList.toggle('active');

document.querySelectorAll('.method-title').forEach((item, index) => {
    item.addEventListener('click', event => {

        document.querySelectorAll('.method-title').forEach(item => {
            item.classList.remove('active');
        });
        item.classList.toggle('active');
        
        document.querySelectorAll('.method-review').forEach(item => {
            item.classList.remove('method-active');
        });

        let actMethod = document.querySelectorAll('.method-review')[index];
        actMethod.classList.toggle('method-active');

    });

});

// news

let newsList = document.querySelector('.news-content .news-slideshow');
let newsItems = document.querySelectorAll('.news-content .news-slideshow .slide-box');

let newsPrev = document.getElementById('news-prev-slide');
let newsNext = document.getElementById('news-next-slide');

let newsActive = 0;
let newsLengthItems = (newsItems.length - 1);
newsList.style.left = -newsItems[newsLengthItems].offsetLeft + 'px';
newsNext.onclick = function() {
    if (newsActive + 1 > newsLengthItems) newsActive = 0;
    else newsActive += 1;
    newsReloadSlider();
}

newsPrev.onclick = function() {
    if (newsActive - 1 < 0) newsActive = newsLengthItems;
    else newsActive -= 1;
    newsReloadSlider();
}

function newsReloadSlider() {
    let newCheckLeft = newsItems[newsActive].offsetLeft;
    newsList.style.left = -newCheckLeft + 'px';
}


