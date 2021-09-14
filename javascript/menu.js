function myFunctionG() {
  if(document.getElementById("btRoxo").style.display === "none"){
    document.getElementById("btRoxo").style.display = "block";
    document.getElementById("btVerm").style.display = "block";
    document.getElementById("btVerd").style.display = "block";
    document.getElementById("panda").style.display = "none";
    document.getElementById("levelLabel").style.display = "none";
    document.getElementById("colorLabel").style.display = "none";
    document.getElementById("levelSelect").style.display = "none";
    document.getElementById("colorSelect").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("back").style.display = "none";
    }else{ 
  document.getElementById("btRoxo").style.display = "none";
  document.getElementById("btVerm").style.display = "none";
  document.getElementById("btVerd").style.display = "none";
  document.getElementById("panda").style.display = "block";
  document.getElementById("levelLabel").style.display = "block";
  document.getElementById("colorLabel").style.display = "block";
  document.getElementById("levelSelect").style.display = "block";
  document.getElementById("colorSelect").style.display = "block";
    document.getElementById("startButton").style.display = "block";
  document.getElementById("back").style.display = "block";
}}

function myFunctionP() {
  if(document.getElementById("btVerd").style.display === "none"){
    document.getElementById("btVerm").style.display = "block";
    document.getElementById("btVerd").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    }else{ 
  document.getElementById("btVerm").style.display = "none";
  document.getElementById("btVerd").style.display = "none";
  document.getElementById("sobre").style.display = "block";
}}

function myFunctionR() {
  if(document.getElementById("btRoxo").style.display === "none"){
    document.getElementById("btRoxo").style.display = "block";
    document.getElementById("btVerd").style.display = "block";
    document.getElementById("manual").style.display = "none";
    }else{ 
  document.getElementById("btRoxo").style.display = "none";
  document.getElementById("btVerd").style.display = "none";
  document.getElementById("manual").style.display = "block";
}}

function pandaColor(){
  let color = document.getElementById("colorSelect").value
  console.log(color)
  let pandaImage = document.getElementById("panda")
  console.log(pandaImage)
  switch (color){
    case "GREEN":
      pandaImage.src = "./image/panda.png"
          break
    case "BLUE":
      pandaImage.src = "./image/pandaBlue.png"
      break
    case "RED":
      pandaImage.src = "./image/pandaRed.png"
      break

  }

}