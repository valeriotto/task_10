let minValue = -999;
let maxValue = 999;
let answerNumber = 0;
let orderNumber = 1;
let gameRun = true;

let orderNumberField; // текст количество попыток/вопросов
let answerField; // поле вывода
let orderSelect; // количество попыток/вопросов
let textSelect; // рандомный текст

/**************************************/
//!функция для для замены цифры на текст
/**************************************/

function answerFieldToText(numberToText) { // создадим функцию для новой переменной по которой будет определяться в каком виде выводиться число
   let numberToTextVar = ''; // переменная для изменения числа в строку
   let numberToTextOld = numberToText; // переменная чтобы сохранить число числом

   if (numberToText < 0) { //для отрицательного числа
      numberToTextVar = 'минус ';
   }

   // далее сравниваем только новую переменную numberToTextMod
   numberToTextMod = Math.abs(numberToText); // Math.abs возвращает абсолютное значение числа

   //! ВАЖНО идти попорядку формирования от большего разряда к меньшему (от сотен к еденицам) для правильной последовательной записи
   //! ВАЖНО все числа будут переводиться в строки, а в конце функции будет проверка на длинну символов
   /*заменяем сотни*/
   if (numberToTextMod >= 100) {
      switch (Math.trunc(numberToTextMod / 100)) { // Math.trunc возвращает целую часть числа путём удаления всех дробных знаков
         case 1: numberToTextVar += 'сто '; break;
         case 2: numberToTextVar += 'двести '; break;
         case 3: numberToTextVar += 'триста '; break;
         case 4: numberToTextVar += 'четыреста '; break;
         case 5: numberToTextVar += 'пятьсот '; break;
         case 6: numberToTextVar += 'шестьсот '; break;
         case 7: numberToTextVar += 'семьсот '; break;
         case 8: numberToTextVar += 'восемьсот '; break;
         case 9: numberToTextVar += 'девятьсот '; break;
      }
   }

   /*заменяем десятки*/
   if ((numberToTextMod / 10 > 10) || numberToTextMod <= 100) { //? только при добавлении оператора ИЛИ корректно отобразятся числа от 20 до 99
      switch (Math.trunc((numberToTextMod % 100) / 10)) {
         case 1: numberToTextVar += 'десять '; break; // дублируем десятку например для чисел 110 210 и т.п.
         case 2: numberToTextVar += 'двадцать '; break;
         case 3: numberToTextVar += 'тридцать '; break;
         case 4: numberToTextVar += 'сорок '; break;
         case 5: numberToTextVar += 'пятьдесят '; break;
         case 6: numberToTextVar += 'шестьдесят '; break;
         case 7: numberToTextVar += 'семьдесят '; break;
         case 8: numberToTextVar += 'восемьдесят '; break;
         case 9: numberToTextVar += 'девяносто '; break;
      }
      /*заменяем единицы в десятках*/
      if ((numberToTextMod % 10 < 10) && (Math.trunc((numberToTextMod % 100) / 10) > 1)) {
         switch (numberToTextMod % 10) {
            case 1: numberToTextVar += 'один'; break;
            case 2: numberToTextVar += 'два'; break;
            case 3: numberToTextVar += 'три'; break;
            case 4: numberToTextVar += 'четыре '; break;
            case 5: numberToTextVar += 'пять'; break;
            case 6: numberToTextVar += 'шесть'; break;
            case 7: numberToTextVar += 'семь'; break;
            case 8: numberToTextVar += 'восемь'; break;
            case 9: numberToTextVar += 'девять'; break;
         }
      }
   }

   /*заменяем простые числа*/
   if (numberToTextMod <= 20) {
      switch (numberToTextMod) {
         case 0: numberToTextVar += '0'; break; // по условиям задания 0 записывается как 0 и никак больше
         case 1: numberToTextVar += 'один'; break;
         case 2: numberToTextVar += 'два'; break;
         case 3: numberToTextVar += 'три'; break;
         case 4: numberToTextVar += 'четыре'; break;
         case 5: numberToTextVar += 'пять'; break;
         case 6: numberToTextVar += 'шесть'; break;
         case 7: numberToTextVar += 'семь'; break;
         case 8: numberToTextVar += 'восемь'; break;
         case 9: numberToTextVar += 'девять'; break;
         case 10: numberToTextVar += 'десять'; break;
         case 11: numberToTextVar += 'одиннадцать'; break;
         case 12: numberToTextVar += 'двеннадцать'; break;
         case 13: numberToTextVar += 'тринадцать'; break;
         case 14: numberToTextVar += 'четырнадцать'; break;
         case 15: numberToTextVar += 'пятнадцать'; break;
         case 16: numberToTextVar += 'шестнадцать'; break;
         case 17: numberToTextVar += 'семнадцать'; break;
         case 18: numberToTextVar += 'восемнадцать'; break;
         case 19: numberToTextVar += 'девятнадцать'; break;
         case 20: numberToTextVar += 'двадцать'; break;
      }
   }

   numberToTextMod = String(numberToTextVar); //для проверки на длинну символом

   if (numberToTextMod.length < 20) { // условие проверки по 20 символам
      return numberToTextVar;
   } else {
      return numberToTextOld; // иначе возвращаем старое значение
   }
}

/**************************************/
//!старт игры
/**************************************/

document.getElementById('btnGameStart').addEventListener('click', function () { // функция по клику
   minValue = parseInt(inputWindowMin.value);
   maxValue = parseInt(inputWindowMax.value);
   if (isNaN(minValue) || minValue < -999) { minValue = -999 }; // условия при неправильном вводе
   if (isNaN(maxValue) || maxValue > 999) { maxValue = 999 };
   document.getElementById("inputWindowMax").hidden = true;// скрываем ненужные поля
   document.getElementById("inputWindowMin").hidden = true;// скрываем ненужные поля
   document.getElementById("btnGameStart").hidden = true;// скрываем ненужные поля
   document.getElementById("answerText").hidden = true;// скрываем ненужные поля
   orderNumber = 1;
   gameRun = true;
   document.getElementById("btnRetry").innerText = 'Заново';
   answerNumber = Math.floor((minValue + maxValue) / 2); // Math.floor() - округление вниз. Округляет аргумент до ближайшего меньшего целого
   orderNumberField = document.getElementById('orderNumberField');
   orderNumberField.innerText = 'Вопрос №1';
   answerField = document.getElementById('answerField');
   answerField.innerText = `Вы загадали число ${answerFieldToText(answerNumber)}?`;// вывод через функцию либо числа либо строки
   /*проверка через консоль*/
   console.log(answerNumber);
})

/**************************************/
//!кнопка повторить
/**************************************/

document.getElementById('btnRetry').addEventListener('click', function () {
   orderNumberField = document.getElementById('orderNumberField');
   answerField = document.getElementById('answerField');
   answerField.innerText = 'Ещё попытка:))';
   document.getElementById("inputWindowMin").hidden = false;// открываем поля
   document.getElementById("inputWindowMax").hidden = false;
   document.getElementById("btnGameStart").hidden = false;
   document.getElementById("answerText").hidden = false;
   inputWindowMin.value = '';
   inputWindowMax.value = '';
   orderNumberField.innerText = '';
})

/**************************************/
//!кнопка больше
/**************************************/

document.getElementById('btnOver').addEventListener('click', function () {
   if (gameRun) {
      if (minValue === maxValue) {
         const phraseRandom = Math.round(Math.random());
         const answerPhrase = (phraseRandom === 1) ?
            `Вы загадали неправильное число!` :
            `Я сдаюсь..`;
         answerField.innerText = answerPhrase;
         gameRun = false;
      } else {
         minValue = answerNumber + 1;
         answerNumber = Math.floor((minValue + maxValue) / 2);
         orderNumber++;
         orderNumberField.innerText = 'Вопрос № ' + orderNumber;
         answerField.innerText = `Вы загадали число ${answerNumber}?`;
         orderSelect = Math.round(Math.random() * 2);// чтобы получить случайное число от 0 до 3
         switch (orderSelect) {
            case 0:
               textSelect = 'Да это же число';
               break;
            case 1:
               textSelect = 'Я почти уверен, что это число';
               break;
            case 2:
               textSelect = 'Сознавайся, это число';
               break;
         }
         answerField.innerText = `${textSelect} ${answerFieldToText(answerNumber)}?`;
      }
   }
   /************************/
   /*проверка через консоль*/
   /************************/
   console.log(answerNumber);
})

/**************************************/
//!кнопка меньше
/**************************************/

document.getElementById('btnLess').addEventListener('click', function () {
   if (gameRun) {
      if (minValue === maxValue) {
         const phraseRandom = Math.round(Math.random());
         const answerPhrase = (phraseRandom === 1) ?
            `Вы загадали неправильное число!` :
            `Я сдаюсь..`;
         answerField.innerText = answerPhrase;
         gameRun = false;
      } else {
         maxValue = answerNumber - 1;
         answerNumber = Math.floor((minValue + maxValue) / 2);
         orderNumber++;
         orderNumberField.innerText = 'Вопрос № ' + orderNumber;
         orderSelect = Math.round(Math.random() * 2); // чтобы получить случайное число от 0 до 3
         switch (orderSelect) {
            case 0:
               textSelect = 'Да это же число';
               break;
            case 1:
               textSelect = 'Я почти уверен, что это число';
               break;
            case 2:
               textSelect = 'Сознавайся, это число';
               break;
         }
         answerField.innerText = `${textSelect} ${answerFieldToText(answerNumber)}?`;
      }
   }
   /*проверка через консоль*/
   console.log(answerNumber);
})

/**************************************/
//!кнопка верно
/**************************************/

document.getElementById('btnEqual').addEventListener('click', function () {
   if (gameRun) {
      orderSelect = Math.round(Math.random() * 2);
      switch (orderSelect) {
         case 0:
            textSelect = 'Я всегда угадываю';
            break;
         case 1:
            textSelect = 'Это было очень просто, повторим?';
            break;
         case 2:
            textSelect = 'Да я знал, что это твой возраст:)';
            break;
      }
      answerField.innerText = textSelect;
      btnRetry.innerText = 'Ещё попытка)'
      gameRun = false;
   }
})

