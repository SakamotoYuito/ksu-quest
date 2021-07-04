<template>
	<body>
		<main>
			<div v-if="isNotification" class="blinking notice center-align">
				<p>通知が来ています</p>
			</div>
			<div v-if="!isNotification" class="center-align">
				<p v-if="isCheckIn">クエストⅣ：チェックイン中</p>
			</div>
			<div class="chart-container">
				<RadarChart class="radar" :chartData="datacollection" :options="options"/>
			</div>
		</main>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col s6">
						<a class="icon">
							<a v-if="!isCamera" @mousedown="focusColor('camera')" @touchstart="focusColor('camera')">
								<font-awesome-icon icon="camera" size="3x"/>
							</a>
							<a v-if="isCamera"  @mouseup="reader" @touchend="reader" @mouseover="basicColor('camera')" @touchmove="basicColor('camera')">
								<font-awesome-icon icon="camera" size="3x" color="gray"/>
							</a>
						</a>
					</div>
					<div class="col s6">
						<a class="icon">
							<a v-if="!isBell" @mousedown="focusColor('bell')" @touchstart="focusColor('bell')">
								<a v-if="isNotification" class="blinking" @mousedown="focusColor('bell')" @touchstart="focusColor('bell')">
									<font-awesome-icon icon="bell" size="3x" color="red"/>
								</a>
								<a v-if="!isNotification" @mousedown="focusColor('bell')" @touchstart="focusColor('bell')">	
									<font-awesome-icon icon="bell" size="3x"/>
								</a>
							</a>
							<a v-if="isBell"  @mouseup="notification" @touchend="notification" @mouseover="basicColor('bell')" @touchmove="basicColor('bell')">
								<a v-if="isNotification" class="blinking" @mouseup="notification" @touchend="notification" @mouseover="basicColor('bell')" @touchmove="basicColor('bell')">
									<font-awesome-icon icon="bell" size="3x" color="red"/>
								</a>
								<a v-if="!isNotification" @mouseup="notification" @touchend="notification" @mouseover="basicColor('bell')" @touchmove="basicColor('bell')">
									<font-awesome-icon icon="bell" size="3x" color="gray"/>
								</a>
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
import RadarChart from '@/resources/RadarChart.js'
import store from '@/store'

export default {
	name: 'Status',
	components: {
		RadarChart
	},
	data() {
		return {
			user: null,
			userID: null,
			isCheckIn: false,
			Network: 0,
			Security: 0,
			DataScience: 0,
			Robot: 0,
			Infrastructure: 0,
			IoT: 0,
			Fabrication: 0,
			Brain: 0,
			Media: 0,
			SE: 0,
			noticeList: null,
			datacollection: null,
			options: {
				responsive: true,
				legend: {
					labels: {
						fontColor: 'white',
						fontFamily: 'PixelMplus12-Bold'
					}
				},
				scale: {
					pointLabels: {
						fontSize: 11,
						fontColor: 'white',
						fontFamily: 'PixelMplus12-Bold'
					},
					gridLines: {
						display: true,
						color: 'white'
					},
					ticks: {
						display: false,
						min: -1,
						max: 5,
						stepSize: 1,
					},
					angleLines: {
						display: true,
						color: 'white'
					}
				},
				title: {
					display: true,
					fontSize: 35,
					text: 'ステータス',
					fontColor: 'white',
					fontFamily: 'PixelMplus12-Bold'
				},
			},
			isClick: false,
			isCamera: false,
			isBell: false,
			isNotification: false,
			isRead: false
		}
	},
	mounted() {
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				this.user = user
				this.uid = this.user.uid
				this.listen(this.uid)
				console.log("mounted was executed from: " + this.$route.from)
				db.collection(this.$store.state.userCollection)
					.where('uid', '==', user.uid).get().then(snapshot => {
						snapshot.forEach(document => {
							this.userID = document.data().user_id
							this.isCheckIn = document.data().checkIn
						})
				}).then(() => {
					db.collection(this.$store.state.statusCollection).where('uid', '==', user.uid).get().then(snapshot => {
						snapshot.forEach(document => {
							this.Network = document.data().Network
							this.Security = document.data().Security
							this.DataScience = document.data().DataScience
							this.Robot = document.data().Robot
							this.Infrastructure = document.data().Infrastructure
							this.IoT = document.data().IoT
							this.Fabrication = document.data().Fabrication
							this.Brain = document.data().Brain
							this.Media = document.data().Media
							this.SE = document.data().SE
						})
					}).then(() => {
						this.RadarChart()
					})
				})
			} else {
				this.user = null
				this.$router.push({ name: 'Home'})
			}
		})
	},
	watch: {
		isNotification: function() {
			console.log(this.isNotification)
		}
	},
	methods: {
		listen(uid) {
			//if (this.$store.state.unsubscribeSnapshot == null){
				let unsubscribe = db.collection(this.$store.state.statusCollection).where("uid", "==", uid).onSnapshot(querySnapshot => {
					querySnapshot.forEach(doc => {
						this.noticeList = doc.data().noticeList
					})
					this.checkNotification()
				})
				store.commit('SET_UNSUBSCRIBE', unsubscribe)
			// }
		},
		RadarChart() {
			this.datacollection = {
				labels: [
					"ネットワーク",
					"セキュリティ",
					"データ",
					"ロボット",
					"基盤設計",
					"組込み",
					"デジファブ",
					"脳科学",
					"メディア処理",
					"情報システム"
					],
				datasets: [
					{
						backgroundColor: 'rgba(0, 255, 0, 0.9)',
						borderWidth: 1,
						pointBackgroundColor: 'rgba(0, 255, 0)',
						pointRadius: 1.6,
						label: this.userID + "さん",
						data: [
							this.Network,
							this.Security,
							this.DataScience,
							this.Robot,
							this.Infrastructure,
							this.IoT,
							this.Fabrication,
							this.Brain,
							this.Media,
							this.SE
							]
					}
				],
			}
		},
		reader() {
			if(!this.isClick) {
				this.$router.push({ name: 'Reader'})
				this.isClick = true
				this.isCamera = false
			}
		},
		notification() {
			if(!this.isClick) {
				this.$router.push({ name: 'Notification'})
				this.isClick = true
				this.isBell = false
			}
		},
		focusColor(element) {
			if(element=='camera') {
				this.isCamera = true
			}
			else if(element=='bell'){
				this.isBell = true
			}
		},
		basicColor(element) {
			if(element=='camera') {
				this.isCamera = false
			}
			else if(element=='bell'){
				this.isBell = false
			}
		},
		checkNotification() {
			console.log(this.noticeList)
			if(this.noticeList) {
				for(let i=0; i<Object.keys(this.noticeList).length; i++) {
					if(!this.noticeList[i].isRead && this.noticeList[i].isDisplay) {
						console.log('isNotification is true')
						this.isNotification = true
						break
					} else {
						console.log('isNotification is false')
						this.isNotification = false
					}
				}
			} else {
				this.$router.push({ name: 'Home'})
			}
		}
	}
}
</script>

<style>
.notice p {
	background-color: Red;
}
.chart-container {
	width: 100%;
	padding-bottom: 100%;
}
.container {
	display: flex;
	width: 100%;
	height: 100%;
}
.row {
	display: flex;
	height: 100%;
	width: 100%;
}
.icon {
	margin-top: 5px;
}
.chartjs-render-monitor {
	position: absolute;
	top: max(20%, 100px);
}
.radar {
	height: 100%;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	max-width: 400px;
	max-height: 400px;
	margin-left: auto;
  margin-right: auto;
}

.blinking {
	-webkit-animation:blink 1.0s ease-in-out infinite alternate;
  -moz-animation:blink 1.0s ease-in-out infinite alternate;
  animation:blink 1.0s ease-in-out infinite alternate;
}
@-webkit-keyframes blink{
  0% {opacity:0.4;}
	100% {opacity:1;}
}
@-moz-keyframes blink{
	0% {opacity:0.4;}
	100% {opacity:1;}
}
@keyframes blink{
	0% {opacity:0.4;}
	100% {opacity:1;}
}
</style>
