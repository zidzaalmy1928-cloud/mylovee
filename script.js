// State management
let gameActive = false;
let gameScore = 0;
let isPlaying = false;
let isMuted = false;

// Photo data - EDIT THESE WITH YOUR OWN PHOTOS
const photos = [
    { title: 'My sweetie', src: 'my loveee/foto1.jpg' },
    { title: 'your beauty', src: 'my loveee/foto2.jpg' },
    { title: 'Sweet Moments', src: 'my loveee/foto3.jpg' },
    { title: 'Forever Together', src: 'my loveee/foto4.jpg' },
    { title: 'Sunset Love', src: 'my loveee/foto5.jpg' },
    { title: 'Precious You', src: 'my loveee/foto6.jpg' },
];

// Initialize
function init() {
    initializePhotos();
    loadAudio();
}

function initializePhotos() {
    const photoGrid = document.getElementById('photoGrid');
    photos.forEach((photo, index) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}">
            <div class="photo-overlay">
                <div>
                    <div class="photo-title">✨ ${photo.title}</div>
                    <div class="photo-subtitle">💕 Kenangan indah bersama 💕</div>
                </div>
            </div>
        `;
        photoGrid.appendChild(card);
    });
}

function loadAudio() {
    const audio = document.getElementById('audioPlayer');
    // EDIT THIS: Replace with your Kasih Putih Glenn Fredly link
    // Example: audio.src = 'https://your-link-to-kasih-putih.mp3';
    audio.src = 'Glenn Fredly - Kasih Putih (Official Audio).mp3';
}

// Tab switching
function switchTab(e, tabName) {
    e.preventDefault();
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(tabName).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
}

// Game functions
function startGame() {
    gameActive = true;
    gameScore = 0;
    updateGameDisplay();
}

function endGame() {
    gameActive = false;
    updateGameDisplay();
}

function handleGameClick(e) {
    if (!gameActive) return;
    
    gameScore++;
    
    // Create floating heart
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = (Math.random() * 80 + 10) + '%';
    heart.style.top = (Math.random() * 80 + 10) + '%';
    document.getElementById('gameContainer').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => heart.remove(), 1000);
    
    updateGameDisplay();
}

function updateGameDisplay() {
    const gameContent = document.getElementById('gameContent');
    const gameContainer = document.getElementById('gameContainer');
    
    if (gameActive) {
        gameContainer.classList.add('active');
        gameContent.classList.add('active');
        gameContent.innerHTML = `
            <div class="game-score">${gameScore} 💕</div>
            <button class="btn-secondary" onclick="endGame()">✅ Selesai</button>
        `;
    } else {
        gameContainer.classList.remove('active');
        gameContent.classList.remove('active');
        gameContent.innerHTML = `
            <div style="font-size: 64px; animation: bounce 2s infinite;">💖</div>
            <div style="font-size: 40px; animation: bounce 2s infinite; animation-delay: 0.2s;">✨</div>
            <button class="btn-primary" onclick="startGame()">🎮 Mulai Game</button>
        `;
    }
}

// Music player functions
function togglePlay() {
    const audio = document.getElementById('audioPlayer');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        audio.play();
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
}

function toggleMute() {
    const audio = document.getElementById('audioPlayer');
    const volumeIcon = document.getElementById('volumeIcon');
    const muteIcon = document.getElementById('muteIcon');
    
    isMuted = !isMuted;
    audio.muted = isMuted;
    
    if (isMuted) {
        volumeIcon.style.display = 'none';
        muteIcon.style.display = 'block';
    } else {
        volumeIcon.style.display = 'block';
        muteIcon.style.display = 'none';
    }
}

function updateTime() {
    const audio = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');
    
    if (audio.duration) {
        progressBar.max = audio.duration;
        progressBar.value = audio.currentTime;
        
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function seekAudio(value) {
    const audio = document.getElementById('audioPlayer');
    audio.currentTime = value;
}

// Event listeners
document.getElementById('gameContainer').addEventListener('click', handleGameClick);

// Initialize on load
window.addEventListener('load', init);
