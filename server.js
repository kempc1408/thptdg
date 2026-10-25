const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;

// Tăng giới hạn dung lượng nhận dữ liệu (xử lý ảnh Base64 từ giao diện)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Cấu hình phục vụ file tĩnh (Hình ảnh, CSS, JS)
app.use('/IMAGE', express.static(path.join(__dirname, 'IMAGE')));
app.use('/image', express.static(path.join(__dirname, 'IMAGE')));
app.use(express.static(path.join(__dirname, 'IMAGE')));
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// CƠ CHẾ LƯU TRỮ FILE DATABASE.JSON (CHỐNG MẤT DỮ LIỆU KHI RESTART)
// ==========================================
const DB_FILE = path.join(__dirname, 'database.json');

let db = {
    schoolSlogan: "Be seen. Be heard. Be you.",
    postsData: [
        {
            id: 1,
            author: "Ban Giám Hiệu (Hiệu Trưởng)",
            date: "18/09/2026",
            category: "Thông Điệp BGH",
            title: "Thông điệp của Hiệu trưởng THPT Dầu Giây: \"Vững bước trong kỷ nguyên mới với hành trang tri thức & sáng tạo\"",
            content: "Nhằm nâng cao tinh thần học tập và kỷ luật, Ban Giám Hiệu nhà trường chính thức phát động phong trào thi đua 'Lớp tốt - Rèn luyện hay' chào mừng năm học 2026-2027.",
            image: "/IMAGE/nentruongto.jpg"
        }
    ],
    excellencePostsData: [
        {
            id: 101,
            author: "Ban Giám Hiệu (Hiệu Trưởng)",
            date: "Sept 19",
            category: "Vinh Danh HSG",
            title: "Lễ Tuyên Dương Học Sinh Giỏi Cấp Tỉnh Năm Học 2026",
            content: "Chúc mừng 15 học sinh xuất sắc đạt giải cao trong kỳ thi Học Sinh Giỏi cấp Tỉnh.",
            image: "/IMAGE/nentruongto3.jpg"
        }
    ],
    classesData: [],
    teachersData: [],
    studentUsersData: [],
    saodoAssignments: [],
    saodoWeeklyScores: []
};

// Đọc dữ liệu từ file database.json nếu có
function loadDatabase() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf8');
            db = Object.assign(db, JSON.parse(data));
            console.log("-> Đã nạp dữ liệu thành công từ database.json!");
        } else {
            saveDatabase();
        }
    } catch (err) {
        console.error("Lỗi khi đọc file database:", err);
    }
}

// Lưu dữ liệu xuống đĩa
function saveDatabase() {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    } catch (err) {
        console.error("Lỗi khi lưu database:", err);
    }
}

// Gọi đọc dữ liệu ngay khi khởi động server
loadDatabase();

// ==========================================
// MIDDLEWARE XÁC THỰC
// ==========================================
app.use((req, res, next) => {
    if (!req.user) req.user = {};
    next();
});

// ==========================================
// HÀM BỔ TRỢ ĐỒNG BỘ LỚP HỌC
// ==========================================
function linkStudentToClass(className, grade) {
    if (!className) return;
    const cleanClassName = className.toString().trim();
    let targetClass = db.classesData.find(c => c.name.toLowerCase() === cleanClassName.toLowerCase());

    let parsedGrade = parseInt(grade, 10);
    if (isNaN(parsedGrade)) {
        const match = cleanClassName.match(/^(\d+)/);
        parsedGrade = match ? parseInt(match[1], 10) : 10;
    }

    if (targetClass) {
        targetClass.countStudents = (targetClass.countStudents || 0) + 1;
    } else {
        let classType = cleanClassName.replace(/^[0-9]+/, '').charAt(0).toUpperCase() || 'A';
        targetClass = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: cleanClassName,
            type: classType,
            grade: parsedGrade,
            countStudents: 1,
            teacher: "Chưa phân công",
            createdAt: new Date().toISOString().split('T')[0]
        };
        db.classesData.push(targetClass);
    }
    saveDatabase();
}

function unlinkStudentFromClass(className) {
    if (!className) return;
    const cleanClassName = className.toString().trim();
    let targetClass = db.classesData.find(c => c.name.toLowerCase() === cleanClassName.toLowerCase());
    if (targetClass && targetClass.countStudents > 0) {
        targetClass.countStudents -= 1;
        saveDatabase();
    }
}

// ==========================================
// CÁC API HỆ THỐNG
// ==========================================
app.get('/api/auth/status', (req, res) => {
    res.json({ role: req.user ? req.user.role : null });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ tài khoản và mật khẩu!" });
    }

    const inputClean = username.trim().toLowerCase();

    // 1. Kiểm tra trong danh sách Giáo Viên / Ban Giám Hiệu
    const teacher = db.teachersData.find(t => 
        (t.phone === username.trim() || (t.email && t.email.toLowerCase() === inputClean)) && 
        t.password === password
    );

    if (teacher) {
        const title = teacher.gender === 'Nữ' ? 'Cô' : 'Thầy';
        let role = teacher.roleType || 'teacher';
        if (teacher.roleType === 'bgh') role = 'hieutruong';
        
        return res.json({
            success: true,
            isTeacher: true,
            role: role,
            userName: `${title} ${teacher.name}`,
            phone: teacher.phone,
            email: teacher.email || "",
            assignedClass: teacher.assignedClass || ""
        });
    }

    // 2. Kiểm tra trong danh sách Học Sinh / Ban Cán Sự Lớp
    const studentUser = db.studentUsersData.find(s => 
        ((s.email && s.email.toLowerCase() === inputClean) || (s.phone && s.phone === username.trim())) && 
        s.password === password
    );

    if (studentUser) {
        let role = 'hocsinh';
        const classRoleLower = (studentUser.classRole || '').toLowerCase();

        if (classRoleLower === 'lớp trưởng') role = 'loptruong';
        else if (classRoleLower.includes('lớp phó')) role = 'loppho';
        else if (classRoleLower.includes('bí thư')) role = 'bithulop';
        else if (classRoleLower.includes('sao đỏ')) role = 'saodo';
        else if (studentUser.roleType && studentUser.roleType !== 'chunhiem') role = studentUser.roleType;

        const studentClass = studentUser.className || studentUser.assignedClass || "";

        return res.json({
            success: true,
            isTeacher: false,
            role: role,
            classRole: studentUser.classRole || "Học Sinh",
            userName: studentUser.name,
            email: studentUser.email,
            assignedClass: studentClass
        });
    }

    res.status(401).json({ error: "Số điện thoại / Email hoặc mật khẩu không chính xác!" });
});

// Slogan API
app.get('/api/slogan', (req, res) => res.json({ slogan: db.schoolSlogan }));
app.post('/api/slogan', (req, res) => {
    if (req.body.slogan) {
        db.schoolSlogan = req.body.slogan;
        saveDatabase();
        return res.json({ success: true, slogan: db.schoolSlogan });
    }
    res.status(400).json({ error: "Slogan không hợp lệ" });
});

// Bài Viết API
app.get('/api/posts', (req, res) => res.json(db.postsData));
app.post('/api/posts', (req, res) => {
    db.postsData.unshift(req.body);
    saveDatabase();
    res.status(201).json({ success: true, post: req.body });
});
app.delete('/api/posts/:id', (req, res) => {
    db.postsData = db.postsData.filter(p => p.id !== Number(req.params.id));
    saveDatabase();
    res.json({ success: true });
});

app.get('/api/excellence-posts', (req, res) => res.json(db.excellencePostsData));
app.post('/api/excellence-posts', (req, res) => {
    db.excellencePostsData.unshift(req.body);
    saveDatabase();
    res.status(201).json({ success: true, post: req.body });
});
app.delete('/api/excellence-posts/:id', (req, res) => {
    db.excellencePostsData = db.excellencePostsData.filter(p => p.id !== Number(req.params.id));
    saveDatabase();
    res.json({ success: true });
});

// Giáo Viên API
app.get('/api/giaovien', (req, res) => res.json(db.teachersData));
app.get('/api/teachers', (req, res) => res.json(db.teachersData));

app.post('/api/giaovien', (req, res) => {
    const { name, gender, dob, phone, password, subject, address, roleType, assignedClass, bio, avatar } = req.body;

    if (!name || !phone || !password) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Mật khẩu!" });
    }

    const cleanPhone = phone.toString().trim();
    const existing = db.teachersData.find(t => t.phone === cleanPhone);
    if (existing) {
        return res.status(400).json({ error: "Số điện thoại này đã được cấp tài khoản!" });
    }

    const newTeacher = {
        id: Date.now(),
        name: name.toString().trim(),
        gender: gender || 'Nam',
        dob: dob ? dob.toString().trim() : '',
        phone: cleanPhone,
        password: password.toString().trim(),
        subject: subject ? subject.toString().trim() : 'Bộ Môn',
        address: address ? address.toString().trim() : '',
        roleType: roleType || 'bomon',
        assignedClass: assignedClass || 'Chưa có lớp',
        bio: bio ? bio.toString().trim() : '',
        avatar: avatar || '/IMAGE/logothptdg.jpg',
        createdAt: new Date().toISOString()
    };

    if (newTeacher.roleType === 'chunhiem' && newTeacher.assignedClass && newTeacher.assignedClass !== 'Chưa có lớp') {
        const cls = db.classesData.find(c => c.name.toLowerCase() === newTeacher.assignedClass.toLowerCase());
        if (cls) cls.teacher = newTeacher.name;
    }

    db.teachersData.unshift(newTeacher);
    saveDatabase();
    res.status(201).json({ success: true, teacher: newTeacher });
});

app.delete('/api/giaovien/:id', (req, res) => {
    const id = Number(req.params.id);
    const target = db.teachersData.find(t => t.id === id);
    if (target) {
        if (target.assignedClass && target.assignedClass !== 'Chưa có lớp') {
            const cls = db.classesData.find(c => c.name.toLowerCase() === target.assignedClass.toLowerCase());
            if (cls && cls.teacher === target.name) cls.teacher = "Chưa phân công";
        }
        db.teachersData = db.teachersData.filter(t => t.id !== id);
        saveDatabase();
    }
    res.json({ success: true });
});

// Học Sinh API
app.get('/api/hocsinh', (req, res) => res.json(db.studentUsersData));

app.post('/api/hocsinh', (req, res) => {
    const { name, dob, grade, className, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const cls = (className || "10A1").toString().trim();
    let parsedGrade = parseInt(grade, 10);
    if (isNaN(parsedGrade)) {
        const match = cls.match(/^(\d+)/);
        parsedGrade = match ? parseInt(match[1], 10) : 10;
    }

    const newStudent = {
        id: Date.now(),
        name: name.toString().trim(),
        dob: dob ? dob.toString().trim() : "Chưa cập nhật",
        grade: parsedGrade,
        className: cls,
        email: email.toString().trim(),
        password: password.toString().trim(),
        roleType: "hocsinh",
        assignedClass: cls
    };

    db.studentUsersData.unshift(newStudent);
    linkStudentToClass(cls, parsedGrade);
    saveDatabase();
    res.status(201).json({ success: true, student: newStudent });
});

app.post('/api/hocsinh/batch', (req, res) => {
    const { students } = req.body;
    if (!Array.isArray(students)) return res.status(400).json({ error: "Dữ liệu không hợp lệ!" });

    let addedCount = 0;
    students.forEach((s, idx) => {
        if (s.name && s.email) {
            let parsedGrade = parseInt(s.grade, 10);
            const cls = (s.className || "").toString().trim();
            if (isNaN(parsedGrade) && cls) {
                const match = cls.match(/^(\d+)/);
                if (match) parsedGrade = parseInt(match[1], 10);
            }
            if (isNaN(parsedGrade)) parsedGrade = 10;
            const finalClass = cls || `${parsedGrade}A1`;

            db.studentUsersData.push({
                id: Date.now() + idx,
                name: s.name.toString().trim(),
                dob: s.dob ? s.dob.toString().trim() : "Chưa cập nhật",
                grade: parsedGrade,
                className: finalClass,
                email: s.email.toString().trim(),
                password: s.password ? s.password.toString().trim() : "123456",
                roleType: "hocsinh",
                assignedClass: finalClass
            });
            linkStudentToClass(finalClass, parsedGrade);
            addedCount++;
        }
    });

    saveDatabase();
    res.json({ success: true, count: addedCount });
});

app.delete('/api/hocsinh/:id', (req, res) => {
    const id = Number(req.params.id);
    const target = db.studentUsersData.find(s => s.id === id);
    if (target) {
        unlinkStudentFromClass(target.className || target.assignedClass);
        db.studentUsersData = db.studentUsersData.filter(s => s.id !== id);
        saveDatabase();
    }
    res.json({ success: true });
});

app.put('/api/hocsinh/:id/role', (req, res) => {
    const id = Number(req.params.id);
    const { classRole, roleType } = req.body;
    const student = db.studentUsersData.find(s => s.id === id);
    if (!student) return res.status(404).json({ error: "Không tìm thấy học sinh!" });

    student.classRole = classRole || "Học Sinh";
    student.roleType = roleType || "hocsinh";
    saveDatabase();
    res.json({ success: true, student });
});

// Khối Lớp API
app.get('/api/khoi/summary', (req, res) => {
    const k10 = db.classesData.filter(c => c.grade === 10);
    const k11 = db.classesData.filter(c => c.grade === 11);
    const k12 = db.classesData.filter(c => c.grade === 12);
    const sumStudents = (arr) => arr.reduce((acc, item) => acc + (item.countStudents || 0), 0);

    res.json({
        totalStudents: sumStudents(db.classesData),
        khoi10: { countClasses: k10.length, countStudents: sumStudents(k10), classes: k10 },
        khoi11: { countClasses: k11.length, countStudents: sumStudents(k11), classes: k11 },
        khoi12: { countClasses: k12.length, countStudents: sumStudents(k12), classes: k12 }
    });
});

app.get('/api/khoi/:grade', (req, res) => {
    const grade = Number(req.params.grade);
    res.json(db.classesData.filter(c => c.grade === grade));
});

// ==========================================
// API QUẢN LÝ SAO ĐỎ & CHẤM THI ĐUA
// ==========================================
app.get('/api/saodo/assignments', (req, res) => res.json(db.saodoAssignments));

app.post('/api/saodo/assignments', (req, res) => {
    const { targetClass, saodo1, saodo2, week, schoolYear } = req.body;
    db.saodoAssignments = db.saodoAssignments.filter(a => !(a.targetClass === targetClass && a.week === week && a.schoolYear === schoolYear));
    
    const newAssign = { 
        id: Date.now(), 
        targetClass, 
        saodo1, 
        saodo2, 
        week: week || 'Tuần 1',
        schoolYear: schoolYear || '2026-2027',
        isLocked: false,
        createdAt: new Date().toISOString()
    };
    db.saodoAssignments.push(newAssign);
    saveDatabase();
    res.json({ success: true, assignment: newAssign });
});

app.delete('/api/saodo/assignments/:id', (req, res) => {
    const id = Number(req.params.id);
    db.saodoAssignments = db.saodoAssignments.filter(a => a.id !== id);
    saveDatabase();
    res.json({ success: true });
});

app.get('/api/saodo/scores', (req, res) => res.json(db.saodoWeeklyScores));

app.post('/api/saodo/scores', (req, res) => {
    const scoreData = req.body;
    const assign = db.saodoAssignments.find(a => a.targetClass === scoreData.targetClass && a.week === scoreData.week);
    if (assign && assign.isLocked) {
        return res.status(403).json({ error: "Sổ tuần này của lớp đã bị Giám thị KHÓA SỔ. Không thể chỉnh sửa!" });
    }

    db.saodoWeeklyScores = db.saodoWeeklyScores.filter(s => !(s.targetClass === scoreData.targetClass && s.week === scoreData.week));
    scoreData.id = Date.now();
    db.saodoWeeklyScores.push(scoreData);
    saveDatabase();
    res.json({ success: true, data: scoreData });
});

app.post('/api/saodo/scores/verify', (req, res) => {
    const { targetClass, week, leaderName } = req.body;
    let record = db.saodoWeeklyScores.find(s => s.targetClass === targetClass && s.week === week);
    if (!record) {
        record = {
            id: Date.now(),
            targetClass,
            week,
            totalScore: 150,
            verifiedByLeader: leaderName || 'Lớp trưởng đã ký'
        };
        db.saodoWeeklyScores.push(record);
    } else {
        record.verifiedByLeader = leaderName || 'Lớp trưởng đã ký';
    }
    saveDatabase();
    return res.json({ success: true, record });
});

app.post('/api/saodo/lock', (req, res) => {
    const { targetClass, week, lockState } = req.body;
    const assign = db.saodoAssignments.find(a => a.targetClass === targetClass && a.week === week);
    if (assign) {
        assign.isLocked = !!lockState;
        saveDatabase();
        return res.json({ success: true, isLocked: assign.isLocked });
    }
    res.status(404).json({ error: "Không tìm thấy phân công lớp này trong tuần!" });
});

// Điều hướng trang web
const viewsPath = path.join(__dirname, 'views');
app.get('/', (req, res) => res.sendFile(path.join(viewsPath, 'index.html')));
app.get('/index', (req, res) => res.sendFile(path.join(viewsPath, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(viewsPath, 'login.html')));
app.get('/settings', (req, res) => res.sendFile(path.join(viewsPath, 'settings.html')));

app.get('/khoi', (req, res) => res.sendFile(path.join(viewsPath, 'khoi.html')));
app.get('/khoi10', (req, res) => res.sendFile(path.join(viewsPath, 'khoi10.html')));
app.get('/khoi/10', (req, res) => res.sendFile(path.join(viewsPath, 'khoi10.html')));
app.get('/khoi11', (req, res) => res.sendFile(path.join(viewsPath, 'khoi11.html')));
app.get('/khoi/11', (req, res) => res.sendFile(path.join(viewsPath, 'khoi11.html')));
app.get('/khoi12', (req, res) => res.sendFile(path.join(viewsPath, 'khoi12.html')));
app.get('/khoi/12', (req, res) => res.sendFile(path.join(viewsPath, 'khoi12.html')));
app.get('/hocsinh', (req, res) => res.sendFile(path.join(viewsPath, 'hocsinh.html')));

app.get('/giaovien', (req, res) => res.sendFile(path.join(viewsPath, 'giaovien.html')));
app.get('/giaovien/danhsach', (req, res) => res.sendFile(path.join(viewsPath, 'giaovien.html')));
app.get('/giaovien/quanly', (req, res) => res.sendFile(path.join(viewsPath, 'quanlygiaovien.html')));
app.get('/giaovien/giamthi', (req, res) => res.sendFile(path.join(viewsPath, 'quanlygiamthi.html')));
app.get('/giaovien/bgh', (req, res) => res.sendFile(path.join(viewsPath, 'bangiamhieu.html')));
app.get('/giaovien/saodo', (req, res) => res.sendFile(path.join(viewsPath, 'quanlysaodo.html')));

app.get('/saodo', (req, res) => res.sendFile(path.join(viewsPath, 'quanlysaodo.html')));
app.get('/theodoiso', (req, res) => res.sendFile(path.join(viewsPath, 'theodoilop.html')));
app.get('/tongket', (req, res) => res.sendFile(path.join(viewsPath, 'thidua.html')));
app.get('/sobaocao', (req, res) => res.sendFile(path.join(viewsPath, 'quanlysaodo.html')));

app.get('/vipham', (req, res) => res.sendFile(path.join(viewsPath, 'vipham.html')));
app.get('/khoilop', (req, res) => res.sendFile(path.join(viewsPath, 'khoilop.html')));
app.get('/lophoc', (req, res) => res.sendFile(path.join(viewsPath, 'lophoc.html')));
app.get('/theodoilop', (req, res) => res.sendFile(path.join(viewsPath, 'theodoilop.html')));
app.get('/thidua', (req, res) => res.sendFile(path.join(viewsPath, 'thidua.html')));
app.get('/quatang', (req, res) => res.sendFile(path.join(viewsPath, 'quatang.html')));

app.get('/dangbai', (req, res) => res.sendFile(path.join(viewsPath, 'dangbai.html')));
app.get('/chitiet', (req, res) => res.sendFile(path.join(viewsPath, 'chitiet.html')));
app.get('/chitiet.html', (req, res) => res.sendFile(path.join(viewsPath, 'chitiet.html')));
app.get('/thong-tin-cong-khai', (req, res) => res.sendFile(path.join(viewsPath, 'chitiet.html')));
app.get('/thongtin', (req, res) => res.sendFile(path.join(viewsPath, 'chitiet.html')));

app.get('/tintuc/thongbao', (req, res) => res.sendFile(path.join(viewsPath, 'thongbao.html')));
app.get('/thongbao', (req, res) => res.sendFile(path.join(viewsPath, 'thongbao.html')));
app.get('/tintuc/doanthe', (req, res) => res.sendFile(path.join(viewsPath, 'doanthe.html')));
app.get('/doanthe', (req, res) => res.sendFile(path.join(viewsPath, 'doanthe.html')));
app.get('/tintuc/sukien', (req, res) => res.sendFile(path.join(viewsPath, 'sukien.html')));
app.get('/sukien', (req, res) => res.sendFile(path.join(viewsPath, 'sukien.html')));

app.listen(PORT, () => {
    console.log(`Server đang chạy tại port: ${PORT}`);
});