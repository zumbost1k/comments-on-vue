<template>
  <section class='all_comments'>
    <Message v-for='comment in allComments' :comment='comment' :key='comment.id'></Message>
  </section>
</template>
<script>
import Message from './Message.vue';
import { mapState } from 'vuex';
export default {
  name: 'Messages',
  components: {
    Message,
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
