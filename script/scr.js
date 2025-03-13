const moneyInput = document.getElementById('money');
// Преобразуем значение в число
let money = Number(moneyInput.value) || 1000;
const WinSound = new Audio('audio/winsound.mp3');
const LoseSound = new Audio('audio/losesuond.mp3');
const wright_arr = document.getElementById('arr'); //пока нигде не используется
const main = document.querySelector('.main');
function saveMoney() { 
  // Обновляем поле ввода и сохраняем значение в localStorage
  moneyInput.value = money;
  localStorage.setItem('money', money);
}
// Восстанавливаем значение из localStorage
const savedMoney = localStorage.getItem('money');
if (savedMoney !== null) {
  moneyInput.value = savedMoney; // Обновляем поле ввода
}
const check_money = function () {
    if (money <= 0) {
        alert('Ты, конечно, лох, но играй дальше!');
        localStorage.removeItem('money'); // Удаляем сохраненное значение в localStorage
        money = 1000; // Обновляем переменную money
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
  document.getElementById('factor-5').style.opacity = '1';
    document.getElementById('sub1').onclick = function () { bet_x(2);}; 
};
document.getElementById('factor-2').onclick = function () {
  document.getElementById('factor-5').style.opacity = '1';
    document.getElementById('sub1').onclick = function () { bet_x(3);}; 
};
document.getElementById('factor-3').onclick = function () {
  document.getElementById('factor-5').style.opacity = '1';
    document.getElementById('sub1').onclick = function () { bet_x(4);}; 
};
document.getElementById('factor-4').onclick = function () {
  document.getElementById('factor-5').style.opacity = '1';
    document.getElementById('sub1').onclick = function () { bet_x(5);}; 
};


//
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
}

// крутки
function emojiCode() {
 // Удаляем все элементы с классом .inner
 document.querySelectorAll(".inner").forEach((el) => el.remove());

 // Создаём пустые массивы для хранения эмодзи
 let emojiList01 = [];
 let emojiList02 = [];
 let emojiList03 = [];

 // Массив с кодами эмодзи в формате Unicode
 const emojiValue = [
   "1F95D",
   "1F34B",
   "1F350",
   "1F353",
   "1F34A",
   "1F352",
   "1F348",
   "1F347",
   "1F349",
   "1F34F",
   "1F34E",
   "1F34D",
   "1F345",
   "1F951",
   "1F34C",
   "1F351",
   "1F346",
   "1F955",
   "1F344",
   "1F952",
 ];

 // Функция для генерации случайного эмодзи и добавления его в массив
 function generateEmoji(emojiList) {
   // Выбираем случайный код эмодзи из массива emojiValue
   const emojiSingle =
     emojiValue[Math.floor(Math.random() * emojiValue.length)];

   // Добавляем эмодзи в массив, используя HTML-код &#x...; для отображения Unicode-символов
   emojiList.push(`&#x${emojiSingle};`);
 }

 // Количество эмодзи, которые нужно сгенерировать для каждого списка
 const n = 11;

 // Заполняем каждый массив 11 случайными эмодзи
 for (let i = 0; i < n; i++) {
   generateEmoji(emojiList01);
   generateEmoji(emojiList02);
   generateEmoji(emojiList03);
 }
 // Обновляем содержимое элементов с классами .first, .second и .third,
  // Задаем финальные эмодзи
  const finalEmoji01 = emojiList01[emojiList01.length - 1];
  const finalEmoji02 = emojiList02[emojiList02.length - 1];
  const finalEmoji03 = emojiList03[emojiList03.length - 1];

  if (finalEmoji01 == finalEmoji02 && finalEmoji01 == finalEmoji03 && finalEmoji01 !== null) {
    alert('Победа, победа - время обеда!');
    money += 1000000;
    WinSound.play();
  }
  else { 
    console.log('Лох');
    money -= 30;
    check_money();
  }
  // Обновляем содержимое элементов с классами .first, .second и .third
  document.querySelector(".first").innerHTML = `
    <div class="inner">${emojiList01.join("")}</div>
    <div class="inner">${finalEmoji01}</div>
  `;
  document.querySelector(".second").innerHTML = `
    <div class="inner">${emojiList02.join("")}</div>
    <div class="inner">${finalEmoji02}</div>
  `;
  document.querySelector(".third").innerHTML = `
    <div class="inner">${emojiList03.join("")}</div>
    <div class="inner">${finalEmoji03}</div>
  `;
}

// Запуск функции emojiCode после полной загрузки документа
document.addEventListener("DOMContentLoaded", emojiCode);

// Получаем кнопку с классом .controls для управления процессом
const btnReload = document.querySelector(".controls");

// Добавляем обработчик события клика на кнопку
btnReload.addEventListener("click", function (e) {
 // Предотвращаем стандартное поведение кнопки
 e.preventDefault();

 // Удаляем все элементы с классом .reel, если есть
 document.querySelectorAll(".reel").forEach((el) => el.remove());

 // Добавляем в .container три новых div-элемента с классами .reel (first, second, third),
 // которые затем будут заполнены эмодзи в emojiCode()
 document.querySelector(".container").innerHTML = `
   <div class="reel first"></div>
   <div class="reel second"></div>
   <div class="reel third"></div>
 `;

 // Повторно запускаем emojiCode для обновления эмодзи
  emojiCode();
  saveMoney();
});
// крутки