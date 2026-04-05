import { createContext, useReducer, useContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {
                id: action.id,
                name: action.name,
                qty: action.qty,
                size: action.size,
                price: action.price,
                img: action.img,
            }]

        case 'REMOVE':
            return state.filter((_, index) => index !== action.index)

        case 'UPDATE':
            // Merge quantity and amount when the same item-size combination already exists.
            return state.map((food) => {
                if (food.id !== action.id || food.size !== action.size) {
                    return food
                }

                return {
                    ...food,
                    qty: food.qty + parseInt(action.qty, 10),
                    price: food.price + action.price,
                }
            })

        case 'DROP':
            return []

        default:
            return state
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

