import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";


export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
    categoryValue:number;
    onChangeCategory: (i:number) => void;
};
const Categories:React.FC<CategoriesProps> = React.memo(({ categoryValue, onChangeCategory }) => {
    useWhyDidYouUpdate('Categories', { categoryValue, onChangeCategory });

    //функция ниже используется для большего количества комманд
    //const onClickCategory = (newCategory) => {
    //   setActiveCategory(newCategory)
    //}
    return(
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, i) =>(
                        <li key={i} onClick={() => onChangeCategory(i)} className={categoryValue === i ? 'active' : ''}>{categoryName}</li>
                        //функция отработала и вернула i родителю
                    ))
                }
            </ul>
        </div>
    );
});
export default Categories;