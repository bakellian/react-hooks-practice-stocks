import React from "react";

function Stock({ stock, onStockClick  }) {

  const handleOnClick = () => {
    onStockClick(stock) 
  }

  

  return (
    <div>
      <div className="card" onClick={handleOnClick}>
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">{stock.price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
