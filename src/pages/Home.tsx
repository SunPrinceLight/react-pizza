import React from "react";
import {useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";

import {selectFilter, setActiveCategory} from "../redux/slices/filterSlice.ts";
import { setFilters } from "../redux/slices/filterSlice.ts";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice.ts";

import Categories from "../components/Categories";
import Sort, {sorts} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useAppDispatch} from "../redux/store.ts";



const Home:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {activeCategory, sort, searchValue} = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const onChangeCategory = React.useCallback((i:number) => {
        dispatch(setActiveCategory(i));
    }, []);


    const getPizzas = async () => {
        // функция с запросом
        const order:string = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy:string = sort.sortProperty.replace('-','');
        const category:string = activeCategory > 0 ? `category=${activeCategory}` : '';
        const search:string = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
            }),
        );
    }


    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редаксе
    React.useEffect(() => {
        if(window.location.search) {
            //парсим запрос из URL в переменную для передачи
            const params = qs.parse(window.location.search.substring(1));
            const sort = sorts.find(obj => obj.sortProperty === params.sortProperty);
            //передача запроса из URL в стейты редакса
            dispatch(
                setFilters({
                    searchValue: "",
                    activeCategory: Number(params.activeCategoty) ,
                    sort: sort || sorts[0],
                })
            );
            isSearch.current = true;
        }
    }, []);

    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                activeCategory,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current= true;
    }, [activeCategory, sort.sortProperty]);

    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current){
            getPizzas();
        }
        isSearch.current=false;
    }, [activeCategory,  sort.sortProperty, searchValue]);

    const renderItems = items.filter((obj:any) => {
            if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
                return true;
            }
            return false;
        }).map((obj:any, i:number) => (
        <PizzaBlock
            //key={obj.id}
            //id={obj.id}
            //title={obj.title}
            //price={obj.price}
            //imageUrl={obj.imageUrl}
            //sizes={obj.sizes}
            //types={obj.types}
            {...obj}
            key={obj.id}
        />
    ));
    const renderSkeletons = [...new Array(8)].map((_, index:number) => <Skeleton key={index} />);

    return (

        <div className="container">
            <div className="content__top">
                <Categories categoryValue={activeCategory} onChangeCategory={onChangeCategory} />
                <Sort sortProperty={sort.sortProperty} name={sort.name}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'loading' ? renderSkeletons : renderItems}
            </div>
        </div>
    );
}
export default Home;