var firstNameValid = false;
var lastNameValid = false;
var mobileValid = false;
var emailValid = false;
var emailMatched = false;
function validation() {
  var name_pattern = /^[a-zA-Z]*$/;
  var number_pattern = /^[0-9]*$/;
  var date_pattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mobile = 10;

  // checking if value being inputted into first name input box matches name pattern
  $("#first_name").on("keyup", function() {
    //pattern matched
    if (name_pattern.test($("#first_name").val())) {
      $("#fn-tip").text("");
      firstNameValid = true;
    } else {
      //pattern doesnot matches
      firstNameValid = false;
      $("#fn-tip").text("First name can only have alphabets without spaces");
      $("#fn-tip").css("color", "red");
    }
  });

  $("#last_name").on("keyup", function() {
    if (name_pattern.test($("#last_name").val())) {
      $("#ln-tip").text("");
      lastNameValid = true;
    } else {
      lastNameValid = false;
      $("#ln-tip").text("Last name can only have alphabets without spaces");
      $("#ln-tip").css("color", "red");
    }
  });

  $("#mobile").on("keyup", function() {
    if (number_pattern.test($("#mobile").val())) {
      if ($("#mobile").val().length === mobile) {
        $("#mob-tip").text("Ok :)");
        $("#mob-tip").css("color", "green");
        mobileValid = true;
      } else if ($("#mobile").val().length < mobile) {
        $("#mob-tip").text("Mobile number should be of 10 digit");
        $("#mob-tip").css("color", "#997a00");
        mobileValid = false;
      } else if ($("#mobile").val().length > mobile) {
        mobileValid = false;
        $("#mob-tip").text("Mobile number exceeded 10 digit. Enter Valid No!");
        $("#mob-tip").css("color", "red");
      }
    } else {
      mobileValid = false;
      $("#mob-tip").text("Mobile number can have only digits!");
      $("#mob-tip").css("color", "red");
    }
  });

  function validateEmail(email) {
    return email_pattern.test(email);
  }
  $("#email").on("keyup", function() {
    $("#mail-tip").text("");
    var email = $("#email").val();
    if (validateEmail(email)) {
      $("#mail-tip").text("Ok :)");
      $("#mail-tip").css("color", "green");
      emailValid = true;
    } else {
      $("#mail-tip").text(email + " is not valid :(");
      $("#mail-tip").css("color", "red");
      emailValid = false;
    }
  });

  $("#cemail").on("keyup", function() {
    if (
      $("#email").val() !== $("#cemail").val() &&
      $("#email").val().length > $("#cemail").val().length
    ) {
      $("#cmail-tip").text("Emails not same");
      $("#cmail-tip").css("color", "#997a00");
      emailMatched = false;
    } else if ($("#email").val() === $("#cemail").val()) {
      $("#cmail-tip").text("Emails Matched :)");
      $("#cmail-tip").css("color", "green");
      emailMatched = true;
    } else if ($("#email").val().length < $("#cemail").val().length) {
      $("#cmail-tip").text("Emails match failed, Try again!");
      $("#cmail-tip").css("color", "red");
      emailMatched = false;
    }
  });

  function parseDate(str) {
    var m = date_pattern.test(str);
    return m ? new Date(m[3], m[2] - 1, m[1]) : null;
  }
  function leapyear(str) {
    var mod = str % 4;
    var lmod = str % 400;
    var ymod = str % 100;
    if ((mod == 0 && ymod !== 0) || (mod == 0 && lmod == 0)) {
      return true;
    } else {
      return null;
    }
  }

  $("#date").on("keyup", function() {
    var d = $("#date").val();
    var s = d.substring(6, 10);
    console.log(d);
    console.log(s);
    console.log(d[0]);
    console.log(d[1]);

    if (d[0] == 3 && d[1] >= 2) {
      $("#date").val("");
      $("#d-tip").text("Invalid day!cannot be greater than 31");
      $("#d-tip").css("color", "red");
    } else if (d[0] > 3) {
      $("#date").val("");
      $("#d-tip").text("Invalid day!cannot be greater than 31");
      $("#d-tip").css("color", "red");
    } else if (d[3] > 1 || d[4] > 2) {
      $("#date").val("");
      $("#d-tip").text("Invalid Month!cannot be greater than 12");
      $("#d-tip").css("color", "red");
    } else if (d.length < 10) {
      $("#d-tip").text("format should be dd-mm-yyyy");
      $("#d-tip").css("color", "#997a00");
    } else if (d.length > 10) {
      $("#date").val("");
      $("#d-tip").text("invalid date, enter again!");
      $("#d-tip").css("color", "red");
    } else if (d[3] == 0 && d[4] == 2) {
      if (d[0] > 2) {
        $("#date").val("");
        $("#d-tip").text("Feb cannot have more than 29 days");
        $("#d-tip").css("color", "red");
      } else if (d[0] == 2 && d[1] == 9 && !leapyear(s)) {
        $("#date").val("");
        $("#d-tip").text("Not a leap year 29 feb invalid");
        $("#d-tip").css("color", "red");
      } else if (d[0] == 2 && d[1] == 9 && leapyear(s)) {
        $("#d-tip").text("OK :)");
        $("#d-tip").css("color", "green");
      }
    } else if (parseDate(d)) {
      $("#d-tip").text("OK :)");
      $("#d-tip").css("color", "green");
    }
  });
}

function submit() {
  var firstName = $("#first_name").val();
  var lastName = $("#last_name").val();
  var mobile = $("#mobile").val();
  var email = $("#email").val();
  var cemail = $("#cemail").val();
  var date = $("#date").val();
  var allValid = [
    firstName,
    lastName,
    mobile,
    email,
    cemail,
    date,
    firstNameValid,
    lastNameValid,
    mobileValid,
    emailValid,
    emailMatched
  ];
  var formCorrect = true;
  for (var i = 0; i < allValid.length; i++) {
    if (!allValid[i]) {
      formCorrect = false;
      break;
    }
  }
  if (formCorrect) {
	alert("Form ready to submit");
	location.reload();
  } else {
    if ((firstName == "")) {
      alert("Enter First Name");
      return;
    }
    if (lastName == "") {
      alert("Enter Last Name");
      return;
    }
    if (mobile == "") {
      alert("Enter mobile number");
      return;
    }
    if (email == "") {
      alert("Enter email");
      return;
    }
    if (cemail == "") {
      alert("confirm your email");
      return;
    }
    if (date == "") {
      alert("Enter date of birth");
      return;
    }
    if (firstNameValid == false) {
      alert("Invalid Form!! First Name is not valid!");
      return;
    }
    if (lastNameValid == false) {
      alert("Invalid Form!! Last Name is not valid!");
      return;
    }
    if (mobileValid == false) {
      alert("Invalid Form!! Mobile number is not valid!");
      return;
    }
    if (emailValid == false) {
      alert("Invalid Form!! Email is not valid!");
      return;
    }
    if (emailMatched == false) {
      alert("Invalid Form!! Emails donot match!");
      return;
    }
  }
}
