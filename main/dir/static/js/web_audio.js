console.log("web_audio.js"); // ファイル読み込み確認

const boxes = [];
// div要素の配置
for (let i = 0; i < FFT_SIZE / 2; i++) { // FFT_SIZE / 2 は 64
    const div = document.createElement("div");
    div.classList.add("box");
    containerElement.append(div);
    boxes[i] = div; // 配列に保存
}

const context = new AudioContext();

// アナライザーを生成
const nodeAnalyser = context.createAnalyser();
// フーリエ変換を行う分割数。2の乗数でなくてはならない
nodeAnalyser.fftSize = FFT_SIZE;
// 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
nodeAnalyser.smoothingTimeConstant = 0.85;
// オーディオの出力先を設定
nodeAnalyser.connect(context.destination);

// audio 要素と紐付ける
const nodeSource = context.createMediaElementSource(audioElement);
nodeSource.connect(nodeAnalyser);

loop();

/** 描画します */
function loop() {
    requestAnimationFrame(loop);

    // 波形データを格納する配列の生成
    const freqByteData = new Uint8Array(FFT_SIZE / 2);
    // それぞれの周波数の振幅を取得
    nodeAnalyser.getByteFrequencyData(freqByteData);

    // 🌟この処理を追加🌟
    // 高さの更新
    for (let i = 0; i < freqByteData.length; i++) {
        const freqSum = freqByteData[i]; // 🌟解析した音の値を取得
        // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
        const scale = freqSum / 256;

        // Y軸のスケールを変更
        const div = boxes[i]; // 🌟DOM要素を取得
        div.style.scale = `1 ${scale}`; // 🌟適用
}
}