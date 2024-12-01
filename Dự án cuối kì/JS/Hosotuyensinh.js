// Lấy thông tin đăng nhập vào trong trang hồ sơ
let People = JSON.parse(localStorage.getItem('Accdangnhap')) || [];
if (People == ""){
    alert('Yêu cầu đăng nhập trước khi truy cập trang web');
    window.location.href = 'Dangky-Dangnhap.html';
}
document.querySelector('span').innerHTML = `Xin chào! ${People.username} &#8595;`;
Thongtin1();
Thongtin2();
An_hien_gui_lai_ho_so();
Thong_tin_can_duyet();
Di_chuyen();

// Chức năng đăng xuất
function dangxuat(){
    window.location.href = 'Index.html';
    localStorage.removeItem('Accdangnhap');
}

// Chức năng hiện trang khi đăng nhập của học sinh / Admin
function Thongtin1(){
    if (People.role == "Admin"){
        document.getElementById("Admin").classList.remove('hidden');
        document.getElementById("Admin").classList.add('show');
        document.getElementById("hososinhvien").classList.remove('show');
        document.getElementById("hososinhvien").classList.add('hidden');
        document.title = "Xét duyệt thông tin";
        document.getElementById('hoso1').innerHTML = 'Xác thực thông tin sinh viên'
    }
    else{
        document.getElementById("hososinhvien").classList.remove('hidden');
        document.getElementById("hososinhvien").classList.add('show');
        document.getElementById("Admin").classList.remove('show');
        document.getElementById("Admin").classList.add('hidden');
        document.title = "Hồ sơ tuyển sinh";
        document.getElementById('hoso1').innerHTML = 'Hồ sơ tuyển sinh'
    }
}

// Quay về trang chủ khi ấn Icon
function Index(){
    window.location.href = 'Index.html';
}

// Đây là JS cho phần hồ sơ sinh viên---------------------------------------------------------------------------------------------------

//Chức năng cho button gửi lại thông tin
function gui_lai_thong_tin(){
    let Form = document.querySelector('form');
    if (Form.checkValidity()){
        event.preventDefault();
        let Ho_so = {
            hoTen: document.querySelector('input[placeholder="Vui lòng nhập họ tên"]').value,
            ngaySinh: document.querySelector('input[type="date"]').value,
            gioiTinh: document.querySelector('select').value,
            cmnd: document.querySelector('input[placeholder="Vui lòng nhập CCCD hoặc CMND của bạn"]').value,
            danToc: document.querySelector('input[placeholder="Vui lòng nhập dân tộc"]').value,
            diaChi: document.querySelector('input[placeholder="Vui lòng nhập địa chỉ thường trú"]').value,
            soDienThoai: document.querySelector('input[placeholder="Vui lòng nhập số điện thoại"]').value,
            email: document.querySelector('input[placeholder="Vui lòng nhập Email"]').value,
            truongTotNghiep: document.querySelector('input[placeholder="Vui lòng nhập nơi trường bạn đã tốt nghiệp"]').value,
            diemTB: document.querySelector('input[placeholder="Vui lòng nhập điểm của bạn"]').value,
            nganhHoc: document.querySelector('input[placeholder="Vui lòng nhập tên hoặc mã ngành học"]').value,
            hoTenPhuHuynh: document.querySelector('input[placeholder="Vui lòng nhập tên cha/mẹ/người giám hộ"]').value,
            nghePhuHuynh: document.querySelector('input[placeholder="Vui lòng nhập nghề nghiệp của cha/mẹ/người giám hộ"]').value,
            sdtPhuHuynh: document.querySelector('input[placeholder="Vui lòng nhập số điện thoại của cha/mẹ/người giám hộ"]').value,
            status: 'Chờ duyệt',
            thongtinkhac: '',
            thoigian: ''
        };
        let Nguoi_dung = People.Email;
        // Ngăn chặn việc dùng Email khác với Email đã đăng ký
        if (Ho_so.email !== Nguoi_dung){
            alert("Email bạn nhập không trùng khớp với Email bạn đăng ký");
        }
        else{
            Ho_so.thoigian = new Date().toLocaleString();
            localStorage.setItem(`Du_lieu_${Nguoi_dung}`, JSON.stringify(Ho_so));
            alert('Bạn đã gửi lại thông tin thành công!');

            // Thay thế thông tin trong localStorage Admin chung
            let Thong_tin_moi = JSON.parse(localStorage.getItem('Danh_sach_chung'));
            let Thong_tin_trung_lap = Thong_tin_moi.findIndex(Email => Email.email == Ho_so.email);
            Thong_tin_moi.splice(Thong_tin_trung_lap, 1);
            Thong_tin_moi.push(Ho_so);
            localStorage.setItem('Danh_sach_chung', JSON.stringify(Thong_tin_moi));
        }
    }
}

// Câu lệnh để kiểm tra nếu có nút này, sẽ ẩn hiện chức năng gửi lại thông tin
function An_hien_gui_lai_ho_so(){
    if (document.getElementById('gui_du_lieu').innerHTML == 'Chờ duyệt đơn'){
        document.getElementById('gui_lai_du_lieu').style.display = 'inline-block';
    }
    else if (document.getElementById('gui_du_lieu').innerHTML == 'Đã được duyệt'){
        alert('Hồ sơ của bạn đã được duyệt bởi quản trị viên');
        document.getElementById('gui_lai_du_lieu').style.display = 'none';
    }
    else{
        document.getElementById('gui_lai_du_lieu').style.display = 'none';
    }
}

// Lưu thông tin tài khoản sau khi ấn gửi
function gui_thong_tin(){
    //Kiểm tra xem form đã được nhập hay chưa
    let Form = document.querySelector('form')
    if (Form.checkValidity()){
        event.preventDefault();
        let Ho_so = {
            hoTen: document.querySelector('input[placeholder="Vui lòng nhập họ tên"]').value,
            ngaySinh: document.querySelector('input[type="date"]').value,
            gioiTinh: document.querySelector('select').value,
            cmnd: document.querySelector('input[placeholder="Vui lòng nhập CCCD hoặc CMND của bạn"]').value,
            danToc: document.querySelector('input[placeholder="Vui lòng nhập dân tộc"]').value,
            diaChi: document.querySelector('input[placeholder="Vui lòng nhập địa chỉ thường trú"]').value,
            soDienThoai: document.querySelector('input[placeholder="Vui lòng nhập số điện thoại"]').value,
            email: document.querySelector('input[placeholder="Vui lòng nhập Email"]').value,
            truongTotNghiep: document.querySelector('input[placeholder="Vui lòng nhập nơi trường bạn đã tốt nghiệp"]').value,
            diemTB: document.querySelector('input[placeholder="Vui lòng nhập điểm của bạn"]').value,
            nganhHoc: document.querySelector('input[placeholder="Vui lòng nhập tên hoặc mã ngành học"]').value,
            hoTenPhuHuynh: document.querySelector('input[placeholder="Vui lòng nhập tên cha/mẹ/người giám hộ"]').value,
            nghePhuHuynh: document.querySelector('input[placeholder="Vui lòng nhập nghề nghiệp của cha/mẹ/người giám hộ"]').value,
            sdtPhuHuynh: document.querySelector('input[placeholder="Vui lòng nhập số điện thoại của cha/mẹ/người giám hộ"]').value,
            status: 'Chưa duyệt',
            thongtinkhac: '',
            thoigian: ''
        };
        let Nguoi_dung = People.Email;
        if (Ho_so.email !== Nguoi_dung){
            alert("Email bạn nhập không trùng khớp với Email bạn đăng ký");
        }
        else{
            // Các điều kiện cho nút button và hồ sơ Admin
            if (document.getElementById('gui_du_lieu').innerHTML == 'Gửi thông tin'){
                Ho_so.status = "Chờ duyệt"
                Ho_so.thoigian = new Date().toLocaleString();
                localStorage.setItem(`Du_lieu_${Nguoi_dung}`, JSON.stringify(Ho_so));
                document.getElementById('gui_du_lieu').innerHTML = 'Chờ duyệt đơn';
                alert('Lưu thông tin thành công!');
                window.location.reload();
        
                // Đây là thông tin nhằm bổ sung 1 danh sách chung vào localStorage
                let danh_sach_chung = JSON.parse(localStorage.getItem('Danh_sach_chung')) || [];
                let Kiem_tra_trung_lap = danh_sach_chung.findIndex(Thong_tin => Thong_tin.email == Ho_so.email);
                if (Kiem_tra_trung_lap != -1){
                    danh_sach_chung.splice(Kiem_tra_trung_lap, 1);
                    danh_sach_chung.push(Ho_so);
                    localStorage.setItem('Danh_sach_chung', JSON.stringify(danh_sach_chung));
                }
                else{
                    danh_sach_chung.push(Ho_so);
                    localStorage.setItem('Danh_sach_chung', JSON.stringify(danh_sach_chung));
                }
            }
            if (document.getElementById('gui_du_lieu').innerHTML == 'Chờ duyệt đơn'){
                alert('Hồ sơ đã được gửi, vui lòng chờ đợi');
            }
            if (document.getElementById('gui_du_lieu').innerHTML == 'Đã được duyệt'){
                alert('Hồ sơ của bạn đã được duyệt bởi quản trị viên. Bạn không cần phải gửi lại thông tin nữa');
            }
            if (document.getElementById('gui_du_lieu').innerHTML == 'Bị từ chối'){
                alert('Hồ sơ của bạn đã bị từ chối bởi quản trị viên. Bạn không thể thay đổi hồ sơ được nữa');
            }
        }
    }
}

// Khôi phục tài khoản
function Thongtin2() {
    if (People.role == "Student") {
        let Nguoi_dung = People.Email;
        let Ho_so = JSON.parse(localStorage.getItem(`Du_lieu_${Nguoi_dung}`));
        if (Ho_so) {
            document.querySelector('input[placeholder="Vui lòng nhập họ tên"]').value = Ho_so.hoTen;
            document.querySelector('input[type="date"]').value = Ho_so.ngaySinh;
            document.querySelector('select').value = Ho_so.gioiTinh;
            document.querySelector('input[placeholder="Vui lòng nhập CCCD hoặc CMND của bạn"]').value = Ho_so.cmnd;
            document.querySelector('input[placeholder="Vui lòng nhập dân tộc"]').value = Ho_so.danToc;
            document.querySelector('input[placeholder="Vui lòng nhập địa chỉ thường trú"]').value = Ho_so.diaChi;
            document.querySelector('input[placeholder="Vui lòng nhập số điện thoại"]').value = Ho_so.soDienThoai;
            document.querySelector('input[placeholder="Vui lòng nhập Email"]').value = Ho_so.email;
            document.querySelector('input[placeholder="Vui lòng nhập nơi trường bạn đã tốt nghiệp"]').value = Ho_so.truongTotNghiep;
            document.querySelector('input[placeholder="Vui lòng nhập điểm của bạn"]').value = Ho_so.diemTB;
            document.querySelector('input[placeholder="Vui lòng nhập tên hoặc mã ngành học"]').value = Ho_so.nganhHoc;
            document.querySelector('input[placeholder="Vui lòng nhập tên cha/mẹ/người giám hộ"]').value = Ho_so.hoTenPhuHuynh;
            document.querySelector('input[placeholder="Vui lòng nhập nghề nghiệp của cha/mẹ/người giám hộ"]').value = Ho_so.nghePhuHuynh;
            document.querySelector('input[placeholder="Vui lòng nhập số điện thoại của cha/mẹ/người giám hộ"]').value = Ho_so.sdtPhuHuynh;
            thongtinkhac: ''
        }
        if (Ho_so.status == "Chờ duyệt"){
            alert('Đơn của bạn đang được chờ duyệt, bạn có thể thay đổi thông tin nếu muốn');
            document.getElementById('gui_du_lieu').innerHTML = 'Chờ duyệt đơn';
        }
        if (Ho_so.status == "Yêu cầu nhập lại"){
            document.getElementById('gui_du_lieu').innerHTML = 'Gửi thông tin';
            alert(`
                    Quản trị viên yêu cầu bạn nhập lại thông tin\n
                    Yêu cầu quản trị viên đưa ra cho bạn là:\n
                    ${Ho_so.thongtinkhac}
                `);
        }
        if (Ho_so.status == "Đã duyệt"){
            document.getElementById('gui_du_lieu').innerHTML = 'Đã được duyệt';
            document.querySelectorAll('input:not(#chi_tiet), select').forEach(chan_thong_tin => chan_thong_tin.disabled = true);
        }
        if (Ho_so.status == "Không duyệt"){
            document.getElementById('gui_du_lieu').innerHTML = 'Bị từ chối';
            alert('Hồ sơ của bạn đã bị từ chối bởi quản trị viên. Bạn không thể thay đổi hồ sơ được nữa');
            document.querySelectorAll('input:not(#chi_tiet), select').forEach(chan_thong_tin => chan_thong_tin.disabled = true);
        }
    }
}

// Đây là JS cho phần xét duyệt Admin ------------------------------------------------------------------------------------------------

//Gửi thông tin hồ sơ sinh viên vào bảng
function Thong_tin_can_duyet(){
    let Ho_so = JSON.parse(localStorage.getItem('Danh_sach_chung'));
    let hang = document.querySelectorAll('tbody tr');
    for (let i=0; i<hang.length; i++){
        let o = hang[i].querySelectorAll('td');
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'chi_tiet';
        radio.value = Ho_so[i].email;
        radio.classList = 'chi_tiet';
        o[0].appendChild(radio);
        o[1].textContent = i + 1;
        o[2].textContent = Ho_so[i].hoTen;
        o[3].textContent = Ho_so[i].gioiTinh;
        o[4].textContent = Ho_so[i].danToc;
        o[5].textContent = Ho_so[i].cmnd;
        o[6].textContent = Ho_so[i].thoigian;
        o[7].textContent = Ho_so[i].status;
    }
}

//Chức năng cho nút "chi tiết"
function Chi_tiet(){
    let Nut_radio_da_chon = document.querySelector("input[name='chi_tiet']:checked");
    if (Nut_radio_da_chon){
        let Ho_so = JSON.parse(localStorage.getItem('Danh_sach_chung'));
        let ID = Nut_radio_da_chon.value;
        const Ho_so_duoc_chon = Ho_so.find(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
        if (Ho_so_duoc_chon){
            const NoidungALERT = `
                <p align='center'><b>Thông tin của hồ sơ mang tên ${Ho_so_duoc_chon.hoTen}:<br></b></p>
                <div id='cach_ra'>Họ tên: ${Ho_so_duoc_chon.hoTen}<br>
                Ngày sinh: ${Ho_so_duoc_chon.ngaySinh}<br>
                Giới tính: ${Ho_so_duoc_chon.gioiTinh}<br>
                Căn cước công dân: ${Ho_so_duoc_chon.cmnd}<br>
                Dân tộc: ${Ho_so_duoc_chon.danToc}<br>
                Địa chỉ thường trú: ${Ho_so_duoc_chon.diaChi}<br>
                Số điện thoại: ${Ho_so_duoc_chon.soDienThoai}<br>
                Email: ${Ho_so_duoc_chon.email}<br>
                Trường đã tốt nghiệp: ${Ho_so_duoc_chon.truongTotNghiep}<br>
                Điểm trung bình cả 3 năm cấp 3: ${Ho_so_duoc_chon.diemTB}<br>
                Mã ngành hoặc tên ngành học: ${Ho_so_duoc_chon.nganhHoc}<br>
                Tên cha/mẹ/người giám hộ: ${Ho_so_duoc_chon.hoTenPhuHuynh}<br>
                Ngành nghề của cha/mẹ/người giám hộ: ${Ho_so_duoc_chon.nghePhuHuynh}<br>
                Số điện thoại của cha/mẹ/người giám hộ: ${Ho_so_duoc_chon.sdtPhuHuynh}<br>
                Thời gian nộp hồ sơ: ${Ho_so_duoc_chon.thoigian}</div>
            `;
            document.getElementById('Noi_dung_alert').innerHTML = NoidungALERT;
            document.getElementById('ALERT').style.display = 'block';
            document.getElementById('chan_thao_tac').style.display = 'block';
        }
    }
    else{
        alert('Vui lòng chọn 1 hàng để xem thông tin hồ sơ');
    }
}

//Chức năng cho nút "Duyệt"
function Duyet(){
    let Nut_radio_da_chon = document.querySelector("input[name='chi_tiet']:checked");
    if (Nut_radio_da_chon){
        let Ho_so = JSON.parse(localStorage.getItem('Danh_sach_chung'));
        let ID = Nut_radio_da_chon.value;
        let Ho_so_duoc_chon = Ho_so.find(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
        if (Ho_so_duoc_chon){
            let Status = confirm('Bạn có chắc là muốn duyệt hồ sơ này chứ?');
            if (Status){
                alert('Hồ sơ đã được duyệt thành công');
                Ho_so_duoc_chon.status = 'Đã duyệt';

                let Ho_so_truoc_do = Ho_so.findIndex(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
                Ho_so.splice(Ho_so_truoc_do, 1);
                localStorage.setItem('Danh_sach_chung', JSON.stringify(Ho_so));
                localStorage.setItem(`Du_lieu_${Ho_so_duoc_chon.email}`, JSON.stringify(Ho_so_duoc_chon));
                window.location.reload();
            }
            else{
                alert('Bạn chưa chọn duyệt cho hồ sơ này.');
            }
        }
    }
    else{
        alert('Vui lòng chọn 1 hàng để xem thông tin hồ sơ');
    }
}

// Chức năng cho nút "Duyệt lại"
function Duyet_lai(){
    let Nut_radio_da_chon = document.querySelector("input[name='chi_tiet']:checked");
    if (Nut_radio_da_chon){
        let Ho_so = JSON.parse(localStorage.getItem('Danh_sach_chung'));
        let ID = Nut_radio_da_chon.value;
        let Ho_so_duoc_chon = Ho_so.find(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
        if (Ho_so_duoc_chon){
            let Status = confirm('Bạn có chắc là muốn gửi yêu cầu nhập lại hồ sơ này chứ?');
            if (Status){
                alert('Hồ sơ đã được yêu cầu nhập lại thành công');
                Ho_so_duoc_chon.status = 'Yêu cầu nhập lại';
                let yeu_cau = prompt('Thông tin bạn muốn yêu cầu chỉnh sửa:');
                Ho_so_duoc_chon.thongtinkhac = yeu_cau;
                let Ho_so_truoc_do = Ho_so.findIndex(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
                Ho_so.splice(Ho_so_truoc_do, 1);
                Ho_so.push(Ho_so_duoc_chon);
                localStorage.setItem('Danh_sach_chung', JSON.stringify(Ho_so));
                localStorage.setItem(`Du_lieu_${Ho_so_duoc_chon.email}`, JSON.stringify(Ho_so_duoc_chon));
                window.location.reload();
            }
            else{
                alert('Bạn chưa chọn gửi lại yêu cầu cho hồ sơ này.');
            }
        }
    }
    else{
        alert('Vui lòng chọn 1 hàng để xem thông tin hồ sơ');
    }
}

// Chức năng cho nút "Không duyệt"
function Khong_duyet(){
    let Nut_radio_da_chon = document.querySelector("input[name='chi_tiet']:checked");
    if (Nut_radio_da_chon){
        let Ho_so = JSON.parse(localStorage.getItem('Danh_sach_chung'));
        let ID = Nut_radio_da_chon.value;
        let Ho_so_duoc_chon = Ho_so.find(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
        if (Ho_so_duoc_chon){
            let Status = confirm('Bạn có chắc là muốn từ chối hồ sơ này chứ?');
            if (Status){
                alert('Hồ sơ đã được từ chối thành công');
                Ho_so_duoc_chon.status = 'Không duyệt';
                let Ho_so_truoc_do = Ho_so.findIndex(Thong_tin_xac_thuc => Thong_tin_xac_thuc.email === ID);
                Ho_so.splice(Ho_so_truoc_do, 1);
                localStorage.setItem('Danh_sach_chung', JSON.stringify(Ho_so));
                localStorage.setItem(`Du_lieu_${Ho_so_duoc_chon.email}`, JSON.stringify(Ho_so_duoc_chon));
                window.location.reload();
            }
            else{
                alert('Bạn chưa chọn không duyệt cho hồ sơ này.')
            }
        }
    }
    else{
        alert('Vui lòng chọn 1 hàng để xem thông tin hồ sơ')
    }
}

// Chức năng đóng thông báo Alert
function Dong_Alert() {
    document.getElementById('ALERT').style.display = 'none';
    document.getElementById('chan_thao_tac').style.display = 'none';
}

// Đẩy các tài khoản "Xem xét lại xuống dưới, tài khoản khác lên"
function Di_chuyen(){
    let Test = JSON.parse(localStorage.getItem('Danh_sach_chung')) || [];
    let Ve1 = Test.filter(Kiemtra => Kiemtra.status == 'Yêu cầu nhập lại');
    let Ve2 = Test.filter(Kiemtra => Kiemtra.status != 'Yêu cầu nhập lại');
    Test = [...Ve2, ...Ve1];
    localStorage.setItem('Danh_sach_chung', JSON.stringify(Test));
}