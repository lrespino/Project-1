// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    self.location.href = ("meal-horizontal-grid.html"), event.preventDefault();
    // $("#formContent").style.display = "none";
    }
   else {
    // self.location.href =("index.html"), event.preventDefault();
    
  }
});  

// Capture Button Click login
$("#login").on("click", function(event) {
  event.preventDefault();


  email = $("#inputUsername").val().trim();
  password = $("#inputPassword").val().trim();
  console.log(email)
  console.log(password)
  
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
  console.log(cred.user);
    });
  });

  // logout
$("#logout").on("click", function(event) {
  event.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  })
});

// dropdown Button Click login
$("#daniel").on("click", function(event) {
  event.preventDefault();
  
    email = "daniel@test.com";
    password = "test1234";
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred.user);
        });
      });


//   // signup
//   $("#signup").on("click", function(event) {
  
//   //   //Test signup with login Button 
//   //  $("#login").on("click", function(event) {

//     event.preventDefault();
    
  
//   // get user info
//   email = $("#addUsername").val().trim();
//   password = $("#addPassword").val().trim();

//   // //Test signup with login Button 
//   // email = $("#inputUsername").val().trim();
//   // password = $("#inputPassword").val().trim();

//   // sign up the user
//   auth.createUserWithEmailAndPassword(email, password);
//        console.log(cred.user);
  
//  });
