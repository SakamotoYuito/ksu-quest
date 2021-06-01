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
			<div class="CheckIn">
				<p>チェックインが<br/>完了しました！</p>
				<p>ステータス画面に戻ります</p>
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
	name: "CheckIn",
	data() {
		return {
			user: null,
			uid: null,
			docID: null
		}
	},
	created() {
		this.checkIn()
	},
	methods: {
		checkIn() {
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
								checkIn: true
							})
						})
					this.$router.push({ name: 'Status' })
				},3000)
			} else {
				this.$router.push({ name: 'Home' })
			}
		}
	}
}
</script>

<style>
.CheckIn {
	text-align: center;
	font-size: 5vmin;
}
</style>