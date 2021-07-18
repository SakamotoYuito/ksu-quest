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
  name: "JulySecurity",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["アンチウイルスソフト"],
      monsterName: "魔獣 マルウェア",
      courseName: "情報セキュリティ",
      courseImg: require("@/assets/courseIcon/June/Security.png"),
      courseId: "Security",
      rewards: ["Security:1"],
    };
  },
};
</script>