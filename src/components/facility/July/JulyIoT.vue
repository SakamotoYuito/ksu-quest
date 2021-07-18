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
  name: "JulyIoT",
  components: {
    QuestionTemplate,
  },
  data() {
    return {
      correctAnswer: ["ICCHIP", "ICチップ"],
      monsterName: "魔獣 マイコン",
      courseName: "組込みシステム",
      courseImg: require("@/assets/courseIcon/June/IoT.png"),
      courseId: "IoT",
      rewards: ["IoT:1"],
    };
  },
};
</script>