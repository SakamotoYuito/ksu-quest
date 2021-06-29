<template>
		<body>
		<main>
			<div class="loader">Loading...</div>
		</main>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<a class="icon">
							<font-awesome-icon icon="arrow-left" size="3x"/>
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
	name: 'Loading',
	data() {
		return {
			user: null,
			docID: null,
			query: '',
			urlStatus: [],
			dbList: [],
			updateList: [],
		}
	},
	created() {
		this.dbWriting()
	},
	methods: {
		dbWriting() {
			this.urlStatus.push(this.$route.query.status)
			const now = new Date()
			this.user = firebase.auth().currentUser
			this.uid = this.user.uid
			if(this.user) {
				db.collection('access_log').add({
					date: now,
					place: this.$route.query.place,
					answer: this.$route.query.answer,
					uid: this.user.uid
				})
				db.collection('users')
					.where('uid', '==', this.uid).get().then(snapshot => {
						snapshot.forEach(document => {
							this.docID = document.id
							this.dbList = {
								"Network": document.data().Network,
								"Security": document.data().Security,
								"DataScience": document.data().DataScience,
								"Robot": document.data().Robot,
								"Infrastructure": document.data().Infrastructure,
								"IoT": document.data().IoT,
								"Fabrication": document.data().Fabrication,
								"Brain": document.data().Brain,
								"Media": document.data().Media,
								"SE": document.data().SE,
								"mysteryCounter": document.data().mysteryCounter
							}
					})
				}).then(() => {
					this.urlStatus[0].forEach(element => {
						this.updateList[element.split(':')[0]] = element.split(':')[1]
						let key = element.split(':')[0]
						this.dbList[key] = Number(this.dbList[key]) + Number(this.updateList[key])
					})
					if(this.$route.query.place.includes("Q")) {
						db.collection('users').doc(this.docID).update({
							Network: this.dbList['Network'],
							Security: this.dbList['Security'],
							DataScience: this.dbList['DataScience'],
							Robot: this.dbList['Robot'],
							Infrastructure: this.dbList['Infrastructure'],
							IoT: this.dbList['IoT'],
							Fabrication: this.dbList['Fabrication'],
							Brain: this.dbList['Brain'],
							Media: this.dbList['Media'],
							SE: this.dbList['SE'],
							mysteryCounter: this.dbList['mysteryCounter'] + 1
						})
					} else {
						db.collection('users').doc(this.docID).update({
							Network: this.dbList['Network'],
							Security: this.dbList['Security'],
							DataScience: this.dbList['DataScience'],
							Robot: this.dbList['Robot'],
							Infrastructure: this.dbList['Infrastructure'],
							IoT: this.dbList['IoT'],
							Fabrication: this.dbList['Fabrication'],
							Brain: this.dbList['Brain'],
							Media: this.dbList['Media'],
							SE: this.dbList['SE'],
						})
					}
				}).then(() => {
					setTimeout(() => {
						if(this.$route.query.to=='Status'){
							this.$router.push({ path: this.$route.query.to })
						} else {
							this.$router.push({ path: 'facility/'+ this.$route.query.to})
						}
					}
					,2000
					)
				})
			} else {
				this.$router.push({ name: 'Home' })
			}
		}
	}
}
</script>