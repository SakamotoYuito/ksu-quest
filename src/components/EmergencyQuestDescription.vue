<template>
  <body>
    <main>
      <div class="emergency">
        <p>緊急 Quest</p>
      </div>
      <div class="card-panel z-depth-2">
        <img src="@/assets/screw.png" class="screw1" />
        <img src="@/assets/screw.png" class="screw2" />
        <img src="@/assets/screw.png" class="screw3" />
        <img src="@/assets/screw.png" class="screw4" />
        <p class="cardTitle">Mission</p>
        <p class="message">
          インフォ魔王の手によって，神山のロボット戦士NAOが
          <a class="bold"> ハッキング </a>された．
        </p>
        <p class="message">
          今すぐ地図を確認して，14号館1階の
          <a class="bold">ロボット研究所</a>
          へ向かうよう．
        </p>
        <p class="message">
          ロボット研究所での謎を解き，見事ハッキングを解除した勇者には新たなスキルを授ける．
        </p>
        <p class="sign">神山Quest リーダー</p>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "EmergencyQuestDescription",
};
</script>

<style>
.emergency p {
  background-color: red;
  text-align: center;
  font-size: 25px;
}
.cardTitle {
  text-align: center;
  font-size: 18px;
}
.message {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 13px;
}
.card-panel a {
  font-size: 14px;
}
.sign {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-align: right;
}
</style>