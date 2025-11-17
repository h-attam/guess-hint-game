const riddles = [
    {
        question: "Bazıları var, bazıları yok. Ne kadar ararsan ara, bir tane bulamazsın. Nedir bu?",
        answer: "HAYAL"
    },
    {
        question: "Ben giderim, o kalır. Ben konuşurum, o susar. Nedir benim bu sessiz arkadaşım?",
        answer: "GÖLGE"
    },
    {
        question: "Kanatlarım var ama uçamam, gözlerim var ama göremem. Nedir benim?",
        answer: "BALIK"
    },
    {
        question: "Altından girip üstünden çıkarım. Her gün kullanırım ama hiç yıpranmam. Nedir benim?",
        answer: "KAPI"
    },
    {
        question: "Dilim var ama konuşmam, ayaklarım var ama yürüyemem. Nedir benim?",
        answer: "AYAKKABI"
    }
];

let currentRiddleIndex = 0;
let score = 0;
let attempts = 3;
let currentAnswer = "";

// Elementleri seç
const riddleText = document.getElementById('riddle-text');
const answerInput = document.getElementById('answer-input');
const scoreDisplay = document.getElementById('score');
const attemptsDisplay = document.getElementById('attempts');
const correctLettersDisplay = document.getElementById('correct-letters');
const messageDisplay = document.getElementById('message');

// Oyunu başlat
function initGame() {
    showRiddle();
    updateDisplays();
}

// Bilmece göster
function showRiddle() {
    const currentRiddle = riddles[currentRiddleIndex];
    riddleText.textContent = currentRiddle.question;
    currentAnswer = currentRiddle.answer.toUpperCase();
    correctLettersDisplay.textContent = '-';
    answerInput.value = '';
    messageDisplay.style.display = 'none';
}

// Ekranları güncelle
function updateDisplays() {
    scoreDisplay.textContent = score;
    attemptsDisplay.textContent = attempts;
}

// Cevap kontrolü
function checkAnswer() {
    const userAnswer = answerInput.value.toUpperCase().trim();
    
    if (!userAnswer) {
        showMessage('Lütfen bir cevap yazın!', 'error');
        return;
    }

    if (userAnswer === currentAnswer) {
        // Doğru cevap
        score += 10;
        showMessage('Tebrikler! Doğru cevap! +10 puan', 'success');
        setTimeout(nextCard, 1500);
    } else {
        // Yanlış cevap
        attempts--;
        if (attempts <= 0) {
            showMessage(`Hakkınız bitti! Doğru cevap: ${currentAnswer}`, 'error');
            setTimeout(nextCard, 2000);
        } else {
            const matchingLetters = findMatchingLetters(userAnswer, currentAnswer);
            correctLettersDisplay.textContent = matchingLetters.length > 0 ? matchingLetters.join(', ') : 'Hiç yok';
            showMessage(`Yanlış cevap! ${attempts} hakkınız kaldı.`, 'error');
        }
    }
    
    updateDisplays();
}

// Eşleşen harfleri bul
function findMatchingLetters(userAnswer, correctAnswer) {
    const matches = [];
    const userLetters = userAnswer.split('');
    const correctLetters = correctAnswer.split('');
    
    userLetters.forEach(letter => {
        if (correctLetters.includes(letter) && !matches.includes(letter)) {
            matches.push(letter);
        }
    });
    
    return matches;
}

// Sonraki karta geç
function nextCard() {
    currentRiddleIndex++;
    attempts = 3;
    
    if (currentRiddleIndex >= riddles.length) {
        currentRiddleIndex = 0; // Başa sar
        showMessage('Oyun bitti! Yeniden başlıyor...', 'success');
    }
    
    showRiddle();
    updateDisplays();
}

// Mesaj göster
function showMessage(text, type) {
    messageDisplay.textContent = text;
    messageDisplay.className = `message ${type}`;
    messageDisplay.style.display = 'block';
}

// Enter tuşu desteği
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Oyunu başlat
initGame();
