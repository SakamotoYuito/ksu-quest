<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
@font-face {
	font-family: 'PixelMplus12-Bold';
	src: url('~@/assets/fonts/PixelMplus12-Bold.ttf');
}
a, p {
  color: white;
  font-family: 'PixelMplus12-Bold';
}
body {
  background-color: #10308B;
}
header {
  z-index: 99;
  top: 0;
  position: fixed;
  width: 100%;
}
.brand-logo {
	width: 150px;
	height: 42px;
}
img {
	width: 5vmin;
	height: 5vmin;
	margin: 5px;
	margin-right: 10px;
	
}
.nav-wrapper {
	background-color: black;
}
.nav-wrapper a {
	font-size: 3vmin;
}
main {
  padding-top: 60px;
  padding-left: 5vmax;
  padding-right: 5vmax; 
  padding-bottom: 60px;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: black;
  display: block;
  text-align: center;
}
font-awesome-icon {
  display: inline;
}
.row {
  margin: 15px;
}
</style>
