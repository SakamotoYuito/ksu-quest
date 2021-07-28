<template>
  <body>
    <main>
      <div class="center-align">
        <p v-if="isCheckIn">QuestⅣ：チェックイン中</p>
        <p v-if="!isCheckIn">QuestⅣにチェックインしてください</p>
      </div>
      <div class="pageTitle">
        <p>Questメニュー</p>
      </div>
      <div>
        <ul>
          <div
            v-if="
              emergencyQuest['status'] == 'active' ||
              emergencyQuest['status'] == 'cleared'
            "
            class="card-panel z-depth-2"
            :class="{
              cleared: emergencyQuest['status'] == 'cleared',
              blinking: emergencyQuest['status'] == 'active',
            }"
            @click="moveQuestionView('emergency')"
          >
            <img
              v-if="emergencyQuest['status'] == 'cleared'"
              class="clear"
              src="@/assets/questClear.png"
            />
            <img src="@/assets/screw.png" class="screw1" />
            <img src="@/assets/screw.png" class="screw2" />
            <img src="@/assets/screw.png" class="screw3" />
            <img src="@/assets/screw.png" class="screw4" />
            <p
              :class="{
                emergency: emergencyQuest['status'] == 'active',
                questName: emergencyQuest['status'] == 'cleared',
              }"
            >
              !!!緊急Quest!!!
            </p>
            <a class="place">
              {{ questCondition["emergencyQuest"]["message"] }}<br />
              場所：{{ questCondition["emergencyQuest"]["place"] }}
            </a>
          </div>
          <li v-for="(key, index) in courseIdList" :key="index">
            <div
              class="card-panel z-depth-2"
              :class="{
                inactive: questActiveList[key]['status'] == 'inactive',
                cleared: questActiveList[key]['status'] == 'cleared',
              }"
              @click="moveQuestionView(key)"
            >
              <img src="@/assets/screw.png" class="screw1" />
              <img src="@/assets/screw.png" class="screw2" />
              <img src="@/assets/screw.png" class="screw3" />
              <img src="@/assets/screw.png" class="screw4" />
              <img
                v-if="questActiveList[key]['status'] == 'cleared'"
                class="clear"
                src="@/assets/questClear.png"
              />
              <p class="reward" v-if="questActiveList[key]['pointScale'] > 1">
                報酬{{ questActiveList[key]["pointScale"] }}倍！
              </p>
              <div>
                <p class="questName">
                  {{ questCondition["condition"][key].courseName }}
                </p>
              </div>
              <a class="monster">
                魔獣
                <a class="bold">
                  {{ questCondition["condition"][key].monsterName }}
                </a>
                を倒せ！<br />
              </a>
              <a class="place">
                場所：{{ questCondition["condition"][key].place }}<br />
              </a>
              <a class="postNumber">
                {{ questCondition["condition"][key].congestion }}人受注中
              </a>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </body>
</template>

<script>
import db from "@/plugins/firebase";
import firebase from "firebase";
export default {
  name: "PostQuest",
  data() {
    return {
      user: null,
      isCheckIn: false,
      questCondition: null,
      questId: null,
      questActiveList: null,
      courseIdList: [],
      emergencyQuest: null,
      userSubscribe: null,
      congestionSubscribe: null,
    };
  },
  mounted() {
    this.getCheckin();
    this.getUserInfo();
    this.getQuestInfo();
  },
  beforeDestroy() {
    if (this.userSubscribe != null) {
      this.userSubscribe();
    }
    if (this.congestionSubscribe != null) {
      this.congestionSubscribe();
    }
  },
  methods: {
    getCheckin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection(this.$store.state.userCollection)
            .where("uid", "==", user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((document) => {
                this.isCheckIn = document.data().checkIn;
              });
            });
        }
      });
    },
    getUserInfo() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.userSubscribe = db
            .collection(this.$store.state.statusCollection)
            .where("uid", "==", user.uid)
            .onSnapshot((snapshot) => {
              snapshot.forEach((document) => {
                this.questActiveList = document.data().questActiveList;
                this.emergencyQuest = document.data().emergencyQuest;
              });
            });
        }
      });
    },
    getQuestInfo() {
      this.congestionSubscribe = db
        .collection("congestion")
        .onSnapshot((snapshot) => {
          snapshot.forEach((document) => {
            this.questCondition = document.data();
            this.courseIdList = [];
            for (let key of Object.entries(this.questCondition["condition"])) {
              this.courseIdList.push(key[0]);
            }
          });
          this.courseIdList.sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
        });
    },
    moveQuestionView(key) {
      if (key == "emergency") {
        if (
          this.emergencyQuest["status"] == "inactive" ||
          this.emergencyQuest["status"] == "cleared"
        ) {
          return;
        }
        this.$router.push({ name: "EmergencyQuestDescription" });
      }
      this.writeLog(key);
      if (
        this.questActiveList[key]["status"] == "inactive" ||
        this.questActiveList[key]["status"] == "cleared"
      ) {
        return;
      }
      let name = this.$store.state.month + key;
      this.$router.push({ name: name });
    },
    writeLog(key) {
      const now = new Date();
      let place = key + "/checkin:" + this.isCheckIn;
      db.collection(this.$store.state.accesslogCollection).add({
        date: now,
        place: place,
        answer: "クエスト受注",
        uid: this.user.uid,
      });
    },
  },
};
</script>

<style>
.pageTitle {
  margin: 5px;
}
.pageTitle p {
  font-size: 1.8em;
  text-align: center;
}
.card-panel {
  position: relative;
}
.card-panel .screw1 {
  position: absolute;
  width: 15px;
  height: auto;
  top: 0;
  left: 0;
  margin: auto;
  transform: rotate(-5deg);
}
.card-panel .screw2 {
  position: absolute;
  width: 15px;
  height: auto;
  top: 0;
  right: 0;
  margin: auto;
  transform: rotate(5deg);
}
.card-panel .screw3 {
  position: absolute;
  width: 15px;
  height: auto;
  bottom: 0;
  left: 0;
  margin: auto;
  transform: rotate(10deg);
}
.card-panel .screw4 {
  position: absolute;
  width: 15px;
  height: auto;
  bottom: 0;
  right: 0;
  margin: auto;
  transform: rotate(-10deg);
}
.card-panel .clear {
  position: absolute;
  width: 50%;
  max-width: 200px;
  height: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  transform: rotate(-30deg);
}
.card-panel p {
  color: black;
  margin: 0;
  padding-bottom: 5px;
}
.card-panel .questName {
  text-align: left;
  text-decoration: underline solid black;
}
.card-panel .reward {
  font-weight: bold;
  text-align: right;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: red;
  padding: 0;
}
.card-panel a {
  color: black;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 13px;
}
.card-panel .bold {
  font-weight: bold;
}
.card-panel .place {
  text-align: right;
}
.inactive {
  opacity: 0.1;
  background-color: white;
}
.cleared {
  background-color: lightgreen;
}
.card-panel .emergency {
  color: white;
}
.blinking {
  background-color: #f15b15;
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  -webkit-animation: blink 1s ease-in-out infinite alternate;
  -moz-animation: blink 1s ease-in-out infinite alternate;
  animation: blink 1s ease-in-out infinite alternate;
}
@-webkit-keyframes blink {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>