function addSmiley(smiley) {
    var messageInput = document.getElementById('messageInput');
    messageInput.value += smiley;
    closeModal(); // Закрываем модальное окно после выбора смайлика
}

function openModal() {
    var modal = document.getElementById('smileyModal');
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById('smileyModal');
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById('smileyModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var socket = io('http://192.168.100.53');
var nameInput = document.getElementById('nameInput');
var messageInput = document.getElementById('messageInput');
var sendButton = document.querySelector('.send-button');
var name;

nameInput.addEventListener('input', function() {
    var maxLength = 20;
    if (nameInput.value.length > maxLength) {
        nameInput.value = nameInput.value.slice(0, maxLength);
    }
    if (nameInput.value.trim() !== "") {
        messageInput.disabled = false;
        sendButton.disabled = false;
    } else {
        messageInput.disabled = true;
        sendButton.disabled = true;
    }
});

nameInput.addEventListener('change', function() {
    nameInput.setAttribute('readonly', 'true');
    name = nameInput.value;
    nameInput.style.display = 'none';
});

socket.on('message', function(data){
    var messages = document.getElementById('messages');
    var item = document.createElement('li');
    item.textContent = data.author + ': ' + data.text;
    item.classList.add(data.author === name ? 'sent' : 'received');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

function sendMessage() {
    var message = messageInput.value;
    socket.emit('message', {text: message, author: name});
    messageInput.value = '';
}
