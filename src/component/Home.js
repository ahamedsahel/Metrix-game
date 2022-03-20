import React, { useState } from "react";
import "./Home.css";
import tableData from "./Data";
function Home() {
  const [boxCount, setBoxCount] = useState(1);
  const [data, setData] = useState(tableData);
  const [color, setColor] = useState(["", ""]);
  console.log("Count : :", boxCount);
  const headingStyle = {
    color: "blue",
    textAlign: "center",
  };
//when click each boxes change box name and count
  function clickHandler(e) {
    const rowName = e.target.getAttribute("name");
    const filteredRow = data.filter((temp) => temp.name == rowName);
    const filteredValue = filteredRow[0].fields.filter(
      (temp) => temp.Id == e.target.id
    );
    // console.log(filteredValue);
    if (filteredValue[0].value.length) {
      return;
    }
  
    if (color.includes(e.target.id)) {
      return;
    }
    //
    const newData = data.map((tempData) => {
      if (tempData.name === rowName) {
        const data = tempData.fields.map((temp) => {
          if (temp.Id === e.target.id) {
            
            return { ...temp, value: `Box #${boxCount}` };
          }
          return temp;
        });

        return { name: rowName, fields: data };
      }
      return tempData;
    });
    setBoxCount((pre) => pre + 1);
    setData(newData);

    setColor((pre) => [pre[pre.length - 1], e.target.id]);


  }

  return (
    <div>
      <h1 style={headingStyle}>Matrix Game </h1>
      <table>
        {data.map((rowData, index) => (
          <TableRows
            key={rowData.name}
            rowData={rowData}
            clickHandler={clickHandler}
            color={color}
          />
        ))}
      </table>
    </div>
  );
}

const TableRows = ({ rowData, clickHandler, color }) => {
  return (
    <tr>
      {rowData.fields.map((data, index) => (
        <th
          onClick={clickHandler}
          id={data.Id}
          name={rowData.name}
          className={color.includes(data.Id) ? "red" : ""}
          key={data.Id}
        >
          {data.value}
        </th>
      ))}
    </tr>
  );
};
export default Home;
