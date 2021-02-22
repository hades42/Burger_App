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

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let [key,value] of query.entries()){
            ingredients[key]= value
        };
        this.setState({ingredients: ingredients});
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }
   render(){
       return (
         <div>
           <CheckoutSummary
             ingredient={this.state.ingredients}
             checkoutCancelled={this.checkoutCancelHandler}
             checkoutContinue={this.checkoutContinueHandler}
           ></CheckoutSummary>
         </div>
       );
   }
}

export default Checkout;