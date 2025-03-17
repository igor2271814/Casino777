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

document.getElementById('shell_but').onclick = function (arr) {
  let n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap /= 2) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
};

function emojiCode() {
  // Очищаем предыдущие значения
  document.querySelectorAll(".inner").forEach((el) => el.remove());

  let emojiList01 = [];
  let emojiList02 = [];
  let emojiList03 = [];

  const emojiValue = [
    "1F95D", "1F34B", "1F350", "1F353", "1F34A", "1F352",
    "1F348", "1F347", "1F349", "1F34F", "1F34E", "1F34D",
    "1F345", "1F951", "1F34C", "1F351", "1F346", "1F955",
    "1F344", "1F952",
  ];

  function generateEmoji(emojiList) {
    const emojiSingle = emojiValue[Math.floor(Math.random() * emojiValue.length)];
    emojiList.push(`&#x${emojiSingle};`);
  }

  const n = 11;

  for (let i = 0; i < n; i++) {
    generateEmoji(emojiList01);
    generateEmoji(emojiList02);
    generateEmoji(emojiList03);
  }

  // Получаем финальные эмодзи
  const finalEmoji01 = emojiList01[emojiList01.length - 1];
  const finalEmoji02 = emojiList02[emojiList02.length - 1];
  const finalEmoji03 = emojiList03[emojiList03.length - 1];

  // Проверяем выигрыш
  if (finalEmoji01 === finalEmoji02 && finalEmoji01 === finalEmoji03) {
    alert('Победа, победа - время обеда!');
    money += 1000000;
    main.style.backgroundImage = 'url("image/wingif.gif")';
    main.style.backgroundSize = 'cover';
    setTimeout(() => {
      main.style.backgroundImage = 'none';
    }, 7000);
    WinSound.play();
  } else if (finalEmoji01 === finalEmoji02 || finalEmoji01 === finalEmoji03 || finalEmoji02 === finalEmoji03) {
    money += 50000;
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
  }
  else if (finalEmoji01 === "1F34B" || finalEmoji01 === "1F952" || finalEmoji01 === "1F348" || finalEmoji01 === "1F352") {
    document.getElementById('fire').style.opacity = "1";
  } else {
    money -= 30;
    document.getElementById('lose-left').style.display = 'grid';
    document.getElementById('lose-right').style.display = 'grid';
    setTimeout(() => {
      document.getElementById('lose-left').style.display = 'none';
      document.getElementById('lose-right').style.display = 'none';
    }, 7000);
    check_money();
  }

  // Отображаем начальные и финальные эмодзи
  document.querySelector(".first").innerHTML = `
    <div class="inner start">${emojiList01[0]}</div>
    ${emojiList01.slice(1, -1).map(emoji => `<div class="inner">${emoji}</div>`).join("")}
    <div class="inner final">${finalEmoji01}</div>
  `;
  document.querySelector(".second").innerHTML = `
    <div class="inner start">${emojiList02[0]}</div>
    ${emojiList02.slice(1, -1).map(emoji => `<div class="inner">${emoji}</div>`).join("")}
    <div class="inner final">${finalEmoji02}</div>
  `;
  document.querySelector(".third").innerHTML = `
    <div class="inner start">${emojiList03[0]}</div>
    ${emojiList03.slice(1, -1).map(emoji => `<div class="inner">${emoji}</div>`).join("")}
    <div class="inner final">${finalEmoji03}</div>
  `;

  // Убираем ненужные элементы после прокрутки
  setTimeout(() => {
    document.querySelectorAll(".reel .inner:not(.final)").forEach(el => {
      el.style.display = 'none';
    });
  }, 1750);
}
document.addEventListener("DOMContentLoaded", () => {
    const reel = document.querySelector(".wrapper-3 .reel");

    // Убедитесь, что emojiCode вызывается, чтобы создать элементы
    emojiCode();

    // Теперь, когда элементы созданы, можно получить доступ к finalElement
    const finalElement = document.querySelector(".inner.final");

    if (finalElement) {
        reel.addEventListener("animationend", () => {
            // После окончания анимации сместим финальный элемент внутрь
            finalElement.style.transform = "translateY(0)";
        });
    } else {
        console.error("Финальный элемент не найден в DOM.");
    }
});
document.addEventListener("DOMContentLoaded", emojiCode);

const btnReload = document.querySelector(".controls");

btnReload.addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelectorAll(".reel").forEach((el) => el.remove());

  document.querySelector(".container").innerHTML = `
    <div class="reel first"></div>
    <div class="reel second"></div>
    <div class="reel third"></div>
  `;

  emojiCode();
  saveMoney();
});