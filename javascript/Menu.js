class Menu{

  constructor() {
    this.selectedCharacter = 0
    this.selectedDifficulty = 0
    this.characters = ["GREEN","PINK","BLUE"]
    this.difficulties = ["EASY","MEDIUM","HARD"]
  }

  returnToMenu(){
    document.getElementById("main_menu").style.display = "flex";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }

  goToAbout(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "flex";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }
  goToInstructions(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "flex";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }
  goToCredits(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "flex";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }
  goToPlay(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "flex";
    document.getElementById("canvas_div").style.display = "none";
  }

  setDifficulty(dir){
    let list = document.getElementById('dificuldade').getElementsByTagName("li");
    this.selectedDifficulty += dir
      if (this.selectedDifficulty > 2){
        this.selectedDifficulty = 0
      }
      if (this.selectedDifficulty < 0) {
        this.selectedDifficulty = 2
      }
      list[this.selectedDifficulty].scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }

  setCharacter(dir){
    let list = document.getElementById('personagem').getElementsByTagName("li");
    this.selectedCharacter += dir
    if (this.selectedCharacter > 2){
      this.selectedCharacter = 0
    }
    if (this.selectedCharacter < 0){
      this.selectedCharacter = 2
    }
    list[this.selectedCharacter].scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
}

let menu = new Menu()

