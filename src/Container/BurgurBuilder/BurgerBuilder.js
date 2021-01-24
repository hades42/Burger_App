import React, { Component } from "react";

import Burger from "../../Components/Buger/Burger";
import BuildControl from "../../Components/Buger/BuildControl/BuildControl";
import Aux from "../../hoc/Aux";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSum from "../../Components/Buger/OrderSummary/OrderSum";
import Warning from "../../Components/Warning/Warning";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    resetable: false,
    reseting: false,
  };

  updatePurchaseState = (UpdatedIngredient) => {
    const copyIngredient = {
      ...UpdatedIngredient,
    };
    const sum = Object.entries(copyIngredient).reduce((sum, el) => {
      return sum + el[1] * INGREDIENT_PRICES[el[0]];
    }, 0);
    this.setState({
      purchasable: sum >= 1.8,
    });
  };

  updateAllowReset = (UpdatedIngredient) => {
    const copyIngredient = {
      ...UpdatedIngredient,
    };
    const amount = Object.entries(copyIngredient).reduce((sum, el) => {
      return sum + el[1];
    }, 0);
    this.setState({
      resetable: amount >= 1,
    });
  };

  addIngredient = (type) => {
    // Update the amount of ingredients
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const copyIngredients = {
      ...this.state.ingredient,
    };
    copyIngredients[type] = updatedCount;

    // Update the price of the burger
    const priceAddition = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + priceAddition;
    this.setState({
      ingredient: copyIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(copyIngredients);
    this.updateAllowReset(copyIngredients);
  };

  removeIngredient = (type) => {
    const oldCount = this.state.ingredient[type];
    if (oldCount > 0) {
      // Update the amount of ingredients
      const updatedCount = oldCount - 1;
      const copyIngredients = {
        ...this.state.ingredient,
      };
      copyIngredients[type] = updatedCount;

      // Update the total price
      const priceSubtraction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceSubtraction;
      this.setState({
        ingredient: copyIngredients,
        totalPrice: newPrice,
      });
      this.updatePurchaseState(copyIngredients);
      this.updateAllowReset(copyIngredients);
    }
  };

  resetIngredient = () => {
    this.setState({
      ingredient: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      resetable: false,
      resetting: false,
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
    alert("Continue Buying!");
  };

  resetExecute = () => {
    this.resetIngredient();
    this.cancelReset();
  };
  cancelReset = () => {
    this.setState({ reseting: false });
  };
  resetHandler = () => {
    this.setState({
      reseting: true,
    });
  };

  render() {
    const copyIngredient = {
      ...this.state.ingredient,
    };
    for (let key in copyIngredient) {
      copyIngredient[key] = copyIngredient[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} hidden={this.cancelPurchase}>
          <OrderSum
            ingredients={this.state.ingredient}
            purchasedCancel={this.cancelPurchase}
            purchaseContinue={this.purchaseContinue}
            total={this.state.totalPrice}
          ></OrderSum>
        </Modal>

        <Modal show={this.state.reseting} hidden={this.cancelReset}>
          <Warning
            messege="Are you sure?"
            resetCancel={this.cancelReset}
            resetExecute={this.resetExecute}
          ></Warning>
        </Modal>

        <Burger ingredient={this.state.ingredient}></Burger>
        <BuildControl
          ingredientAdd={this.addIngredient}
          ingredientRemove={this.removeIngredient}
          checkDisable={copyIngredient}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}
          resetBurger={this.resetIngredient}
          resetable={this.state.resetable}
          reseting={this.resetHandler}
        ></BuildControl>
      </Aux>
    );
  }
}

export default BurgerBuilder;
