<template>
	<body>
		<main>
			<form v-if="isShow" @submit.prevent="login">
				<div class="field">
					<label for="userID"><a>ユーザID</a></label>
					<input class="white-text validate" type="text" name="userID" placeholder="IDを入力" v-model="userID">
				</div>
				<button class="btn waves-effect waves-light" type="submit" name="action">
					<a>ログイン</a>
				</button>
			</form>	
			<ul class="right col s2">
				<p v-if="!isShow" class="right col s3">ログイン：{{ this.userID }}さん</p>
				<p v-if="!isShow" @click="logout">ログアウト</p>
			</ul>
			<div v-if="!isShow" class="row">
				<select class="browser-default col s6" v-model="selected">
					<option value="0" selected>全参加者</option>
					<option value="1">2問以上解答</option>
					<option value="2">3問以上解答</option>
					<option value="3">Question1を解答</option>
				</select>
				<a class="right col s2">{{ required }}/{{ joinNumber }}人参加</a>
				<div class="switch col s3">
					<label>
						Off
						<input type="checkbox" v-model="roop">
						<span class="lever"></span>
						On
					</label>
				</div>
			</div>
			<div v-if="!isShow" class="scroll">
				<table>
					<thead>
						<th>userID</th>
						<th>checkIn</th>
						<th>mystery</th>
						<th>totalpoint</th>
						<th>Notification</th>
						<th>isRead</th>
					</thead>
					<tbody>
						<tr v-for="item in dataList" :key="item.userID">
							<td>{{ item.userID }}</td>
							<td>{{ item.checkIn }}</td>
							<td>{{ item.mystery }}</td>
							<td>{{ item.point }}</td>
							<td>{{ item.notice1 }}, {{ item.notice2 }}, {{ item.notice3 }}</td>
							<td>{{ item.isRead1 }}, {{ item.isRead2 }}, {{ item.isRead3 }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="!isShow" class="row">
				<select class="browser-default col s6" v-model="number">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
				<button type="button" class="btn btn-default" @click="pushNotification">{{ number }}</button>
			</div>
		</main>
	</body>
</template>

<script>
import db from '@/plugins/firebase'
import firebase from 'firebase'
export default {
	name: 'Admin',
	data() {
		return {
			userID: null,
			feedback: null,
			isShow: true,
			roop: true,
			selected: null,
			required: 0,
			joinNumber: 0,
			dataList: [],
			uid: null,
			uidList: [],
			uidCounter: 0,
			searchItem: null,
			docIdList: [],
			noticeList: [],
			checkInList: [],
			number: null
		}
	},
	mounted () {
		this.intervalId = setInterval(() => {
			this.makeList()
		}, 5000)
  },
  beforeDestroy () {
		if(!this.roop) {
			clearInterval(this.intervalId)
		}
  },
	watch: {
		selected: function() {
			this.makeList()
		},
		roop: function() {
			if(!this.roop) {
				clearInterval(this.intervalId)
			} else {
				this.intervalId = setInterval(() => {
					this.makeList()
				}, 20000)
			}
		}
	},
	methods: {
		makeList() {
			this.dataList = []
			this.uidList = []
			this.joinNumber = 0
			this.required = 0
			this.searchItem = null
			db.collection('users').get().then(snapshot => {
				snapshot.forEach(document => {
					if(this.selected == 1) {
						if(document.data().mysteryCounter >= 2) {
							this.pushDataList(document)
							this.required += 1
						}
					} else if(this.selected == 2) {
						if(document.data().mysteryCounter >= 3) {
							this.pushDataList(document)
							this.required += 1
						}
					} else if(this.selected == 0) {
						this.pushDataList(document)
						if(document.data().checkIn) {
							this.required += 1
						}
					}
					if(document.data().checkIn) {
						this.joinNumber += 1
					}
				})
			})
		},
		pushNotification() {
			this.docIdList = []
			this.noticeList = []
			this.checkInList = []
			db.collection('users').get().then(snapshot => {
				snapshot.forEach(document => {
					for(let i=0; i<this.dataList.length; i++) {
						let data = this.dataList[i]
						if(document.data().user_id == data.userID) {
							this.docIdList.push(document.id)
							this.noticeList.push(document.data().noticeList)
							this.checkInList.push(document.data().checkIn)
						}
					}
				})
			}).then(() => {
				let updateFlag = false
				for(let i=0; i<this.noticeList.length; i++) {
					if(this.checkInList[i] == true) {
						this.noticeList[i][this.number-1].isDisplay = true
						updateFlag = true
					}
				}
				if(updateFlag) {
					for(let i=0; i<this.docIdList.length; i++) {
						db.collection('users').doc(this.docIdList[i]).update({
							noticeList: this.noticeList[i]
						})
					}
				}
			})
		},
		pushDataList(document) {
			let point = 
				document.data().Brain + document.data().DataScience +
				document.data().Fabrication + document.data().Infrastructure +
				document.data().IoT + document.data().Media +
				document.data().Network + document.data().Robot +
				document.data().SE + document.data().Security
			this.dataList.push({
				userID: document.data().user_id,
				checkIn: document.data().checkIn,
				mystery: document.data().mysteryCounter,
				point: point,
				notice1: document.data().noticeList[0].isDisplay,
				notice2: document.data().noticeList[1].isDisplay,
				notice3: document.data().noticeList[2].isDisplay,
				isRead1: document.data().noticeList[0].isRead,
				isRead2: document.data().noticeList[1].isRead,
				isRead3: document.data().noticeList[2].isRead,
			})
		},
		login() {
			if(this.userID == "Admin") {
				this.feedback = null
				let email = this.userID + '@example.com'
				let password = '123456'
				firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(() => {
						this.isShow = false
					})
					.catch(err => {
						this.feedback = err.message
					})		
			} else {
				this.feedback = 'ユーザIDが違います'
			}
		},
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
		}
	}
}
</script>

<style>
.scroll {
	background-color: white;
	overflow: auto;
	width: 100%;
	height: 200px;
}
.scroll th {
	background-color: gray;
}
</style>