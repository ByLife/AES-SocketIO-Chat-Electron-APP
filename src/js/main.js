var text = 'Hello everyone';
var key = '11A1764225B11AA1'; 

console.log('text:', text);
console.log('key:', key);
console.log('key length:', key.length );

const url = new URL(window.location.href);
const username = url.searchParams.get('identifiant');


text = CryptoJS.enc.Utf8.parse(text); 

key = CryptoJS.enc.Utf8.parse(key); 


var encrypted = CryptoJS.AES.encrypt(text, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }); 
encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
console.log('encrypted', encrypted);


var decrypted =  CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Hex.parse(encrypted)}, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }); 


console.log('decrypted', decrypted.toString(CryptoJS.enc.Utf8)); 

const socket = io('http://212.227.26.128:4566');

socket.on('connect', () => {
  socket.emit('login', username);

  // addEventListener to 'enter' key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if(document.getElementById('message').value === '' || document.getElementById('message').value === ' ') return console.log('No message');

      const message = document.getElementById('message').value;
      
      const encrypted = CryptoJS.AES.encrypt(message, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });
      socket.emit('message', encrypted.ciphertext.toString(CryptoJS.enc.Hex));
      document.getElementById('message').value = '';
    }
  });

  socket.on('message', (data) => {
    const message = data.message;
    const username = data.username;

    const messageElement = document.createElement('span');
    messageElement.id = 'nameText';
    messageElement.className = 'name-text';

    const decrypted = CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Hex.parse(message)}, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });

    messageElement.innerHTML = `${username} > ${decrypted.toString(CryptoJS.enc.Utf8)}`;

    document.querySelector('.input-section').appendChild(messageElement);

    const br = document.createElement('br');
    document.querySelector('.input-section').appendChild(br);
  });
});