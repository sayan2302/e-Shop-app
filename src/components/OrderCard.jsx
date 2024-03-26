import { Box, Grid, Typography, styled } from "@mui/material";
import React from "react";

// Material UI styles
const Card = styled(Box)(({ theme }) => ({
    border: "2px gray solid",
    borderRadius: "5px",
    margin: "5px 50px",
    boxShadow: "2px 2px 5px 0.1px gray",
    [theme.breakpoints.down("md")]: {
        margin: "5px 20px",
    },
    overflow: "hidden"

}))
const Header = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    color: "white",
    padding: "0 5px"
})
const Heading = styled(Typography)({
    fontWeight: "bolder",
    fontSize: "20px",
    padding: "0px 5px"
})
const Map = styled(Box)({
    padding: "5px 5px"
})
const Deets = styled(Box)({
    display: "flex",
    alignItems: "center",
    position: "relative"
})
const Image = styled("img")({
    height: "25px",
    border: "1px gray solid",
    borderRadius: "5px",
    marginRight: "5px",
    marginTop: "4px"

})
const Calc = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    [theme.breakpoints.up("md")]: {
        right: 0,
        position: "absolute",
    },

}))



const OrderCard = ({ perOrder, item, getCountByIdInOrders }) => {

    const getMealNameById = (items, idToFind) => {
        // Find the item with the specified ID
        const foundItem = items.find(item => item.idMeal === idToFind);
        // If the item is found, return its strMeal property; otherwise return null
        return foundItem ? foundItem.strMeal : null;
    };

    const getImageById = (items, idToFind) => {
        // Find the item with the specified ID
        const foundItem = items.find(item => item.idMeal === idToFind);
        // If the item is found, return its strMeal property; otherwise return null
        return foundItem ? foundItem.strMealThumb : null;
    };

    const getTotalAmount = () => {
        let sum = 0
        perOrder.map(ele => sum += ele.count)
        return sum * 100
    }


    return (
        <Card>
            <Header>
                <Typography><b>OrderId:</b> #{Date.now()}</Typography>
                <Typography><b>Total:</b> &#8377; {getTotalAmount()}</Typography>
            </Header>
            <Heading>Items ({perOrder.length})</Heading>
            <Map>
                {
                    perOrder.map((ele, key) => {
                        return (
                            <Deets key={key}>
                                <Grid container>
                                    <Grid style={{ display: "flex", alignItems: "center" }} item lg={6} md={6} sm={12}>
                                        <Image src={getImageById(item, ele.id)} alt="" />
                                        <Typography>{getMealNameById(item, ele.id)}</Typography>
                                    </Grid>
                                    <Grid style={{ display: "flex", alignItems: "center" }} item lg={6} md={6} sm={12}><Calc>{ele.count} X {100} = {ele.count * 100}</Calc></Grid>
                                </Grid>
                            </Deets>
                        )
                    })
                }
            </Map>

        </Card>
    )
};

export default OrderCard;
