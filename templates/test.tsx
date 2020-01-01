import React from "react";
import styles from "./test.module.css";

interface IProps {
}

const Component: React.FC<IProps> = () => {
    return (
      <div className={styles.root}>
        Content
      </div>
    );
};

export default Component;
