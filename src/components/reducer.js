export const initialState = {
  basket: [],
  user: null,
  userDetailsContext:[],
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => Number(item.price) + Number(amount), 0);

const reducer = (state, action) => {

  switch (action.type) {
    
    case "RESET_BASKET":
      return {
        ...state,
        basket: [action.item],
      };


    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant remove product (id: ${action.id} as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "USER_DETAILS":  
      return{
        ...state,
        userDetailsContext:[action.details]
      }
    
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        userUid: action.user?.uid,
      };
    


    default:
      return state;
  }
};

export default reducer;
