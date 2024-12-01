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

// let profileSubmit = document.querySelector('.title-submit');
// profileSubmit.onclick = () => {
//     if (indexUser != 0) {
//         window.location.href = 'Hosotuyensinh.html';
//     } else window.location.href = 'Dangky-Dangnhap.html';
// };


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

// admission-page
let adPageBar = document.querySelectorAll('.ad-bar')[0];
adPageBar.classList.toggle('ad-bar-active');

document.querySelectorAll('.ad-bar').forEach((item, index) => {
    item.addEventListener('click', event => {

        document.querySelectorAll('.ad-bar').forEach(item => {
            item.classList.remove('ad-bar-active');
        });
        item.classList.add('ad-bar-active');
        
        document.querySelectorAll('.admission-page-content .rpo').forEach(item => {
            item.classList.add('hidden');
        });

        let actReview = document.querySelectorAll('.admission-page-content .rpo')[index];
        actReview.classList.remove('hidden');

    });
});

// program-page

document.querySelector('#program-opt').addEventListener('change', event => {
    document.querySelectorAll('.program-table .p-opt1').forEach(item => {
        item.classList.add('hidden');
    });

    let selectedIndex = event.target.selectedIndex;

    let actProBar = document.querySelectorAll('.program-table .p-opt1')[selectedIndex];
    actProBar.classList.remove('hidden');
});

// animation scroll

let qualityTitles = document.querySelectorAll('.quality-title');

document.querySelectorAll('.quality-title').forEach((item,index) => {

    item.addEventListener('click', event => {

        document.querySelectorAll('.quality-title').forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');

        let qualityContent = document.querySelectorAll('.quality-content')[index];

        qualityContent.scrollIntoView({
            behavior: "smooth", 
            block: "nearest", 
        });

        
    });
});