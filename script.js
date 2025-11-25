// CONFIGURE AQUI O FIREBASE DE VOCÊS
const firebaseConfig = {
  apiKey: "AIzaSyDo7SkgXulfk9dZhioxXkp-GbhbLW_7AVk",
  authDomain: "feirao-informatica.firebaseapp.com",
  databaseURL: "https://feirao-informatica-default-rtdb.firebaseio.com",
  projectId: "feirao-informatica",
  storageBucket: "feirao-informatica.firebasestorage.app",
  messagingSenderId: "417803734886",
  appId: "1:417803734886:web:1e84a944177d56cd8182a7",
  measurementId: "G-9PWCC0CRCY"
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
