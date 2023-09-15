<template>
  <p class="comment_user_text" v-if="isReferenceToUser">
    <span class="comment_user_text_first_word">@{{ firstWord }}</span>
    {{ commentText.slice(firstSpaceIndex + 1) }}
  </p>
  <p class="comment_user_text" v-else>{{ commentText }}</p>
</template>
  
<script>
import { mapState } from "vuex";

export default {
  name: "ReferenceChecking",
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
      return this.commentText.indexOf(" ");
    },
    firstWord() {
      if (this.commentText.startsWith("@")) {
        return this.commentText.substring(1, this.firstSpaceIndex);
      } else {
        return false;
      }
    },
    isReferenceToUser() {
      if (this.firstWord) {
        return this.allAccountsList.some(
          (account) => this.firstWord === account.accountName
        );
      }
      else {
        return false
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
  