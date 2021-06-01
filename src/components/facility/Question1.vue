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
			<div v-if="!isShow">
				<div class="notification">
					<p>{{ courseName }}</p>
					<p>解答</p>
				</div>
				<div class="center-align">
					<form @submit.prevent="answerCheck">
						<div class="field">
							<input class="white-text" type="text" name="answer" placeholder="解答を入力" v-model="answer">
						</div>
						<a v-if="feedback" class="red-text">{{ feedback }}<br/></a>
						<button class="btn waves-effect waves-light" type="submit" name="action">
							<a>解答する</a>
						</button>
					</form>
				</div>
			</div>
			<div v-if="isCorrect" class="circle">
				<a/>
			</div>
			<div v-if="isCorrect && courseName=='Network'">
				<p>ネットワークとはaaaaaaa<br/>aaaa</p>
			</div>
			<div v-if="isShow && !isCorrect" class="loader">Loading...</div>
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
	name: 'Question1',
	data() {
		return {
			answer: '',
			feedback: null,
			isShow: false,
			isClick: false,
			isIcon: false,
			isCorrect: false,
			course: [],
			courseName: null,
			answersList: {
				Network: 'プロトコル',
				Security: 'FIREWALL',
				Infrastructure: 'プログラム',
				DataScience: 'えーあい',
				Fabrication: 'レーザーカッター',
				Media: '画像処理',
				Robot: 'アンドロイド',
				SE: '10000000',
				IoT: 'T',
				Brain: 'EMG'
			}
		}
	},
	created() {
		this.courseName = this.$route.query.status.split(':')[0]
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
		answerCheck() {
			if(this.answer == this.answersList[this.courseName]) {
				this.course.push(this.$route.query.status)
				this.isCorrect = true
				this.isShow = true
			} else {
				this.feedback = '解答が間違っているよ。わからないときは、スタッフに聞いてみよう。'
			}
		},
		back() {
			if(!this.isClick) {
				if(this.isCorrect) {
				this.$router.push({ name: 'Loading', query: {status: this.course, place: 'Quest4', to: 'Status', answer: this.answer}})
				this.isShow = true
				} else {
					setTimeout(() => {
						this.$router.push({ name: 'Status'})
							}
							,1000
						)
					this.isShow = true
					this.isClick = true
					this.isIcon = false
					this.isCorrect = false
				}
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
.circle {
	position: relative;
	margin: 60px auto;
	top: 15%;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100px;
	height: 100px; 
	border: 12px solid red;
	border-radius: 50%;
	line-height: 80px;
}
</style>
