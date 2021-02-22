import React, {Component} from "react";
import CheckoutSummary from "../../Components/Order/Checkout/CheckoutSum"

class Checkout extends Component{
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }
   render(){
       return(
           <div>
               <CheckoutSummary ingredient ={this.state.ingredients}></CheckoutSummary>
           </div>
       )
   }
}

export default Checkout;