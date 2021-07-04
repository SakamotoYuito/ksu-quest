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
					<option value="3">5問以上解答</option>
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
						<th>checked</th>
						<th>userID</th>
						<th>checkIn</th>
						<th>mystery</th>
						<th>totalpoint</th>
						<th>Notification</th>
						<th>isRead</th>
					</thead>
					<tbody>
						<tr v-for="item in dataList" :key="item.userID">
							<td>
								<label>
									<input type="checkbox" class="filled-in" v-model="item.checked" />
									<span></span>
								</label>
							</td>
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
			checked: false,
			feedback: null,
			isShow: true,
			roop: false,
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
			number: null,
			userCollectionData: {},
		}
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
				console.log(this.roop)
				console.log("expected false")
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
			this.userCollectionData = {}
			this.joinNumber = 0
			this.required = 0
			this.searchItem = null
			db.collection(this.$store.state.userCollection).get().then(snapshot => {
				snapshot.forEach(document => {
					this.userCollectionData[document.data().uid] = {
						'checkIn': document.data().checkIn,
						'user_id': document.data().user_id
					}
				})
			}).then(() => {
				db.collection(this.$store.state.statusCollection).get().then(snapshot => {
					snapshot.forEach(document => {
						let userData = this.userCollectionData[document.data().uid]
						let checkIn = userData.checkIn

						if(checkIn){
							if(this.selected == 1) {
								if(document.data().mysteryCounter >= 2) {
									this.pushDataList(document, userData)
									this.required += 1
								}
							} else if(this.selected == 2) {
								if(document.data().mysteryCounter >= 3) {
									this.pushDataList(document, userData)
									this.required += 1
								}
							} else if(this.selected == 0) {
								this.pushDataList(document, userData)
								if(checkIn) {
									this.required += 1
								}
							} else if(this.selected == 3) {
								if(document.data().mysteryCounter >= 5) {
									this.pushDataList(document, userData)
									this.required += 1
								}
							}
							this.joinNumber += 1
						}
					})
				})
			})
		},
		pushNotification() {
			this.docIdList = []
			this.noticeList = []
			this.checkInList = []
			for(let i=0; i<this.dataList.length; i++) {
				let data = this.dataList[i]
				if(data.checked && data.checkIn) {
					this.docIdList.push(data.id)
					this.noticeList.push(data.noticeList)
					this.checkInList.push(data.checkIn)
				}
			}
			let updateFlag = false
			for(let i=0; i<this.noticeList.length; i++) {
				if(this.checkInList[i] == true) {
					this.noticeList[i][this.number-1].isDisplay = true
					updateFlag = true
				}
			}
			if(updateFlag) {
				for(let i=0; i<this.docIdList.length; i++) {
					db.collection(this.$store.state.statusCollection).doc(this.docIdList[i]).update({
						noticeList: this.noticeList[i]
					})
				}
			}
			setTimeout(this.makeList, 2000)
			console.log("通知しました．")
		},
		pushDataList(document, userData) {
			let point = 
				document.data().Brain + document.data().DataScience +
				document.data().Fabrication + document.data().Infrastructure +
				document.data().IoT + document.data().Media +
				document.data().Network + document.data().Robot +
				document.data().SE + document.data().Security
			this.dataList.push({
				checked: this.checked,
				userID: userData.user_id,
				checkIn: userData.checkIn,
				mystery: document.data().mysteryCounter,
				point: point,
				notice1: document.data().noticeList[0].isDisplay,
				notice2: document.data().noticeList[1].isDisplay,
				notice3: document.data().noticeList[2].isDisplay,
				isRead1: document.data().noticeList[0].isRead,
				isRead2: document.data().noticeList[1].isRead,
				isRead3: document.data().noticeList[2].isRead,
				noticeList: document.data().noticeList,
				id: document.id
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