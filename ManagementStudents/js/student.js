//localStorage.setItem('students', 'Nguyen Van An')
console.log(localStorage.getItem('students'));

function emailIsValid(email){
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function addStudent(){
	let mssv = document.getElementById('mssv').value;
	let fullname = document.getElementById('fullname').value;
	let email = document.getElementById('email').value;


	if (_.isEmpty(mssv)){
		mssv  =  '';
		document.getElementById('mssv-error').innerHTML = 'Vui lòng nhập mssv của bạn';
	} else {
		document.getElementById('mssv-error').innerHTML = '';
	}


	if (_.isEmpty(fullname)){
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ tên';
	} else if(fullname.trim().length <= 2){
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Họ tên không được nhỏ hơn 2 kí tự';
	} else if(fullname.trim().length > 50){
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Họ tên không được lớn hơn 50 kí tự';
	} 
	else {
		document.getElementById('fullname-error').innerHTML = '';
	}


	if (_.isEmpty(email)){
		email = '';
		document.getElementById('email-error').innerHTML = 'Vui lòng nhập email của bạn';
	} else if (!emailIsValid(email)){
		email = '';
		document.getElementById('email-error').innerHTML = 'email không đúng định dạng';

	} else {
		document.getElementById('fullname-error').innerHTML = '';
	}

	if (mssv && fullname && email){
		//console.log(mssv, fullname, email);
		//Luu vao trong danh sach sinh vien
		let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

	//	let students = [];
		students.push({
				mssv: mssv,
				fullname: fullname,
				email: email,
		}); 

		localStorage.setItem('students', JSON.stringify(students));

		this.renderListStudent();

	}

}

function renderListStudent(){
	//console.log('OK');
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

	//console.log(students.length);
	if (students.length === 0) {
		document.getElementById('list-student').style.display = 'none';
		return false;
	}

	document.getElementById('list-student').style.display = 'block';

	let tableContent = `<tr>	
		<td>MSSV</td>
		<td>Họ Tên</td>
		<td>Email</td>
		<td>Hành động</td>
	</tr>`;

	students.forEach((student, index) => {
		let studentId = index;
		index++;
		tableContent += `<tr>

		<td>${student.mssv}</td>
		<td>${student.fullname}</td>
		<td>${student.email}</td>

		<td>
			<a href='#' onclick='editStudent(${studentId})'>Sửa</a> | <a href='#' onclick='deleteStudent(${studentId})'>Xóa</a>
		</td>
		</tr>`;
	})

	document.getElementById('grid-students').innerHTML = tableContent;

}

function deleteStudent(id){
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	//console.log(id, students);
	// console.log(students);
	students.splice(id, 1); //xoa
	localStorage.setItem('students', JSON.stringify(students));
	renderListStudent();
	// console.log(students);
}

function editStudent1(id){
	// if (_.isEmpty(mssv)){
	// 	mssv  =  '';
	// }

	// if (_.isEmpty(fullname)){
	// 	fullname  =  '';
	// }

	// if (_.isEmpty(email)){
	// 	email  =  '';
	// }

	// if (mssv && fullname && email){
	// 	deleteStudent(id);
	// 	addStudent()
	// } else {
	// 	alert("Nhập sinh viên cần sửa");
	// }

	if(document.getElementById('mssv').value==""||document.getElementById('email').value==""||document.getElementById('fullname').value==""){
		alert("Nhập thông tin sinh viên cần sửa");
	}else{
		deleteStudent(id);
		addStudent()
	}
	
}

function editStudent(id){
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	document.getElementById('mssv').value=students[id].mssv;
	document.getElementById('fullname').value=students[id].fullname;
	document.getElementById('email').value=students[id].email;
	deleteStudent(id);
}

function edit(){
	addStudent();
}
