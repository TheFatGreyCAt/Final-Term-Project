const userProfile = localStorage.getItem('Accdangnhap');
const profiles = document.querySelectorAll('.profile');
const userBtnImg = document.querySelectorAll('#user-btn .image');
let indexUser = 0;

function check(){
    localStorage.setItem('check', 1);
}

const Stop = JSON.parse(localStorage.getItem('Accdangnhap')) || 0
if (Stop == 0){
    alert('Bạn chưa đăng nhập, vui lòng quay trở lại trang chủ');
    window.location.href = 'Index.html';
}
else if (Stop.role != "Admin"){
    alert('Bạn không phải là Admin, vui lòng quay trở lại trang chủ');
    window.location.href = 'Index.html';
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


// add event

const btnUpload = document.querySelector('.upload-btn #upload');

btnUpload.addEventListener('click', () => {
    const titleInput = document.querySelector('.tieude').value.trim();
    const dayInput = document.querySelector('.ngay').value.trim();
    const contentInput = document.querySelector('.vungnhap').value.trim();
    const imgInput = document.querySelector('.hinhanh').files[0]?.name || "Chưa chọn hình ảnh";
    const fileInput = document.querySelector('.teptin').files[0]?.name || "Chưa chọn tệp tin";

    if (!titleInput || !dayInput || !contentInput) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    let newsData = JSON.parse(localStorage.getItem('NewsData')) || [];

    if (!Array.isArray(newsData)) {
        newsData = [];
    }

    const newEntry = {
        title: titleInput,
        day: dayInput,
        content: contentInput,
        img: imgInput,
        file: fileInput
    };

    newsData.push(newEntry);

    localStorage.setItem('NewsData', JSON.stringify(newsData));

    alert("Dữ liệu đã được lưu!");
});

