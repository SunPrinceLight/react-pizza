import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const { id} = useParams();
    const navigate = useNavigate();

    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

    React.useEffect(() => {
       async function fetchPizza() {
            try {
                const { data } = await axios.get('https://646ccf457b42c06c3b2c10c8.mockapi.io/pizzas/'+id);
                console.log( data );
                setPizza(data);
            } catch (error) {
                alert('Ошибка, такой питсы нет!!!!!')
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return 'LOADING';
    }


    return(
        <div>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <p>Text text text text text text text text text text text text text</p>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
}

export default FullPizza;