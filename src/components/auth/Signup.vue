<template>
  <div class="login">
    <div class="center-align">
      <div class="col s12 m4 l8">
        <a>神山クエスト<br /></a>
      </div>
      <div class="col s12 m4 l8">
        <p>アカウント<br />登録</p>
      </div>
    </div>
    <form @submit.prevent="signup">
      <div class="field">
        <label for="userId">ユーザID</label>
        <input
          class="white-text validate"
          type="text"
          name="userID"
          placeholder="IDを入力"
          v-model="userID"
        />
      </div>
      <a v-if="feedback" class="red-text center">{{ feedback }}</a>
      <div class="field center">
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          <a>登録</a>
        </button>
      </div>
      <div class="field center">
        <a><router-link to="/">ログインページへ戻る</router-link></a>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/plugins/firebase";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      isRead: {},
      userID: null,
      uid: null,
      feedback: null,
    };
  },
  methods: {
    signup() {
      if (this.userID) {
        let email = this.userID + "@example.com";
        let password = "123456";
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((cred) => {
            this.uid = cred.user.uid;

            let registerData = {
              user_id: this.userID,
              uid: this.uid,
              checkIn: false,
              june_quest: false,
              july_quest: false,
              september_quest: false,
            };
            registerData[this.$store.state.questDate] = true;
            db.collection(this.$store.state.userCollection).add(registerData);
          })
          .then(() => {
            db.collection(this.$store.state.statusCollection).add({
              uid: this.uid,
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
              emergencyQuest: {
                status: "inactive",
              },
              questActiveList: {
                Network: {
                  pointScale: 1,
                  status: "inactive",
                },
                Security: {
                  pointScale: 1,
                  status: "inactive",
                },
                DataScience: {
                  pointScale: 1,
                  status: "inactive",
                },
                Robot: {
                  pointScale: 1,
                  status: "inactive",
                },
                Infrastructure: {
                  pointScale: 1,
                  status: "inactive",
                },
                IoT: {
                  pointScale: 1,
                  status: "inactive",
                },
                Fabrication: {
                  pointScale: 1,
                  status: "inactive",
                },
                Brain: {
                  pointScale: 1,
                  status: "inactive",
                },
                Media: {
                  pointScale: 1,
                  status: "inactive",
                },
                SE: {
                  pointScale: 1,
                  status: "inactive",
                },
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
            });
          })
          .then(() => {
            this.$router.push({ name: "Status" });
          })
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "ユーザIDを入力してください";
      }
    },
  },
};
</script>
