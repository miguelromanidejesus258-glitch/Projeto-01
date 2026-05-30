function logar() {
  let usuariodigitado = document.getElementById("usuario").value
  let senhadigitada = document.getElementById("senha").value
  let campoMensagem = document.getElementById("mensagem")

  if (usuariodigitado === "Miguel" && senhadigitada === "1234") {
    setTimeout(function () {
      window.location.href = "principal.html"
    }, 1500)

    campoMensagem.innerText = "Tudo certo para entrar. Boas-vindas!"
    campoMensagem.style.color = "green"
  } else {
    campoMensagem.innerText = "Senha ou usuario incorreto!❌"
    campoMensagem.style.color = "red"
    document.getElementById("usuario").value = ""
    document.getElementById("senha").value = ""
    document.getElementById("usuario").focus()
  }
}
