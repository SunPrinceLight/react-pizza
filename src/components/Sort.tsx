import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {setSort} from "../redux/slices/filter/slice.ts";
//import {RootState} from "../redux/store.ts";

import {SortItemType, SortPropertyEnum} from "../redux/slices/filter/types.ts";

// совмещение типа со свои кастомным
//type PopupClick = React.MouseEvent<HTMLBodyElement> & {
//    path: Node[];
//};

export const sorts: SortItemType[] = [
    {name: 'популярности (уб)', sortProperty: SortPropertyEnum.RATING_DESC },
    {name: 'популярности (воз)', sortProperty: SortPropertyEnum.RATING_ASC },
    {name: 'цене (уб)', sortProperty: SortPropertyEnum.PRICE_DESC },
    {name: 'цене (воз)', sortProperty: SortPropertyEnum.PRICE_ASC },
    {name: 'алфавиту (уб)', sortProperty: SortPropertyEnum.TITLE_DESC },
    {name: 'алфавиту (воз)', sortProperty: SortPropertyEnum.TITLE_ASC },
];


const Sort: React.FC<SortItemType> = ( propsSort) => {

    const dispatch = useDispatch();
    //const sort = useSelector((state: RootState) => state.filter.sort);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const[isPopupOpen, setIsPopupOpen] = React.useState(false);

    const choseSelectedSort = (obj:SortItemType) => {
        dispatch(setSort(obj));
        setIsPopupOpen(false);
    }

    React.useEffect(() =>{
        const handleClickOutside = (event: MouseEvent) => {
            const thisEvent = event.composedPath();
            if(sortRef.current && !thisEvent.includes(sortRef.current)){
                setIsPopupOpen(false);
            }
        }
       document.body.addEventListener("click",handleClickOutside);

        //удаление слушателя при переходе на другую страницу
        return() => {
            document.body.removeEventListener("click",handleClickOutside);
        }
    }, []);

    return(
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsPopupOpen(!isPopupOpen)}>{propsSort.name}</span>
            </div>
            {isPopupOpen && (
                <div className="sort__popup">
                    <ul>
                        {
                            sorts.map((obj, i) =>(
                                <li key={i} onClick={() => choseSelectedSort(obj)} className={propsSort.name === obj.name ? 'active' : ''}>
                                    {obj.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}

        </div>
    );
}
export default Sort;