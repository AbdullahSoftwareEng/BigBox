import { 
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    CLEAR_ITEM_CART,
    SAVE_SHIPPING_INFO 
} from "../constants/cartConstants";

export const cartReducer = (state ={ cartItems: [], shippingInfo: {} }, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_TO_CART:
                const item = payload; 
                const isItemExist = state.cartItems.find(i => i.product === item.product)
                if(isItemExist){
                    return {
                        ...state,
                        cartItems: state.cartItems.map(i => i.product === isItemExist.product? item: i)
                    }
                }else{
                    return{
                        ...state,
                        cartItems: [...state.cartItems, item]
                    }
                }
        case REMOVE_ITEM_CART:
            return{
                ...state,
                cartItems:state.cartItems.filter(i => i.product !== payload)
            }
        case CLEAR_ITEM_CART:
            return{
                cartItems: []
            }    
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo:payload
            }            
    
        default:
            return state;
    }
}