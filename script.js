const firebaseConfig = {
  apiKey: "AIzaSyAASB8bbIJiI1naAidYKYyj_1MoyvEHIks",
  authDomain: "avaliacao-6d865.firebaseapp.com",
  databaseURL: "https://avaliacao-6d865-default-rtdb.firebaseio.com",
  projectId: "avaliacao-6d865",
  storageBucket: "avaliacao-6d865.appspot.com",
  messagingSenderId: "115273437076",
  appId: "1:115273437076:web:a33c5e03bdb6ae53f58981",
  measurementId: "G-9GQWYWK7ME"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// =========================
//  Salvar dados
// =========================
function salvarAvaliacao(nome, emoji) {
  const novo = db.ref("avaliacoes").push();
  novo.set({
    nome: nome,
    emoji: emoji
  });
}

// =========================
//  Carregar lista
// =========================
function carregarLista() {
  const listaDiv = document.getElementById("lista");
  listaDiv.innerHTML = "";

  db.ref("avaliacoes").on("value", (snapshot) => {
    listaDiv.innerHTML = "";

    snapshot.forEach((child) => {
      const id = child.key;
      const item = child.val();

      const bloco = document.createElement("div");
      bloco.className = "item";
      bloco.innerHTML = `
        <strong>${item.nome}</strong> — ${item.emoji}
        <button class="del" data-id="${id}" style="
          margin-left:10px;
          background:#d33;
          color:white;
          border:none;
          padding:4px 8px;
          border-radius:4px;
          cursor:pointer;
        ">
          Excluir
        </button>
      `;

      listaDiv.appendChild(bloco);
    });

    // Ativar botões excluir
    document.querySelectorAll(".del").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        excluirItem(id);
      });
    });
  });
}

// =========================
//  Excluir item
// =========================
function excluirItem(id) {
  db.ref("avaliacoes/" + id).remove();
}

// Carregar quando abrir a página
carregarLista();
