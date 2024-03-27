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
  var storageRef = firebase.storage().ref();



  document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var odname = document.getElementById("odname").value;
    var odrollno = document.getElementById("odrollno").value;
    var odyear = document.getElementById("odyear").value;
    var odsec = document.getElementById("odsec").value;
    var odleavedays = document.getElementById("odleavedays").value;
    var odstartingday = document.getElementById("odstartingdate").value;
    var odendingday = document.getElementById("odendingdate").value;
    var odreason = document.getElementById("odreason").value;
    var imageFile = $("#odPhotocopy").prop("files")[0];
  
    var uploadTask = storageRef.child("images/" + imageFile.name).put(imageFile);
  
    uploadTask.on("state_changed", null, null, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        database.ref("od_data").push({
          odname: odname,
          odrollno: odrollno,
          odyear: odyear,
          odsec: odsec,
          odleavedays: odleavedays,
          odstartingday: odstartingday,
          odendingday: odendingday,
          odreason: odreason,
          imageUrl: downloadURL,
        });
  
        document.getElementById("odname").value = "";
        document.getElementById("odrollno").value = "";
        document.getElementById("odyear").value = "";
        document.getElementById("odsec").value = "";
        document.getElementById("odleavedays").value = "";
        document.getElementById("odstartingdate").value = "";
        document.getElementById("odendingdate").value = "";
        document.getElementById("odreason").value = "";

  
        alert("Successfully submitted");
   });
});
});