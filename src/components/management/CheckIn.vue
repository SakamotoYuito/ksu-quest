<template>
  <body>
    <main>
      <div class="CheckIn">
        <p>チェックインが<br />完了しました！</p>
        <p>Questメニューページに<br />移動します</p>
        <div class="loader">Loading...</div>
      </div>
    </main>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <a class="icon">
              <font-awesome-icon icon="arrow-left" size="3x" color="gray" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
import db from "@/plugins/firebase";
import firebase from "firebase";
export default {
  name: "CheckIn",
  data() {
    return {
      user: null,
      uid: null,
      docID: null,
      noticeList: [],
    };
  },
  created() {
    this.checkIn();
  },
  methods: {
    checkIn() {
      this.user = firebase.auth().currentUser;
      this.uid = this.user.uid;
      if (this.user) {
        db.collection(this.$store.state.statusCollection)
          .where("uid", "==", this.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.docID = document.id;
              this.noticeList.push(document.data().noticeList);
            });
          })
          .then(() => {
            this.noticeList[0][0].isDisplay = true;
            db.collection(this.$store.state.statusCollection)
              .doc(this.docID)
              .update({
                noticeList: this.noticeList[0],
              });
          })
          .then(() => {
            db.collection(this.$store.state.userCollection)
              .where("uid", "==", this.uid)
              .get()
              .then((snapshot) => {
                snapshot.forEach((document) => {
                  this.docID = document.id;
                });
              })
              .then(() => {
                db.collection(this.$store.state.userCollection)
                  .doc(this.docID)
                  .update({
                    checkIn: true,
                  });
              });
          })
          .then(() => {
            this.writeLog();
            setTimeout(() => {
              this.$router.push({ name: "PostQuest" });
            }, 3000);
          });
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    writeLog() {
      const now = new Date();
      let user = firebase.auth().currentUser;
      let uid = user.uid;
      db.collection(this.$store.state.accesslogCollection).add({
        date: now,
        place: "checkin",
        answer: "checkin",
        uid: uid,
      });
    },
  },
};
</script>

<style>
.CheckIn {
  text-align: center;
  font-size: 5vmin;
}
</style>