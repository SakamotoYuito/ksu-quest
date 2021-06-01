<template>
	<body>
			<header>
				<nav>
					<div class="nav-wrapper">
						<img src="@/assets/ksu-quest2.png" class="brand-logo">

					</div>
				</nav>
			</header>
		<main>
			<div class="CheckOut">
				<p>チェックアウトが<br/>完了しました！</p>
				<p>ログイン画面に戻ります</p>
				<div class="loader">Loading...</div>
			</div>
		</main>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<a class="icon">
							<font-awesome-icon icon="arrow-left" size="3x" color="gray"/>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</body>
</template>

<script>
import db from '@/plugins/firebase'
import firebase from 'firebase'
export default {
	name: "CheckOut",
	data() {
		return {
			user: null,
			uid: null,
			docID: null
		}
	},
	created() {
		this.checkOut()
	},
	methods: {
		checkOut() {
			this.user = firebase.auth().currentUser
			this.uid = this.user.uid
			if(this.user) {
				setTimeout(() => {
					db.collection('users')
						.where('uid', '==', this.uid).get().then(snapshot => {
							snapshot.forEach(document => {
								this.docID = document.id
							})
						}).then(() => {
							db.collection('users').doc(this.docID).update({
								checkIn: false
							})
						})
					this.$router.push({ name: 'Home' })
				},3000)
			} else {
				this.$router.push({ name: 'Home' })
			}
		}
	}
}
</script>

<style>
.CheckOut {
	text-align: center;
	font-size: 5vmin;
}
</style>