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
					<p v-if="courseName=='Network'">魔獣 パケットロス</p>
					<p v-if="courseName=='Securiry'">魔獣 トロイの木馬</p>
					<p v-if="courseName=='DataScience'">魔獣 ビックデータ</p>
					<p v-if="courseName=='Robot'">魔獣 ユーザビリティ</p>
					<p v-if="courseName=='Infrastructure'">魔獣 OS（オーエス）</p>
					<p v-if="courseName=='IoT'">魔獣 RAM（ラム）</p>
					<p v-if="courseName=='Fabrication'">魔獣 ファブ社会</p>
					<p v-if="courseName=='Brain'">魔獣 筋電義手</p>
					<p v-if="courseName=='Media'">魔獣 コンピュータグラフィックス</p>
					<p v-if="courseName=='SE'">魔獣 bit（ビット）</p>
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
			<div class="course center">
				<div v-if="isCorrect && courseName=='Network'">
					<p>スキル <a>ネットワークシステム</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Network.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='Security'">
					<p>スキル <a>情報セキュリティ</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Security.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='DataScience'">
					<p>スキル <a>データサイエンス</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/DataScience.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='Robot'">
					<p>スキル <a>ロボットインタラクション</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Robot.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='Infrastructure'">
					<p>スキル <a>コンピュータ基盤設計</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Infrastructure.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='IoT'">
					<p>スキル <a>組込みシステム</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/IoT.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='Fabrication'">
					<p>スキル <a>デジタルファブリケーション</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Fabrication.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='Brain'">
					<p>スキル <a>脳科学</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Brain.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='Media'">
					<p>スキル <a>メディア処理技術</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/Media.png" class="courseImg center">
				</div>
				<div v-if="isCorrect && courseName=='SE'">
					<p>スキル <a>情報システム</a><br/>を手に入れた！</p>
					<p>解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。</p>
					<img src="@/assets/courseIcon/SE.png" class="courseImg center">
				</div>
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
				this.feedback = '解答が間違っています！わからないときは、スタッフに聞いてみよう。'
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
.courseImg {
	width: 70%;
	height: auto;
	max-width: 300px;
	padding-bottom: 50px;
}
.course p {
	font-size: clamp(15px, 5vmin, 50px);
	;
}
.course a {
	color: Yellow;
}
</style>
