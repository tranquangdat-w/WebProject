// Math.random() Will create a random number in range[0, 1)
            let score = JSON.parse(localStorage.getItem('score')) || {losses: 0, wins: 0, ties: 0};

            updateScoreElement();            
            
            function playGame(playerMove) {
                let computerMove = pickComputerMove();
                
                let result;

                if (playerMove === 'Rock') {
                    if (computerMove === 'Rock') {
                        result = 'Tie';
                    } else {
                        result = (computerMove === 'Scissors') ? 'You win' : 'You lose';
                    }
                } else if (playerMove === 'Paper') {
                    if (computerMove === 'Paper') {
                        result = 'Tie';
                    } else {
                        result = (computerMove === 'Rock') ? 'You win' : 'You lose';
                    }
                } else {
                    if (computerMove === 'Scissors') {
                        result = 'Tie';
                    } else {
                        result = (computerMove === 'Paper') ? 'You win' : 'You lose';
                    }
                }

                if (result === 'Tie') {
                    score.ties += 1;
                } else if(result === 'You lose') {
                    score.losses += 1;
                } else if (result === 'You win') {
                    score.wins += 1;
                }

                localStorage.setItem('score', JSON.stringify(score));
                updateScoreElement();
                updateMove(playerMove, computerMove);
                updateResult(result);
            }

            function updateScoreElement() {
                document.querySelector('.js-score')
                    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
            }

            function pickComputerMove() {
                let randomNumber = Math.random();  
                let computerMove = '';

                if (randomNumber <= 1 / 3) {
                    computerMove = 'Rock';
                } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
                    computerMove = 'Paper';
                } else if (randomNumber > 2 / 3) {
                    computerMove = 'Scissors';
                }

                return computerMove;
            }

            function updateMove(playerMove, computerMove) {
                document.querySelector('.js-moves')
                    .innerHTML = `You 
                    <img src="${displayMoves(playerMove)[0]}" alt="${displayMoves(playerMove)[1]}-icon" class="play-icon"> 
                    <img src="${displayMoves(computerMove)[0]}" alt="${displayMoves(computerMove)[1]}-icon" class="play-icon"> 
                    Computer`;               
            }

            function displayMoves(move) {
                let moveSrcImg = '';
                let alterIcon = '';

                if (move === 'Rock') {
                    moveSrcImg = './img/rock-emoji.png';
                    alterIcon = 'rock';
                } else if (move === 'Paper') {
                    moveSrcImg = './img/paper-emoji.png';
                    alterIcon = 'paper';
                } else if (move === "Scissors") {
                    moveSrcImg = './img/scissors-emoji.png';
                    alterIcon = 'scissors';
                }

            return [moveSrcImg, alterIcon];
            }

            function updateResult(result) {
                document.querySelector('.js-result')
                    .innerHTML = result;
            }