function carregarEquipamentos() {
  const options = { method: 'GET' };

  fetch('http://localhost:3000/equipamentos/read', options)
    .then(response => response.json())
    .then(equipamento => {
      equipamento.forEach(e => {
        if (e.ativo !== false) {
          var div = document.querySelector(".clone").cloneNode(true)
          div.classList.remove("model")

          div.querySelector(".pic").src = "https://pbs.twimg.com/media/BKRmBshCcAACCSK.jpg:large"
          div.querySelector("#nomeEquipamento").innerHTML = e.equipamento
          div.querySelector("#descricao").innerHTML = e.descricao
          div.querySelector('.btnComent').id = e.id
          div.querySelector('.btnComent').addEventListener('click', () => abrirModalComentario(e.Comentarios, e.id))
          div.querySelector('.btnDel').id = e.id

          document.querySelector("main").appendChild(div)
        }
      })
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      document.querySelector(".ms-fetch").classList.remove("model")
    })
}

var idDel = 0

function abrirModalDelete(e) {
  idDel = e.id
  document.querySelector('.delComent-modal').classList.remove('model')
}

function abrirModalComentario(com, id) {
  com.forEach(c => {
    let model = document.querySelector('.mod-comentario').cloneNode(true)
    model.querySelector('#perfil').innerHTML = c.perfis.perfil
    model.querySelector('#data').innerHTML = new Date(c.data).toLocaleDateString('pt-br')
    model.querySelector('.comenbody').innerHTML = c.comentario
    model.classList.remove('model')
    document.querySelector('.comentarios').appendChild(model)
  })
  document.querySelector("#sendComentario").setAttribute('ideq', id)
  document.querySelector('.comentarios-modal').classList.remove('model')
}

function fecharModalComentario() {
  document.querySelector('.comentarios-modal').classList.add('model')
  let model = document.querySelector('.mod-comentario').cloneNode(true)
  document.querySelector('.comentarios').innerHTML = ""
  document.querySelector('.comentarios').appendChild(model)
}

function excluirEquipamento() {
  const options = { method: 'DELETE' };

  fetch('http://localhost:3000/equipamentos/' + idDel, options)
    .then(response => response.json())
    .then(response => window.location.reload())
}

function abrirAdicionarComentario() {
  document.querySelector('.comentarios-modal').classList.add('model')
  document.querySelector(".comentar-modal").classList.remove("model")
}

function sair() {
  localStorage.clear()
  window.location.href = "../login/index.html"
}

function habilitarBotao() {
  const input = document.getElementById('textArea');
  const botao = document.getElementById('sendComentario');
  
  if (input.value.trim() !== '') {
    botao.disabled = false;
  } else {
    botao.disabled = true;
  }
}

function cadastrarComentario(e) {
  
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: [JSON.stringify({
      "comentario": document.querySelector("#textArea").value,
      "id_perfil": parseInt(localStorage.getItem("userIDPerfil")),
      "id_equipamentos": parseInt(e.getAttribute('ideq'))
    })]
  };

  fetch('http://localhost:3000/comentarios/create', options)
    .then(response => response.json())
    .then(response => {
      console.log(response.count);
      if (response.count > 0) {
        document.querySelector(".ms-ok").classList.remove("model")
      } else {
        document.querySelector(".ms-ko").classList.remove("model")
      }
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      document.querySelector(".ms-ko").classList.remove("model")
      
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
}