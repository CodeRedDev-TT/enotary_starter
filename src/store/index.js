import {createStore} from 'vuex';
import Auth from './modules/auth';

import createPersistedState from "vuex-persistedstate";

export default createStore({
    plugins: [createPersistedState({paths: ["Auth"]})],
    modules: {
        Auth,
    }
})
