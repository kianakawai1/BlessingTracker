 // firebase links here

 var firebaseConfig = {
  apiKey: "AIzaSyCLkKkBFWBXt9g-UgNPKuHauAOzlA-d3tU",
  authDomain: "blessingtracker-865d6.firebaseapp.com",
  databaseURL: "https://blessingtracker-865d6-default-rtdb.firebaseio.com",
  projectId: "blessingtracker-865d6",
  storageBucket: "blessingtracker-865d6.appspot.com",
  messagingSenderId: "977065194894",
  appId: "1:977065194894:web:8fb7c7cec86ca1897320df"
};

firebase.initializeApp(firebaseConfig);

function logout() {

  localStorage.removeItem("username");
  window.location = "index.html";

}

var username = localStorage.getItem("username");

function send() {

  var msg = document.getElementById("msg").value;

  firebase.database().ref("/").child(username).child("msg").push({
        msg
  });

  //location.reload();
  document.getElementById("msg").value = "";

}

function getData() {
  
  username = localStorage.getItem("username"); 
  
  firebase.database().ref("/").child(username).child("msg").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      const blessingKey = childSnapshot.key;
      const myblessing = childSnapshot.val().msg;
      //Start code
      console.log('Blessing ['+myblessing+'] key: ' + blessingKey);
      row = "<div class='blessing' id=" + blessingKey + " '>" + myblessing + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
    });
  });
}
getData();