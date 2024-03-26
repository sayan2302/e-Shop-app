import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Grid, Typography, styled, IconButton } from "@mui/material";
import { getItemById } from '../utils/api';
import { SiAddthis } from "react-icons/si";
import { FaSquareMinus } from "react-icons/fa6";
import { BsCartPlusFill } from "react-icons/bs";


// Material UI styles
const MasterContainer = styled(Box)(({ theme }) => ({
    margin: "80px 80px 0px 80px ",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        margin: "80px 20px 0px 20px ",
        justifyContent: "center",
        height: "fit-content"
    }
}))
const Container = styled(Grid)({
    justifyContent: "center",
    textAlign: "center"
})
const Image = styled("img")(({ theme }) => ({
    width: "100%",
    height: "75vh",
    objectFit: "cover",
    borderRadius: "5px",
    border: "2px solid gray",
    [theme.breakpoints.down("md")]: {
        borderRadius: "5px",
        border: "2px solid gray",
        height: "30vh",
        minWidth: "75vw"
    },
    [theme.breakpoints.down("lg")]: {
        borderRadius: "5px",
        border: "2px solid gray",
        height: "30vh",
        minWidth: "75vw"
    }
}))
const Grid1 = styled(Grid)({
})
const Grid2 = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",

}))
const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",

}))
const ButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}))
const Counter = styled(Box)({
    border: "#1565c0 2px solid",
    borderRadius: "5px",
    width: "50px",
    fontSize: "30",
    fontWeight: "bold",
    textAlign: "center",
    height: "28px",
    paddingTop: "5px",
    color: "#1565c0"

})
const Text1 = styled(Typography)({
    fontSize: "30px",
    fontWeight: "bold",
    padding: "1% 6%"
})
const Text2 = styled(Typography)({
    fontSize: "15px",
    padding: "1% 6%",
    textAlign: "justify"
})
const Text3 = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    fontWeight: "bolder",

}))



const ItemDescriptionPage = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("item")
    const [item, setItem] = useState({})
    const { setTotal, idCount, setIdCount } = useContext(AppContext)

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
        searchAndUpdateOrAdd(id, temp)
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
        decreaseCountOrRemove(id, temp)
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



    useEffect(() => {
        getItemById(id)
            .then(data => {
                setItem(data)
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, [id])


    return (
        <MasterContainer >
            <Box>
                <h2>{item[2]} / {item[1]}</h2>
            </Box>

            <Container container>
                <Grid1 item lg={7}>
                    <Image src={item[3]} alt="" />
                </Grid1>
                <Grid2 item lg={5}>
                    <Text1><u>{item[1]}</u></Text1>
                    <Text2>{item[4]}</Text2>
                    <Text3> &#8377;100</Text3>
                    {checkIdInCart(id, idCount) > 0 ?
                        (
                            <ButtonContainer>
                                <IconButton onClick={e => removeHandler()}><FaSquareMinus style={{ fontSize: "38px", color: "#1565c0" }} /></IconButton>
                                <Counter>{checkCountInCart(id, idCount)}</Counter>
                                <IconButton onClick={e => addHandler()}><SiAddthis style={{ fontSize: "34px", color: "#1565c0" }} /></IconButton>
                            </ButtonContainer>
                        ) : (
                            <StyledButton onClick={e => addHandler()} variant="contained" endIcon={<BsCartPlusFill />}>Add to cart </StyledButton>
                        )
                    }
                </Grid2>
            </Container>



        </MasterContainer >
    );
};

export default ItemDescriptionPage;
