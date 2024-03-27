const firebaseConfig = {
    apiKey: "AIzaSyA5S_t11PAn45FG90mggwTPAYLRrfiYEG4",
    authDomain: "letter-management-esec.firebaseapp.com",
    databaseURL: "https://letter-management-esec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "letter-management-esec",
    storageBucket: "letter-management-esec.appspot.com",
    messagingSenderId: "688302510507",
    appId: "1:688302510507:web:656e6440e5c9a5999602ee",
    measurementId: "G-V0ZFV6C6DT"
  };



  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


  var tableRef = document.getElementById("dataTable").getElementsByTagName("tbody")[0];

  function createRow(dataKey, dataValue) {
    var newRow = tableRef.insertRow();
    newRow.setAttribute("id", dataKey);
    newRow.innerHTML = "<td>" + dataValue.name + "</td><td>" + dataValue.rollno + "</td><td>" + dataValue.year + "</td><td>" + dataValue.sec + "</td><td>" + dataValue.leavedays + "</td><td>" + dataValue.startingday + "</td><td>" + dataValue.endingday + "</td><td>    <button class='btn btn-primary btn-sm fa-solid fa-images' onclick='viewimage(\"" + dataKey + "\", \"" + dataValue.imageUrl + "\")'></button></td><td>  <button class='btn btn-danger btn-sm fa-solid fa-trash' onclick='deleteRow(\"" + dataKey + "\")'></button></td>";
    console.log(dataValue.imageUrl)


  }





  function viewimage(dataKey, dataValue) {

    var popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";
    popupContainer.style.width = "300px";
    popupContainer.style.padding = "20px";
    popupContainer.style.backgroundColor = "white";
    popupContainer.style.color = "#ffffff";
    popupContainer.style.textAlign = "center";
    popupContainer.style.borderRadius = "20px";
    popupContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
    popupContainer.style.zIndex = "9999";

    var successMessage = document.createElement("img");
    successMessage.src = dataValue;
    successMessage.className="img-fluid"; 
    successMessage.style.fontWeight = "bold";
    successMessage.style.fontSize = "18px";
    successMessage.style.marginBottom = "10px";

    var okButton = document.createElement("button");
    okButton.innerHTML = "OK";
    okButton.style.backgroundColor = "black";
    okButton.style.color = "grey";
    okButton.style.border = "none";
    okButton.style.borderRadius = "15px";
    okButton.style.padding = "8px 16px";
    okButton.style.fontSize = "14px";
    okButton.style.cursor = "pointer";

    okButton.addEventListener("click", function () {
      document.body.removeChild(popupContainer);
    });

    popupContainer.appendChild(successMessage);
    popupContainer.appendChild(okButton);

    document.body.appendChild(popupContainer);

  }

  function deleteRow(dataKey) {
    database.ref("leave_data/" + dataKey).remove();
  }

  database.ref("leave_data").on("child_added", function (snapshot) {
    var dataKey = snapshot.key;
    var dataValue = snapshot.val();
    createRow(dataKey, dataValue);
  });

  database.ref("leave_data").on("child_removed", function (snapshot) {
    var dataKey = snapshot.key;
    var row = document.getElementById(dataKey);
    if (row) {
      tableRef.removeChild(row);
    }
  });
