console.log("web_audio.js"); // ファイル読み込み確認

const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let audioCtx = null;

const playButton = document.getElementById('playButton'); // 再生ボタン
const stopButton = document.getElementById('stopButton'); // 停止ボタン

// 初期値を設定
const text = document.getElementsByClassName("textcontent")[0];
const textWidth = text.scrollWidth; // テキスト全体の幅
const movePerSecond = textWidth / (5*60 + 4); // 5分4秒でスクロールするための移動量
const ajust = 100; // 調整値
// フレームレート30fps
var speed = -1 * movePerSecond / ajust; //スクロール量（1 = 1px）
// 参考 一行当たり26.25px
var interval = 5000 / ajust; //スクロール間隔（1000 = 1秒）
// 一行当たりの秒数 * 30

playButton.addEventListener('click', () => {
    $('#playButton').hide();
    $('#stopButton').show();
    // ユーザー操作後に audio.play() を呼び出す
    audio.play();
    // audio.currentTime = 0; // 再生位置を先頭に戻す

    // オーディオビジュアライザーの描画
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

            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = canvas.width / (bufferLength * 2);
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 255 * canvas.height;
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(x, (canvas.height - barHeight) / 2, barWidth, barHeight);
                // ctx.roundRect(x, (canvas.height - barHeight)/2, barWidth, barHeight, 10);
                ctx.fill();
                x += barWidth * 2;
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

    // スクロール処理
    var scroll = setInterval(function () {
        var scrollLeft = text.scrollLeft; // 現在のスクロール量を計測
        var scrollwidth = scrollLeft + speed; // 次の移動先までの距離を指定
        text.scrollLeft = scrollwidth   // スクロールさせる
        $('#stop').off('click');      // on clickの重複防止のため

    //スクロール中に停止ボタンが押された時
    $('#stopButton').on('click', function () {
        clearInterval(scroll);      // setIntervalの処理を停止
        $(this).hide();             // 停止ボタンを非表示にして、
        $('#playButton').show();         // 再生ボタンを表示
        audio.pause();              // 音楽を停止
    });
    }, interval);  // setIntervalを変数intervalの間隔で繰り返す。
});

stopButton.addEventListener('click', () => {
    // audio.currentTime = 0;
});