import React, {useEffect, useState} from 'react';
import getShopItems from "../API/GetItems";
import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader";
import {IProductPage} from "../types/types";

const ProductItemPage = () => {
    const params = useParams();
    const [productItemPage, setProductItemPage] = useState({
        name: undefined, price: undefined, description: undefined,
    });
    const [loading, setLoading] = useState(false);

    async function getItem(id: string) {
        setLoading(true);
        const productItem = await getShopItems.getProductItem(id);
        // @ts-ignore
        setProductItemPage(productItem.data());
        console.log(productItem);
        setLoading(false);
    }

    useEffect(() => {
        getItem(params.id as string);
    }, [])

    return (
        <div>
            {loading
                ?
                <Loader/>
                :
                <div className={"shop-Item-Page"}>
                    <label  className={"shop-Item-Title"}>{productItemPage.name}</label> <br/><label className={"shop-Item-Description"}>{productItemPage.description}</label>
                    <br/>  <label  className={"shop-Item-Price"}>Цена {productItemPage.price}</label>
                </div>}</div>
    );
};

export default ProductItemPage;