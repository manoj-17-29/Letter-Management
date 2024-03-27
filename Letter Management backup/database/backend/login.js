function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(email==="adminesec@gmail.com" && password==="123456"){
      window.location.href = "admpands.html";    }
    else{
      alert("Email or Password is Wrong")
    }
  }