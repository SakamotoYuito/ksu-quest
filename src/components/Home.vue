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
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: "Home",
	data() {
		return {
			userID: null,
			feedback: null
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
					.then(() => {
						this.$router.push({ name: 'Status' })
					})
					.catch(err => {
						this.feedback = err.message
					})		
			} else {
				this.feedback = 'ユーザIDを入力してください'
			}
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

