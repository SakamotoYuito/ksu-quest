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
      isClick: false,
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
      this.isClick = true
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
          this.isClick = false
			}
		},
	}
}
</script>