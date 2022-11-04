const btnGet = document.getElementById('btnGet');
const btnPost = document.getElementById('btnPost');
const btnPut = document.getElementById('btnPut');
const btnSendChanges = document.getElementById('btnSendChanges');
const btnDelete = document.getElementById('btnDelete');
const inputGetId = document.getElementById('inputGetId');
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');
const inputPutNombre = document.getElementById('inputPutNombre');
const inputPutApellido = document.getElementById('inputPutApellido');
const inputPutId = document.getElementById('inputPutId');
const inputDelete = document.getElementById('inputDelete');
const resultContainer = document.getElementById('results');
const alertMessage = document.getElementById('alert-error');

inputPostNombre.addEventListener('input', validationNew);
inputPostApellido.addEventListener('input', validationNew);
inputPutNombre.addEventListener('input', validationMod);
inputPutApellido.addEventListener('input', validationMod);

inputPutId.addEventListener('input', () => {
  if (!inputPutId.value) return (btnPut.disabled = true);
  btnPut.disabled = false;
});
inputDelete.addEventListener('input', () => {
  if (!inputDelete.value) return (btnDelete.disabled = true);
  btnDelete.disabled = false;
});

function validationNew() {
  if (inputPostNombre.value && inputPostApellido.value)
    return (btnPost.disabled = false);
  btnPost.disabled = true;
}

function validationMod() {
  if (inputPutNombre.value && inputPutApellido.value)
    return (btnSendChanges.disabled = false);
  btnSendChanges.disabled = true;
}

btnGet.addEventListener('click', () => {
  const id = inputGetId.value;

  if (!id) return getUsers();

  getUserId(id);
});

btnPost.addEventListener('click', () => {
  console.log('Button Post');
});

btnPut.addEventListener('click', () => {
  console.log('Button Put');
});

btnSendChanges.addEventListener('click', () => {
  console.log('Button Send Changes');
});

btnDelete.addEventListener('click', () => {
  const id = inputDelete.value;
  deleteUser(id);
});

async function getUsers() {
  try {
    const response = await fetch(
      'https://6365190cf711cb49d1f50e82.mockapi.io/api/jap/users'
    );
    const result = await response.json();
    console.log(result);
    if (response.status !== 200) return showError();
    if (!result.length) return showError();
    showData(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserId(id) {
  try {
    const response = await fetch(
      `https://6365190cf711cb49d1f50e82.mockapi.io/api/jap/users/${id}`
    );
    const result = await response.json();
    if (response.status !== 200) return showError();
    showData(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(
      `https://6365190cf711cb49d1f50e82.mockapi.io/api/jap/users/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      }
    );
    if (response.status !== 200) return showError();
  } catch (error) {
    console.log(error);
  }
}

function showData(result) {
  cleanContainer();
  if (result.length > 0) {
    for (const user of result) {
      resultContainer.innerHTML += `
      <li class='p-2'>
        <p class='mb-1'><span>Id: </span>${user.id}</p>
        <p class='mb-1'><span>Name: </span>${user.name}</p>
        <p class='mb-1'><span>LastName: </span>${user.lastname}</p>
      </li>
      `;
    }
    return;
  }
  resultContainer.innerHTML = `
  <li class='p-2'>
    <p class='mb-1'><span>Id: </span>${result.id}</p>
    <p class='mb-1'><span>Name: </span>${result.name}</p>
    <p class='mb-1'><span>LastName: </span>${result.lastname}</p>
  </li>`;
}

function cleanContainer() {
  resultContainer.innerHTML = '';
}

function showError() {
  alertMessage.classList.remove('fade');
}
