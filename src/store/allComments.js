const commentSearchById = (commentList, commentId, actionFunction) => {
    commentList.forEach((currentComment, i) => {
        if (currentComment.id === commentId) {
            actionFunction(commentList, i)
        } else if (currentComment.answers.length) {
            commentSearchById(currentComment.answers, commentId, actionFunction);
        }
    });
}

export const allCommentsModule = {
    state: () => ({
        allCommentsList: [],
    }),
    mutations: {
        addComment: (state, newCommentInfo) => {
            const { parentId, newComment } = newCommentInfo;
            const addAnswer = (commentToAddAnswer, index) => {
                commentToAddAnswer[index].answers.push(newComment)
            }
            if (!parentId) {
                state.allCommentsList.push(newComment)
            }
            else {
                commentSearchById(state.allCommentsList, parentId, addAnswer)
            }
        },
        changeQuantityLikes: (state, newQuantityOflikesInfo) => {
            const { id, newQuantityOflikes } = newQuantityOflikesInfo;
            const changeQuantityOfLikes = (commentToChangeQuantityOfLikes, index) => {
                commentToChangeQuantityOfLikes[index].quantityOflikes = newQuantityOflikes
            }
            if (newQuantityOflikes > 0) {
                commentSearchById(state.allCommentsList, id, changeQuantityOfLikes);
            }
        },
        deleteComment: (state, commentToDeleteId) => {
            const removeComment = (commentsList, commentIndexToRemove) => {
                commentsList.splice(commentIndexToRemove, 1);
            }
            commentSearchById(state.allCommentsList, commentToDeleteId, removeComment)
        },
        changeCommentText: (state, newCommentTextInfo) => {
            const { id, newCommentText } = newCommentTextInfo;
            const updateText = (commentToChangeText, index) => {
                commentToChangeText[index].text = newCommentText
            }
            commentSearchById(state.allCommentsList, id, updateText);
        }
    },
    namespaced: true
}