import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function useOrders(page) {
    const auth = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
        const token = localStorage.getItem('token');

        async function fetchOrders() {
            const { data } = await axios({
                method: 'GET',
                url: `/api/user/orders?page=${page}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setOrders([...data.data]);
            setIsLoading(false);
            setLastPage(data.last_page);
        }

        fetchOrders();
    }, [page]);

    return [orders, lastPage, isLoading];
}