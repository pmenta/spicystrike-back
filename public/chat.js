const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

// emit => Emitir alguma informação
// on => Escutando alguma informação

const usernameDiv = document.getElementById('username');
usernameDiv.innerHTML = `Olá ${username} - Você está na sala <strong>${room}</strong>`;

socket.emit(
  'select_room',
  { username, room },
  (messages) => {
    messages.forEach((message) => createMessageDiv(message));
  },
);

document.getElementById('message_input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;
    event.target.value = '';

    // console.log(message)

    const data = {
      room,
      username,
      message,
    };

    socket.emit('message', data);
  }
});

// console.log(username, room)

socket.on('all_lobbys', (data) => {
  console.log(data);
  data.map((lobbyData) => {
    createMessageDiv(lobbyData);
  });
});

socket.on('lobby', (data) => {
  console.log(data);
  createMessageDiv(data);
});

function createMessageDiv(data) {
  const messageDiv = document.getElementById('messages');
  messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong>${data.creator.name}</strong> <span>- ${data.gamemode}</span>
      </label>
    </div>
  `;
}

document.getElementById('logout').addEventListener('click', (event) => {
  window.location.href = 'index.html';
});
