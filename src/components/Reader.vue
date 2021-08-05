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

      let baseUrl = "https://ksu-quest.com/";
      let url;
      
      if (decodedString.includes(baseUrl)){
        url = decodedString.split(baseUrl)[1];
      }
      else {
        url = decodedString;
      }

      this.$router.push({ path: url });
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
