<template>
    <div class="modal_container">
      <div class="overlay">
        <div class="modal">
          <h3 class="modal_header">Delete comment</h3>
          <p class="modal_text">
            Are you sure you want to delete this comment? This will remove the comment and can’t
            be undone.
          </p>
          <div class="modal_buttons">
            <button class="modal_btn modal_cancel" type="button" @click="setShowModal(false)">
              NO, CANCEL
            </button>
            <button class="modal_btn modal_delete" type="button" @click="deleteComment">
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "ModalWindow",
    props: {
      commentId: {
        type: String,
        required: true,
      },
    },
  
    methods: {
      setShowModal(isShowModal) {
        this.$emit("show-modal", isShowModal);
      },
      deleteComment() {
        this.$emit("delete-comment", this.commentId);
      },
    },
  };
  </script>
  