import { Radar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
	extends: Radar,
	mixins: [reactiveProp],
	props: ['chartData', 'options'],
	mounted() {
		// this.addPlugin({
		// 	beforeDraw: function(c) {
		// 		var ctx = c.chart.ctx;
		// 		ctx.fillStyle = "#fff";
		// 		ctx.fillRect(0, 0, c.chart.width, c.chart.height);
		// 		ctx.save();
		// 	}
		// })
		this.renderChart(this.chartData, this.options)
	}
}