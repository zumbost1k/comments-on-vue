<template>
  <section class="add_message_section">
    <form @submit.prevent="addMessageHandler" class="message_form">
      <textarea
        class="message_textarea"
        v-model="currentTextAreaValue"
        name="message"
        id="message"
        cols="30"
        rows="10"
        placeholder="Add a comment…"
        required
      />
      <img
        class="avatar"
        width="32"
        height="32"
        :src="require(`../photos/photosForProfile/${currentUser.pathToPhoto}`)"
        alt="avatar"
      />
      <button class="send_message" type="submit">SEND</button>
    </form>

    <select
      @change="
        (event) => {
          changeCurrentUser(Number(event.target.value));
        }
      "
      name="user_names"
      id="user_names"
    >
      <option
        v-for="(account, index) in allAccountsList"
        :key="account.id"
        :value="index"
      >
        {{ account.accountName }}
      </option>
    </select>
  </section>
</template>
<script>
import { v4 } from "uuid";
import moment from "moment/moment";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AddComments",
  data() {
    return {
      currentTextAreaValue: "",
    };
  },
  methods: {
    updateInput(event) {
      this.currentTextAreaValue = event.target.value;
    },
    addMessageHandler() {
      const newComment = {
        id: v4(),
        userId: this.currentUser.id,
        text: this.currentTextAreaValue,
        date: moment().format("YYYY-MM-DD HH:mm"),
        quantityOflikes: 1,
        answers: [],
      };
      this.addComment({
        newComment: newComment,
      });
      this.setCurrentTextAreaValue("");
    },
    ...mapMutations({
      addComment: "allComments/addComment",
      changeCurrentUser: "allAccounts/changeCurrentUser",
    }),
    setCurrentTextAreaValue(newValue) {
      this.currentTextAreaValue = newValue;
    },
  },
  computed: {
    ...mapState({
      allAccountsList: (state) => state.allAccounts.allAccountsList,
      allComments: (state) => state.allComments.allCommentsList,
      currentUser: (state) =>
        state.allAccounts.allAccountsList[state.allAccounts.currentUserIndex],
    }),
  },
};
</script>
<style>
.message_form {
  border-radius: 8px;
  background: var(--white, #fff);
  margin: 16px 16px 32px 16px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.message_textarea {
  flex: 1 1 100%;
  border-radius: 8px;
  border: 1px solid var(--light-gray, #e9ebf0);
  margin: 16px;
  resize: none;
  width: calc(100% - 32px);
  padding: 12px 24px;
  font-size: 16px;
  height: 96px;
  overflow: hidden;
}

.message_textarea::placeholder {
  color: var(--grayish-blue, #67727e);
  font-feature-settings: "clig" off, "liga" off;
  font-weight: 400;
  line-height: 24px;
}

.send_message {
  color: var(--white, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  border-radius: 8px;
  background: var(--moderate-blue, #5357b6);
  padding: 12px 30px;
  border: 0;
  cursor: pointer;
  margin-bottom: 13px;
  margin-right: 16px;
}

.message_textarea:focus {
  outline: none;
  border: 1px solid var(--moderate-blue, #5357b6);
}

.send_message:hover {
  background: var(--moderate-blue, #4c4fa5);
}

.avatar {
  margin-bottom: 13px;
  margin-left: 16px;
}

@media (min-width: 730px) {
  .message_textarea {
    order: 2;
    width: 506px;
  }

  .send_message {
    order: 3;
    margin-top: 16px;
  }

  .avatar {
    margin-top: 16px;
    order: 1;
  }

  .message_form {
    justify-content: center;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
}
</style>
