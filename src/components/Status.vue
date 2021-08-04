<template>
  <body>
    <main>
      <div class="row">
        <div class="col s12">
          <div v-if="isNotification" class="blinking notice center-align">
            <p>通知が来ています</p>
          </div>
        </div>
        <div class="col s12">
          <div v-if="isEmergency" class="blinking notice center-align">
            <p>緊急Questが来ています</p>
          </div>
        </div>
        <div class="col s12">
          <div
            v-if="!isNotification && !isEmergency"
            class="checkIn center-align"
          >
            <p v-if="isCheckIn">QuestⅣ：チェックイン中</p>
          </div>
        </div>
        <div class="col s12">
          <div class="chart-container">
            <RadarChart
              class="radar"
              :chartData="datacollection"
              :options="options"
            />
          </div>
        </div>
        <div v-if="isCheckIn && point < 10" class="skill col s12">
          <p class="center">魔獣を倒して引換券を手に入れよう！</p>
          <a>獲得報酬</a>
          <div class="progress">
            <div class="determinate" :style="{ width: healthBar() }"></div>
          </div>
          <a class="right">引換券獲得まであと：{{ 10 - point }}</a>
        </div>
        <div v-if="isCheckIn && point >= 10" class="skill col s12">
          <p class="center" style="color: lime">引換券を手に入れた！</p>
          <div class="card-panel z-depth-2 row">
            <img class="coupon col s4" src="@/assets/coupon.png" />
            <div class="col s8">
              <p class="cardTitle">引換券</p>
              <p class="message">
                ロボット研究所で好きな飲み物と交換できます！<br />
                終了時間までにロボット研究所に寄って声をかけてください！
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebase";
import RadarChart from "@/resources/RadarChart.js";
import store from "@/store";

export default {
  name: "Status",
  components: {
    RadarChart,
  },
  data() {
    return {
      user: null,
      userID: null,
      isCheckIn: false,
      Network: 0,
      Security: 0,
      DataScience: 0,
      Robot: 0,
      Infrastructure: 0,
      IoT: 0,
      Fabrication: 0,
      Brain: 0,
      Media: 0,
      SE: 0,
      noticeList: null,
      emergencyQuest: null,
      datacollection: null,
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: "white",
            fontFamily: "PixelMplus12-Bold",
          },
        },
        scale: {
          pointLabels: {
            fontSize: 11,
            fontColor: "white",
            fontFamily: "PixelMplus12-Bold",
          },
          gridLines: {
            display: true,
            color: "rgba(255, 255, 255, 0.7)",
          },
          ticks: {
            display: true,
            fontFamily: "PixelMplus12-Bold",
            backdropColor: "rgba(255, 255, 255, 0)",
            fontColor: "rgba(255, 255, 255)",
            min: -1,
            max: 5,
            stepSize: 1,
          },
          angleLines: {
            display: true,
            color: "rgba(255, 255, 255, 0.3)",
          },
        },
        title: {
          display: true,
          fontSize: 35,
          text: "ステータス",
          fontColor: "white",
          fontFamily: "PixelMplus12-Bold",
        },
      },
      isClick: false,
      isCamera: false,
      isBell: false,
      isNotification: false,
      isEmergency: false,
      isRead: false,
      unsubscribe: null,
      point: 0,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.uid = this.user.uid;
        this.listen(this.uid);
        db.collection(this.$store.state.userCollection)
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.userID = document.data().user_id;
              this.isCheckIn = document.data().checkIn;
            });
          })
          .then(() => {
            db.collection(this.$store.state.statusCollection)
              .where("uid", "==", user.uid)
              .get()
              .then((snapshot) => {
                snapshot.forEach((document) => {
                  this.Network = document.data().Network;
                  this.Security = document.data().Security;
                  this.DataScience = document.data().DataScience;
                  this.Robot = document.data().Robot;
                  this.Infrastructure = document.data().Infrastructure;
                  this.IoT = document.data().IoT;
                  this.Fabrication = document.data().Fabrication;
                  this.Brain = document.data().Brain;
                  this.Media = document.data().Media;
                  this.SE = document.data().SE;
                });
              })
              .then(() => {
                this.RadarChart();
              });
          });
      } else {
        this.user = null;
        this.$router.push({ name: "Home" });
      }
    });
  },
  beforeDestroy() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
      store.commit("SET_UNSUBSCRIBE", null);
    }
  },
  methods: {
    listen(uid) {
      if (this.$store.state.unsubscribeSnapshot == null) {
        this.unsubscribe = db
          .collection(this.$store.state.statusCollection)
          .where("uid", "==", uid)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.noticeList = doc.data().noticeList;
              this.emergencyQuest = doc.data().emergencyQuest;
              this.point = doc.data().mysteryCounter;
            });
            this.checkNotification();
            this.checkEmergencyQuest();
          });
        store.commit("SET_UNSUBSCRIBE", this.unsubscribe);
      }
    },
    RadarChart() {
      this.datacollection = {
        labels: [
          "ネットワーク",
          "セキュリティ",
          "データ",
          "ロボット",
          "基盤設計",
          "組込み",
          "デジファブ",
          "脳科学",
          "メディア処理",
          "情報システム",
        ],
        datasets: [
          {
            backgroundColor: "rgba(0, 255, 0, 0.9)",
            borderWidth: 1,
            pointBackgroundColor: "rgba(0, 255, 0)",
            pointRadius: 1.6,
            label: this.userID + "さん",
            data: [
              this.Network,
              this.Security,
              this.DataScience,
              this.Robot,
              this.Infrastructure,
              this.IoT,
              this.Fabrication,
              this.Brain,
              this.Media,
              this.SE,
            ],
          },
        ],
      };
      let minData = Math.min.apply(
        null,
        this.datacollection["datasets"][0]["data"]
      );
      let maxData = Math.max.apply(
        null,
        this.datacollection["datasets"][0]["data"]
      );
      let ticks = this.options["scale"]["ticks"];
      if (minData > 7 || maxData > 10) {
        ticks["max"] = 15;
        ticks["stepSize"] = 3;
      } else if (minData > 3 || maxData > 6) {
        ticks["max"] = 10;
        ticks["stepSize"] = 2;
      }
    },
    reader() {
      if (!this.isClick) {
        this.$router.push({ name: "Reader" });
        this.isClick = true;
        this.isCamera = false;
      }
    },
    notification() {
      if (!this.isClick) {
        this.$router.push({ name: "Notification" });
        this.isClick = true;
        this.isBell = false;
      }
    },
    checkNotification() {
      if (this.noticeList) {
        for (let i = 0; i < Object.keys(this.noticeList).length; i++) {
          if (!this.noticeList[i].isRead && this.noticeList[i].isDisplay) {
            this.isNotification = true;
            break;
          } else {
            this.isNotification = false;
          }
        }
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    checkEmergencyQuest() {
      if (this.emergencyQuest["status"] == "active") {
        this.isEmergency = true;
      } else {
        this.isEmergency = false;
      }
    },
    healthBar() {
      if (this.point > 10) {
        this.point = 10;
      } else if (this.point < 0) {
        this.point = 0;
      }
      let percent = 10 * this.point;
      let style = percent + "%";
      return style;
    },
  },
};
</script>

<style>
.notice p {
  background-color: Red;
  margin: 5px;
}
.checkIn p {
  margin: 0px;
}
.chart-container {
  width: 100%;
  padding-bottom: 100%;
}
.row .col {
  padding: 0;
  margin: 0;
}
.row {
  height: 100%;
  width: 100%;
}
.icon {
  margin-top: 5px;
}
.chartjs-render-monitor {
  position: absolute;
  top: max(20%, 100px);
}
.radar {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  max-height: 400px;
  margin-left: auto;
  margin-right: auto;
}
.blinking {
  -webkit-animation: blink 1s ease-in-out infinite alternate;
  -moz-animation: blink 1s ease-in-out infinite alternate;
  animation: blink 1s ease-in-out infinite alternate;
}
@-webkit-keyframes blink {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
.skill {
  margin: 7vmax;
}
.skill p {
  font-size: 15px;
  margin-top: 12vmax;
}
.skill a {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.progress {
  position: relative;
  height: 15px;
  display: block;
  top: 80%;
  width: 100%;
  background-color: black;
  border-radius: 2px;
  margin: 0.5rem 0 1rem 0;
  overflow: hidden;
  margin: 0px;
}
.progress .determinate {
  background-color: lime;
  -webkit-transition: width 0.3s linear;
  transition: width 0.3s linear;
}
.coupon {
  width: 200px;
  height: auto;
  transform: rotate(30deg);
}
.col .row {
  margin: 0;
}
</style>
