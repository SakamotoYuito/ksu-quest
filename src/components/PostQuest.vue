<template>
  <body>
    <main>
      <div>
        <ul>
          <li v-for="(value, key, index) in questCondition['condition']" :key="key">
            <a>key: {{key}} value: {{value}} index: {{index}}</a>
          </li>
        </ul>
      </div>
    </main>
  </body>
</template>

<script>
import db from '@/plugins/firebase'
export default {
  name: 'PostQuest',
  data() {
    return {
      user: null,
      questCondition: null,
      questId: null,
    }
  },
  mounted() {
    this.getQuestInfo()
    // this.postQuest('Network')
    // setTimeout(() => {
    //   this.pushReceivingQuest()
    // }, 1000)
  },
  methods: {
    pushReceivingQuest() {
      console.log(this.questCondition)
      db.collection('congestion').doc('questList').update(this.questCondition)  
    },
    getQuestInfo() {
      db.collection('congestion').get().then(snapshot => {
        snapshot.forEach(document => {
          this.questCondition = document.data()
        })
      })
    },
    postQuest(questName) {
      this.questId = questName
      this.getQuestInfo()
      setTimeout(() => {
        this.questCondition['condition'][this.questId]['congestion'] += 1
      }, 1000)

    }
  }
}
</script>

<style>

</style>