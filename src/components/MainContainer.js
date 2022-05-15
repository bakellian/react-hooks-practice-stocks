import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(stocks => {
        const allStocks = stocks.map((stock) => { return {...stock, bought: false}}) //added an attribute
        setStocks(allStocks)
        console.log("all stocks;", allStocks);
      });

  }, []);

  console.log("portfolio", portfolio)

  function buyStock(stock) {
    //click on a stock and have it render in the portfolio container
    //need to return an array of portfolio by triggering the attribute to bought
    setPortfolio([...portfolio, {...stock, bought: true}])
  }

  function deleteStock(stockToDelete) {
    setPortfolio((portfolio) => 
      portfolio.filter((stock) => stock.id !== stockToDelete.id)
    );
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filterBy
  );

  

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} buyStock={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} stocks={stocks} deleteStock={deleteStock} />
        </div>
      </div>
    </div>
  );
  
}

export default MainContainer;
