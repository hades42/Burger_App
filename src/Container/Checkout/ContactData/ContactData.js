import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/spinner";
import style from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Input from "../../../Components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderFrom: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    //// Only taking the value attribue of the orderFrom to submit
    const formData = {};
    for (let formEl in this.state.orderFrom) {
      formData[formEl] = this.state.orderFrom[formEl].value;
    }

    const order = {
      ingredient: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };
  inputChangedHandler = (event, inputIdentifier) => {
    // When we try to clone the orderForm in the state, we only clone the first layer of that object, which means other down layer like attribute of other objects in orderform have been not deeply cloned yet. So we also have to clone to the layer object that we want to take its attribute otherwise we still pointing to the data in the state which is not a apropriate way to change data in the state

    //// Here we clone the first layer
    const updatingForm = {
      ...this.state.orderFrom,
    };
    //// Then clone the second layer to get the value attribute of the object
    const updatedFormElement = {
      ...updatingForm[inputIdentifier],
    };
    //// We change the value attribute of the object
    updatedFormElement.value = event.target.value;
    //// We put the clone value attribute to the clone orderForm
    updatingForm[inputIdentifier] = updatedFormElement;
    //// We put the clone orderForm to the actually form in the state object.
    this.setState({ orderFrom: updatingForm });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderFrom) {
      formElementsArray.push({
        id: key,
        config: this.state.orderFrom[key],
      });
    }
    let form;

    if (this.state.loading) {
      form = <Spinner></Spinner>;
    } else {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((el) => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              changed={(event) => this.inputChangedHandler(event, el.id)}
            ></Input>
          ))}

          <Button btnType="Success">Order</Button>
        </form>
      );
    }
    return (
      <div className={style.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
