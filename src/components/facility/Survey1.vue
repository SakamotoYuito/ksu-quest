<template>
	<body>
		<main>
			<div>
				<div class="notification">
					<p>アンケート</p>
				</div>
				<p>今回の内容はどうでしたか？</p>
				<hr/>
				<div>
					<form class="survey" @submit.prevent="sendOut">
						<p class="left">
							<label>
								<input class="with-gap" id="0" value="0" name="group1" type="radio" v-model="param"/>
								<span class="white-text">とても興味がある</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="1" value="1" name="group1" type="radio" v-model="param"/>
								<span class="white-text">興味が湧いた</span>
							</label>
						</p>
						<p class="left">
							<label>
								<input class="with-gap" id="2" value="2" name="group1" type="radio" v-model="param"/>
								<span class="white-text">他のコースも見てみたい</span>
							</label>
						</p>
						<a v-if="feedback" class="red-text center">{{ feedback }}<br/></a>
						<button class="btn waves-effect waves-light center" type="submit" name="action">
							<a>送信する</a>
						</button>
					</form>
				</div>
			</div>
		</main>
		<footer>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<a class="icon">
							<a v-if="!isIcon" @mousedown="focusColor" @touchstart="focusColor">
								<font-awesome-icon icon="arrow-left" size="3x"/>
							</a>
							<a v-if="isIcon"  @mouseup="back" @touchend="back" @mouseover="basicColor" @touchmove="basicColor">
								<font-awesome-icon icon="arrow-left" size="3x" color="gray"/>
							</a>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</body>
</template>

<script>
export default {
	name: 'Question1',
	data() {
		return {
			param: [],
			feedback: null,
			isClick: false,
			isIcon: false,
			labStatus: {
				Hirai:  [
					['Media:3', 'Infrastructure:3', 'IoT:3', 'Security:3'],
					['Media:1.5', 'Infrastructure:1.5', 'IoT:1.5', 'Security:1.5', 'Brain:1', 'DataScience:1', 'Fabrication:1', 'Network:1', 'ROBOT:1', 'SE:1'],
					['Brain:2', 'DataScience:2', 'Fabrication:2', 'Network:2', 'Robot:2', 'SE:2']
				],
				Tanaka: [
					['Brain:3', 'DataScience:3'],
					['Brain:2', 'DataScience:2', 'Fabrication:0.25', 'Network:0.25', 'Robot:0.25', 'SE:0.25', 'Media:0.25', 'Infrastructure:0.25', 'IoT:0.25', 'Security:0.25'],
					['Fabrication:0.75', 'Network:0.75', 'Robot:0.75', 'SE:0.75', 'Media:0.75', 'Infrastructure:0.75', 'IoT:0.75', 'Security:0.75']
				],
				Ogino: [
					['Fabrication:3', 'Robot:3'],
					['Fabrication:3', 'Robot:3', 'Brain:0.25', 'DataScience:0.25', 'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'SE:0.25', 'Security:0.25'],
					['Brain:0.75', 'DataScience:0.75', 'Infrastructure:0.75', 'IoT:0.75', 'Media:0.75', 'Network:0.75', 'SE:0.75', 'Security:0.75']
				],
				Niimi: [
					['Infrastructure:3', 'SE:3'],
					['Infrastructure:3', 'SE:3', 'Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25', 'Network:0.25', 'Robot:0.25', 'Media:0.25', 'IoT:0.75', 'Security:0.25'],
					['Brain:0.75', 'DataScience:0.75', 'Fabrication:0.75', 'Network:0.75', 'Robot:0.75', 'Media:0.75', 'IoT:0.75', 'Security:0.75']
				],
				Minakuchi: [
					['Media:3', 'Fabrication:3'],
					['Media:3', 'Fabrication:3', 'Brain:0.25', 'DataScience:0.25', 'Infrastructure:0.25', 'IoT:0.25', 'Network:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25'],
					['Brain:0.75', 'DataScience:0.75', 'Infrastructure:0.75', 'IoT:0.75', 'Network:0.75', 'Robot:0.75', 'SE:0.75', 'Security:0.75']
				],
				Kawai: [
					['Network:3', 'DataScience:3'],
					['Network:3', 'DataScience:3', 'Brain:0.25', 'Fabrication:0.25', 'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25'],
					['Brain:0.25', 'Fabrication:0.25', 'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25']
				],
				Miyamori: [
					['Robot:3', 'SE:3'],
					['Robot:3', 'SE:3', 'Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'Security:0.25'],
					['Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'Security:0.25']
				],
				Munekata: [
					['Robot:3', 'Brain:3'],
					['Robot:3', 'Brain:3', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'SE:0.25', 'Security:0.25'],
					['DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'SE:0.25', 'Security:0.25']
				],
				Kano: [
					['Media:3', 'IoT:3'],
					['Media:3', 'IoT:3', 'Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'Network:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25'],
					['Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'Network:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25']
				],
				Nakajima: [
					['DataScience:3', 'SE:3'],
					['DataScience:3', 'SE:3', 'Brain:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'Robot:0.25', 'Security:0.25'],
					['Brain:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'IoT:0.25', 'Media:0.25', 'Network:0.25', 'Robot:0.25', 'Security:0.25']
				],
				Segawa: [
					['IoT:3', 'Network:3'],
					['IoT:3', 'Network:3', 'Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'Media:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25'],
					['Brain:0.25', 'DataScience:0.25', 'Fabrication:0.25',  'Infrastructure:0.25', 'Media:0.25', 'Robot:0.25', 'SE:0.25', 'Security:0.25']
				]
			}
		}
	},
	methods: {
		sendOut() {
			let labName = this.$route.query.status
			if(this.param) {
				this.$router.push({ name: 'Loading', query: {status: this.labStatus[labName][this.param], place: labName, to: 'Status', answer: this.param}})
			} else {
				this.feedback = '選択してください'
			}
		},
		back() {
			if(!this.isClick) {
				this.$router.push({ name: 'Status'})
				this.isClick = true
				this.isIcon = false
			}
		},
		focusColor() {
			this.isIcon = true
		},
		basicColor() {
			this.isIcon = false
		}
	}
}
</script>

<style>
.survey {
	display: flex;
  flex-direction: column;
	align-items: left;
}
.survey .btn { 
	margin-left: 20%;
	margin-right: 20%;
}
[type="radio"]:not(:checked)+span:before, [type="radio"]:not(:checked)+span:after {
    border: 2px solid white;
}
[type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:after {
    background-color: lime;
}
[type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:before, [type="radio"].with-gap:checked+span:after {
    border: 2px solid lime;
}
</style>