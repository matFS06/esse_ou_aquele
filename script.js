// --- DADOS DO JOGO ---

const CATALOG = {
    'Infantil': [
        // Caminho AGORA é 'img/nome_do_arquivo.jpg' (pasta original)
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
        { id: 15, "title": "Kung Fu Panda", studio: "Dreamworks", img: "img/panda.jpg" }, 
        { id: 16, "title": "O Caminho para El Dorado", studio: "Dreamworks", img: "img/eldorado.jpg" },
        { id: 17, "title": "Valente", studio: "Pixar", img: "img/valente.jpg" },
        { id: 18, "title": "Zootopia", studio: "Disney", img: "img/zootopia.jpg" },
        { id: 19, "title": "Vida de Inseto", studio: "Pixar", img: "img/inseto.jpg" },
        { id: 20, "title": "O Gato de Botas", studio: "Dreamworks", img: "img/gato.jpg" },
    ],
    'Herois': [
        // Caminho AGORA é 'img-hero/nome_do_arquivo.jpg' (nova pasta)
        { id: 21, title: "Superman", studio: "DC", img: "img-hero/superman.jpg" },
        { id: 22, title: "Batman", studio: "DC", img: "img-hero/batman.jpg" },
        { id: 23, title: "Homem-Aranha", studio: "Marvel", img: "img-hero/aranha.jpg" },
        { id: 24, title: "Mulher-Maravilha", studio: "DC", img: "img-hero/mulhermaravilha.jpg" },
        { id: 25, title: "Capitão América", studio: "Marvel", img: "img-hero/capitao.jpg" },
        { id: 26, title: "Flash", studio: "DC", img: "img-hero/flash.jpg" },
        { id: 27, title: "Thor", studio: "Marvel", img: "img-hero/thor.jpg" },
        { id: 28, title: "Capitã Marvel", studio: "Marvel", img: "img-hero/capitamarvel.jpg" },
        { id: 29, title: "Aquaman", studio: "DC", img: "img-hero/aquaman.jpg" },
        { id: 30, title: "Pantera Negra", studio: "Marvel", img: "img-hero/pantera.jpg" },
        { id: 31, title: "Super Choque", studio: "DC", img: "img-hero/choque.jpg" },
        { id: 32, title: "Lanterna Verde", studio: "DC", img: "img-hero/lanterna.jpg" },
        { id: 33, title: "Hulk", studio: "Marvel", img: "img-hero/hulk.jpg" },
        { id: 34, title: "Supergirl", studio: "DC", img: "img-hero/supergirl.jpg" },
        { id: 35, title: "Homem de Ferro", studio: "Marvel", img: "img-hero/homemdeferro.jpg" },
        { id: 36, title: "Robin", studio: "DC", img: "img-hero/robin.jpg" },
        { id: 37, title: "Viúva Negra", studio: "Marvel", img: "img-hero/viuva.jpg" },
        { id: 38, title: "Ciborgue", studio: "DC", img: "img-hero/ciborgue.jpg" },
        { id: 39, title: "Deadpool", studio: "Marvel", img: "img-hero/deadpool.jpg" },
        { id: 40, title: "Arqueiro Verde", studio: "DC", img: "img-hero/arqueiro.jpg" },
        { id: 41, title: "Mulher Gavião", studio: "DC", img: "img-hero/mulhergaviao.jpg" },
        { id: 42, title: "Homem-Formiga", studio: "Marvel", img: "img-hero/formiga.jpg" },
    ]
};

// Variáveis globais (mantidas)
let moviePool = [];
let currentChampion = null;
let nextIndex = 0;
let totalMatches = 0;

const optionsContainer = document.getElementById('movie-options');
const winnerDisplay = document.getElementById('winner-display');
const roundDisplay = document.getElementById('round-number');
const categorySelector = document.getElementById('category-selector');
const gameContent = document.getElementById('game-content');


// --- FUNÇÕES DE LÓGICA DO JOGO (Mantidas intactas) ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame(categoryName) {
    categorySelector.classList.add('hidden'); 
    gameContent.classList.remove('hidden');   
    winnerDisplay.classList.add('hidden');
    document.getElementById('game-content').querySelector('h2').style.display = 'block';
    optionsContainer.style.display = 'flex';
    
    const selectedList = CATALOG[categoryName];
    if (!selectedList) {
        console.error("Categoria não encontrada:", categoryName);
        return;
    }
    
    moviePool = [...selectedList];
    shuffleArray(moviePool);
    
    currentChampion = moviePool[0];
    nextIndex = 1; 
    totalMatches = 0;
    
    nextMatch();
}

function nextMatch() {
    if (nextIndex >= moviePool.length) {
        showWinner(currentChampion);
        return;
    }
    
    const movieA = currentChampion;
    const movieB = moviePool[nextIndex];
    
    totalMatches++;
    roundDisplay.textContent = totalMatches;
    
    renderMovies(movieA, movieB);
}

function renderMovies(movieA, movieB) {
    // Esta função usa movieA.img e movieB.img, que agora têm os caminhos corretos!
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

function handleSelection(selectedId) {
    const selectedMovie = moviePool.find(m => m.id === selectedId);
    
    if (selectedMovie) {
        currentChampion = selectedMovie;
        nextIndex++;
        nextMatch(); 
    }
}

function showWinner(winner) {
    document.getElementById('game-content').querySelector('h2').style.display = 'none';
    optionsContainer.style.display = 'none';
    
    document.getElementById('winner-img').src = winner.img;
    document.getElementById('winner-img').alt = winner.title;
    document.getElementById('winner-title').textContent = winner.title;
    
    winnerDisplay.classList.remove('hidden');
}


// --- INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    categorySelector.classList.remove('hidden');
    gameContent.classList.add('hidden'); 
});