<template>
	<header v-if='!isHome'>
		<nav>
			<div class="nav-wrapper">
				<img src="@/assets/ksu-quest2.png" class="brand-logo">
				<ul class="right">
					<li>
						<a @click="logout">ログアウト</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
	
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      isHome: true
    }
  },
	watch: {
		'$route': function() {
      this.isHome = this.$router.history.current.name === 'Home'
		}
	},
  mounted() {
    this.isHome = this.$router.history.current.name === 'Home'
  },
	methods: {
		logout() {
			if (this.$store.state.unsubscribeSnapshot != null){
				this.$store.state.unsubscribeSnapshot()
			}
			firebase.auth().signOut().then(() => {
				this.$store.state.unsubscribeSnapshot = null
			})
		},
	}
}
</script>