import React, { useContext } from "react";
import { AppBar, Box, Button, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";


// Material UI styles
const Component = styled(AppBar)({
    background: "white",
    color: "black",
});
const Container = styled(Toolbar)({
    fontFamily: '"Macondo", cursive',
    fontWeight: "600",
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-between",
});
const Icon = styled(RiShoppingBag3Fill)({
    fontSize: "50px",
    color: "#1B2631"
})
const Text1 = styled(Typography)({
    color: "#1B2631",
    fontSize: "30px",
    fontWeight: "900",
    transition: "0.2s",
    fontFamily: '"Rubik Vinyl", system-ui',
    fonStyle: "normal",
})
const Logo = styled(Button)({
    borderRadius: "5px",
    ":hover": {
        "& > p": {
            color: "#E74C3C"
        }
    }
})

const Cart = styled(FaShoppingCart)({
    color: "#1B2631",
    transition: "0.15s",
    ":hover": {
        color: "red",
    },
    ":active": {
        color: "black",
    },
    fontSize: "30px"
})
const Setting = styled(IoSettingsSharp)({
    marginLeft: "30px",
    color: "#1B2631",
    transition: "0.15s",
    ":hover": {
        color: "red",
    },
    fontSize: "30px"
})
const Holder = styled(Box)({
    display: "flex",
    position: "relative"
})
const Badge = styled('span')({
    fontSize: "14px",
    position: "absolute",
    color: "white",
    backgroundColor: "red",
    height: "18px",
    width: "18px",
    fontFamily: 'monospace',
    borderRadius: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    left: 15,
    top: -5

})

const Header = () => {
    const { total } = useContext(AppContext)


    return (
        <Component>
            <Container>
                <Box >
                    <Link to="/">
                        <Logo >
                            <Icon />
                            <Text1>e - Shop</Text1>
                        </Logo>
                    </Link>
                </Box>
                <Holder >
                    <Link to="/cart">
                        <Cart />
                        <Badge>{total}</Badge>
                    </Link>
                    <Box><Setting /></Box>
                </Holder>
            </Container>
        </Component>
    );
};

export default Header;
