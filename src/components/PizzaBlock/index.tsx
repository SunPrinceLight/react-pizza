import React from "react";
import {useDispatch, useSelector} from "react-redux";

import { cartSelectorById } from "../../redux/slices/cart/selectors.ts";
import { CartItem } from "../../redux/slices/cart/types.ts";
import { addItem } from "../../redux/slices/cart/slice.ts";

import {Link} from "react-router-dom";

export const pizzaTypes = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    sizes:number[],
    types:number[],
    rating:number,
}

const PizzaBlock:React.FC<PizzaBlockProps> = (props) => {
    //выбор размера пеццы
    const[activeSize, setActiveSize] = React.useState(0);
    const[activeType, setActiveType] = React.useState(0);
    const dispatch = useDispatch();
    const cartItem = useSelector(cartSelectorById(props.id));

    const addedCount = cartItem ? cartItem.count : 0;
    const onClickAdd = () => {
        const item: CartItem = {
            id: props.id,
            title: props.title,
            price: props.price,
            imageUrl: props.imageUrl,
            size: props.sizes[activeSize],
            type: activeType,
            count: addedCount,
        }
        dispatch(addItem(item));
    }

    return(
        <div className="pizza-block-wrappper">
            <div className="pizza-block">
                <Link to={"/pizza/"+props.id} >
                    <img
                        className="pizza-block__image"
                        src={props.imageUrl}
                        alt="Pizza"
                    />
                </Link>
                <h4 className="pizza-block__title">{props.title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            props.types.map((typeIndex) =>(
                                <li key={typeIndex} onClick={() => setActiveType(typeIndex)} className={activeType === typeIndex ? 'active' : ''}>{pizzaTypes[typeIndex]}</li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            props.sizes.map((size, i) =>(
                                <li key={i} onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''}>{size} см.</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {props.price} ₽</div>
                    <div onClick={onClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить </span>
                        {
                            addedCount > 0 && <i>{addedCount}</i>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PizzaBlock;