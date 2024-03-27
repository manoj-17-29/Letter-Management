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
  
    var name = document.getElementById("name").value;
    var rollno = document.getElementById("rollno").value;
    var year = document.getElementById("year").value;
    var sec = document.getElementById("sec").value;
    var leavedays = document.getElementById("leavedays").value;
    var startingday = document.getElementById("startingdate").value;
    var endingday = document.getElementById("endingdate").value;
    var imageFile = $("#Photocopy").prop("files")[0];
  
    var uploadTask = storageRef.child("images/" + imageFile.name).put(imageFile);
  
    uploadTask.on("state_changed", null, null, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        database.ref("leave_data").push({
          name: name,
          rollno: rollno,
          year: year,
          sec: sec,
          leavedays: leavedays,
          startingday: startingday,
          endingday: endingday,
          imageUrl: downloadURL,
        });
  
        document.getElementById("name").value = "";
        document.getElementById("rollno").value = "";
        document.getElementById("year").value = "";
        document.getElementById("sec").value = "";
        document.getElementById("leavedays").value = "";
        document.getElementById("startingdate").value = "";
        document.getElementById("endingdate").value = "";
  
        alert("Successfully submitted");
   });
});
});