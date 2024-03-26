import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

// MUIstyled Components
const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
});
const Card = styled(Box)({
    height: "300px",
    overflow: "hidden",
    width: "250px",
    margin: "10px",
    border: "1px black solid",
    borderRadius: "5px",
    ":hover": {
        transform: "scale(1.1)",
        zIndex: 10,
        boxShadow: "0 0 5px 1px white"
    },
    ":active": {
        transform: "scale(1.05)",
        zIndex: 10,
        boxShadow: "0 0 5px 1px red"
    },
    transition: "0.2s",
    backgroundColor: "white",
    textAlign: "center"
})
const Image = styled('img')({
    height: "80%",
    width: "100%",
    objectFit: "cover"
})

const CategoryCard = ({ category }) => {

    const url = `https://source.unsplash.com/random/900×700/?${category} dish`

    return (
        <StyledLink to={`/category?category=${category}`}>
            <Card >
                <Image src={url} alt="" />
                <Typography style={{ fontWeight: "bolder" }}>{category}</Typography>
            </Card>
        </StyledLink>
    )
};

export default CategoryCard;
