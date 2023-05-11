function carregarEquipamentos() {
  const options = { method: 'GET' };

  fetch('http://localhost:3000/equipamentos/read', options)
    .then(response => response.json())
    .then(equipamento => {
      equipamento.forEach(e => {
        var div = document.querySelector(".clone").cloneNode(true)
        div.classList.remove("model")

        div.querySelector(".pic").src = "https://pbs.twimg.com/media/BKRmBshCcAACCSK.jpg:large"
        div.querySelector("#nomeEquipamento").innerHTML = e.equipamento
        div.querySelector("#descricao").innerHTML = e.descricao
        div.querySelector('.btnComent').id = e.id
        div.querySelector('.btnComent').addEventListener('click', () => abrirModalComentario(e.Comentarios))
        div.querySelector('.btnDel').id = e.id

        document.querySelector("main").appendChild(div)
      })
    })
}

var idDel = 0

function abrirModalDelete(e) {
  idDel = e.id
  console.log(e.id)
  document.querySelector('.delComent-modal').classList.remove('model')
}

function abrirModalComentario(com) {
  console.log(com)
  com.forEach(c => {
    let model = document.querySelector('.mod-comentario').cloneNode(true)
    model.querySelector('#perfil').innerHTML = c.perfis.perfil
    model.querySelector('#data').innerHTML = new Date(c.data).toLocaleDateString('pt-br')
    model.querySelector('.comenbody').innerHTML = c.comentario
    model.classList.remove('model')
    document.querySelector('.comentarios').appendChild(model)
  })
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

  fetch('http://localhost:3000/equipamentos/'+idDel, options)
    .then(response => response.json())
    .then(response => window.location.reload())
}