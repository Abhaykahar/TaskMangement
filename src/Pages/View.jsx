import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [record, setRecords] = useState([]);
  const [mdelete, setMDelete] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem('corse')) || [];
    setRecords(storedRecord);
    setFilterData(storedRecord);
  }, []);

  // Delete single record
  const deleteUser = (id) => {
    const updatedRecords = record.filter((val) => val.id !== id);
    localStorage.setItem('corse', JSON.stringify(updatedRecords));
    toast.error("Record deleted successfully...");
    setRecords(updatedRecords);
    setFilterData(updatedRecords);
  };

  // Toggle status of a single record
  const toggleStatus = (id) => {
    const updatedRecords = record.map((val) => {
      if (val.id === id) {
        return { ...val, status: val.status === "active" ? "deactive" : "active" };
      }
      return val;
    });

    localStorage.setItem('corse', JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
    setFilterData(updatedRecords);
    toast.success("Status updated successfully.");
  };

  // Filter records by status
  useEffect(() => {
    if (filterStatus !== "") {
      const filtered = record.filter((val) => val.status === filterStatus);
      setFilterData(filtered);
    } else {
      setFilterData(record);
    }
  }, [filterStatus, record]);

  // Filter records by search term (title or description)
  const filteredRecords = filterData.filter((val) => {
    const title = val.title ? val.title.toLowerCase() : '';
    const dep = val.dep ? val.dep.toLowerCase() : '';
    const name = val.name ? val.name.toLowerCase() : '';
    return title.includes(searchTerm.toLowerCase()) || dep.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-lg-12">
            {/* Search input field */}
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>

        <div className="row">
          {filteredRecords.length === 0 && (
            <p className="text-center">No records found.</p>
          )}
          {filteredRecords.map((val, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  {/* Title and Description */}
                  <h5 className="card-title text-capitalize">{val.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{val.title}</h6>
                  <p className="card-text"><strong>Description:</strong> {val.dep}</p>

                  {/* Gender and Status */}
                  <p className="card-text"><strong>Type:</strong> {val.gender}</p>
                  <p className="card-text">
                    <strong>Status:</strong> 
                    <span className={val.status === "active" ? "text-success" : "text-danger"}>
                      {val.status}
                    </span>
                  </p>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(val.id)}>Delete</button>
                    <button className="btn btn-success btn-sm" onClick={() => navigate("/edit", { state: val })}>Edit</button>
                  </div>

                  {/* Status Toggle Button */}
                  <div className="d-grid mt-3">
                    <button 
                      className={`btn btn-${val.status === "active" ? "warning" : "primary"} btn-sm`} 
                      onClick={() => toggleStatus(val.id)}
                    >
                      {val.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default View;
