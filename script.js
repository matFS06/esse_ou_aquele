// Lista inicial de 20 filmes (A mesma do código anterior)
const initialMovies = [
    { id: 1, title: "Toy Story", studio: "Pixar", img: "img/toystory.jpg" },
    { id: 2, title: "O Rei Leão", studio: "Disney", img: "img/reileao.jpg" },
    { id: 3, title: "Shrek", studio: "Dreamworks", img: "img/shrek.jpg" },
    { id: 4, title: "Procurando Nemo", studio: "Pixar", img: "img/nemo.jpg" },
    { id: 5, title: "A Pequena Sereia", studio: "Disney", img: "img/sereia.jpg" },
    { id: 6, title: "Como Treinar Seu Dragão", studio: "Dreamworks", img: "img/dragao.jpg" },
    { id: 7, title: "Enrolados", studio: "Disney", img: "img/enrolados.jpg" },
    { id: 8, title: "Monstros S.A.", studio: "Pixar", img: "img/monstros.jpg" },
    { id: 9, title: "Viva - A Vida é uma Festa", studio: "Pixar", img: "img/viva.jpg" },
    { id: 10, title: "Moana", studio: "Disney", img: "img/moana.jpg" },
    { id: 11, title: "Frozen", studio: "Disney", img: "img/frozen.jpg" },
    { id: 12, title: "UP - Altas Aventuras", studio: "Pixar", img: "img/up.jpg" },
    { id: 13, "title": "Mulan", studio: "Disney", img: "img/mulan.jpg" },
    { id: 14, "title": "Ratatouille", studio: "Pixar", img: "img/ratatouille.jpg" },
    { id: 15, "title": "Kung Fu Panda", studio: "Disney", img: "img/panda.jpg" },
    { id: 16, "title": "O Caminho para El Dorado", studio: "Dreamworks", img: "img/eldorado.jpg" },
    { id: 17, "title": "Valente", studio: "Pixar", img: "img/valente.jpg" },
    { id: 18, "title": "Zootopia", studio: "Disney", img: "img/zootopia.jpg" },
    { id: 19, "title": "Vida de Inseto", studio: "Pixar", img: "img/inseto.jpg" },
    { id: 20, "title": "O Gato de Botas", studio: "Dreamworks", img: "img/gato.jpg" },
];

let moviePool = [];      // Cópia da lista inicial embaralhada
let currentChampion = null; // O filme que o usuário escolheu na rodada anterior
let nextIndex = 0;       // Índice do próximo desafiante na lista
let totalMatches = 0;    // Contador para o número da rodada

const optionsContainer = document.getElementById('movie-options');
const winnerDisplay = document.getElementById('winner-display');
const roundDisplay = document.getElementById('round-number');

// Função para embaralhar o array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Inicia um novo jogo
function startGame() {
    // Esconde o vencedor e mostra o jogo
    document.getElementById('game-container').querySelector('h2').style.display = 'block';
    optionsContainer.style.display = 'flex';
    winnerDisplay.classList.add('hidden');
    
    // Reseta, embaralha e define os valores iniciais
    moviePool = [...initialMovies];
    shuffleArray(moviePool);
    
    // O primeiro filme da lista é o "campeão" inicial (o que o usuário escolhe manter)
    currentChampion = moviePool[0];
    
    // A comparação começa contra o segundo filme da lista
    nextIndex = 1; 
    totalMatches = 0;
    
    nextMatch();
}

// Avança para a próxima comparação
function nextMatch() {
    // 1. Verificar se o jogo terminou (se todos os filmes foram comparados)
    if (nextIndex >= moviePool.length) {
        // Se sim, o 'currentChampion' é o grande vencedor!
        showWinner(currentChampion);
        return;
    }
    
    // 2. Definir os filmes para esta rodada
    const movieA = currentChampion;
    const movieB = moviePool[nextIndex]; // O próximo desafiante
    
    totalMatches++;
    roundDisplay.textContent = totalMatches;
    
    // 3. Renderizar na tela
    renderMovies(movieA, movieB);
}


// Renderiza os dois cards de filmes na tela
function renderMovies(movieA, movieB) {
    // Importante: movieA é sempre o CAMPEÃO ATUAL, movieB é o DESAFIANTE
    
    optionsContainer.innerHTML = `
        <div class="movie-card" data-id="${movieA.id}" onclick="handleSelection(${movieA.id})">
            <img src="${movieA.img}" alt="${movieA.title}">
            <h3>${movieA.title}</h3>
            <p>Selecione para **MANTER**</p>
        </div>

        <div class="separator">VS</div>

        <div class="movie-card" data-id="${movieB.id}" onclick="handleSelection(${movieB.id})">
            <img src="${movieB.img}" alt="${movieB.title}">
            <h3>${movieB.title}</h3>
            <p>Selecione para **TROCAR**</p>
        </div>
    `;
}

// Lógica de seleção do usuário
function handleSelection(selectedId) {
    // Encontra o filme selecionado (que é o novo campeão)
    const selectedMovie = moviePool.find(m => m.id === selectedId);
    
    if (selectedMovie) {
        // O filme selecionado se torna o novo campeão
        currentChampion = selectedMovie;
        
        // O índice avança para o próximo filme da pool (o próximo desafiante)
        nextIndex++;
        
        // Inicia a próxima comparação
        nextMatch(); 
    }
}

// Exibe o vencedor final
function showWinner(winner) {
    document.getElementById('game-container').querySelector('h2').style.display = 'none';
    optionsContainer.style.display = 'none';
    
    document.getElementById('winner-img').src = winner.img;
    document.getElementById('winner-img').alt = winner.title;
    document.getElementById('winner-title').textContent = winner.title;
    
    winnerDisplay.classList.remove('hidden');
}

// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', startGame);