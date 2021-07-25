<template>
  <body>
    <main>
      <div v-if="isNotification" class="blinking notice center-align">
        <p>通知が来ています</p>
      </div>
      <div v-if="!isNotification" class="center-align">
        <p v-if="isCheckIn">QuestⅣ：チェックイン中</p>
      </div>
      <div class="chart-container">
        <RadarChart
          class="radar"
          :chartData="datacollection"
          :options="options"
        />
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
      isRead: false,
      unsubscribe: null,
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
            });
            this.checkNotification();
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
  },
};
</script>

<style>
.notice p {
  background-color: Red;
}
.chart-container {
  width: 100%;
  padding-bottom: 100%;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
}
.row {
  display: flex;
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
</style>
