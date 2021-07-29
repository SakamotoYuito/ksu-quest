<template>
  <footer v-if="!isHome && !isSignup">
    <div class="container">
      <div class="row">
        <div class="col s3" @click="movePage('Status')">
          <font-awesome-icon
            icon="chart-pie"
            size="2x"
            :style="{ color: isFocus('chart-pie') }"
          />
        </div>

        <div class="col s3" @click="movePage('Reader')">
          <font-awesome-icon
            icon="camera"
            size="2x"
            :style="{ color: isFocus('camera') }"
          />
        </div>

        <div class="col s3" @click="movePage('PostQuest')">
          <font-awesome-icon
            icon="list"
            size="2x"
            :style="{ color: isFocus('list') }"
          />
        </div>

        <div class="col s3" @click="movePage('Notification')">
          <font-awesome-icon
            icon="bell"
            size="2x"
            :style="{ color: isFocus('bell') }"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebase";
export default {
  name: "Footer",
  data() {
    return {
      isHome: true,
      isSignup: true,
      isNotification: false,
      isEmergency: false,
      noticeList: null,
      emergencyQuest: null,
    };
  },
  watch: {
    $route: function () {
      this.isHome = this.$router.history.current.name === "Home";
      this.isSignup = this.$router.history.current.name === "Signup";
    },
  },
  mounted() {
    this.isHome = this.$router.history.current.name === "Home";
    this.isSignup = this.$router.history.current.name === "Signup";
    this.getNotification();
    window.setInterval(() => {
      this.getNotification();
    }, 5000);
  },
  methods: {
    getNotification() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection(this.$store.state.statusCollection)
            .where("uid", "==", user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((document) => {
                this.emergencyQuest = document.data().emergencyQuest;
                this.noticeList = document.data().noticeList;
              });
            })
            .then(() => {
              if (this.emergencyQuest["status"] == "active") {
                this.isEmergency = true;
              } else {
                this.isEmergency = false;
              }
              for (let i = 0; i < Object.keys(this.noticeList).length; i++) {
                if (
                  !this.noticeList[i].isRead &&
                  this.noticeList[i].isDisplay
                ) {
                  this.isNotification = true;
                  break;
                } else {
                  this.isNotification = false;
                }
              }
            });
        }
      });
    },
    isFocus(iconName) {
      if (iconName == this.getPageName()) {
        return "#43f060";
      } else if (iconName == "list" && this.isEmergency) {
        return "red";
      } else if (iconName == "bell" && this.isNotification) {
        return "red";
      }
      return "white";
    },
    getPageName() {
      switch (this.$route.name) {
        case "Reader":
          return "camera";
        case "Notification":
          return "bell";
        case "PostQuest":
          return "list";
        case "Status":
          return "chart-pie";
        default:
          return "other";
      }
    },
    movePage(pageName) {
      if (this.$route.name == pageName || this.$route.name == "Loading") {
        return;
      }
      this.$router.push({ name: pageName });
    },
  },
};
</script>

<style>
</style>