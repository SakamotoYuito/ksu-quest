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
  name: "JulySE",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["プログラミング"],
      monsterName: "魔獣 アルゴリズム",
      courseName: "情報システム",
      courseImg: require("@/assets/courseIcon/June/SE.png"),
      courseId: "SE",
      rewards: ["SE:1"],
    };
  },
};
</script>