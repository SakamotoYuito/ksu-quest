<template>
  <body>
    <main>
      <div class="title">
        <p>Questリスト</p>
      </div>
      <div>
        <ul>
          <div
            v-if="
              emergencyQuest['status'] == 'active' ||
              emergencyQuest['status'] == 'cleared'
            "
            class="card-panel"
            :class="{
              cleared: emergencyQuest['status'] == 'cleared',
              blinking: emergencyQuest['status'] == 'active',
            }"
            @click="moveQuestionView('emergency')"
          >
            !!!緊急クエスト!!! <br />
            {{ questCondition["emergencyQuest"]["message"] }}
            場所：{{ questCondition["emergencyQuest"]["place"] }}
          </div>

          <li v-for="(key, index) in courseIdList" :key="index">
            <div
              class="card-panel"
              :class="{
                inactive: questActiveList[key]['status'] == 'inactive',
                cleared: questActiveList[key]['status'] == 'cleared',
              }"
              @click="moveQuestionView(key)"
            >
              {{ key }}コース <br />
              {{ questCondition["condition"][key].congestion }}人受注 場所：{{
                questCondition["condition"][key].place
              }}

              <span v-if="questActiveList[key]['pointScale'] > 1">
                報酬{{ questActiveList[key]["pointScale"] }}倍！
              </span>
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
    this.getUserInfo();
    this.getQuestInfo();
    // this.postQuest('Network')
    // setTimeout(() => {
    //   this.pushReceivingQuest()
    // }, 1000)
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
    pushReceivingQuest() {
      console.log(this.questCondition);
      db.collection("congestion").doc("questList").update(this.questCondition);
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
    postQuest(questName) {
      this.questId = questName;
      this.getQuestInfo();
      setTimeout(() => {
        this.questCondition["condition"][this.questId]["congestion"] += 1;
      }, 1000);
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
      db.collection(this.$store.state.accesslogCollection).add({
        date: now,
        place: key,
        answer: "クエスト受注",
        uid: this.user.uid,
      });
    },
  },
};
</script>

<style>
.inactive {
  opacity: 0.5;
  background-color: white;
}
.cleared {
  background-color: lightgreen;
}
.blinking {
  background-color: #fc2b7f;
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