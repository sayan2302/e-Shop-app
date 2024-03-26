import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Box, Grid, Typography, styled, IconButton, Button } from '@mui/material';
import axios from 'axios';
import OrderCard from './OrderCard';

const MasterContainer = styled(Box)(({ theme }) => ({
    marginTop: "80px",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
        margin: "80px 60px 0px 60px ",
    },
}))
const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start ",
    minHeight: "75vh"
})

const OrdersPage = () => {
    const { orders } = useContext(AppContext);
    const [item, setItem] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            // Use flatMap to flatten the nested arrays
            const orderItems = orders.flatMap(order => order.map(item => item.id));

            // Create an array of promises for each API call
            const promises = orderItems.map(id =>
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(response => response.data.meals[0])
                    .catch(error => {
                        console.error("Error fetching data:", error);
                        return null; // Return null if there's an error
                    })
            );

            try {
                // Wait for all promises to resolve
                const results = await Promise.all(promises);
                // Filter out null values (items that failed to fetch)
                const validItems = results.filter(item => item !== null);
                setItem(validItems);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [orders]);

    const getCountByIdInOrders = (orders, idToFind) => {
        // Flatten the orders array to search through all items
        const allItems = orders.flat();
        // Find the item with the specified ID
        const foundItem = allItems.find(item => item.id.toString() == idToFind.toString());
        // If the item is found, return its count; otherwise return 0
        return foundItem ? foundItem.count : 0;
    };
    // const count = getCountByIdInOrders(orders, 53049);
    // console.log(count);


    return (
        <MasterContainer >
            <h2> Orders</h2>
            <Container>
                {
                    orders.map((perOrder, key) => {
                        return (
                            <Box key={key}>
                                <OrderCard perOrder={perOrder} item={item} getCountByIdInOrders={getCountByIdInOrders} />
                            </Box>
                        )
                    })
                }
            </Container>
        </MasterContainer>
    );
};

export default OrdersPage;
