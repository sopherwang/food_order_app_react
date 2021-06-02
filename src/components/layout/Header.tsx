import mealImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
import React from "react";

const Header: React.FC<{
    onShowCart: () => {}
}> = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImage} alt='A table full of food.'/>
            </div>
        </>
    )
}

export default Header