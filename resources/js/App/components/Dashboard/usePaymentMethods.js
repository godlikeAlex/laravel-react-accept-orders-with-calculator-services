import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function usePaymentMethods() {
    const { token } = useSelector(state => state.auth);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/user/payment-methods', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(({ data }) => {
            setPaymentMethods(data.data);
            setIsLoading(false);
        });
    }, []);

    return [paymentMethods, isLoading, setPaymentMethods];
}

export default usePaymentMethods;