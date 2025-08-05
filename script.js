const firebaseConfig = {
    apiKey: "AIzaSyANfAzH3yRQwK2Jim_9fa8ej67IuVyvKck",
    authDomain: "ticketbooking-30d1f.firebaseapp.com",
    databaseURL: "https://ticketbooking-30d1f-default-rtdb.firebaseio.com",
    projectId: "ticketbooking-30d1f",
    storageBucket: "ticketbooking-30d1f.appspot.com",
    messagingSenderId: "339229011524",
    appId: "1:339229011524:web:2682ea9cefd91c11dfd611",
    measurementId: "G-QZ1QFJTL0K"
  };
firebase.initializeApp(firebaseConfig);

function store()
{
    name=document.getElementById("txtname").value
    username=document.getElementById("txtusername").value
    password=document.getElementById("txtpass").value

      if (!username) 
        {
          alert("Please enter username...")
          return;
        }
      const usernameRef = firebase.database().ref('record/' + username);

      usernameRef.get().then((snapshot) => {
        if (snapshot.exists()) {
           alert("usename already exists...")
        } 
        else 
        {
            var obj={
            Name:name,
            Username:username,
            Password:password,
            }
           firebase.database().ref("record/"+username).set(obj)
           alert("register successfully ... Please login...")
        }
      }).catch((error) => {
        console.error(error);
        console.log("error")
      });
    clean()
}

function match()
{
    username=document.getElementById("txtusername").value
    password=document.getElementById("txtpass").value

    if (!username) 
      {
        alert("Please enter username...")
        return;
      }
    if (!password) 
      {
          alert("Please enter password...")
          return;
      }  
    const userRef = firebase.database().ref('record/'+username);

    userRef.once('value')
        .then(function(snapshot) {
            const userdata =snapshot.val();

            if (userdata && userdata.Password == password) {
                // If matched,  to the next page
                window.location.href ="welcome.html?id="+username;
            } 
            else {
                // If not matched
                alert('Invalid user ID or password');
            }
        })
        .catch(function(error) {
            console.error('Error reading data: ', error);
            alert('Error logging in. Please try again.');
        });
    }        

function matchadmin()
{
    username=document.getElementById("txtusername").value
    password=document.getElementById("txtpass").value

    firebase.database().ref("admin/").once("value",function(AllRecord){
      AllRecord.forEach(function(snapshot){
                      if(snapshot.val().Username==username && snapshot.val().Password==password)
                      {
                          window.location.href="admin.html?id="+name
                      }
                      else
                      {
                        alert("Enter the correct details...")
                      }
                  })
    })
    clean()
}

function clean() 
{
    document.getElementById("txtname").value = "";
    document.getElementById("txtusername").value = "";
    document.getElementById("txtpass").value = "";
}

function savestation()
{
    station=document.getElementById("station").value

    const stationRef = firebase.database().ref('Stations/'+ station);

    stationRef.get().then((snapshot) => {
    if (snapshot.exists()) {
       alert("station already exists...")
    } 
    else 
    {
        var obj={
        Station:station,
        }
        firebase.database().ref("Stations/"+ station).set(obj)
        alert("Station added successfully ...")
    }
  }).catch((error) => {
    console.error(error);
    console.log("error")
  });

  clean2()
}

function savetrain()
{
   tname=document.getElementById("tname").value
   from=document.getElementById("from").value
   to=document.getElementById("to").value
   ac=document.getElementById("1AC").value
   ac2=document.getElementById("2AC").value
   ac3=document.getElementById("3AC").value
   sl=document.getElementById("Sleeper").value 
   
   const trainRef = firebase.database().ref('Trains/'+ tname);

    trainRef.get().then((snapshot) => {
    if (snapshot.exists()) {
       alert("train already exists...")
    } 
    else 
    {
        var obj={
        Tname:tname,
        From:from,
        To:to,
        '1AC':ac,
        '2AC':ac2,
        '3AC':ac3,
        Sleeper:sl,
        }
        firebase.database().ref("Trains/"+ tname).set(obj)
        alert("Train added successfully ...")
    }
  }).catch((error) => {
    console.error(error);
    console.log("error")
  });

  clean2()
}

function clean2()
{
    document.getElementById("station").value = "";
    document.getElementById("tnumber").value = "";
    document.getElementById("tname").value = "";
}