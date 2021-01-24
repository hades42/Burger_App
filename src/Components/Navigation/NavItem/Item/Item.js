import React from "react";
import styles from "./Item.module.css";

const ItemLink = (props) => {
 
  return (
    <li className={styles.Item}>
      <a href={props.LinkTo} className={props.active ? styles.active : null}>
        {props.children}
      </a>
    </li>
  );
};

export default ItemLink;
