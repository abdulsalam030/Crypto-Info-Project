import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    Axios.get(
      `https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=USD`
    ).then((res) => {
      setCrypto(res.data.coins);
      console.log(res.data);
    })
    .catch((error) => {
      setErrorMessage(alert("error"));
      console.log(error);
    });;
  }, []);

  return (
    <div className="App">
      <h1 className="text-secondary">All Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Enter your coin..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
       <table className="table table-responsive">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Symbol</th>
                <th scope="col">Market Cap</th>
                <th scope="col">Price</th>
                <th scope="col">Available Supply</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {crypto
                .filter((val) => {
                  return val.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((val, id) => {
                  return (
                    <>
                      <tr key={id}>
                        <td className="rank ">{val.rank}</td>
                        <td className="logo">
                          <a href={val.websiteUrl}>
                            <img src={val.icon} alt="logo" width="20px" />
                          </a>
                          <span style={{ marginLeft: "20px" }}>{val.name}</span>
                        </td>
                        <td className="symbol">{val.symbol}</td>
                        <td>${val.marketCap}</td>
                        <td>${val.price.toFixed(1)}</td>
                        <td>{val.availableSupply}</td>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
    </div>
  );
}

export default App;
