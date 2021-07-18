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
  name: "JulyMedia",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["VR"],
      monsterName: "魔獣 コンピュータグラフィックス",
      courseName: "メディア処理技術",
      courseImg: require("@/assets/courseIcon/June/Media.png"),
      courseId: "Media",
      rewards: ["Media:1"],
    };
  },
};
</script>