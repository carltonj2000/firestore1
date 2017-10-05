(() => {
  var config = {
    apiKey: "AIzaSyBEZFd9Kt-Ofg56fU477Eq8IQfnb4IBEVI",
    authDomain: "firestore-demo-b5472.firebaseapp.com",
    databaseURL: "https://firestore-demo-b5472.firebaseio.com",
    projectId: "firestore-demo-b5472",
    storageBucket: "",
    messagingSenderId: "673500505133"
  };
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const  docRef = firestore.doc("samples/sandwichData");

  const outputHeader = document.querySelector("#hotDogOutput");
  const inputTextFeild = document.querySelector("#latestHotDogStatus");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

  saveButton.addEventListener("click", () => {
    const textToSave = inputTextFeild.value;
    console.log(textToSave);
    docRef.set({hotDogStatus: textToSave})
    .then(() => console.log("Saved"))
    .catch((err) => console.log(err));
  });
  loadButton.addEventListener("click", () => {
    docRef.get()
      .then(doc => {
        if (doc && doc.exists) {
          outputHeader.innerText = `Hot dog status: ${doc.data().hotDogStatus}`;
        }})
      .catch(err => console.log(`Got an error: ${err}`));
  });
  getRealtimeUpdates = () => {
    docRef.onSnapshot(doc => {
      if (doc && doc.exists) {
        outputHeader.innerText = `Hot dog status: ${doc.data().hotDogStatus}`;
      }
    });
  };
  getRealtimeUpdates();
})();
