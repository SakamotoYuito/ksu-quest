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
					<p>アンケート</p>
				</div>
				<p>
					10コースの中で興味のあるコースはありますか？
					3つまで選んでください。
				</p>
				<hr/>
				<div>
					<form class="survey" @submit.prevent="sendOut">
						<p class="left">
							<label>
								<input class="with-gap" id="0" name="group1" :disabled="notCheck[0]" type="checkbox" @change="checkLimit" v-model="param[0]"/>
								<span class="white-text">ネットワークシステムコース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="1" name="group1" :disabled="notCheck[1]" type="checkbox" @change="checkLimit" v-model="param[1]"/>
								<span class="white-text">情報セキュリティコース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="2" name="group1" :disabled="notCheck[2]" type="checkbox" @change="checkLimit" v-model="param[2]"/>
								<span class="white-text">データサイエンスコース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="3" name="group1" :disabled="notCheck[3]" type="checkbox" @change="checkLimit" v-model="param[3]"/>
								<span class="white-text">ロボットインタラクションコース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="4" name="group1" :disabled="notCheck[4]" type="checkbox" @change="checkLimit" v-model="param[4]"/>
								<span class="white-text">コンピュータ基盤設計コース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="5" name="group1" :disabled="notCheck[5]" type="checkbox" @change="checkLimit" v-model="param[5]"/>
								<span class="white-text">組込みシステムコース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="6" name="group1" :disabled="notCheck[6]" type="checkbox" @change="checkLimit" v-model="param[6]"/>
								<span class="white-text">デジタルファブリケーションコース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="7" name="group1" :disabled="notCheck[7]" type="checkbox" @change="checkLimit" v-model="param[7]"/>
								<span class="white-text">脳科学コース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="8" name="group1" :disabled="notCheck[8]" type="checkbox" @change="checkLimit" v-model="param[8]"/>
								<span class="white-text">メディア処理技術コース</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="9" name="group1" :disabled="notCheck[9]" type="checkbox" @change="checkLimit" v-model="param[9]"/>
								<span class="white-text">情報システムコース</span>
							</label>
						</p>
						<a v-if="feedback" class="red-text center">{{ feedback }}<br/></a>
						<button class="btn waves-effect waves-light center" type="submit" name="action">
							<a>送信する</a>
						</button>
					</form>
				</div>
			</div>
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
			param: [false, false, false, false, false, false, false, false, false, false],
			notCheck: [],
			feedback: null,
			isShow: false,
			isClick: false,
			isIcon: false,
			labStatus: {
				AO: [
					'Network:1',
					'Security:1',
					'DataScience:1',
					'Robot:1',
					'Infrastructure:1',
					'IoT:1',
					'Fabrication:1',
					'Brain:1',
					'Media:1',
					'SE:1'
				]
			}
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
		sendOut() {
			let labName = this.$route.query.status
			let courseName = []
			if(this.param) {
				for(let i=0; i<this.param.length; i++) {
					if(this.param[i]) {
						courseName.push(this.labStatus[labName][i])
					}
				}
				this.$router.push({ name: 'Loading', query: {status: courseName, place: labName, to: 'Status', answer: courseName}})
			} else {
				this.feedback = '選択してください'
			}
		},
		checkLimit() {
			this.notCheck = [false, false, false, false, false, false, false, false, false, false]
			let count = 0
			for(let i=0; i<this.param.length; i++) {
				if(this.param[i]) {
					count = count + 1
					if(count == 3) {
						for(let i=0; i<this.param.length; i++) {
							if(!this.param[i]) {
								this.notCheck[i] = true
							}
						}
						break
					}
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
.survey {
	display: flex;
  flex-direction: column;
	align-items: left;
}
.survey .btn { 
	margin-left: 20%;
	margin-right: 20%;
	z-index: 0;
	margin-bottom: 60px;
}
[type="checkbox"]+span:not(.lever):before, [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
	border: 2px solid white;
}
[type="checkbox"]:checked+span:not(.lever):before {
	border-right: 2px solid lime;
	border-bottom: 2px solid lime;
}
</style>