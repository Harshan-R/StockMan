import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import axios from "axios"; 
import { StockState } from '../StockContext';
import { Container, createTheme, LinearProgress, Table, TableCell, TableContainer, TextField, ThemeProvider, Typography, TableBody, TableRow, TableHead } from '@material-ui/core';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const StockTable = () => {

    const [search, setSearch] = useState("");

    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false)

    const {currency} = StockState()

    const fetchStocks = async () => {

        setLoading(true)
        const {data} = await axios.get(CoinList(currency))

        setStocks(data)
        setLoading(false)

    }

    useEffect(() => {

        fetchStocks()

    }, [currency])

    console.log(stocks)


    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

  return (
    
    <ThemeProvider>

        <Container style={{ textAlign: "center" }}>

            <Typography
            variant="h5"
            style={{
                margin: 18,
                fontFamily: "Montserrat",
            }}
            >
            Stock Prices by Market Cap
            </Typography>

            <TextField
            label="Search For a stock"
            variant="outlined"
            style={{ marginBottom: 20, width: "70%" }}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            <TableContainer>

                {
                    loading?(
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (

                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                {["Coin", "Price", "24Hr Change", "Market Cap"].map(
                                    (head) => (
        
                                    <TableCell
                                        style={{
                                        color: "black",
                                        fontWeight: "700",
                                        fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        // @ts-ignore
                                        align={head === "Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                    )
                                )}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                    <TableRow
                                        onClick={() => history(`/coins/${row.id}`)}
                                        className={classes.row}
                                        key={row.name}
                                    >
                                        <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ display: "flex", gap: 15 }}
                                        >
                                        <img
                                            src={row?.image}
                                            alt={row.name}
                                            height="50"
                                            style={{ marginBottom: 10 }}
                                        />
                                        <div
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >
                                            <span
                                            style={{
                                                textTransform: "uppercase",
                                                fontSize: 22,
                                            }}
                                            >
                                            {row.symbol}
                                            </span>
                                            <span style={{ color: "darkgrey" }}>
                                            {row.name}
                                            </span>
                                        </div>
                                        </TableCell>
                                        <TableCell align="right">
                                        {symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                        align="right"
                                        style={{
                                            // @ts-ignore
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500,
                                        }}
                                        >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                        {symbol}{" "}
                                        {numberWithCommas(
                                            row.market_cap.toString().slice(0, -6)
                                        )}
                                        M
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                            </Table>

                    )
                }

            </TableContainer>

        </Container>

    </ThemeProvider>

  )
}

export default StockTable