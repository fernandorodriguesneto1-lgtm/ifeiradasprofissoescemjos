// Config do Firebase (SUA CONFIG REAL AQUI)
const firebaseConfig = {
  apiKey: "AIzaSyDo7SkgXulfk9dZhioxXkp-GbhbLW_7AVk",
  authDomain: "feirao-informatica.firebaseapp.com",
  databaseURL: "https://feirao-informatica-default-rtdb.firebaseio.com",
  projectId: "feirao-informatica",
  storageBucket: "feirao-informatica.appspot.com",
  messagingSenderId: "417803734886",
  appId: "1:417803734886:web:1e84a944177d56cd8182a7"
};

// Inicializa
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// -----------------------
// Enviar Avaliação
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

  if (!nome) return alert("Digite seu nome.");
  if (!emojiSelecionado) return alert("Selecione um emoji.");

  const dados = {
    nome: nome,
    emoji: emojiSelecionado,
    horario: new Date().toLocaleTimeString()
  };

  // IMPORTANTE: o caminho deve EXISTIR no Firebase
  db.ref("avaliacoes").push(dados);

  alert("Avaliação enviada!");
  document.getElementById("nome").value = "";
  emojiSelecionado = null;
  document.querySelectorAll(".emoji").forEach(em => em.classList.remove("selecionado"));
}

// -----------------------
// Página da Lista
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
