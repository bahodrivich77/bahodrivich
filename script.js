
function loadFiles() {
  const list = document.getElementById("file-list");
  list.innerHTML = `
    <li><a href="fayl1.pdf" target="_blank">📄 Sardorlar Hisoboti</a></li>
    <li><a href="taqdimot.pptx" target="_blank">📊 Taqdimot Fayli</a></li>
  `;
}


const botToken = '7659169317:AAFGgIMuGG4lZRx_yy6gUjcRRdUa9PymWaQ';
const chatId = '5728059391';


document.getElementById('commentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const message = this.message.value.trim();
  const status = document.getElementById('status');
  const commentsList = document.getElementById('commentsList');

  if (!name || !message) {
    status.innerText = '❗ Iltimos, barcha maydonlarni to‘ldiring.';
    return;
  }

  const telegramMessage = `📩 Yangi fikr!\n👤 Ism: ${name}\n💬 Xabar: ${message}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage
    })
  })
    .then(res => {
      if (res.ok) {
        status.innerText = '✅ Izoh yuborildi!';
        this.reset();

        
        const newComment = document.createElement('li');
        newComment.innerHTML = `<strong>${name}</strong>: ${message}
          <button class="delete-btn" style="margin-left:10px;">❌</button>`;
        commentsList.prepend(newComment);

      
        newComment.querySelector('.delete-btn').addEventListener('click', function () {
          newComment.remove(); 
        });

      } else {
        status.innerText = '❌ Xatolik yuz berdi!';
      }
    })
    .catch(() => {
      status.innerText = '🚫 Telegram bilan aloqa yo‘q.';
    });
});

