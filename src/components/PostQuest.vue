<template>
  <body>
    <main>
      <div>
        <ul>
          <li v-for="(key, index) in courseIdList" :key="index">
            <div
              class="card-panel white"
              :class="{ inactive: !questActiveList[key] }"
              @click="moveQuestionView(key)"
            >
              {{ key }}コース <br />
              {{ questCondition["condition"][key].congestion }}人受注 場所：{{
                questCondition["condition"][key].place
              }}
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
  methods: {
    pushReceivingQuest() {
      console.log(this.questCondition);
      db.collection("congestion").doc("questList").update(this.questCondition);
    },
    getUserInfo() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          db.collection(this.$store.state.statusCollection)
            .where("uid", "==", user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((document) => {
                this.questActiveList = document.data().questActiveList;
              });
            });
        }
      });
    },
    getQuestInfo() {
      db.collection("congestion")
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            this.questCondition = document.data();

            for (let key of Object.entries(this.questCondition["condition"])) {
              //console.log("key:" + key[0]);
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
      if (!this.questActiveList[key]) {
        console.log(key + "is not active");
        return;
      }
      let name = this.$store.state.month + key;

      console.log(name);
      this.$router.push({ name: name });
    },
  },
};
</script>

<style>
.inactive {
  opacity: 0.5;
}
</style>