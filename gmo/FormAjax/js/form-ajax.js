/*
Author: VU BA TIEN
Project: Javascript - FormAjax
*/

/*main function to check user from server after check validate input data
* use AJAX XMLHttpRequest
* check user name on database
* return correct/incorrect
*/
// AJAX code to check input field values when onblur event triggerd.
function checkForm() {
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var email = document.getElementById("email");
    var userError = document.getElementById("user-error");
    if (checkValidate()) {
        console.log("check Validate success");
        var xmlhttp;
        if (window.XMLHttpRequest) { // for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");// for IE6, IE5
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState != 4 && xmlhttp.status == 200) {
            userError.innerHTML = "Validating..";
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userError.innerHTML = xmlhttp.responseText;
            } else {
           userError.innerHTML = "Error Occurred. Not connect to Server.";
            }
        }
        xmlhttp.open("POST",  "/FormAjax?username=" + username.value +
			   		"&password=" + password.value + "&email=" + email.value , true);
        xmlhttp.send();
    }
}
/*check input username, password, email and birthday
* input valid return true
* input invalid
*/
function checkValidate() {
    var flag = true;
	if(!chkUserName()) flag= false;
	if(!chkPassword()) flag = false;
	if(!chkEmail()) flag = false;
    if(!chkDate()) flag = false;
    return flag;
}
/*check input user name
* format user name
* not null or length min 8 letter
*/
function chkUserName() {
	var username = document.getElementById("username");
    var userError = document.getElementById("user-error");
    var regexUsername = new RegExp("^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$");
	userError.innerHTML = "";
	if(username.value === "") {
		userError.innerHTML = "Please enter the username";
		return false;
    }
	if(!regexUsername.test(username.value)) {
		userError.innerHTML = "Invalid username";
		return false;
	}
	if(username.value.length < 6) {
		userError.innerHTML = "Username length min 6 letter";
		return false;
    }
    if (username.value.length > 30) {
		userError.innerHTML = "Username lenght max 30 letter";
		return false;
	}
	return true;
}
/*check input password
* not null
* length min 8 letter, lenght max 30 letter
*/
function chkPassword() {
	var password = document.getElementById("password");
	var passError = document.getElementById("pass-error");
	var regexPassword = new RegExp("^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$");
	passError.innerHTML = "";
	if(password.value == "") {
		passError.innerHTML = "Please enter your password";
		return false;
	}
	if(!regexPassword.test(password.value)) {
		passError.innerHTML = "Invalid password";
		return false;
	}
	if(password.value.length < 8) {
		passError.innerHTML = "Password length min 8 letter";
		return false;
    }
    if (password.value.length > 30) {
		passError.innerHTML = "Password lenght max 30 letter";
		return false;
	}
	return true;
}
/*check input email
* format email
* not null
*/
function chkEmail() {
	var email = document.getElementById("email");
	var emailError = document.getElementById("email-error");
	emailError.innerHTML = "";
	var regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
	if(email.value == "") {
		emailError.innerHTML = "Please enter your email";
		return false;
	}
	if(!regexEmail.test(email.value)) {
		emailError.innerHTML = "Email wrong format";
		return false;
	}
	return true;
}
/*check input birthday
* type format date
* not null
*/
function chkDate(){
     var birthday = document.getElementById("date");
	//case1 YYYY/MM/DD
	var case1 =  "(([0-9]{4})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))";
	//case2 DD/MM/YYYY
	var case2 = "(([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([0-9]{4}))";
	//case3 MM/DD/YYYY
	var case3 = "(([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([0-9]{4}))";
	var regexDate = new RegExp(case3);
	var birthError = document.getElementById("birth-error");
	birthError.innerHTML = "";
	console.log(regexDate.test(birthday.value));
	if(birthday.value == "") {
		birthError.innerHTML = "Please input your date";
		return false;
	}
	if(!regexDate.test(birthday.value)) {
		birthError.innerHTML = "Birthday wrong format";
		return false;
	}
	return true;
}
//Reset form
function resetForm() {
    var input_list = document.getElementsByTagName("input");
	for (var i = 0; i < input_list.length; i++) {
        input_list[i].value = "";
    }
    document.getElementById("user-error").innerHTML = "";
	document.getElementById("pass-error").innerHTML = "";
	document.getElementById("email-error").innerHTML = "";
	document.getElementById("birth-error").innerHTML = "";
}