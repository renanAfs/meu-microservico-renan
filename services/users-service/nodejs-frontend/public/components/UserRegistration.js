document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h1>Cadastro de Usuários</h1>
    <form id="userForm">
      <input type="text" id="name" placeholder="Nome" required />
      <input type="email" id="email" placeholder="Email" required />
      <button type="submit">Cadastrar</button>
    </form>
    <ul id="userList"></ul>
  `;

  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userList');

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    const user = await response.json();
    const userItem = document.createElement('li');
    userItem.textContent = `${user.name} (${user.email})`;
    userList.appendChild(userItem);

    userForm.reset();
  });

  async function fetchUsers() {
    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();

    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.textContent = `${user.name} (${user.email})`;
      userList.appendChild(userItem);
    });
  }

  fetchUsers();
});