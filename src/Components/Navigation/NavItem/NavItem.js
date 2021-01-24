import React from "react"

import styles from "./NavItem.module.css";
import Item from "../NavItem/Item/Item"
const NavItem = () => {
    return (
      <ul className={styles.NavItem}>
        <Item LinkTo="/" active>Burger Builder</Item>
        <Item LinkTo="/">Checkout</Item>
      </ul>
    );
}

export default NavItem;