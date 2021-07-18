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
  name: "JulyFabrication",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["レーザーカッター"],
      monsterName: "魔獣 工作機械",
      courseName: "デジタルファブリケーション",
      courseImg: require("@/assets/courseIcon/June/Fabrication.png"),
      courseId: "Fabrication",
      rewards: ["Fabrication:1"],
    };
  },
};
</script>