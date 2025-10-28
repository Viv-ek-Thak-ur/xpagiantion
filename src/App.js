import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  useEffect(() => {
    fetch(
      " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch(() => {
        setError("failed to fetch data");
        alert("failed to fetch data");
      });
  }, []);

  // pagination logic

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{backgroundColor : "#5cbe76ff"}}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr>
              <td style={{ borderBottom: "1px solid #ddd" }}>{item.id}</td>
              <td style={{ borderBottom: "1px solid #ddd" }}>{item.name}</td>
              <td style={{ borderBottom: "1px solid #ddd" }}>{item.email}</td>
              <td style={{ borderBottom: "1px solid #ddd" }}>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1} style={{backgroundColor : "#5cbe76ff" , width : "80px",height:"35px",border : "0", borderRadius : "4px"}}>
          Previous
        </button>

        <span style={{ margin: "0 15px",padding:"8px",borderRadius : "4px" , backgroundColor : "#5cbe76ff"}}>{currentPage}</span>

        <button onClick={handleNext} disabled={currentPage === totalPages} style={{backgroundColor : "#5cbe76ff", width : "80px" ,height:"35px", border : "0", borderRadius : "4px"}}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
