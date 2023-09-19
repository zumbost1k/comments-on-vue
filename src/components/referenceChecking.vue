<template>
  <p class='comment_user_text' v-if='isReferenceToUser'>
    <span class='comment_user_text_first_word'>@{{ firstWord }}</span>
    {{ commentText.slice(firstSpaceIndex + 1) }}
  </p>
  <p class='comment_user_text' v-else>{{ commentText }}</p>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ReferenceChecking',
  props: {
    commentText: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      allAccountsList: (state) => state.allAccounts.allAccountsList,
    }),
    firstSpaceIndex() {
      return this.commentText.indexOf(' ');
    },
    firstWord() {
      const firstWordWithAt = this.commentText.substring(0, this.firstSpaceIndex);
      if (firstWordWithAt.startsWith('@')) {
        const wordWithoutAt = firstWordWithAt.replace(/^@+/, '');
        return wordWithoutAt.length > 0 ? wordWithoutAt : '';
      } else {
        return '';
      }
    },
    isReferenceToUser() {
      if (this.firstWord.length > 0) {
        return this.allAccountsList.some((account) => this.firstWord === account.accountName) ? true : false;
      } else {
        return false;
      }
    },

  },
};
</script>
<style>
.comment_user_text_first_word {
  color: #5357b6;
  font-weight: 600;
}
</style>
