const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a || !b) {
    return res.status(400).send('Please provide both a and b parameters');
  }

  const sum = `The sum of ${a} and ${b} is ${Number(a) + Number(b)}`;

  res.send(sum);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = Number(req.query.shift);

  if (!text || !shift) {
    return res.status(400).send('Please provide text and the shift value');
  }

  let cipher = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase()) {
      cipher += String.fromCharCode((text[i].charCodeAt(0) - 65 + shift) % 26 + 65);
    } else {
      cipher += String.fromCharCode((text[i].charCodeAt(0) - 97 + shift) % 26 + 97);
    }
  }

  console.log(cipher);
  res.send(cipher);
});

app.get('/lotto', (req, res) => {
  const numbers = req.query.num.map(num => Number(num));
  console.log(numbers);

  if (numbers.find(number => number < 1 || number > 20) ||
      numbers.length !== new Set(numbers).size) {
    res.send("Supply 6 distinct numbers between 1 and 20");
  }

  let randomNums = [];
  for (let i = 0; randomNums.length < 6; i++) {
    randomNums.push(Math.floor(Math.random() * 20) + 1);
    randomNums = Array.from(new Set(randomNums));
  }
  console.log(randomNums);

  let matches = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[i] === randomNums[j]) {
        matches++;
      }
    }
  }

  if (matches < 4) {
    res.send('Sorry, you lose.');
  } 
  else if (matches < 5) {
    res.send('Congratulations, you win a free ticket!');
  }
  else if (matches < 6) {
    res.send('Congratulations! Yo win $100!');
  }
  else {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});