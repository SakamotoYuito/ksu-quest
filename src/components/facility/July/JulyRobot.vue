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
  name: "JulyRobot",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["AGI"],
      monsterName: "魔獣 不気味の谷",
      courseName: "ロボットインタラクション",
      courseImg: require("@/assets/courseIcon/June/Robot.png"),
      courseId: "Robot",
      rewards: ["Robot:1"],
    };
  },
};
</script>