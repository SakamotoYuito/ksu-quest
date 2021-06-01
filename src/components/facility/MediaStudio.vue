<template>
	<body>
		<header>
			<nav>
				<div class="nav-wrapper">
					<img src="@/assets/ksu-quest2.png" class="brand-logo">
					<ul class="right">
						<li><a @click="logout">ログアウト</a></li>
					</ul>
				</div>
			</nav>
		</header>
		<main>
			<div class="notification">
				<p>メディアスタジオ</p><hr/>
			</div>
			<p>子どもの頃から興味があった自動車の世界。</p>
			<p>今はその憧れの世界へ、一歩ずつ近づいている手応えを学びの中で感じているところです。</p>
			<p>入学してすぐ履修する「情報理工学概論」では、学部の学びの体系である10コースそれぞれの特徴や、組み合わせの例も紹介してくれます。例えば「自動運転技術のシステム」であれば、メディア処理技術コースとデータサイエンスコースを組み合わせた学びの先にある——とか。自分にぴったりとハマる学びを見つけた瞬間に、勉強が格段に楽しくなりました。</p>
			<p>2年次の今は「機械学習入門」など多くの分野に活用できるAI技術の基礎知識を学んでいます。</p>
			<p>メディア処理技術に関しては、3年次から科目を履修する予定。人とIT技術の橋渡しとなるインタフェースのデザインを学んでいきます。そもそも車の自動運転技術とは、自動車という鉄の塊を人間が手を触れずに動かしていくこと。それがなんだか魔法みたいで、ロマンを感じています。「高度に発達した科学は、魔法と見分けがつかない」といいますが、自分もいつかこの手で魔法をつくれたらなと思っています。</p>
			<p>コースを組み合わせて学びを深めれば、たぶん人が想像できることなら何でもできる。メディア処理技術もデータサイエンスも、掛け合わせれば革命的な技術に化ける可能性を秘めています。入学当初に抱いた期待以上のワクワクした学びが今、目の前に広がっています。</p>
		</main>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<a class="icon">
							<router-link to="/Status">
								<font-awesome-icon icon="arrow-left" size="3x"/>
							</router-link>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</body>
</template>

<script>
import firebase from 'firebase'
export default {
	name: 'MediaStudio',
	methods: {
		logout() {
			firebase.auth().signOut().catch((error) => {
				if (error.name === 'NavigationDuplicated') {
					return
				}
			})
		},
	}
}
</script>
