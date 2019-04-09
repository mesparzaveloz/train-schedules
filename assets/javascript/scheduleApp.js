
  // Init Firebase
  var config = {
    apiKey: "AIzaSyCr9d0SIKh5LRhMBlNIh73o4mWDiuSAVsk",
    authDomain: "mev-train-scheduler.firebaseapp.com",
    databaseURL: "https://mev-train-scheduler.firebaseio.com",
    projectId: "mev-train-scheduler",
    storageBucket: "",
    messagingSenderId: "913705262834"
  };
  firebase.initializeApp(config);
var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // take user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#freqInput").val().trim();
  // to create local temporary object to hold train data
  var newTrain = {
      name: trainName,
      place: destination,
      first: firstTrain,
      freq: frequency
    }
  // uploads train data to the database
  database.ref().push(newTrain);
  // clears all the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#freqInput").val("");
  return false;
});
  //  Created a firebase event listner for adding trains to database and a row in the html when the user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  // Now we store the childSnapshot values into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;
  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  var currentTime = moment().format("HH:mm");
  // store difference between currentTime and fisrt train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  var timeRemainder = timeDiff % frequency;
  var minToNext = frequency - timeRemainder;
  var nextt = moment().add(minToNext, "minutes").format("HH:mm");
  // adding a row on scheduling table
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nextt + "</td><td>" + frequency + "</td><td>" + minToNext + "</td></tr>");
});























