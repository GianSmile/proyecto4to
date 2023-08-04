const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const contraseñaCorrecta = "rootroot";
  const usernameCorrecto = "root";

  if ((password === contraseñaCorrecta) && (username === usernameCorrecto)) {
    // si es correcta llevalo al bienvienido
    window.location.href = "bienvenido.html";
  } 
  else {
    // Psi no es correcta muestra error
    const errorMessage = document.createElement('p');
    errorMessage.textContent = "Contraseña invalida.";
    errorMessage.style.color = "#c00"; // color rojo
    loginForm.appendChild(errorMessage);
  }
});
