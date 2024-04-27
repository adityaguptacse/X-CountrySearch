import "./App.css";
import { useState, useEffect } from "react";


function App() {
  let [flagList, setFlagList] = useState([]);
  let [cardList, setCardList] = useState([]);
  let [searchText, setSearchText] = useState("");


  useEffect(() => {
    try {
      fetch("https://restcountries.com/v3.1/all")
        .then((res) => {
          console.log("first res", res);
          return res.json();
        })
        .then((res) => {
          console.log("2nd res", res);
          setFlagList(res);
        })
        .catch((err) => {
          console.log("err-> ", err);
        });
    } catch (error) {
      console.log("error in fetching",error);
    }
  }, []);

  useEffect(() => {
    let list = [];
    console.log("searched Text", searchText);
    if (flagList.length > 0 && searchText.length > 0) {
      list = flagList.filter((ele) => {
        //console.log(str.includes(substr));
        let name = ele.name.common.toLowerCase();
        if (name.includes(searchText.toLowerCase())) {
          return ele;
        }
      });
      console.log("filtered List-> ", list);
      setFlagList(list);
    } else {
      try {
        fetch("https://restcountries.com/v3.1/all")
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            setFlagList(res);
          })
          .catch((err) => {
            console.log("err-> ", err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchText]);

  useEffect(() => {
    if (flagList.length) {
      let cardList = flagList.map((ele) => {
        return (
          <div className="countryCard">
            <img
              src={ele.flags.png}
              alt={ele.flags.alt}
              width="100px"
              height="100px"
            />
            <h2 className="ctyName">{ele.name.common}</h2>
          </div>
        );
      });
      setCardList(cardList);
    }

  }, [flagList]);
  return (
    <div>
      <header>
        <input
          placeholder="Search for countries..."
          type="text"
          className="searchBox"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </header>
      <div className="mainDiv">{cardList}</div>
    </div>
  );
}

export default App;