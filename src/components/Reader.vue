<template>
	<body>
		<header>
			<nav>
				<div class="nav-wrapper">
					<img src="@/assets/ksu-quest2.png" class="brand-logo">
					<ul class="right">
						<li><a v-if="!isShow" @click="logout">ログアウト</a></li>
					</ul>
				</div>
			</nav>
		</header>
		<main>
			<div v-if="!isShow" class="title">
				<p>QRコードリーダー</p>
			</div>
			<div v-if="!isShow" class="reader">
				<qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
			</div>
			<div v-if="isShow" class="loader">Loading...</div>
		</main>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<a class="icon">
							<a v-if="!isIcon" @mousedown="focusColor" @touchstart="focusColor">
								<font-awesome-icon icon="arrow-left" size="3x"/>
							</a>
							<a v-if="isIcon"  @mouseup="back" @touchend="back" @mouseover="basicColor" @touchmove="basicColor">
								<font-awesome-icon icon="arrow-left" size="3x" color="gray"/>
							</a>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</body>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'Reader',
	data() {
		return {
			isShow: false,
			isClick: false,
			isIcon: false
		}
	},
	methods: {
		logout() {
			if(!this.isClick) {
				setTimeout(() => {
					firebase.auth().signOut().catch((error) => {
						if (error.name === 'NavigationDuplicated') {
							return
						}
					})
					}
					,1000
				)
				this.isShow = true
			}
		},
		onDecode(decodedString) {
			let str = decodedString.split('//')
			setTimeout(() => {
				this.$router.push({ path: str[1] })
				}
				,1000
			)
			this.isShow = true
		},
		async onInit (promise) {
			try {
				await promise
			} catch (error) {
				if (error.name === 'NotAllowedError') {
				this.error = "ERROR: you need to grant camera access permisson"
				} else if (error.name === 'NotFoundError') {
				this.error = "ERROR: no camera on this device"
				} else if (error.name === 'NotSupportedError') {
				this.error = "ERROR: secure context required (HTTPS, localhost)"
				} else if (error.name === 'NotReadableError') {
				this.error = "ERROR: is the camera already in use?"
				} else if (error.name === 'OverconstrainedError') {
				this.error = "ERROR: installed cameras are not suitable"
				} else if (error.name === 'StreamApiNotSupportedError') {
				this.error = "ERROR: Stream API is not supported in this browser"
				}
			}
		},
		back() {
			if(!this.isClick) {
				setTimeout(() => {
					this.$router.push({ name: 'Status'})
						}
						,1000
					)
				this.isShow = true
				this.isClick = true
				this.isIcon = false
			}
		},
		focusColor() {
			this.isIcon = true
		},
		basicColor() {
			this.isIcon = false
		}
	}
}
</script>

<style>
.title p {
	font-size: 7vmin;
	text-align: center;
	padding-top: 50px;
}
.reader main {
	position: relative;
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
	position: absolute;  /*要素を浮かす*/
	/*relativeを指定した親要素を支点とした位置をすべて0に指定↓*/
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto; /*上下左右中央に*/
	width: 40vmax; /*widthの指定は必須*/
	height: 40vmax; /*heightの指定は必須*/
	border: solid 3px white;
}
</style>
