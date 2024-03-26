import React, { useEffect, useState } from 'react';
import { Box, styled } from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import { getAllItems } from '../utils/api';
import ItemCard from './ItemCard';


// Material UI styles
const MasterContainer = styled(Box)(({ theme }) => ({
    marginTop: "80px",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
        margin: "80px 60px 0px 60px ",
    },
}))
const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start ",
    [theme.breakpoints.down("md")]: {
        justifyContent: "center",

    },
}))



const CategoryPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category")
    const [item, setItem] = useState([])

    useEffect(() => {
        getAllItems(category)
            .then((data) => {
                setItem(data)
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, [category]);

    return (
        <MasterContainer >
            <Box>
                <h2>{category}</h2>
            </Box>

            <Container >
                {item.map((itemObj, key) => (
                    <Box key={key}><ItemCard itemObj={itemObj} /></Box>
                ))}
            </Container>
        </MasterContainer >
    );
};

export default CategoryPage;
