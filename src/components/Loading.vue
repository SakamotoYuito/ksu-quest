<template>
  <body>
    <div class="loader">Loading...</div>
  </body>
</template>

<script>
import db from "@/plugins/firebase";
import firebase from "firebase";
export default {
  name: "Loading",
  props: ["status", "place", "answer"],
  created() {
    this.dbWriting();
  },
  methods: {
    dbWriting() {
      let urlStatus = this.status;
      let docID = null;
      let dbList = null;
      const now = new Date();
      let user = firebase.auth().currentUser;
      let uid = user.uid;
      if (user) {
        db.collection(this.$store.state.accesslogCollection).add({
          date: now,
          place: this.place,
          answer: this.answer,
          uid: uid,
        });
        db.collection(this.$store.state.statusCollection)
          .where("uid", "==", uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              docID = document.id;
              dbList = document.data();
            });
          })
          .then(() => {
            dbList = this.updateDbList(urlStatus, dbList);
            db.collection(this.$store.state.statusCollection)
              .doc(docID)
              .update(dbList);
          })
          .then(() => {
            setTimeout(() => {
              this.$router.push({ name: "Status" });
            }, 2000);
          });
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    updateDbList(urlStatus, dbList) {
      let pointScale = 1.0;
      let courseId = this.place.split("/")[0];
      if (courseId in dbList["questActiveList"]) {
        dbList["questActiveList"][courseId]["status"] = "cleared";
        pointScale = dbList["questActiveList"][courseId]["pointScale"];
        dbList["mysteryCounter"] += pointScale;
      }
      urlStatus.forEach((element) => {
        let key = element.split(":")[0];
        let value = element.split(":")[1];
        dbList[key] = Number(dbList[key]) + Number(value) * pointScale;
      });
      if (pointScale > 1) {
        dbList["questActiveList"][courseId]["pointScale"] = 1.0;
      }
      if (courseId == "emergency") {
        dbList["emergencyQuest"]["status"] = "cleared";
      }
      if (dbList["mysteryCounter"] >= 10) {
        dbList["noticeList"][1]["isDisplay"] = true;
        console.log(dbList["noticeList"]);
      }
      return dbList;
    },
  },
};
</script>