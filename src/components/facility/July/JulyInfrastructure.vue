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
  name: "JulyInfrastructure",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["GRAFIC", "グラフィック"],
      monsterName: "魔獣 オートマトン",
      courseName: "コンピュータ基盤設計",
      courseImg: require("@/assets/courseIcon/June/Infrastructure.png"),
      courseId: "Infrastructure",
      rewards: ["Infrastructure:1"],
    };
  },
};
</script>