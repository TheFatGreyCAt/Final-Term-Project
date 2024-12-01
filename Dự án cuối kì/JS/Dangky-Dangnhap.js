//Thêm localStorage cho trang web, tài khoản Admin mặc định
let People = JSON.parse(localStorage.getItem('Account')) || [{username: "Admin", Email: "admin@admin.com", Password: "Admin", role: "Admin"}];
localStorage.setItem('Account', JSON.stringify(People));

// Kiểm tra xem người dùng bấm vào nút đăng ký ở Index hay không
const check = localStorage.getItem('check') || 0;
if (check == 1){
    Dangky();
    localStorage.removeItem('check');
}

// Ngăn chặn người dùng vào lại trang đăng ký, đăng nhập nếu đã đăng nhập
const Stop = localStorage.getItem('Accdangnhap') || 0
if (Stop != 0){
    alert('Bạn đã đăng nhập rồi, vui lòng quay trở lại trang chủ');
    window.location.href = 'Index.html';
}

// Vùng xét tắt, mở đăng ký, đăng nhập
function Dangky(){
    document.getElementById("Dangkychinh").classList.remove('hidden');
    document.getElementById("Dangkychinh").classList.add('show');
    document.getElementById("Dangnhapchinh").classList.remove('show');
    document.getElementById("Dangnhapchinh").classList.add('hidden');
    document.title = "Đăng ký";
}
function Dangnhap(){
    document.getElementById("Dangnhapchinh").classList.remove('hidden');
    document.getElementById("Dangnhapchinh").classList.add('show');
    document.getElementById("Dangkychinh").classList.remove('show');
    document.getElementById("Dangkychinh").classList.add('hidden');
    document.title = "Đăng nhập";
    
    document.getElementById('Ten').value = "";
    document.getElementById('Email-dk').value = "";
    document.getElementById('Password-dk1').value = "";
    document.getElementById('Password-dk2').value = "";
}

// Vùng kiểm tra xem trường đăng ký có bị bỏ trống hay không, hoặc có trùng khớp hay không
function Emaildk(){
    const check = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/;
    let Email = document.getElementById('Email-dk').value;
    if (Email === ""){
        alert('Email không được để trống. Vui lòng nhập lại');
        return true;
    }
    else if (!check.test(Email)){
        alert('Email của bạn không đúng định dạng. Vui lòng nhập lại.');
        return true;
    }
    return false;
}

function Passworddk(){
    let Password1 = document.getElementById('Password-dk1').value;
    let Password2 = document.getElementById('Password-dk2').value;
    if (Password1 !== Password2){
        alert('Password của bạn không trùng khớp. Vui lòng nhập lại');
        document.getElementById('Password-dk2').value = "";
        return true;
    }
    else if ((Password1 === "") || (Password2 === "")){
        alert('Password không được để trống. Vui lòng nhập lại');
        return true
    }
    return false;
}

//Vùng kiểm tra xem trường đăng nhập có bị bỏ trống hay không
function Nhapten(){
    let Name = document.getElementById('Ten').value.trim();
    if (Name === ""){
        alert('Vui lòng nhập tên của bạn.');
        return true;
    }
    return false;
}

function Emaildn(){
    const check = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/;
    let Email = document.getElementById('Email-dn').value;
    if (Email === ""){
        alert('Email không được để trống. Vui lòng nhập lại.');
        return true;
    }
    else if (!check.test(Email)){
        alert('Email của bạn không đúng định dạng. Vui lòng nhập lại.');
        return true;
    }
    return false;
}

function Passworddn(){
    let Password = document.getElementById('Password-dn').value;
    if (Password === ""){
        alert('Mật khẩu không được để trống. Vui lòng nhập lại.');
        return true;
    }
    return false;
}

//Thiết lập chức năng cho nút đăng ký
function Dangkytaikhoan(){
    //Kiểm tra xem điều kiện được chạy chưa, nếu đã chạy, dừng hoạt động cho các hàm sau đó.
    let chaydieukien = 0;
    if ((Nhapten()) && (chaydieukien == 0)){
        chaydieukien = 1;
    }
    else if ((Emaildk()) && (chaydieukien == 0)){
        chaydieukien = 1;
    }
    else if ((Passworddk()) && (chaydieukien == 0)){
        chaydieukien = 1;
    }
    if (chaydieukien == 0){
        let Tendk = document.getElementById('Ten').value;
        let Emaildk = document.getElementById('Email-dk').value;
        let Passworddk = document.getElementById('Password-dk1').value;

        let User = JSON.parse(localStorage.getItem('Account')) || [];

        if (User.find(Account => Account.Email === Emaildk)){
            alert('Email này đã tồn tại. Vui lòng chọn Email khác');
            Dangky();
        }
        else{
            People.push({username: Tendk, Email: Emaildk, Password: Passworddk, role: "Student"});
            alert("Đăng ký thành công. Vui lòng đăng nhập để sử dụng tài khoản");
            localStorage.setItem("Account", JSON.stringify(People));
            Dangnhap();
        }
    }
}

//Thiết lập chức năng cho nút đăng nhập
function Dangnhaptaikhoan(){
    //Kiểm tra xem điều kiện được chạy chưa, nếu đã chạy, dừng hoạt động cho các hàm sau đó.
    let chaydieukien = 0;
    if ((Emaildn()) && (chaydieukien == 0)){
        chaydieukien = 1;
    }
    else if ((Passworddn()) && (chaydieukien == 0)){
        chaydieukien = 1;
    }
    if (chaydieukien == 0){
        let Emaildn = document.getElementById('Email-dn').value;
        let Passworddn = document.getElementById('Password-dn').value;

        let User = JSON.parse(localStorage.getItem('Account')) || [];
        let checkUser = User.find(Account => Account.Email === Emaildn && Account.Password === Passworddn);

        if (checkUser){
            localStorage.setItem('Accdangnhap', JSON.stringify(checkUser)); //Lưu thông tin tài khoản để dùng cho các trang sau
            window.location.href = 'Hosotuyensinh.html';
            if (checkUser.role === 'Admin'){
                alert("Đăng nhập thành công với tư cách là Admin");
            }
            else{
                alert("Đăng nhập thành công");
            }
        }
        else{
            alert("Sai Email hoặc mật khẩu. Vui lòng đăng nhập lại");
        }
    }
}

// Thiết lập chức năng cho nút quay lại
function Quay_lai(){
    window.location.href = 'Index.html';
}