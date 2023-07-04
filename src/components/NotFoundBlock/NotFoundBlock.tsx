import React from "react";

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock:React.FC = () => {
    return(
        <div className={styles.root}>
            <h1>😕</h1><br/>
            <h1>Ничего не найдено</h1>
            <p className={styles.description}>
                Вероятней всего, такой страницы не существует.<br/>
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
        </div>
    );
}
export default NotFoundBlock;