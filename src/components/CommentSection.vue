<template>
  <div class="comments_container">
    <Comments></Comments>
    <AddComment></AddComment>
  </div>
</template>
<script>
import AddComment from "./AddComment";
import Comments from "./Comments";
export default {
  name: "CommentSection",
  components: {
    AddComment,
    Comments,
  },
};
</script>
<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
}

.comments_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background: var(--very-light-gray, #f5f6fa);
}

.all_comments {
  flex: 1 0 auto;
}

.add_message_section {
  z-index: 1;
  flex: 0 0 auto;
}

@media (min-width: 730px) {
  .comments_container {
    padding-top: 64px;
  }

  .all_comments {
    width: 730px;
    margin: 0 auto;
  }

  .add_message_section {
    width: 730px;
    margin: 0 auto;
    padding: 20px 0px 64px 0px;
  }
}
</style>
