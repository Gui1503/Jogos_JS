// Variáveis dos jogadores e pontuações
let scores, currentScore, activePlayer, playing;

// Função de inicialização do jogo
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Atualizar a interface do usuário
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  // Esconder o vencedor
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
}

// Função para trocar de jogador
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

// Inicialize o jogo
init();

// Evento de clique no botão "Roll Dice"
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    // Gerar um número aleatório entre 1 e 6
    const dice = Math.floor(Math.random() * 6) + 1;

    // Exibir a imagem do dado correspondente
    const diceElement = document.querySelector('.dice');
    diceElement.src = `dice-${dice}.png`;

    // Verificar se o resultado foi 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Passar para o próximo jogador
      switchPlayer();
    }
  }
});

// Evento de clique no botão "Hold"
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    // Adicionar a pontuação atual à pontuação do jogador ativo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Verificar se o jogador ganhou
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.querySelector('.dice').style.display = 'none';
    } else {
      // Passar para o próximo jogador
      switchPlayer();
    }
  }
});

// Evento de clique no botão "New Game"
document.querySelector('.btn--new').addEventListener('click', init);
