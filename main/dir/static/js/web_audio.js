console.log("web_audio.js"); // ファイル読み込み確認

const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let audioCtx = null;

const playButton = document.getElementById('playButton'); // 再生ボタン

playButton.addEventListener('click', () => {
    // ユーザー操作後に audio.play() を呼び出す
    audio.play();
    if (!audioCtx) {
        // ... (AudioContext の設定、ノードの接続など) ...
        audioCtx = new AudioContext();

        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        analyser.fftSize = 64; // FFT サイズ
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            console.log('draw');

            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = canvas.width / (bufferLength*2);
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 255 * canvas.height;
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(x, (canvas.height - barHeight)/2, barWidth, barHeight);
                // ctx.roundRect(x, (canvas.height - barHeight)/2, barWidth, barHeight, 10);
                ctx.fill();
                x += barWidth*2;
            }
            requestAnimationFrame(draw);
        }

        draw();


        // 初回は resume() が必要
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                console.log('AudioContext resumed successfully');
            }).catch(error => {
                console.error('Error resuming AudioContext:', error);
            });
        }
    }
});

stopButton.addEventListener('click', () => {
    audio.pause();
    // audio.currentTime = 0;
});