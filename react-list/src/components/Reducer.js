export function reducer  (state, action) {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userName: "Melikle"
            }
        default: return state
    }
}