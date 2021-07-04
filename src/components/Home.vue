<template>
	<div class="login">
		<div class="center-align">
			<div class="col s12 m4 l8"><p>神山<br/>クエスト</p></div>
			<form @submit.prevent="login">
				<div class="field">
					<label for="userID"><a>ユーザID</a></label>
					<input class="white-text validate" type="text" name="userID" placeholder="IDを入力" v-model="userID">
				</div>
				<a v-if="feedback" class="red-text">{{ feedback }}<br/></a>
				<button class="btn waves-effect waves-light" type="submit" name="action">
					<a>ログイン</a>
				</button>
			</form>	
			<a><router-link to="/Signup">初めてご利用の方はこちら</router-link></a>
		</div>
	<button class="btn waves-effect waves-light" @click="maintenance">
	test
	</button>
	</div>
</template>

<script>
import db from '@/plugins/firebase'
import firebase from 'firebase'

export default {
	name: "Home",
	data() {
		return {
			userID: null,
			feedback: null,
			uid: null
		}
	},
	methods: {
		login() {
			if(this.userID) {
				this.feedback = null
				let email = this.userID + '@example.com'
				let password = '123456'

				firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(cred => {
						this.uid = cred.user.uid
						db.collection(this.$store.state.statusCollection).where('uid', '==', this.uid).get().then(snapshot => {
							if(snapshot.size == 0){
								db.collection(this.$store.state.statusCollection).add({
									uid: this.uid,
									noticeList: {
										0: {
											isDisplay: false,
											isRead: false,
											name: "message1"
										},
										1: {
											isDisplay: false,
											isRead: false,
											name: "message2"
										},
										2: {
											isDisplay: false,
											isRead: false,
											name: "message3"
										}
									},
									mysteryCounter: 0,
									Network: 0,
									Security: 0,
									DataScience: 0,
									Robot: 0,
									Infrastructure: 0,
									IoT: 0,
									Fabrication: 0,
									Brain: 0,
									Media: 0,
									SE: 0
								})
							}
						})
					}).then(() => {
						let doc = null
						let docId = null
						db.collection(this.$store.state.userCollection).where('uid', '==', this.uid).get().then(snapshot => {
							snapshot.forEach(document => {
								doc = document.data()
								docId = document.id
								doc[this.$store.state.questDate] = true
							})
						}).then(() => {
							db.collection(this.$store.state.userCollection).doc(docId).update(doc)
						})
					}).then(() => {
							this.$router.push({ name: 'Status' })
					})
					.catch(err => {
						this.feedback = err.message
					})
			} else {
				this.feedback = 'ユーザIDを入力してください'
			}
		},
		maintenance() {
			/*db.collection(this.$store.state.userCollection).get().then(snapshot => {
				snapshot.forEach(document => {
					let doc = document.data()
					delete doc.user_id
					delete doc.checkIn

					console.log(doc)
					db.collection(this.$store.state.statusCollection).add(doc)
				})
			})*/
			/*db.collection(this.$store.state.userCollection).get().then(snapshot => {
				snapshot.forEach(document => {
					let docID = document.id
					console.log(docID)
					db.collection(this.$store.state.userCollection).doc(docID).update({
						"Brain": firebase.firestore.FieldValue.delete(),
						"Security": firebase.firestore.FieldValue.delete(),
						"DataScience": firebase.firestore.FieldValue.delete(),
						"Fabrication": firebase.firestore.FieldValue.delete(),
						"Infrastructure": firebase.firestore.FieldValue.delete(),
						"IoT": firebase.firestore.FieldValue.delete(),
						"Media": firebase.firestore.FieldValue.delete(),
						"Network": firebase.firestore.FieldValue.delete(),
						"Robot": firebase.firestore.FieldValue.delete(),
						"SE": firebase.firestore.FieldValue.delete(),
						"noticeList": firebase.firestore.FieldValue.delete(),
						"mysteryCounter": firebase.firestore.FieldValue.delete(),
						"june_quest": true,
						"july_quest": false,
						"september_quest": false
					})
				})
			})*/
		}
	}
}
</script>

<style>
.login {
	display: flex;
	align-items: center;
	flex-direction: column;
}
.login p, input {
	font-size: 50px;
	font-family: 'PixelMplus12-Bold';
	src: url('~@/assets/fonts/PixelMplus12-Bold.ttf');
	color: white;
}
.login a {
	margin: 10px;
}
.login label {
	font-family: 'PixelMplus12-Bold';
	src: url('~@/assets/fonts/PixelMplus12-Bold.ttf');
	color: white;
}
.login .field {
	margin-left: 25px;
	margin-right: 25px;
	max-width: 1000px;
	text-align: center;
}
.btn {
	text-align: center;
	margin: 20px;
}

</style>

