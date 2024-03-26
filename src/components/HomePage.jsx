import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../utils/api';
import CategoryCard from './CategoryCard';
import { Box, styled } from '@mui/material';

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


const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then((data) => { setCategories(data) })
            .catch((error) => console.error('Error fetching categories:', error));
    }, [setCategories]);

    return (
        <MasterContainer >
            <h2> Categories</h2>
            <Container>
                {categories.map((category, key) => (
                    <Box key={key}><CategoryCard category={category} /></Box>
                ))}
            </Container>


        </MasterContainer>
    );
};

export default HomePage;
