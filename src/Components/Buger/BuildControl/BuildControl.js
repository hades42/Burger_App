import React from "react";
import styles from "./BuilldControl.module.css";
import Control from "./Control/Cotrol";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <Control
            key={ctrl.label}
            label={ctrl.label}
            addIngredient={() => props.ingredientAdd(ctrl.type)}
            removeIngredient={() => props.ingredientRemove(ctrl.type)}
            allowDisable={props.checkDisable[ctrl.type]}
          ></Control>
        );
      })}
      <button
        className={styles.ResetBtn}
        disabled={!props.resetable}
        onClick={props.reseting}
      >
        Reset Burger
      </button>
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
