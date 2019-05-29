var config = {
    apiKey: "AIzaSyAYSpb8_l0wk7-wKIiRzueDgoJhJ3Us3vk",
    authDomain: "cruzerproject.firebaseapp.com",
    databaseURL: "https://cruzerproject.firebaseio.com",
    projectId: "cruzerproject",
    storageBucket: "cruzerproject.appspot.com",
    messagingSenderId: "166592985501",
    appId: "1:166592985501:web:5fb9ecceabb46100"
  };
  
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#addTrainBtn").on("click",function(){
    
    

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

   
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    
    return false;

  });

  trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  });