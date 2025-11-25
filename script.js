// CONFIGURE AQUI O FIREBASE DE VOCÊS
const firebaseConfig = {
  apiKey: "SUA-CHAVE",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  databaseURL: "https://SEU-PROJETO-default-rtdb.firebaseio.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "NUMERO",
  appId: "ID-DO-APP"
};

// Inicializa
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// -----------------------
// Função de Enviar Dados
// -----------------------
let emojiSelecionado = null;

document.querySelectorAll(".emoji").forEach(e => {
  e.addEventListener("click", () => {
    document.querySelectorAll(".emoji").forEach(em => em.classList.remove("selecionado"));
    e.classList.add("selecionado");
    emojiSelecionado = e.dataset.value;
  });
});

function enviar() {
  const nome = document.getElementById("nome").value;

  if (!nome) {
    alert("Digite seu nome.");
    return;
  }
  if (!emojiSelecionado) {
    alert("Selecione um emoji.");
    return;
  }

  const dados = {
    nome: nome,
    emoji: emojiSelecionado,
    horario: new Date().toLocaleTimeString()
  };

  db.ref("avaliacoes").push(dados);

  alert("Avaliação enviada!");
  document.getElementById("nome").value = "";
  emojiSelecionado = null;
  document.querySelectorAll(".emoji").forEach(em => em.classList.remove("selecionado"));
}



// -----------------------
// Página de Lista
// -----------------------
if (document.getElementById("lista")) {
  db.ref("avaliacoes").on("value", snapshot => {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    snapshot.forEach(item => {
      const dados = item.val();
      lista.innerHTML += `
        <div class="item">
          <strong>${dados.nome}</strong> — ${dados.emoji}
        </div>
      `;
    });
  });
}
