<template>
	<QuestionTemplate 
		:correctAnswer = 'correctAnswer'
		:monsterName = 'monsterName'
		:courseName = 'courseName'
		:courseImg = 'courseImg'
		:courseId = 'courseId'
		:rewards = 'rewards'
	/>
</template>

<script>
import QuestionTemplate from "@/components/facility/QuestionTemplate"
export default {
	name: 'NetworkJune',
	components: {
		QuestionTemplate,
	},
	data() {
		return {
			correctAnswer: 'プロトコル',
			monsterName: '魔獣 パケットロス',
			courseName: 'ネットワークシステム',
			courseImg: require('@/assets/courseIcon/June/Network.png'),
			courseId: 'Network',
			rewards: ['Network:1']
		}
	}
}
</script>