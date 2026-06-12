// Verifica a cápsula assim que o site abre
window.onload = function() {
    verificarStatusCapsula();
};

// Navegação das Abas
function mostrarAba(aba) {
    //se a pessoa clicar no quiz por exemplo, aba = "quiz"
    document.getElementById("aba-home").classList.add("hidden");
    document.getElementById("aba-quiz").classList.add("hidden");
    //document.getElementById("..."): Significa Procurar no documento HTML um elemento que tenha o ID tal, por exemplo o aba-home. ele vai la no html e vai procurar esse elemento para executar a função de esconder
    //.classList.add("hidden"): significa que os elementos aba-home e aba-quiz vão receber tal classe, no caso a classe "hidden", q lá no css (linha 306) foi oq nós usamos para fazer isso realmente sumir
    //Usamos esse codigo para limpar o palco e garantir que nenhuma tela fique clonada ou amontoada em cima da outra. vamos dizer q a pessoa ja tinha apertado em alguma parte da seção de navegação. isso iria ficar salvo lá e se a gente nao sumisse com isso iria bugar o site, por isso usamos o hidden para dar o reset e depois os ifs para executar o botão q a pessoa clicou
    
    if (aba === 'home') {
        document.getElementById("aba-home").classList.remove("hidden");
        verificarStatusCapsula(); // Checa o status sempre que volta pra home
    } else if (aba === 'quiz') {
        document.getElementById("aba-quiz").classList.remove("hidden");
        document.getElementById("tela-inicio-quiz").classList.remove("hidden");
        document.getElementById("tela-perguntas").classList.add("hidden");
        document.getElementById("loading-container").classList.add("hidden");
        document.getElementById("resultado-container").classList.add("hidden");
        perguntaAtual = 0; 
    }
}

// =================================================================
// CÁPSULA DO TEMPO
// =================================================================
// Defina aqui a data: Ano, Mês (Lembrando que 0 = Jan, 1 = Fev, 5 = Junho...), Dia
const dataFutura = new Date(2027, 5, 12).getTime(); 

function trancarCapsula() {
    const texto = document.getElementById("texto-capsula").value;
    
    if (texto.trim() === "") {
        alert("Escreva alguma coisa antes de trancar a cápsula! ❤️");
        return;
    }

    localStorage.setItem("mensagemAmor", texto);
    verificarStatusCapsula();
}

function verificarStatusCapsula() {
    const mensagemSalva = localStorage.getItem("mensagemAmor");
    const agora = new Date().getTime();
    const distancia = dataFutura - agora;

    const telaEscrever = document.getElementById("capsula-escrever");
    const telaFechada = document.getElementById("capsula-fechada");
    const telaAberta = document.getElementById("capsula-aberta");

    if(!telaEscrever || !telaFechada || !telaAberta) return; // Proteção extra

    telaEscrever.classList.add("hidden");
    telaFechada.classList.add("hidden");
    telaAberta.classList.add("hidden");

    if (mensagemSalva) {
        if (distancia <= 0) {
            telaAberta.classList.remove("hidden");
            document.getElementById("mensagem-futuro-texto").innerText = mensagemSalva;
        } else {
            telaFechada.classList.remove("hidden");
        }
    } else {
        telaEscrever.classList.remove("hidden");
    }
}

setInterval(function() {
    const agora = new Date().getTime();
    const distancia = dataFutura - agora;

    if (distancia >= 0) {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        if(document.getElementById("dias")) {
            document.getElementById("dias").innerText = dias.toString().padStart(2, '0');
            document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
            document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
            document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');
        }
    } else {
        const telaFechada = document.getElementById("capsula-fechada");
        if(telaFechada && !telaFechada.classList.contains("hidden")) {
            verificarStatusCapsula();
        }
    }
}, 1000);

function abrirCapsulaForcada() {
    const mensagemSalva = localStorage.getItem("mensagemAmor");
    
    document.getElementById("capsula-fechada").classList.add("hidden");
    document.getElementById("capsula-aberta").classList.remove("hidden");
    
    if (mensagemSalva) {
        document.getElementById("mensagem-futuro-texto").innerText = mensagemSalva;
    } else {
        document.getElementById("mensagem-futuro-texto").innerText = "Você não digitou nada para testar! Volte e escreva algo. 😂";
    }
}

// =================================================================
// URSINHO E CARTA
// =================================================================
function abrirCartinha() {
    document.getElementById("modal-carta").classList.remove("hidden");
}

function fecharCartinha() {
    document.getElementById("modal-carta").classList.add("hidden");
}

// =================================================================
// ROLETA DE DATES
// =================================================================
const ideiasDate = [
    "🍕 Noite de Pizza (Eu pago!)",
    "🎬 Maratonar filmes no sofá",
    "🍔 Comer aquele lanche perfeito",
    "💆‍♀️ 30 minutos de massagem",
    "🍝 Cozinhar algo juntos",
    "🍦 Sair para tomar sorvete"
];

function sortearDate() {
    const display = document.getElementById("resultado-roleta");
    const btn = document.querySelector(".btn-roleta");
    
    btn.disabled = true;
    display.classList.add("sorteando");
    
    let contador = 0;
    
    const intervalo = setInterval(() => {
        const random = Math.floor(Math.random() * ideiasDate.length);
        display.innerHTML = `<span>${ideiasDate[random]}</span>`;
        contador++;
        
        if (contador > 15) {
            clearInterval(intervalo);
            display.classList.remove("sorteando");
            btn.disabled = false;
        }
    }, 100); 
}

// =================================================================
// QUIZ
// =================================================================
function iniciarQuiz() {
    document.getElementById("tela-inicio-quiz").classList.add("hidden");
    document.getElementById("tela-perguntas").classList.remove("hidden");
    carregarPergunta();
}

const perguntas = [
    {
        pergunta: "Quem de nós dois disse 'Eu te amo' primeiro?",
        opcao1: "Fui eu, com certeza!",
        opcao2: "Foi você, não tem como negar!"
    },
    {
        pergunta: "Qual é a nossa principal mania como casal?",
        opcao1: "Dormir no meio do filme",
        opcao2: "Pedir lanche tarde da noite"
    },
    {
        pergunta: "Se a gente tivesse que escolher o nosso lugar favorito, qual seria?",
        opcao1: "Aquele restaurante que a gente sempre vai",
        opcao2: "O nosso sofá abraçadinhos"
    }
];

let perguntaAtual = 0;

function carregarPergunta() {
    document.getElementById("contador-pergunta").innerText = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta-texto").innerText = perguntas[perguntaAtual].pergunta;
    document.getElementById("btn-resp-1").innerText = perguntas[perguntaAtual].opcao1;
    document.getElementById("btn-resp-2").innerText = perguntas[perguntaAtual].opcao2;
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        document.getElementById("tela-perguntas").classList.add("hidden");
        document.getElementById("loading-container").classList.remove("hidden");
        iniciarCarregamento();
    }
}

function iniciarCarregamento() {
    let progresso = 0;
    const barra = document.getElementById("barra-progresso");
    const textoLoading = document.getElementById("texto-loading");
    
    const frases = [
        "Analisando memórias juntos...",
        "Calculando sorrisos...",
        "Ajustando níveis de paixão...",
        "Prontinho!"
    ];

    const intervalo = setInterval(() => {
        progresso += 25; 
        barra.style.width = progresso + "%";

        if (progresso === 25) textoLoading.innerText = frases[0];
        if (progresso === 50) textoLoading.innerText = frases[1];
        if (progresso === 75) textoLoading.innerText = frases[2];
        if (progresso === 100) textoLoading.innerText = frases[3];

        if (progresso >= 100) {
            clearInterval(intervalo);
            setTimeout(() => {
                document.getElementById("loading-container").classList.add("hidden");
                document.getElementById("resultado-container").classList.remove("hidden");
            }, 800); 
        }
    }, 800); 
}