<template>
  <div class="login">
    <div class="center-align">
      <div class="progress" v-if="isLoading">
        <div class="indeterminate"></div>
      </div>
      <div class="col s12 m4 l8">
        <p>神山<br />クエスト</p>
      </div>
      <form @submit.prevent="login">
        <div class="field">
          <label for="userID"><a>ユーザID</a></label>
          <input
            class="white-text validate"
            type="text"
            name="userID"
            placeholder="IDを入力"
            v-model="userID"
          />
        </div>
        <a v-if="feedback" class="red-text">{{ feedback }}<br /></a>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          <a>ログイン</a>
        </button>
      </form>
      <a><router-link to="/Signup">初めてご利用の方はこちら</router-link></a>
    </div>
    <!-- <button class="btn waves-effect waves-light" @click="maintenance">
	test
	</button> -->
  </div>
</template>

<script>
import db from "@/plugins/firebase";
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {
      userID: null,
      feedback: null,
      uid: null,
      statusTemplate: {
        uid: null,
        noticeList: {
          0: {
            isDisplay: false,
            isRead: false,
            name: "message1",
          },
          1: {
            isDisplay: false,
            isRead: false,
            name: "message2",
          },
          2: {
            isDisplay: false,
            isRead: false,
            name: "message3",
          },
        },
        questActiveList: {
          Network: false,
          Security: false,
          DataScience: false,
          Robot: false,
          Infrastructure: false,
          IoT: false,
          Fabrication: false,
          Brain: false,
          Media: false,
          SE: false,
        },
        mysteryCounter: 0,
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
      },
      isLoading: false,
    };
  },
  methods: {
    login() {
      if (this.userID) {
        this.feedback = null;
        let email = this.userID + "@example.com";
        let password = "123456";
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((cred) => {
            this.isLoading = true;
            this.uid = cred.user.uid;
            this.statusTemplate.uid = this.uid;
            let userDoc = null;
            let userDocId = null;
            let joinQuestDate = null;
            let lastTimeQuestDate = null;
            db.collection(this.$store.state.userCollection)
              .where("uid", "==", this.uid)
              .get()
              .then((snapshot) => {
                snapshot.forEach((document) => {
                  userDoc = document.data();
                  userDocId = document.id;
                  joinQuestDate = userDoc[this.$store.state.questDate];
                  lastTimeQuestDate =
                    userDoc[this.$store.state.lastTimeQuestDate];
                });
              })
              .then(() => {
                if (!joinQuestDate) {
                  let lastTimeStatusDoc = null;
                  if (lastTimeQuestDate) {
                    db.collection(this.$store.state.lastTimeStatusCollection)
                      .where("uid", "==", this.uid)
                      .get()
                      .then((snapshot) => {
                        snapshot.forEach((document) => {
                          lastTimeStatusDoc = document.data();
                        });
                      })
                      .then(() => {
                        this.takeOverData(lastTimeStatusDoc);
                      });
                  }
                  setTimeout(() => {
                    db.collection(this.$store.state.statusCollection).add(
                      this.statusTemplate
                    );
                    userDoc[this.$store.state.questDate] = true;
                    db.collection(this.$store.state.userCollection)
                      .doc(userDocId)
                      .update(userDoc);
                  }, 2000);
                }
              });
          })
          .then(() => {
            setTimeout(() => {
              this.$router.push({ name: "Status" });
            }, 2000);
          })
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "ユーザIDを入力してください";
      }
    },
    takeOverData(lastTimeStatusDoc) {
      this.statusTemplate.Network = lastTimeStatusDoc.Network;
      this.statusTemplate.Security = lastTimeStatusDoc.Security;
      this.statusTemplate.DataScience = lastTimeStatusDoc.DataScience;
      this.statusTemplate.Robot = lastTimeStatusDoc.Robot;
      this.statusTemplate.Infrastructure = lastTimeStatusDoc.Infrastructure;
      this.statusTemplate.IoT = lastTimeStatusDoc.IoT;
      this.statusTemplate.Fabrication = lastTimeStatusDoc.Fabrication;
      this.statusTemplate.Brain = lastTimeStatusDoc.Brain;
      this.statusTemplate.Media = lastTimeStatusDoc.Media;
      this.statusTemplate.SE = lastTimeStatusDoc.SE;
    },
    maintenance() {
      /*db.collection(this.$store.state.userCollection).get().then(snapshot => {
				snapshot.forEach(document => {
					let doc = document.data()
					delete doc.user_id
					delete doc.checkIn

					console.log(doc)
					db.collection(this.$store.state.statusCollection).add(doc)
				})
			})*/
      /*db.collection(this.$store.state.userCollection).get().then(snapshot => {
				snapshot.forEach(document => {
					let docID = document.id
					console.log(docID)
					db.collection(this.$store.state.userCollection).doc(docID).update({
						"Brain": firebase.firestore.FieldValue.delete(),
						"Security": firebase.firestore.FieldValue.delete(),
						"DataScience": firebase.firestore.FieldValue.delete(),
						"Fabrication": firebase.firestore.FieldValue.delete(),
						"Infrastructure": firebase.firestore.FieldValue.delete(),
						"IoT": firebase.firestore.FieldValue.delete(),
						"Media": firebase.firestore.FieldValue.delete(),
						"Network": firebase.firestore.FieldValue.delete(),
						"Robot": firebase.firestore.FieldValue.delete(),
						"SE": firebase.firestore.FieldValue.delete(),
						"noticeList": firebase.firestore.FieldValue.delete(),
						"mysteryCounter": firebase.firestore.FieldValue.delete(),
						"june_quest": true,
						"july_quest": false,
						"september_quest": false
					})
				})
			})*/
    },
  },
};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.login p,
input {
  font-size: 50px;
  font-family: "PixelMplus12-Bold";
  src: url("~@/assets/fonts/PixelMplus12-Bold.ttf");
  color: white;
}
.login a {
  margin: 10px;
}
.login label {
  font-family: "PixelMplus12-Bold";
  src: url("~@/assets/fonts/PixelMplus12-Bold.ttf");
  color: white;
}
.login .field {
  margin-left: 25px;
  margin-right: 25px;
  max-width: 1000px;
  text-align: center;
}
.btn {
  text-align: center;
  margin: 20px;
}
.progress {
  background-color: rgba(255, 255, 255, 0.5);
}
.progress .indeterminate {
  background-color: white;
}
</style>

