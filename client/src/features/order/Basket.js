import { useAddProductValueMutation, useGetBasketQuery } from './ordersApiSlice';
import React, { useEffect, useState } from 'react';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';

const Basket = () => {
    const navigate = useNavigate()
    const [addProductValue] = useAddProductValueMutation()

    const { data, isSuccess, isLoading, isError, error } = useGetBasketQuery()
    const [basket, setBasket] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setBasket(data)
        }
    }, [isSuccess]);

    if (!isSuccess) return <h1>!success</h1>
    if (isError) return <h2>{error}</h2>
    if (isLoading) return <h1>Loading</h1>
    if (data.length === 0)
        return <h1>סל המוצרים ריק</h1>

    const handleChange = async (prod, quantity) => {
        await addProductValue({ prod: prod._id, quantity })
        console.log("p " + prod.name);
        let newList = [...basket]

        if (quantity > 0)
            newList.map(p => {
                if (p.prod._id != prod._id) {
                    return p
                }
                else return { prod: p.prod, quantity }
            })
        else newList = await basket.filter(p => p.prod._id != prod._id)
        //newList.push( {prod,quantity})
        await setBasket(newList)
    }
    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.prod.name}</span>
                    <div className="flex align-items-center gap-2" style={{ alignContent: 'center' }}>
                        <InputNumber
                            value={item.quantity}
                            style={{ direction: 'ltr', margin: "2%" }}
                            mode="decimal" showButtons min={0}
                            onChange={(e) => handleChange(item.prod, Number(e.value))} />
                        <span>
                            <Button icon="pi pi-trash"
                                rounded outlined aria-label="Filter"
                                onClick={() => handleChange(item.prod, 0)} />
                        </span>
                        <span
                            className="font-bold text-900"
                        >₪{item.prod.price * item.quantity}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <div className="card xl:flex xl:justify-content-center">
            <OrderList
                aria-controls='none'
                dataKey="id" value={basket}
                itemTemplate={itemTemplate}
                header="סל המוצרים">
            </OrderList>
        </div>
        <div style={{ margin: "10px", textAlign: "center", direction: 'rtl' }}>
            <Button label="לאישור ההזמנה"
                icon="pi pi-check"
                style={{ margin: "1%" }}
                onClick={() => navigate("/user/okorder")} />
        </div>
    </>)
}
export default Basket
