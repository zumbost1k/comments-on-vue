import { createStore } from 'vuex'
import { allCommentsModule } from './allComments'
import { allAccountsModule } from './allAccounts'
export default createStore({
  modules: {
    allAccounts: allAccountsModule,
    allComments: allCommentsModule
  }
})
