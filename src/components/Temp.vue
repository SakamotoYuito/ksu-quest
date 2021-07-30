<template>
  <body>
    <main>
      <div class="temp">
        <p>{{ message }}</p>
      </div>
    </main>
  </body>
</template>

<script>
import db from "@/plugins/firebase";
import firebase from "firebase";
export default {
  name: "Temp",
  data() {
    return {
      message: "",
      isCheckIn: false,
    };
  },
  mounted() {
    this.getCheckIn();
    let urlStatus = this.$route.query.status;
    let urlPlace = this.$route.query.place;
    let urlStatusList = [];
    if (!Array.isArray(urlStatus)) {
      urlStatusList.push(urlStatus);
    } else {
      urlStatusList = urlStatus;
    }
    if (urlPlace == null) {
      urlPlace = "臨時措置";
    }
    if (urlStatusList) {
      this.message = "反映中です．．．";
      setTimeout(() => {
        this.$router.push({
          name: "Loading",
          params: {
            status: urlStatusList,
            place: urlPlace + "/" + this.isCheckIn,
            answer: urlStatusList,
          },
        });
      }, 2000);
    } else {
      this.message = "パラメータを設定してください";
    }
  },
  methods: {
    getCheckIn() {
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
  },
};
</script>

<style>
.temp {
  margin-top: 50px;
  text-align: center;
  font-size: 5vmin;
}
</style>