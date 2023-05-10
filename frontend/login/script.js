function limparCalc() {
    document.querySelector(".senha").innerHTML = ""
    senha = ""
}

var senha = ""

function addSenha(e) {
    senha = senha + e.id
    
    document.querySelector(".senha").innerHTML = "*".repeat(senha.length)

}

function login() {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "senha": senha
        })
      };
      
      fetch('http://localhost:3000/usuarios/login', options)   
        .then(response => response.json())
        .then(user => {
            if (user !== false) {
                window.location.href = "../home/index.html"
            }
        })
}