import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [datap, setDataP] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [wallet, setWallet] = useState("");
  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
  };
  const handleWallet = (event) => {
    setWallet(event.target.value);
  };
  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_QUICKNODE_RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 67,
        jsonrpc: "2.0",
        method: "qn_getWalletTokenBalance",
        params: {
          wallet: wallet?wallet:"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
          page: parseInt(page),
          perPage: parseInt(perPage)
        },
      }),
    });
    const responseData = await response.json();
    setData(responseData.result.assets);
    setDataP(responseData);
  };
  useEffect(() => {
    if (!data) {
      fetchData();
    } 
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  const search = () => {
    fetchData();
  };
  return (
    <center>
    <div>
      <h1>Wallet Token Balance</h1>
      <table>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Symbol</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((asset) => (
            <tr key={asset.address}>
              <td>{asset.name}</td>
              <td>{asset.symbol}</td>
              <td>{asset.amount / 10 ** asset.decimals }</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Total pages</th>
            <th>Total Items</th>
            <th>Page Number</th>
          </tr>
        </thead>
        <tbody>
            <tr key="000">  
              <td> <center>{datap.result.totalPages} </center></td>
              <td><center>{datap.result.totalItems}</center></td>
              <td><center>{datap.result.pageNumber}</center></td>
            </tr>
        </tbody>
      </table>
    </div>
    <br></br>
    <label>
        Page:
        <input type="number" value={page} onChange={handlePageChange} />
      </label>
      <br></br>
      <br></br>
      <label>
        Per Page:
        <input type="number" value={perPage} onChange={handlePerPageChange} />
      </label>
      <label>
        Wallet:
        <input type="text" value={wallet} onChange={handleWallet} />
      </label>
    <button onClick={search} >Default</button>
    </center>
  );
}

export default App;