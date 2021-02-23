import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/spinner";
import style from "./ContactData.module.css";
import axios from "../../../axios-orders";
import {withRouter} from 'react-router-dom'
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Van Nguyen",
        address: {
          street: "40 Renwick hihi",
          zipCode: "2204",
        },
        email: "Ahihi@gmail.com",
      },
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

  render() {
    let form;
     
    if (this.state.loading) {
      form = <Spinner></Spinner>;
    } else {
      form = (
        <form>
          <input
            className={style.Input}
            type="text"
            name="name"
            placeholder="Your name"
          ></input>
          <input
            className={style.Input}
            type="email"
            name="email"
            placeholder="Your email"
          ></input>
          <input
            className={style.Input}
            type="text"
            name="address"
            placeholder="Your address"
          ></input>
          <input
            className={style.Input}
            type="text"
            name="postal"
            placeholder="Your postal code"
          ></input>
          <Button btnType="Success" clicked={this.orderHandler}>
            Order
          </Button>
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

export default  withRouter(ContactData);
