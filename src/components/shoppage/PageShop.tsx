import React, {useState, useEffect, FC} from 'react';
import db from "../firebase.config";
import {ICategories, IShopItems} from "../types/types";
import Loader from "../Loader/Loader";
import getShopItems from "../API/GetItems";
import {Link} from "react-router-dom";



const PageShop = () => {

    const [jewelryList, setJewelryList] = useState<ICategories[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productItems, setProductItems] = useState<IShopItems[]>([]);
    const limit:number = 5;
    const [pagesCount, setPagesCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [visibleItems, setVisibleItems] = useState<IShopItems[]>([]);
    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    const pageItems = visibleItems.slice(indexOfFirstItem, indexOfLastItem);
    const [searchProducts, setSearchProducts] = useState('');

    async function fetchProducts() {
        setIsLoading(true);
        const jewelryResponse = await getShopItems.getCategories();
        let jewelryList: ICategories[] = [];
        jewelryResponse.docs.forEach(item => {
            jewelryList.push({
                id: item.id,
                name: item.data().name,
                count: item.data().count,
            })
        })
        setJewelryList(jewelryList)

        const productsResponse = await getShopItems.getProducts();
        let productsList:IShopItems[] = [];
        productsResponse.docs.forEach(prodItems => {
            productsList.push({
                id: prodItems.id,
                uniqid: prodItems.data().uniqid,
                name: prodItems.data().name,
                count: prodItems.data().count,
                price: prodItems.data().price,
                description: prodItems.data().description,
            })
        })
        setProductItems(productsList)
        setVisibleItems(productsList);
        setIsLoading(false);
    }


    async function getSortedItems(id:string) {
        const productsResponse = await getShopItems.getCategoryProducts(id);
        if (productsResponse.empty) {
            console.log('No matching documents.');
            setVisibleItems([]);
        } else {
            let productsList:IShopItems[] = [];
            productsResponse.docs.forEach(prodItems => {
                productsList.push({
                    id: prodItems.id,
                    uniqid: prodItems.data().uniqid,
                    name: prodItems.data().name,
                    count: prodItems.data().count,
                    price: prodItems.data().price,
                    description: prodItems.data().description,
                })
            })
            setVisibleItems(productsList);
        }
    }

    useEffect(() => {
        setVisibleItems(productItems.filter(item => (item.name && item.description.toLowerCase().includes(searchProducts))))
    }, [searchProducts])

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        setPagesCount(Math.ceil(visibleItems.length / limit))
    }, [visibleItems])


    const changePage = (page:number) => {
        setPage(page);
    }

    return (
        <div>
            <div>
                <br/>
                <span>Поиск товаров</span>
                <input type="text"
                       value={searchProducts}
                       onChange={e => setSearchProducts(e.target.value)}
                       placeholder={"Введите значение"}
                />
            <div className="jewelry-panel">
                {isLoading
                    ?
                    <Loader/>
                    :
                    jewelryList.map(item =>
                        <div key={item.name} className="jewelry-product-panel">
                            <div className="jewelry-product-item">
                                    <span className="jewelry-product-panel-name"
                                          onClick={() => getSortedItems(item.id)}
                                    >
                                        {item.name}
                                        <div className="arrow-2">
                                            <div className="arrow-2-top"/>
                                            <div className="arrow-2-bottom"/>
                                                </div>
                                    </span>
                            </div>
                        </div>)
                }
                <div className="products-section">
                    {pageItems.length===0
                        ? <h1>Товаров нет</h1>
                        : pageItems.map(productItem =>
                            <div key={productItem.id} className="product-item">
                                <Link className="product-name" to={`/Shop/${productItem.id}`}>
                                <span >
                                    {productItem.name}
                                </span>
                                </Link>
                                <br/>
                                <span className="product-price"> Цена: {productItem.price}</span>
                                <br/>
                                <span className="product-description"> {productItem.description}</span>
                                <pre><button>Добавить в корзину</button></pre>
                            </div>)}
                </div>
            </div>
            <div className={"pagination"}>
                {[...Array(pagesCount).keys()].map(i => i + 1).map(p =>
                    <button key={p} className={`pageBtn ${p === page ? 'pageBtn_active' : ''}`}
                            onClick={() => changePage(p)}
                    >{p}</button>
                )}</div>
        </div>
        </div>
    );
};

export default PageShop;