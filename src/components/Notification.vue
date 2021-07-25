<template>
  <body>
    <main>
      <div class="notification">
        <p class="header">通知</p>
        <ul>
          <div
            class="block"
            v-for="(sentence, index) in sentences"
            v-bind:key="index"
          >
            <li v-if="sentences[0] != '通知はまだありません'">
              <img src="@/assets/nao@3x.png" class="left" />
            </li>
            <li>
              <a class="text--primary subheading">{{ sentence }}<br /></a>
            </li>
          </div>
        </ul>
      </div>
    </main>
  </body>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebase";
export default {
  name: "Notification",
  data() {
    return {
      user: null,
      docID: null,
      sentences: [],
      isClick: false,
      isIcon: false,
      isDisplay: [],
      name: [],
      noticeList: null,
      sentenceList: [],
    };
  },
  created() {
    this.getNotification();
  },
  methods: {
    getNotification() {
      this.user = firebase.auth().currentUser;
      this.uid = this.user.uid;
      this.sentences = [];
      if (this.user) {
        db.collection(this.$store.state.statusCollection)
          .where("uid", "==", this.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.docID = document.id;
              this.noticeList = document.data().noticeList;
            });
          })
          .then(() => {
            db.collection(this.$store.state.notificationCollection)
              .get()
              .then((snapshot) => {
                snapshot.forEach((document) => {
                  this.sentenceList.push(document.data().sentence);
                });
              })
              .then(() => {
                for (let i = 0; i < Object.keys(this.noticeList).length; i++) {
                  let isDisplay = this.noticeList[i].isDisplay;
                  if (isDisplay) {
                    let isRead = this.noticeList[i].isRead;
                    if (!isRead) {
                      this.noticeList[i].isRead = true;
                      this.writeLog(i);
                    }
                    this.sentences.push(this.sentenceList[i]);
                  }
                }
                if (this.sentences.length == 0) {
                  this.sentences.push("通知はまだありません");
                }
                db.collection(this.$store.state.statusCollection)
                  .doc(this.docID)
                  .update({
                    noticeList: this.noticeList,
                  });
              });
          });
      }
    },
    writeLog(i) {
      const now = new Date();
      let place = "既読";
      let answer = i;
      db.collection(this.$store.state.accesslogCollection).add({
        date: now,
        place: place,
        answer: answer,
        uid: this.uid,
      });
    },
  },
};
</script>

<style>
.notification ul {
  border-top: 1.5px solid white;
  padding-top: 3px;
}
.notification p {
  font-size: 5vmin;
  text-align: center;
}
.notification a {
  font-size: 4vmin;
}
.block {
  border-bottom: 1.8px solid white;
  margin-top: 0px;
  padding-top: 0px;
  margin-bottom: 0.5em;
  padding-bottom: 0.5em;
}
.block a {
  font-size: min(4vmin, 18px);
}
.block img {
  width: 7vmin;
  max-width: 30px;
  min-width: 21px;
  height: auto;
  margin-bottom: 27px;
}
.text--primary {
  font-family: "PixelMplus12-Bold";
  src: url("~@/assets/fonts/PixelMplus12-Bold.ttf");
}
</style>
