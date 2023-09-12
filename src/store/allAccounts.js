import { v4 as uuidv4 } from 'uuid';


export const allAccountsModule = {
    namespaced: true,
    state: () => ({
        allAccountsList: [
            {
                id: uuidv4(),
                pathToPhoto: 'Oval.png',
                accountName: 'juliusomo'
            },
            {
                id: uuidv4(),
                pathToPhoto: 'ramsesmiron.png',
                accountName: 'ramsesmiron'
            },
            {
                id: uuidv4(),
                pathToPhoto: 'maxblagun.png',
                accountName: 'maxblagun'
            },
            {
                id: uuidv4(),
                pathToPhoto: 'amyrobson.png',
                accountName: 'amyrobson'
            },
        ],
        currentUserIndex: 0
    }),
    mutations: {
        changeCurrentUser: (state, newUserId) => {
            state.currentUserIndex = newUserId
        },
    },

}