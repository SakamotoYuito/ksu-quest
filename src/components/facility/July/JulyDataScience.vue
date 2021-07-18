<template>
  <QuestionTemplate
    :correctAnswer="correctAnswer"
    :monsterName="monsterName"
    :courseName="courseName"
    :courseImg="courseImg"
    :courseId="courseId"
    :rewards="rewards"
  />
</template>

<script>
import QuestionTemplate from "@/components/facility/QuestionTemplate";
export default {
  name: "JulyDataScience",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["人工知能"],
      monsterName: "魔獣 ビックデータ",
      courseName: "データサイエンス",
      courseImg: require("@/assets/courseIcon/June/DataScience.png"),
      courseId: "DataScience",
      rewards: ["DataScience:1"],
    };
  },
};
</script>