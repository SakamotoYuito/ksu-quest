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
  name: "JulyBrain",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["シナプス"],
      monsterName: "魔獣 脳神経",
      courseName: "脳科学",
      courseImg: require("@/assets/courseIcon/June/Brain.png"),
      courseId: "Brain",
      rewards: ["Brain:1"],
    };
  },
};
</script>