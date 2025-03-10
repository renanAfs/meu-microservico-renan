document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h1 class="text-center">Cadastro de Usuários</h1>
    <form id="userForm" class="mb-4">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" class="form-control" placeholder="Nome" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" placeholder="Email" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block"><i class="fas fa-user-plus"></i> Cadastrar</button>
    </form>
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <h2 class="text-center">Lista de Usuários</h2>
    <ul id="userList" class="list-group"></ul>
  `;

  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userList');
  const spinner = document.querySelector('.spinner-border');

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    spinner.style.display = 'block';

    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    const user = await response.json();
    const userItem = document.createElement('li');
    userItem.className = 'list-group-item';
    userItem.textContent = `${user.name} (${user.email})`;
    userList.appendChild(userItem);

    spinner.style.display = 'none';
    userForm.reset();
  });

  async function fetchUsers() {
    spinner.style.display = 'block';

    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();

    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.className = 'list-group-item';
      userItem.textContent = `${user.name} (${user.email})`;
      userList.appendChild(userItem);
    });

    spinner.style.display = 'none';
  }

  fetchUsers();
});