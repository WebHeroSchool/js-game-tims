(function () {
  class Game {
    constructor () {
      this.lifes = 0;
      this.points = 0;
      this.emojes = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];
      this.lastHole;
      this.speed = 2100;
      this.speedLevel = 1;
      
      this.emojeClickHandler = this.emojeClickHandler.bind(this);
      this.appearingOfEmoje = this.appearingOfEmoje.bind(this);
      this.timerId = setTimeout(this.appearingOfEmoje, this.speed);
  
      // DOM 
      this.speedLevelElement = document.querySelector('.bar__star-text');
      this.holesElement = document.querySelectorAll('.zones__emoji');
      this.lifesElements = document.querySelectorAll('.bar__health-item');
      this.availableLifes = document.querySelectorAll('.bar__health-item--on');
      this.pointsElement = document.querySelector('.bar__points-text');
      this.gameOverModal = document.querySelector('.game-over');
      this.pointsElementFinal = document.querySelector('.game-over__points');
      this.closeGameOver = document.querySelector('.game-over__ok');
    }
   
    increaseChanceOf() {
      for (var i = 0; i < 11; i++) {
        this.emojes.push('🐭');
      }
    }
    setAllLifes() {
      this.lifesElements.forEach((life) => life.classList.add('bar__health-item--on'));
      this.lifes = this.lifesElements.length;
    }
    setRemoveLife() {
      this.availableLifes = document.querySelectorAll('.bar__health-item--on');
      this.lifes = this.availableLifes.length;
      this.availableLifes[this.availableLifes.length - 1].classList.remove('bar__health-item--on');
      this.lifes = this.lifes - 1;
    }
    getRandomHole() {
      const indexHole = Math.floor (Math.random() * this.holesElement.length);
      const hole = this.holesElement[indexHole];
      if (hole === this.lastHole) {
        return this.getRandomHole();
      }
      this.lastHole = hole;
      return hole;
    }
    getRandomEmoje() {
      const indexEmoje = Math.floor (Math.random() * this.emojes.length);
      const emoje = this.emojes[indexEmoje];
      return emoje;
    }
    setStartPoints() {
      this.points = 0
      this.pointsElement.innerHTML = this.points;
    }
    setPlusPoints(num) { 
      this.points = this.points + num;
      this.pointsElement.innerHTML = this.points;
    }
    setAnimationToStar() {
      this.speedLevelElement.parentNode.classList.remove('star-animation');
      this.speedLevelElement.parentNode.classList.add('star-animation');
      setTimeout(()=> this.speedLevelElement.parentNode.classList.remove('star-animation'), 800);
    }
    
  
    
    appearingOfEmoje() {
      let holeCurrent = this.getRandomHole();
      holeCurrent.classList.remove('disappearing');
      holeCurrent.innerHTML = this.getRandomEmoje();
      if (this.lifes > 0) {
        holeCurrent.classList.add('animation');
        this.timerId = setTimeout(this.appearingOfEmoje, this.speed);
      } else {
        this.gameOver();
      }
      holeCurrent.addEventListener('click', this.emojeClickHandler);
      setTimeout(()=> {
        holeCurrent.classList.remove('animation');
        holeCurrent.removeEventListener('click', this.emojeClickHandler, false)
      }, this.speed);
    }
    emojeClickHandler(evt) {
      evt.target.classList.add('disappearing');
      if (evt.target.innerHTML === '🐭') {
        this.setPlusPoints(10);
        if (this.points % 50 === 0) {
          this.setMoreSpeed(200);
        }
      } else {
          this.setRemoveLife();
      }
      console.log('Я поймал мышь');
    }
    
    startGame() {
      this.increaseChanceOf();
      this.setAllLifes(); 
      this.setStartPoints();
    }

    setNewLevel() {
      this.speedLevel += 1;
      this.speedLevelElement.innerHTML = "";
      setTimeout(()=> this.speedLevelElement.innerHTML = this.speedLevel, 600);
      this.setAnimationToStar()
    }
    
    setMoreSpeed(num) {
      this.speed = this.speed - num;
      this.setNewLevel();
    }

    gameOver() {
      this.pointsElementFinal.innerHTML = this.points;
      this.gameOverModal.classList.add('modal__window--show');
      this.closeGameOver.addEventListener('click', () => {
        this.gameOverModal.classList.remove('modal__window--show');
        this.setStartPoints();
        this.speedLevelElement.innerHTML = "1";
        buttonStart.addEventListener('click', onStartButtonClick);
      })
    }

  }
  
  // открытие, закрытие правил игры
  let modalWindow = document.querySelector('.rules');
  let modalOpenButton = document.querySelector('.menu__help');
  let modalCloseButton = modalWindow.querySelector('.rules__ok');
  let buttonStart = document.querySelector('.menu__begin');
  
  modalOpenButton.addEventListener('click', ()=> {
    modalWindow.classList.add('modal__window--show');
  })
  
  modalCloseButton.addEventListener('click', ()=> {
    modalWindow.classList.remove('modal__window--show');
  })
  
  function onStartButtonClick () {
    buttonStart.removeEventListener('click', onStartButtonClick, false);
    let game = new Game;
    game.startGame();
  }
  // начало игры
  buttonStart.addEventListener('click', onStartButtonClick);

  console.log(increaseChanceOf());
}());
