<template>
  <body>
    <main>
      <div class="loader">Loading...</div>
    </main>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <a class="icon">
              <font-awesome-icon icon="arrow-left" size="3x" />
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
      urlStatus.forEach((element) => {
        let key = element.split(":")[0];
        let value = element.split(":")[1];
        dbList[key] = Number(dbList[key]) + Number(value);
      });
      if (this.place.includes("Q")) {
        dbList["mysteryCounter"] += 1;
      }
      return dbList;
    },
  },
};
</script>