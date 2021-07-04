<template>
	<div>
		<p>あなたのおすすめコースは…</p>
		<p>・{{ this.dataList[0].name }}コース</p>
		<p>・{{ this.dataList[1].name }}コース</p>
		<p>・{{ this.dataList[2].name }}コース</p>
	</div>
</template>

<script>
import firebase from 'firebase'
import db from '@/plugins/firebase'

export default {
	name: 'AdventureLog',
	data() {
		return {
			user: null,
			userID: null,
			dataList: [],
		}
	},
	mounted() {
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				this.user = user
				db.collection(this.$store.state.statusCollection)
					.where('uid', '==', user.uid).get().then(snapshot => {
						snapshot.forEach(document => {
							this.dataList = [
								{name: 'ネットワークシステム', value: document.data().Network},
								{name: '情報セキュリティ', value: document.data().Security},
								{name: 'データサイエンス',  value: document.data().DataScience},
								{name: 'ロボットインタラクション', value: document.data().Robot},
								{name: 'コンピュータ基盤設計', value: document.data().Infrastructure},
								{name: '組み込みシステム', value: document.data().IoT},
								{name: 'デジタルファブリケーション', value: document.data().Fabrication},
								{name: '脳科学', value: document.data().Brain},
								{name: 'メディア処理技術', value: document.data().Media},
								{name: '情報システム', value: document.data().SE}
							]
						})
					}).then(() => {
						this.dataList.sort(function(a, b){
							return b.value - a.value
						})
					})
			} else {
				this.user = null
				this.$router.push({ name: 'Home'})
			}
		})
	},
}
</script>