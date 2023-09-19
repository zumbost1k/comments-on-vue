

export const allCommentsModule = {
    state: () => ({
        allCommentsList: [],
    }),
    mutations: {
        addComment: (state, newCommentInfo) => {
            const { parentId, newComment } = newCommentInfo;
            const addAnswerToComment = (commentList, parentId, newObject) => {
                if (!parentId) {
                    commentList.push(newObject);
                } else {
                    for (let i = 0; i < commentList.length; i++) {
                        const currentComment = commentList[i];
                        if (currentComment.id === parentId) {
                            currentComment.answers.push(newObject);
                        } else if (currentComment.answers.length) {
                            addAnswerToComment(currentComment.answers, parentId, newObject);
                        }
                    }
                }
            }

            addAnswerToComment(state.allCommentsList, parentId, newComment)
        },
        changeQuantityLikes: (state, newQuantityOflikesInfo) => {
            const { id, newQuantityOflikes } = newQuantityOflikesInfo;
            const updateLikeById = (commentList, targetId, quantityOflikes) => {
                commentList.forEach(comment => {
                    if (comment.id === targetId) {
                        comment.quantityOflikes = quantityOflikes;
                    } else if (comment.answers) {
                        updateLikeById(comment.answers, targetId, quantityOflikes);
                    }
                });
            }

            if (newQuantityOflikes > 0) {
                updateLikeById(state.allCommentsList, id, newQuantityOflikes);
            }

        },
        deleteComment: (state, commentToDeleteId) => {
            const removeComment = (commentsList, commentIdToRemove) => {
                for (let i = 0; i < commentsList.length; i++) {
                    if (commentsList[i].id === commentIdToRemove) {
                        commentsList.splice(i, 1);
                        i--;
                    } else if (commentsList[i].answers.length) {
                        removeComment(commentsList[i].answers, commentIdToRemove);
                    }
                }
            }
            removeComment(state.allCommentsList, commentToDeleteId)

        },
        changeCommentText: (state, newCommentTextInfo) => {
            const { id, newCommentText } = newCommentTextInfo;
            const updateTextById = (commentsList, targetId, newText) => {
                for (let i = 0; i < commentsList.length; i++) {
                    if (commentsList[i].id === targetId) {
                        commentsList[i].text = newText;
                    } else if (commentsList[i].answers.length) {
                        updateTextById(commentsList[i].answers, targetId, newText);
                    }
                }
            }

            updateTextById(state.allCommentsList, id, newCommentText);
        }
    },
    namespaced: true
}