# 口袋教練 Pocket Coach

今天練什麼、器材被占用換什麼、下次加多少。

手機優先的重訓網頁：點肌肉圖選部位（附系統建議），產生附動畫示意圖的課表；器材有人在用時一鍵換動作；每組回報「太輕／剛好／太重」，自動調整下一組和下次的重量。程式設計期末專題。

## 線上版

GitHub Pages 開啟後的網址：`https://kobechiu.github.io/pocket-coach/`

## 文件

- 期末專案企劃書（11/24 繳交）：[內容](docs/proposal.md)｜[Word 檔](docs/proposal.docx)｜[PDF](docs/proposal.pdf)

修改企劃書時，`proposal.md` 是原稿；改完記得同步更新 Word 檔與 PDF。

## 在自己電腦上跑

不需要安裝任何套件，只要有 Python（macOS 內建）：

```bash
cd pocket-coach
python3 -m http.server 8000
```

打開 <http://localhost:8000>。改完檔案重新整理就看得到。

也可以直接用瀏覽器打開 `index.html`，但部分瀏覽器對本機檔案有限制，建議用上面的方式。

## 檔案

| 檔案 | 內容 | 誰最常改 |
|---|---|---|
| `index.html` | 頁面骨架 | 很少改 |
| `style.css` | 所有樣式；最上面的 `:root` 是顏色與字型設定（淺色、深色各一組） | 介面 |
| `app.js` | 所有程式。依區塊分段，搜尋註解標題就能找到 | 見下表 |

`app.js` 的主要區塊：

| 區塊（搜尋這段註解） | 內容 |
|---|---|
| `動作資料` | 48 個動作：名稱、肌群、器材、難度、起始重量、動作要點。**校對動作資料改這裡** |
| `示意圖` | 每個動作模式的起始／結束姿勢座標，以及繪製方式 |
| `台大健身中心人數` | 首頁的人數資料（目前是 11/16 的固定資料） |
| `計算` | 恢復狀態、起始重量、課表產生、換動作、下次重量建議的規則 |
| `畫面` | 問卷、首頁、課表、訓練中、紀錄、我的 |
| `事件` | 按鈕點擊後做什麼 |

## 組員怎麼一起改

1. 接受 repo 的協作邀請（email 或 GitHub 通知）。
2. 下載專案：
   ```bash
   git clone https://github.com/kobechiu/pocket-coach.git
   ```
3. 每次要改東西，先開一個自己的分支：
   ```bash
   git switch -c 你的名字/要改的事
   ```
4. 改完、在本機確認沒問題後：
   ```bash
   git add -A
   git commit -m "說明改了什麼"
   git push -u origin HEAD
   ```
5. 到 GitHub 網頁按 **Compare & pull request** 開 PR，請另一位組員看過再按 Merge。合併到 `main` 後，線上版約 1 分鐘內自動更新。

開始改之前先 `git switch main && git pull`，拿到大家最新的版本，可以減少衝突。

## 注意

- 紀錄存在使用者手機的瀏覽器裡（localStorage），換手機或清除瀏覽器資料就會不見。
- 動作提示、起始重量與示意圖都是一般原則，正式使用前要請懂重訓的人校對。
- 台大健身中心人數來自另一個 repo [`gym-crowd`](https://github.com/kobechiu/gym-crowd) 的收集程式；網頁之後可以改成直接讀取它的 `data/latest.json`。
