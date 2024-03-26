import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Typography, styled, IconButton, Button } from '@mui/material';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { SiAddthis } from "react-icons/si";
import { FaSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

// Material UI styles
const MasterContainer = styled(Box)(({ theme }) => ({
    marginTop: "80px",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
        margin: "80px 60px 0px 60px ",
    },
}))
const MasterGrid = styled(Grid)({
    display: "flex",
})
const Grid1 = styled(Grid)({
    // border: "1px solid red",
    minHeight: "30vh"
})
const Grid2 = styled(Grid)({
    // border: "1px solid red",
})
const Card = styled(Box)(({ theme }) => ({
    border: "2px black solid",
    margin: "5px",
    borderRadius: "5px",
    display: "flex",
    position: "relative",
    "&> p": {
        fontSize: "23px",
        fontWeight: "bold"
    },
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
    },
}))
const ButtonContainer = styled(Box)(({ theme }) => ({

    display: "flex",
    color: "#3498DB",
    right: 15,
    top: "50 %",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        position: "absolute",
    },
}))
const Counter = styled(Box)({
    border: "solid 2px #1565c0",
    width: "25px",
    fontSize: "30",
    fontWeight: "bold",
    borderRadius: "5px",
    textAlign: "center",
    height: "25px",
    color: "black"
})
const Image = styled("img")(({ theme }) => ({
    height: "70px",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
        height: "50px"
    }
}))
const Text4 = styled(Typography)(({ theme }) => ({
    marginLeft: "20px"
}))

const Text1 = styled(Typography)({
    fontSize: "20px",
    fontWeight: "normal"
})
const Text2 = styled(Typography)({
    fontSize: "30px",
    fontWeight: "bolder",
    textAlign: "center",
    justifyContent: "center",
    textDecoration: "underline"
})
const Summary = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "7px 20px",
    alignItems: "center"
})


const CartPage = () => {
    const { idCount, setIdCount, total, setTotal, orders, setOrders } = useContext(AppContext)
    const [item, setItem] = useState([])

    useEffect(() => {
        let promises = idCount.map(ele => {
            return axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ele.id}`)
                .then(response => response.data.meals[0])
        });

        Promise.all(promises)
            .then(results => {
                setItem(results.filter(item => item !== undefined));
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [idCount]);

    const addHandler = (xid) => {
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
        searchAndUpdateOrAdd(xid, temp)
        setIdCount(temp)

        let sum = 0
        for (var i = 0; i < idCount.length; i++) {
            sum += idCount[i].count;
        }
        setTotal(sum)
    }
    const removeHandler = (xid) => {
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
        decreaseCountOrRemove(xid, temp)
        setIdCount(temp)

        let sum = 0
        for (var i = 0; i < idCount.length; i++) {
            sum += idCount[i].count;
        }
        setTotal(sum)
    }
    // const checkIdInCart = (id, temp) => {

    //     for (var i = 0; i < temp.length; i++) {
    //         if (temp[i].id === id.toString()) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    const checkCountInCart = (id, temp) => {
        let countx = 0
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id === id.toString()) {
                countx = temp[i].count
            }
        }
        return countx
    }
    const addElipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + "..." : str;
    };
    const totalCost = () => {
        let sum = 0
        idCount.forEach((ele) => {
            sum += ele.count * 100
        })

        return sum
    }
    const orderHandler = () => {
        setOrders([...orders, idCount])
        setIdCount([])
        setTotal(0)
    }

    return (
        <MasterContainer >
            <h2> Cart</h2>
            <MasterGrid container>
                <Grid1 item lg={8} md={12} sm={12}>
                    {item &&
                        item.map((ele, key) => {
                            return (
                                (checkCountInCart(ele.idMeal, idCount) > 0 &&
                                    < Card key={key} >
                                        <Image src={ele.strMealThumb} alt="" />
                                        <Text4 >{addElipsis(ele.strMeal, 50)}</Text4>
                                        <ButtonContainer>
                                            <IconButton onClick={e => removeHandler(ele.idMeal)}><FaSquareMinus style={{ fontSize: "28px", color: "#1565c0" }} /></IconButton>
                                            <Counter>{checkCountInCart(ele.idMeal, idCount)}</Counter>
                                            <IconButton onClick={e => addHandler(ele.idMeal)}><SiAddthis style={{ fontSize: "25px", color: "#1565c0" }} /></IconButton>
                                        </ButtonContainer>
                                    </Card>)
                            )
                        })
                    }
                </Grid1>
                <Grid2 item lg={4} md={12} sm={12}>
                    {total > 0 && <Text2>Summary</Text2>}
                    {item &&
                        item.map((ele, key) => {
                            return (
                                (checkCountInCart(ele.idMeal, idCount) > 0 &&
                                    < Summary key={key} >
                                        <Text1>{addElipsis(ele.strMeal, 50)}</Text1>

                                        <Box style={{ display: "flex", alignItems: 'center' }}>
                                            <Counter>{checkCountInCart(ele.idMeal, idCount)}</Counter>
                                            <p><b>&nbsp;X&nbsp;</b></p>
                                            <Counter style={{ width: "30px" }}>100</Counter>
                                            <p><b>&nbsp;=&nbsp;</b></p>
                                            <Counter style={{ width: "30px" }}>{checkCountInCart(ele.idMeal, idCount) * 100}</Counter>
                                        </Box>
                                    </Summary>)
                            )
                        })
                    }
                    {total > 0 && <hr />}
                    {/* <Counter style={{ width: "30px", position: "absolute", right: "6.5%" }}>{totalCost()}</Counter> */}
                    {total > 0 ?
                        <>
                            <Counter style={{ minWidth: "20px", width: "fit-content", float: "right", marginRight: "20px" }}>{totalCost()}</Counter>
                            <Link to='/orders'>
                                <Button variant='contained' onClick={() => orderHandler()}>PLace Order</Button>
                            </Link>
                        </>
                        :
                        <Text1 style={{
                            color: "red", position: "absolute", right: "45%", top: '50vh', fontWeight: "bolder",
                            fontSize: "40px"
                        }}>
                            Cart Empty
                        </Text1>
                    }
                </Grid2>
            </MasterGrid>
        </MasterContainer >
    );
};

export default CartPage;
