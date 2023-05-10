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

              document.querySelector("main").appendChild(div)
            })
        })
        console.log("OIoai");
}