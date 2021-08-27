import ApiService from "../../core/services/api-service";

export default {
    namespaced: true,
    state: () => ({
        isAuthenticated: false,
        token: null
    }),
    mutations: {
        // MUTATIONS - Any synchronous global state actions must be called with mutations.
        // I.E we might update Signer Information using a mutation but perform an ajax request which updates the token in an action
        signInSuccessful(state, payload) {
            state.isAuthenticated = true;
            state.token = payload.token;
        },
        signOut(state) {
            state.isAuthenticated = false;
            state.token = null;
        },
    },
    actions: {
        // ACTIONS - Any global state altering method must be called using an action
        // I.E we might update Signer Information using a mutation but perform an ajax request which updates the token in an action
        async authenticate({commit}, payload) {
            let response = await ApiService.authenticate(payload);
            if (response["status"] === 200) {
                let data = response["data"];
                commit("signInSuccessful", {
                    token: data.token,
                });
            }
            return response;
        },
        signOut({commit}) {
            commit("signOut");
        }
    },
    getters: {
        token: (state) => {
            return state.token;
        }
    }
}