const moneyInput = document.getElementById('money');
let money = Number(moneyInput.value);
const WinSound = new Audio('audio/winsound.mp3');
const LoseSound = new Audio('audio/losesuond.mp3');
const main = document.querySelector('.main');

function saveMoney() {
  moneyInput.value = money;
  localStorage.setItem('money', money);
}

const savedMoney = localStorage.getItem('money');
if (savedMoney !== null) {
  moneyInput.value = savedMoney;
}

const check_money = function () {
  if (money <= 0) {
    alert('Ты, конечно, лох, но играй дальше!');
    localStorage.removeItem('money');
    money = 1000;
    saveMoney();
    return true;
  }
  return false;
};

function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function bet_x(max) {
  check_money();
  if (check_money()) {
    return;
  }
  const bet = Number(document.getElementById('bet').value);
  const koef = Number(document.getElementById('koef').value);
  const result = random(1, max);
  if (bet > money) {
    alert('Ебанулся? У тебя недостаточно денег!');
    return;
  }

  if (koef > max || koef < 1 || isNaN(koef) || isNaN(bet)) {
    alert('Ебанулся?');
    return;
  }
  if (koef == result) {
    money = money + (bet * koef) - bet;
    WinSound.play();
    main.style.backgroundImage = 'url("image/wingif.gif")';
    main.style.backgroundSize = 'cover';
    setTimeout(() => {
      main.style.backgroundImage = 'none';
    }, 7000);
    document.getElementById('win').style.opacity = '1';
    document.getElementById('win').style.width = '100%';
    document.getElementById('win_input').style.opacity = '1';
    document.getElementById('win_input').style.width = '100%';
    document.getElementById('win_input').value = bet * koef;
    document.getElementById('lose').style.opacity = '0';
    document.getElementById('lose').style.width = '0%';
  } else {
    LoseSound.play();
    document.getElementById('win').style.opacity = '0';
    document.getElementById('win').style.width = '0%';
    document.getElementById('win_input').style.opacity = '0';
    document.getElementById('win_input').style.width = '0%';
    money = money - bet;
    document.getElementById('lose').style.opacity = '1';
    document.getElementById('lose').style.width = '100%';
  }
  saveMoney();
}

document.getElementById('factor-1').onclick = function () {
  document.getElementById('factor-5').style.display = 'grid';
  setTimeout(() => {
    document.getElementById('factor-5').style.opacity = '1';
  }, 5);
  document.getElementById('x-2').style.display = 'block';
  document.getElementById('x-3').style.display = 'none';
  document.getElementById('x-4').style.display = 'none';
  document.getElementById('x-5').style.display = 'none';
  document.getElementById('sub1').onclick = function () { bet_x(2); };
};

document.getElementById('factor-2').onclick = function () {
  document.getElementById('factor-5').style.display = 'grid';
  setTimeout(() => {
    document.getElementById('factor-5').style.opacity = '1';
  }, 5);
  document.getElementById('x-2').style.display = 'none';
  document.getElementById('x-3').style.display = 'block';
  document.getElementById('x-4').style.display = 'none';
  document.getElementById('x-5').style.display = 'none';
  document.getElementById('sub1').onclick = function () { bet_x(3); };
};

document.getElementById('factor-3').onclick = function () {
  document.getElementById('factor-5').style.display = 'grid';
  setTimeout(() => {
    document.getElementById('factor-5').style.opacity = '1';
  }, 5);
  document.getElementById('x-2').style.display = 'none';
  document.getElementById('x-3').style.display = 'none';
  document.getElementById('x-4').style.display = 'block';
  document.getElementById('x-5').style.display = 'none';
  document.getElementById('sub1').onclick = function () { bet_x(4); };
};

document.getElementById('factor-4').onclick = function () {
  document.getElementById('factor-5').style.display = 'grid';
  setTimeout(() => {
    document.getElementById('factor-5').style.opacity = '1';
  }, 5);
  document.getElementById('x-2').style.display = 'none';
  document.getElementById('x-3').style.display = 'none';
  document.getElementById('x-4').style.display = 'none';
  document.getElementById('x-5').style.display = 'block';
  document.getElementById('sub1').onclick = function () { bet_x(5); };
};
//крутки
const reels = [
    ["🍒", "🍋", "🍊", "🍇", "🍉", "🍎", "🍓", "🍍", "🍑", "🍌", "🍕", "🍔", "🍟", "🍩", "🍫", "🍭", "🍦", "🍰", "🥤", "🍪"],
    ["🍒", "🍋", "🍊", "🍇", "🍉", "🍎", "🍓", "🍍", "🍑", "🍌", "🍕", "🍔", "🍟", "🍩", "🍫", "🍭", "🍦", "🍰", "🥤", "🍪"],
    ["🍒", "🍋", "🍊", "🍇", "🍉", "🍎", "🍓", "🍍", "🍑", "🍌", "🍕", "🍔", "🍟", "🍩", "🍫", "🍭", "🍦", "🍰", "🥤", "🍪"]
];

const reelElements = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];
const spinButton = document.getElementById("spin-button");
const resultElement = document.getElementById("result");

// Функция для запуска вращения всех барабанов
function startSpinning() {
    reelElements.forEach((reelElement) => {
        reelElement.classList.add("spinning"); // Добавляем класс с бесконечной анимацией
    });
}

// Функция для остановки одного барабана
function stopReel(reelElement, symbols, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            const offset = -randomIndex * 220; // Смещение для остановки
            reelElement.style.transform = `translateY(${offset}px)`;
            reelElement.classList.remove("spinning"); // Останавливаем анимацию
            resolve(symbols[randomIndex]);
        }, delay);
    });
}

// Функция для поочередной остановки барабанов
async function spinAllReels() {
    const results = [];

    // Запускаем вращение всех барабанов
    startSpinning();

    // Останавливаем первый барабан через 1.5 секунды
    results.push(await stopReel(reelElements[0], reels[0], 1500));

    // Останавливаем второй барабан через еще 1.5 секунды (всего 3 секунды)
    results.push(await stopReel(reelElements[1], reels[1], 3000));

    // Останавливаем третий барабан через еще 1.5 секунды (всего 4.5 секунды)
    results.push(await stopReel(reelElements[2], reels[2], 4500));

    return results;
}



function checkResults(results) {
  saveMoney();
  check_money();
    if (results[0] === results[1] && results[1] === results[2]) {
      resultElement.textContent = "Победа! Все три символа совпали!";
      money += 1000000;
      main.style.backgroundImage = 'url("image/wingif.gif")';
      main.style.backgroundSize = 'cover';
      setTimeout(() => {
        main.style.backgroundImage = 'none';
      }, 7000);
    WinSound.play();
    } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
      resultElement.textContent = "У вас есть совпадение!";
      money += 5000;
      WinSound.play();
      main.style.backgroundImage = 'url("image/wingif.gif")';
      main.style.backgroundSize = 'cover';
      document.getElementById('fire').style.display = 'grid';
      setTimeout(() => {
        document.getElementById('fire').style.opacity = '1';
      }, 500)
      
      setTimeout(() => {
        main.style.backgroundImage = 'none';
        document.getElementById('fire').style.opacity = '0';
        document.getElementById('fire').style.display = 'none';
      }, 7000);
    } else {
      resultElement.textContent = "Попробуйте еще раз!";
      money -= 30;
      document.getElementById('lose-left').style.display = 'grid';
      document.getElementById('lose-right').style.display = 'grid';
      setTimeout(() => {
        document.getElementById('lose-left').style.display = 'none';
        document.getElementById('lose-right').style.display = 'none';
      }, 7000);
      check_money();
  }
  saveMoney();
  check_money();
}
// Обработчик клика на кнопку "Крутить"
spinButton.addEventListener("click", async () => {
    spinButton.disabled = true; // Блокируем кнопку на время вращения
    try {
        const results = await spinAllReels(); // Вращаем барабаны
        checkResults(results); // Проверяем результаты
    } catch (error) {
        console.error("Ошибка:", error);
    } finally {
        spinButton.disabled = false; // Разблокируем кнопку
    }
});
//крутки
