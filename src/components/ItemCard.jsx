import { Box, Button, Typography, styled, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import { SiAddthis } from "react-icons/si";
import { FaSquareMinus } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";

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
        transform: "scale(1.03)",
        zIndex: 10,
        boxShadow: "0 0 5px 1px white"
    },
    ":active": {
        transform: "scale(1.03)",
        zIndex: 10,
        boxShadow: "0 0 5px 1px blue"
    },
    transition: "0.2s",
    backgroundColor: "white",
    textAlign: "center",
    position: "relative"
})
const Image = styled('img')({
    height: "65%",
    width: "100%",
    objectFit: "cover"
})
const Text1 = styled(Typography)({
    fontWeight: "bolder",
})
const StyledButton = styled(Button)({
    position: "absolute",
    width: "95%",
    left: "2.5%",
    bottom: "2.5%"
})
const ButtonContainer = styled(Box)({
    position: "absolute",
    width: "95%",
    left: "2.5%",
    bottom: "2.5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#3498DB"
})
const Counter = styled(Box)({
    border: "solid 2px #1565c0",
    width: "25%",
    fontSize: "30",
    fontWeight: "bold",
    borderRadius: "5px",
    textAlign: "center",
    padding: "1px"
})


const ItemCard = ({ itemObj }) => {

    const { setTotal, idCount, setIdCount } = useContext(AppContext)

    const addElipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + "..." : str;
    };

    const addHandler = () => {
        const searchAndUpdateOrAdd = (id, temp) => {
            var found = false;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].id === id.toString()) {
                    temp[i].count++; // Increase count
                    found = true;
                    break;
                }
            }
            if (!found) {
                // ID not found, add a new object with count as 1
                temp.push({ id: id.toString(), count: 1 });
            }
        }
        let temp = idCount
        searchAndUpdateOrAdd(itemObj.idMeal, temp)
        setIdCount(temp)

        let sum = 0
        for (var i = 0; i < idCount.length; i++) {
            sum += idCount[i].count;
        }
        setTotal(sum)
    }

    const removeHandler = () => {
        const decreaseCountOrRemove = (id, temp) => {
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].id === id.toString()) {
                    temp[i].count--; // Decrease count
                    if (temp[i].count < 1) {
                        temp.splice(i, 1); // Remove the object from array
                    }
                    return; // ID found and count updated or object removed
                }
            }
        }
        let temp = idCount
        decreaseCountOrRemove(itemObj.idMeal, temp)
        setIdCount(temp)

        let sum = 0
        for (var i = 0; i < idCount.length; i++) {
            sum += idCount[i].count;
        }
        setTotal(sum)
    }

    const checkIdInCart = (id, temp) => {
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id === id.toString()) {
                return true
            }
        }
        return false
    }

    const checkCountInCart = (id, temp) => {
        let countx = 0
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id === id.toString()) {
                countx = temp[i].count
            }
        }
        return countx
    }

    return (

        <Card >
            <StyledLink to={`/item?item=${itemObj.idMeal}`}>
                <Image src={itemObj.strMealThumb} alt="" />
                <Text1>{addElipsis(itemObj.strMeal, 50)}</Text1>
            </StyledLink>

            {checkIdInCart(itemObj.idMeal, idCount) > 0 ?
                (
                    <ButtonContainer>
                        <IconButton onClick={e => removeHandler()}><FaSquareMinus style={{ fontSize: "28px", color: "#1565c0" }} /></IconButton>
                        <Counter>{checkCountInCart(itemObj.idMeal, idCount)}</Counter>
                        <IconButton onClick={e => addHandler()}><SiAddthis style={{ fontSize: "25px", color: "#1565c0" }} /></IconButton>
                    </ButtonContainer>
                ) : (
                    <StyledButton onClick={e => addHandler()} variant="contained" endIcon={<BsCartPlusFill />}>Add to cart </StyledButton>
                )
            }

        </Card>
    )
};

export default ItemCard;