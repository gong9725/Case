/* = associar a uma constante os seletores CSS */
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const audioJump = document.querySelector('.audiojump');
const gameOver = document.querySelector('.gameover');
const textStart = document.querySelector('#text-start');
const textGameOver = document.querySelector('#text-gameover'); // 新增选择器

let isPaused = true; // 添加变量来跟踪游戏是否暂停
let life = 3;
let score = 0;

const updateStats = () => {
    document.getElementById('life').textContent = `生命值: ${life}`;
    document.getElementById('score').textContent = `分数: ${score}`;
    if (score >= 10) {
        pipe.style.animation = 'none';
        mario.style.animation = 'none';
        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        gameOver.currentTime = 0.1;
        gameOver.volume = 0.2;
        gameOver.play();
        textStart.style.display = 'none'; // 隐藏“start”文本
        textGameOver.style.display = 'block'; // 显示“GAME OVER”文本
        textGameOver.innerHTML = "<strong>恭喜通关！</strong>";
        clearInterval(loop);
    }
};

/*========================loop principal do Game========================*/
const loop = setInterval(() => {
    if (isPaused) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        life -= 1;
        updateStats();
        if (life <= 0) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px'

            gameOver.currentTime = 0.1;
            gameOver.volume = 0.2;
            gameOver.play();

            textStart.style.display = 'none'; // 隐藏“start”文本
            textGameOver.style.display = 'block'; // 显示“GAME OVER”文本
            clearInterval(loop);
        }
        pipe.style.animation = 'none';
        setTimeout(() => {
            pipe.style.animation = 'pipe-animation 1.5s infinite linear';
        }, 500);
    }
}, 10);

const rotinapular = () => {
    if (isPaused) return; // 如果游戏暂停，则不执行跳转逻辑
    mario.classList.add('jump');
    audioJump.currentTime = 0.1;
    audioJump.volume = 0.1;
    audioJump.play();
    setTimeout(() => {
        mario.classList.remove('jump');
        score += 1;
        updateStats();
    }, 300); // 将跳跃动画的持续时间从500ms减少到300ms，加快跳跃速度
}

const startGame = () => {
    isPaused = false; // 开始游戏
    textStart.style.display = 'none'; // 隐藏“start”文本
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') { // 仅允许“上”方向键控制马里奥弹起
        rotinapular();
    } else if (event.code === 'Space') { // 保留空格键用于开始游戏
        startGame();
    }
});

textStart.addEventListener('click', startGame); // 点击“start”文本开始游戏