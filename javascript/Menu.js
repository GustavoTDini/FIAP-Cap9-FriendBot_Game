class Menu{

  static characters = [{imagem: '/image/isaac.png', game: "GREEN"},
                {imagem: '/image/lara.png', game: "PINK"},
                {imagem: '/image/tom.png', game: "BLUE"}]

  static difficulties = [{imagem: '/image/facil.png', game: "EASY"},
                  {imagem: '/image/medio.png', game: "MEDIUM"},
                  {imagem: '/image/dificil.png', game: "HARD"}]

  static selectedCharacter = 0
  static selectedDifficulty = 1

  static returnToMenu(){
    document.getElementById("main_menu").style.display = "flex";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }

  static goToAbout(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "flex";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }
  static goToInstructions(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "flex";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }
  static goToCredits(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "flex";
    document.getElementById("jogar").style.display = "none";
    document.getElementById("canvas_div").style.display = "none";
  }
  static goToPlay(){
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("jogar").style.display = "flex";
    document.getElementById("canvas_div").style.display = "none";
  }

  static setDifficulty(dir){
    Menu.selectedDifficulty += dir
      if (Menu.selectedDifficulty > 3){
        Menu.selectedDifficulty = 0
      }
      if (Menu.selectedDifficulty < 0){
        Menu.selectedDifficulty = 2
    }
    document.getElementById("dificuldade").src = Menu.difficulties[Menu.selectedDifficulty].imagem;
  }

  static setCharacter(dir){
    Menu.selectedCharacter += dir
    if (Menu.selectedCharacter > 3){
      Menu.selectedCharacter = 0
    }
    if (Menu.selectedCharacter < 0){
      Menu.selectedCharacter = 2
    }
    document.getElementById("personagem").src = Menu.characters[Menu.selectedCharacter].imagem;
  }


}


