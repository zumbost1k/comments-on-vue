<template>
  <section class="all_comments">
    <Comment v-for="comment in allComments" :comment="comment" :key="comment.id"></Comment>
  </section>
</template>
<script>
import Comment from "./Comment.vue";
import { mapState } from "vuex";
export default {
  name: "Comments",
  components: {
    Comment,
  },
  computed: {
    ...mapState({
      allComments: (state) => state.allComments.allCommentsList,
    }),
  },
};
</script>
<style>
.all_comments {
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  gap: 16px;
}
</style>
