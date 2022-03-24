# FloatClipBoard

在指定網頁上產生漂浮按鈕，方便使用者直接複製設定好的文字
若要調整按鈕位置，於 GM_addStyle 內的第一個ul.navigation中，有left跟top的數值可以調整
若要設置文字，於 let CS = { 內可以做調整
調整格式如範例
{
    "name": "標籤",
    "content": [
        `內容1`,
        `內容2`,
        `內容3`,
    ]
},
放在 下面的 ], 之前，以免程式碼錯誤
