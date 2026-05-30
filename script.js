function toogleMode(){
  //proucurar a tag html
  const html = document.documentElement
  //proucura a imagem
  const img = document.querySelector("#profile img")
  // o atributo "toogle" ele ja faz o processo if, else(fundo)
  html.classList.toggle("light")
  if (html.classList.contains("light")) {
    //se tiver light troca a imagem
    img.setAttribute("src", "../assets/Perfil.jpeg")
    img.setAttribute("alt", "Uma foto de um cara de óculos escuro no fundo azul e meio branco")
  } else {
    // se não tiver light permança a imagem
    img.setAttribute("src", "../assets/Perfil2.jpeg")
    img.setAttribute("alt", "uma foto de um cara sorrindo em um fundo amarelo")
  }
}