<template>
  <body>
    <main>
      <div class="title">
        <p>QRコードリーダー</p>
        <div class="reader">
          <qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
        </div>
      </div>
    </main>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <a class="icon">
              <a
                v-if="!isIcon"
                @mousedown="focusColor"
                @touchstart="focusColor"
              >
                <font-awesome-icon icon="arrow-left" size="3x" />
              </a>
              <a
                v-if="isIcon"
                @mouseup="back"
                @touchend="back"
                @mouseover="basicColor"
                @touchmove="basicColor"
              >
                <font-awesome-icon icon="arrow-left" size="3x" color="gray" />
              </a>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  name: "Reader",
  data() {
    return {
      isClick: false,
      isIcon: false,
    };
  },
  methods: {
    onDecode(decodedString) {
      this.$router.push({ path: decodedString });
      this.isShow = true;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    back() {
      if (!this.isClick) {
        this.$router.push({ name: "Status" });
        this.isClick = true;
        this.isIcon = false;
      }
    },
    focusColor() {
      this.isIcon = true;
    },
    basicColor() {
      this.isIcon = false;
    },
  },
};
</script>

<style>
.title {
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 60px;
}
.title p {
  font-size: 7vmin;
  text-align: center;
}
.reader main a {
  text-align: center;
  padding: 10px;
  margin-top: 30%;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.reader {
  margin: auto;
  width: 60vmin;
  height: 60vmin;
  border: solid 3px white;
  max-height: 400px;
  max-width: 400px;
}
</style>
