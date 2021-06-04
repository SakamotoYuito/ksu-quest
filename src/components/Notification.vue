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
			<div v-if="!isShow" class="notification">
				<p class="header">通知</p>
				<ul>
					<div class="block" v-for="(sentence, index) in sentences" v-bind:key="index">
						<li v-if="isDisplay[0]">
								<img src="@/assets/nao@3x.png" class="left">
						</li>
						<li>
							<a class="text--primary subheading">{{ sentence }}<br/></a>
						</li>
					</div>
				</ul>
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
import db from '@/plugins/firebase'
export default {
	name: 'Notification',
	data() {
		return { 
			time: "00:00",
			min : '',
			user: null,
			docID: null,
			sentences: [],
			isShow: false,
			isClick: false,
			isIcon: false,
			isDisplay: [],
			name: [],
			noticeList: null
		}
	},
	created() {
		this.getTime()
		this.getNotification()
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
		getTime() {
			const now = new Date()
			this.time = now.getHours() + ":"
			this.min = now.getMinutes()
			if(this.min<10) {
				this.time += '0' + this.min
			} else {
				this.time += this.min
			}
		},
		getNotification() {
			this.user = firebase.auth().currentUser
			this.uid = this.user.uid
			this.sentences = []
			if(this.user){
				db.collection('users')
					.where('uid', '==', this.uid).get().then(snapshot => {
						snapshot.forEach(document => {
							this.docID = document.id
							this.noticeList = document.data().noticeList
						})
				}).then(() => {
					db.collection('notification').get().then(snapshot => {
							snapshot.forEach(document => {
								this.name.push(document.data().name)
							})
						})
					for(let i=0; i<Object.keys(this.noticeList).length; i++) {
						this.isDisplay.push(this.noticeList[i].isDisplay)
						if(this.isDisplay[i]) {
							this.noticeList[i].isRead = true
						}
					}				
					db.collection('users').doc(this.docID).update({
						noticeList: this.noticeList		
					})
					let count = 0
					if(this.isDisplay[0]) {
						db.collection('notification').get().then(snapshot => {
							snapshot.forEach(document => {
								if(this.isDisplay[count]) {
									this.sentences.push(document.data().sentence)
								}
								count = count + 1
							})
						})
					} else {
						this.sentences.push('通知はまだありません')
					}
				})
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
	margin-bottom: 0.9em;
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
}
.text--primary {
	font-family: 'PixelMplus12-Bold';
	src: url('~@/assets/fonts/PixelMplus12-Bold.ttf');
}
</style>
