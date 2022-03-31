const hbs = require('hbs');

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
  });
  
  hbs.registerHelper('capitalizar', (text) => {
    let words = text.split(' ');
    words.forEach((word, i) => {
      word[i] = word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()
    });
    return words.join(' ');
  });