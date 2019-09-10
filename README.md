9/9:
完成 : 首頁書籍列表 (串API) / 詳細書籍頁面
困難 : 第一次接觸 Hydra Database
預計 : 修改書籍資料 / 無限捲動

9/10:
完成 : 新增及編輯圖書
困難 : 第一次使用 PUT method
預計 : 研究 Redux

功能: 
* 首頁:
1. 圖書列表
2. 列表滑動到底時自動載入下一頁資料
3. 點擊卡片進入圖書詳細頁面
4. 在頂時往下拉動將更新列表資料
5. header New為新增圖書功能

* 詳細頁面:
1. 顯示作者 / 日期 / 敘述
2. header Edit 為編輯此圖書資訊

* 編輯:
1. 將此圖書的原本資料 (名稱 / 作者 / 時間 / 敘述) 列出，並可以修改
2. 若有修改資料，點擊 Back 會更新詳細頁面的資料

* 新增:
1. 可以輸入書籍 名稱 / 作者 / 敘述
2. 時間為當下時間 ( new Date() )
3. isbn 設定為 null

# nice to meet you
1. 閱讀並理解 https://demo.api-platform.com/books 
中的關於圖書的 API。
2. 使用[React Native](https://facebook.github.io/react-native/), [React Navigation](https://reactnavigation.org/), 以及上述 API構建一個簡單的 App。包括三個頁面：
* [圖書列表](https://i.imgur.com/yF21CqS.png)
* [圖書詳情](https://i.imgur.com/U6n7Ci8.png)
* [增加或編輯圖書](https://i.imgur.com/GELu336.png)
  
3. 以 Pull-Request 的方式將代碼提交。

## 進階要求
1. 使用 [Redux](https://github.com/reduxjs/redux)。
2. 將[圖書列表]頁面加載更多的按鈕功能改為滾動實現。
