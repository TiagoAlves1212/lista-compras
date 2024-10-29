const produto = document.querySelector("#nome-produto");
const qtde = document.querySelector("#qtde-produto");
const addProduto = document.querySelector("#add");
const ul = document.querySelector("#itens");

function salvarLista() {
  const listaItens = Array.from(ul.children).map((li) => {
    const nome = li.querySelector(".nome-produto").innerText;
    const quantidade = li.querySelector(".quantidade").innerText;
    return { nome, quantidade };
  });
  localStorage.setItem("listaProdutos", JSON.stringify(listaItens));
}

function carregarLista() {
  const listaSalva = JSON.parse(localStorage.getItem("listaProdutos")) || [];
  listaSalva.forEach((item) => {
    const li = criarItemLista(item.nome, item.quantidade);
    ul.appendChild(li);
  });
}

function criarItemLista(nome, quantidade) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="quantidade">${quantidade}</span>
    <span class="nome-produto">${nome}</span>
    <div class="icons">
      <span class="editar"><i class="ph ph-note-pencil"></i></span>
      <span class="deletar"><i class="ph ph-trash"></i></span>
    </div>
  `;

  li.querySelector(".deletar").addEventListener("click", () => deletarItem(li));
  li.querySelector(".editar").addEventListener("click", () => {
    editarItem(li);
  });
  li.addEventListener("click", () => {
    li.querySelector(".nome-produto").classList.toggle("strikethrough");
  });

  return li;
}

addProduto.addEventListener("click", () => {
  if (produto.value.trim() !== "" && qtde.value.trim() !== "") {
    const li = criarItemLista(produto.value, qtde.value);
    ul.appendChild(li);
    salvarLista();

    setTimeout(() => {
      produto.value = "";
      qtde.value = "";
    }, 2000);
  } else {
    alert("Os campos não podem estar vazios");
    return;
  }
});

function deletarItem(li) {
  li.remove();
  salvarLista();
}

function editarItem(li) {
  const nomeSpan = li.querySelector(".nome-produto");
  const quantidadeSpan = li.querySelector(".quantidade");

  if (li.querySelector("input")) {
    return;
  }

  const novoNomeInput = document.createElement("input");
  novoNomeInput.type = "text";
  novoNomeInput.value = nomeSpan.innerText;
  novoNomeInput.className = "edit-input";

  const novaQuantidadeInput = document.createElement("input");
  novaQuantidadeInput.type = "number";
  novaQuantidadeInput.value = quantidadeSpan.innerText;
  novaQuantidadeInput.className = "edit-input";

  const btnSalvar = document.createElement("button");
  btnSalvar.innerText = "Salvar";
  btnSalvar.className = "btn-salvar";
  btnSalvar.addEventListener("click", () => {
    nomeSpan.innerText = novoNomeInput.value;
    quantidadeSpan.innerText = novaQuantidadeInput.value;
    salvarLista();

    novoNomeInput.remove();
    novaQuantidadeInput.remove();
    btnSalvar.remove();
    nomeSpan.style.display = "flex";
    quantidadeSpan.style.display = "flex";
  });

  li.insertBefore(novoNomeInput, nomeSpan);
  li.insertBefore(novaQuantidadeInput, quantidadeSpan);
  li.appendChild(btnSalvar);

  nomeSpan.style.display = "none";
  quantidadeSpan.style.display = "none";
}

document.addEventListener("DOMContentLoaded", carregarLista);
