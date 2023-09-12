<template>
    <div class='comments_item'>
        <div class='comment_user_info'>
            <img :src='require(`../photos/photosForProfile/${commentAuthor.pathToPhoto}`)' :alt='commentAuthor.accountName'
                width='32' height='32' />
            <p class='comment_user_name'>{{ commentAuthor.accountName }} </p>
            <span v-if='isCurrentUserComment' class='its_you'>you</span>
            <p class='comment_user_date'>{{ dateDifference(comment.date) }}</p>
        </div>

        <textarea v-if='isEditable' v-model='textareaValue' class='comment_user_text comment_user_edit_textarea' />
        <ReferenceChecking v-else :commentText='textareaValue' />

        <div class='quantity_of_likes_container'>
            <button type='button' class='quantity_calc_button' @click='changeQuantityLikes({
                id: comment.id,
                newQuantityOflikes: comment.quantityOflikes + 1
            })'><img width=' 10' height='10' src='../photos/+.svg' alt='minus' /></button>
            <span class='quantity_of_likes_textholder'>{{ comment.quantityOflikes }}</span>
            <button type='button' class='quantity_calc_button' @click='changeQuantityLikes({
                id: comment.id,
                newQuantityOflikes: comment.quantityOflikes - 1
            })'><img width='10' height='10' src='../photos/-.svg' alt='minus' /></button>
        </div>
        <div v-if='isCurrentUserComment' class='delete_edit_buttons_container'>
            <button @click='setShowModal(true)' :disabled='isEditable' type='button'
                class='edit_comment_state_button delete_btn'>
                <Delete /> Delete
            </button>
            <button type='button' :disabled='isEditable' @click='setIsEdit(true)'
                class='edit_comment_state_button edit_btn'>
                <Edit /> Edit
            </button>
        </div>
        <button v-else class='delete_edit_buttons_container reply_btn' @click=' setIsReplying(true)' type='button'><img
                src='../photos/Reply.svg' alt='reply' width='14' height='13' /><span class='reply_text'>Reply</span>
        </button>
        <button v-if='isEditable' class='udate_comment_text_btn' @click='
            setIsEdit(false),
            changeCommentText({
                id: comment.id,
                newCommentText: textareaValue
            })

            '>UPDATE</button>
        <div class='modal_container'>
            <div class='overlay' v-if='showModal'>
                <div class='modal'>
                    <h3 class='modal_header'>Delete comment</h3>
                    <p class='modal_text'>Are you sure you want to delete this comment? This will remove the comment and
                        can’t be undone.</p>
                    <div class='modal_buttons'>
                        <button class='modal_btn modal_cancel' type='button' @click=' setShowModal(false)'>NO,
                            CANCEL</button>
                        <button class='modal_btn modal_delete' type='button' @click='
                            setShowModal(false),
                            deleteComment(comment.id)
                            '>YES, DELETE</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class='reply_container'>
        <form v-if='isReplying' @submit.prevent='addAnswerHandler' class='answer_form'>
            <textarea v-model='replyText' class='message_textarea' name='message' id='message' cols='30' rows='10'
                placeholder='Add a reply…' required />
            <img class='avatar' width='32' height='32'
                :src='require(`../photos/photosForProfile/${currentUser.pathToPhoto}`)' alt='avatar' />
            <button class='send_message' type='submit'>REPLY</button>
        </form>
        <div v-if='comment.answers && comment.answers.length !== 0'>
            <Message :comment='answer' v-for='answer in comment.answers' :key="answer.id" />
        </div>

    </div>
</template>
<script>
import moment from 'moment';
import { v4 } from 'uuid';
import ReferenceChecking from './referenceChecking';
import { mapState, mapMutations } from 'vuex';
import Delete from '../icons/delete';
import Edit from '../icons/edit';
import Message from './message';
export default {
    components: {
        ReferenceChecking, Delete, Edit, Message
    },
    name: 'Message',
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showModal: false,
            isEditable: false,
            isReplying: false,
            textareaValue: '',
            replyText: '',
        }
    },
    methods: {
        dateDifference(startDate) {
            const startMoment = moment(startDate, 'YYYY-MM-DD HH:mm');
            const timeAgo = startMoment.fromNow(true);
            return timeAgo;
        },
        ...mapMutations({
            addComment: 'allComments/addComment',
            changeQuantityLikes: 'allComments/changeQuantityLikes',
            changeCommentText: 'allComments/changeCommentText',
            deleteComment: 'allComments/deleteComment'
        }),
        addAnswerHandler() {
            const newComment = {
                id: v4(),
                userId: this.currentUser.id,
                text: this.replyText,
                date: moment().format('YYYY-MM-DD HH:mm'),
                quantityOflikes: 1,
                answers: []
            }
            this.addComment({
                parentId: this.comment.id,
                newComment: newComment,
            })
            this.replyText = '@' + this.commentAuthor.accountName
            this.isReplying = false
        },
        setIsReplying(newIsReplying) {
            this.isReplying = newIsReplying
        },
        setShowModal(newShowValue) {
            this.showModal = newShowValue;
        },
        setIsEdit(newIsEditValue) {
            this.isEditable = newIsEditValue
        }
    },
    computed: {
        ...mapState({
            allAccountsList: (state) => state.allAccounts.allAccountsList,
            allComments: (state) => state.allComments.allCommentsList,
            currentUser: (state) => state.allAccounts.allAccountsList[state.allAccounts.currentUserIndex],
        }),
        commentAuthor() {
            return this.allAccountsList.find(user => user.id === this.comment.userId);
        },
        isCurrentUserComment() {
            return this.currentUser.id === this.comment.userId;
        }

    },
    created() {
        this.textareaValue = this.comment.text;
    },
    watch: {
        commentAuthor: {
            immediate: true,
            handler(newVal) {
                this.replyText = '@' + newVal.accountName;
            }
        }
    },

}
</script>
<style>
.all_comments {
    display: flex;
    flex-direction: column;
    padding: 32px 16px;
    gap: 16px;
}

.comment_user_info {
    order: 1;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 16px;
}

.comments_item {
    position: relative;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    border-radius: 8px;
    background: var(--white, #FFF);
}

.comment_user_name {
    color: var(--dark-blue, #334253);
    font-size: 16px;
    font-weight: 600;
}

.comment_user_date {
    color: var(--grayish-blue, #67727E);
    font-size: 16px;
    font-weight: 400;
}

.comment_user_text {
    flex: 1 1 100%;
    order: 2;
    margin-top: 16px;
    color: var(--grayish-blue, #67727E);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    border: 0;
    width: 100%;
}

.quantity_of_likes_container {
    margin-top: 16px;
    order: 3;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    background: var(--very-light-gray, #F5F6FA);
    padding: 11px 19px;
}

.udate_comment_text_btn {
    color: var(--white, #FFF);
    font-size: 16px;
    font-weight: 600;
    margin-top: 15px;
    border: 0;
    padding: 7px 7px;
    line-height: 24px;
    border-radius: 8px;
    background: var(--moderate-blue, #5357B6);
    order: 4;
    cursor: pointer;
}

.udate_comment_text_btn:disabled {
    display: none;
}

.udate_comment_text_btn:hover {
    background: var(--moderate-blue, #4c4fa5);
}

.quantity_calc_button {
    border: 0;
    background: none;
}

.quantity_of_likes_textholder {
    text-align: center;
    width: 14px;
    color: var(--moderate-blue, #5357B6);
    font-size: 16px;
    font-weight: 600;
}

.comment_user_edit_textarea {
    resize: none;
    padding: 12px 24px;
    outline: none;
    border-radius: 8px;
    border: 1px solid var(--light-gray, #E9EBF0);
}

.edit_comment_state_buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
}




.edit_comment_state_button {
    background: none;
    border: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.delete_edit_buttons_container {
    padding-top: 16px;
    order: 5;
    display: flex;
    gap: 16px;
}

.reply_btn {
    color: var(--moderate-blue, #5357B6);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    border: 0;
    background: none;
    cursor: pointer;
}

.reply_text {
    margin-top: -6px;
    margin-left: -7px;
}

.delete_btn {
    color: var(--soft-red, #ED6368);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
}

.delete_btn:disabled {
    color: var(--pale-red, #FFB8BB);
}

.edit_btn:disabled {
    color: var(--light-grayish-blue, #C5C6EF);
}

.edit_btn {
    color: var(--moderate-blue, #5357B6);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
}

.modal_container {
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
}

.modal {
    flex-direction: column;
    border-radius: 8px;
    display: inline-flex;
    background-color: white;
    padding: 24px 27px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal_header {
    color: var(--dark-blue, #334253);
    font-size: 20px;
    font-weight: 600;
}

.modal_text {
    text-align: center;
    padding-top: 16px;
    width: 288px;
    color: var(--grayish-blue, #67727E);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
}

.modal_buttons {
    padding-top: 16px;
    display: flex;
    justify-content: space-around;
    gap: 16px;
}

.modal_btn {
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    padding: 12px 20px;
    color: var(--white, #FFF);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.modal_cancel {
    background: var(--grayish-blue, #67727E);
}

.modal_delete {
    background: var(--soft-red, #ED6368);
}

.its_you {
    display: none;
}

.comment_user_text_first_word {
    color: #5357B6;
    font-weight: 600;
}


.reply_container {
    border-left: 2px solid #E9EBF0;
    padding-left: 16px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.answer_form {
    border-radius: 8px;
    background: var(--white, #FFF);
    margin: 16px 16px 32px 16px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

@media (min-width:730px) {

    .answer_form {
        justify-content: center;
        flex-wrap: nowrap;
        align-items: flex-start;
    }

    .reply_container {
        margin-left: 20px;
        padding-left: 43px;
    }

    .its_you {
        margin-left: -8px;
        display: block;
        color: var(--white, #FFF);
        font-size: 13px;
        font-weight: 500;
        border-radius: 2px;
        background: var(--moderate-blue, #5357B6);
        padding: 2px 6px;
    }

    .quantity_of_likes_container {
        margin-top: 0px;
        flex-direction: column;
        order: 1;
    }

    .comment_user_info {
        margin-left: 24px;
        order: 2;
    }

    .delete_edit_buttons_container {
        padding-top: 4px;
        order: 3;
    }

    .comment_user_text {
        margin-top: -47px;
        margin-left: 70px;
        order: 4;
    }


    .comments_item {
        display: flex;
        align-items: flex-start;
    }

    .udate_comment_text_btn {
        padding: 12px 20px;
        margin-left: 85%;
    }

    .edit_btn:disabled {
        color: var(--light-grayish-blue, #C5C6EF);
    }

    .edit_btn {
        color: var(--moderate-blue, #5357B6);
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
    }
}
</style>