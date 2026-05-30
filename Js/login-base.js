const CREDENCIAIS_DEMO = {
  email: "miguel@teste.com",
  senha: "1234",
};

const REDIRECIONAMENTO_SUCESSO = "principal.html";
const CHAVE_EMAIL_SALVO = "login_email_salvo";

const formulario = document.querySelector(".login__formulario");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const checkboxLembrar = document.getElementById("lembrar");
const botaoEntrar = formulario.querySelector('button[type="submit"]');
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const feedbackGeral = document.getElementById("feedback-login");

function mostrarErroCampo(elementoErro, mensagem) {
  elementoErro.textContent = mensagem;
  elementoErro.hidden = !mensagem;
}

function limparErros() {
  mostrarErroCampo(erroEmail, "");
  mostrarErroCampo(erroSenha, "");
  campoEmail.classList.remove("campo__entrada--invalido");
  campoSenha.classList.remove("campo__entrada--invalido");
}

function mostrarFeedback(mensagem, tipo) {
  feedbackGeral.textContent = mensagem;
  feedbackGeral.className = `login__feedback login__feedback--${tipo}`;
  feedbackGeral.hidden = !mensagem;
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarFormulario() {
  limparErros();
  let valido = true;

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  if (!email) {
    mostrarErroCampo(erroEmail, "Informe seu e-mail.");
    campoEmail.classList.add("campo__entrada--invalido");
    valido = false;
  } else if (!emailValido(email)) {
    mostrarErroCampo(erroEmail, "Digite um e-mail válido.");
    campoEmail.classList.add("campo__entrada--invalido");
    valido = false;
  }

  if (!senha) {
    mostrarErroCampo(erroSenha, "Informe sua senha.");
    campoSenha.classList.add("campo__entrada--invalido");
    valido = false;
  } else if (senha.length < 4) {
    mostrarErroCampo(erroSenha, "A senha deve ter pelo menos 4 caracteres.");
    campoSenha.classList.add("campo__entrada--invalido");
    valido = false;
  }

  return valido;
}

function credenciaisCorretas(email, senha) {
  const emailNormalizado = email.trim().toLowerCase();
  return (
    emailNormalizado === CREDENCIAIS_DEMO.email &&
    senha === CREDENCIAIS_DEMO.senha
  );
}

function salvarEmailSeMarcado() {
  if (checkboxLembrar.checked) {
    localStorage.setItem(CHAVE_EMAIL_SALVO, campoEmail.value.trim());
  } else {
    localStorage.removeItem(CHAVE_EMAIL_SALVO);
  }
}

function carregarEmailSalvo() {
  const emailSalvo = localStorage.getItem(CHAVE_EMAIL_SALVO);
  if (emailSalvo) {
    campoEmail.value = emailSalvo;
    checkboxLembrar.checked = true;
  }
}

function definirCarregando(ativo) {
  botaoEntrar.disabled = ativo;
  botaoEntrar.classList.toggle("botao--carregando", ativo);
  botaoEntrar.textContent = ativo ? "Entrando..." : "Entrar";
  campoEmail.disabled = ativo;
  campoSenha.disabled = ativo;
}

async function processarLogin(evento) {
  evento.preventDefault();
  mostrarFeedback("", "");

  if (!validarFormulario()) {
    mostrarFeedback("Corrija os campos destacados.", "erro");
    return;
  }

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  definirCarregando(true);

  await new Promise((resolve) => setTimeout(resolve, 800));

  if (credenciaisCorretas(email, senha)) {
    salvarEmailSeMarcado();
    mostrarFeedback("Login realizado com sucesso. Redirecionando...", "sucesso");

    setTimeout(() => {
      window.location.href = REDIRECIONAMENTO_SUCESSO;
    }, 1200);
    return;
  }

  definirCarregando(false);
  mostrarFeedback("E-mail ou senha incorretos.", "erro");
  campoSenha.value = "";
  campoSenha.focus();
}

campoEmail.addEventListener("input", () => {
  mostrarErroCampo(erroEmail, "");
  campoEmail.classList.remove("campo__entrada--invalido");
});

campoSenha.addEventListener("input", () => {
  mostrarErroCampo(erroSenha, "");
  campoSenha.classList.remove("campo__entrada--invalido");
});

formulario.addEventListener("submit", processarLogin);

carregarEmailSalvo();
