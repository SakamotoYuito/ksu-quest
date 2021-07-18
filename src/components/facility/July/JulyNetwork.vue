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
  name: "JulyNetwork",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["記憶媒体", "きおくばいたい"],
      monsterName: "魔獣 ファイルシステム",
      courseName: "ネットワークシステム",
      courseImg: require("@/assets/courseIcon/June/Network.png"),
      courseId: "Network",
      rewards: ["Network:1"],
    };
  },
};
</script>