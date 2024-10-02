import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [record, setRecords] = useState([]);
  const [mdelete, setMDelete] = useState([]);
  const [mstatus, setMStatus] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigation = useNavigate();

  // Fetch records from localStorage on component mount
  useEffect(() => {
    let storedRecord = JSON.parse(localStorage.getItem('corse')) || [];
    setRecords(storedRecord);
    setFilterData(storedRecord); // Initialize filterData with full record list
  }, []);

  // Delete a single record
  const deleteUser = (id) => {
    let d = record.filter((val) => val.id !== id);
    localStorage.setItem('corse', JSON.stringify(d));
    toast.error("Record deleted successfully...");
    setRecords(d);
    setFilterData(d); // Update filtered data
  };

  // Select multiple records for deletion
  const alldelete = (id, checked) => {
    let all = [...mdelete];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((val) => val !== id);
    }
    setMDelete(all);
  };

  // Delete multiple records
  const deletemultiple = () => {
    if (mdelete.length === 0) {
      toast("Minimum 1 row should be selected..");
      return false;
    }
    let md = record.filter((val) => !mdelete.includes(val.id));
    localStorage.setItem('corse', JSON.stringify(md));
    setRecords(md);
    setFilterData(md); // Update filtered data
    setMDelete([]);
  };

  // Select multiple records to change status
  const multipleStu = (id, checked) => {
    let all = [...mstatus];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((val) => val !== id);
    }
    setMStatus(all);
  };

  // Change status of selected records
  const allStatus = () => {
    if (mstatus.length === 0) {
      toast("Minimum 1 row should be selected..");
      return false;
    }

    let allSelected = record.map((val) => {
      if (mstatus.includes(val.id)) {
        val.status = val.status === "active" ? "deactive" : "active";
      }
      return val;
    });
    localStorage.setItem('corse', JSON.stringify(allSelected));
    setRecords(allSelected);
    setFilterData(allSelected); // Update filtered data
    setMStatus([]);
  };

  // Filter records based on status
  useEffect(() => {
    if (filterStatus !== "") {
      let f = record.filter((val) => val.status === filterStatus);
      setFilterData(f);
    } else {
      setFilterData(record);
    }
  }, [filterStatus, record]);

  // Filter records based on search term (in title or description)
  const filteredRecords = filterData.filter((val) => {
    const title = val.title ? val.title.toLowerCase() : ''; 
    const dep = val.dep ? val.dep.toLowerCase() : ''; 

    return title.includes(searchTerm.toLowerCase()) || 
           dep.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">

            {/* Search input field */}
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by title or description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
              />
            </div>

            <table className="table border p-3">
              <thead>
                <tr align="center">
                  <th scope="col">Name</th>
                  <th scope="col">Task</th>
                  <th scope="col">Description</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Action</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Status</th>
                  <th scope="col">
                    <button className='btn btn-success btn-sm' onClick={allStatus}>Change Status</button>
                  </th>
                  <th scope="col">
                    <button className='btn btn-danger btn-sm' onClick={deletemultiple}>Delete</button>
                  </th>
                  <th scope="col">
                    <select className='p-1' onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="">-- select --</option>
                      <option value="active">Active</option>
                      <option value="deactive">Deactive</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody align='center'>
                { filteredRecords.map((val, index) => (
                  <tr key={index}>

                    <td>{val.name}</td>
                    <td>{val.title}</td>
                    <td>{val.dep}</td>
                    <td>{val.gender}</td>
                    <td>
                      <button className='btn btn-danger btn-sm' onClick={() => deleteUser(val.id)}>Delete</button>
                    </td>
                    <td>
                      <button className='btn btn-sm btn-success' onClick={() => navigation("/edit", { state: val })}>Edit</button>
                    </td>
                    <td>{val.status}</td>
                    <td>
                      <input type="checkbox" checked={mstatus.includes(val.id)} onChange={(e) => multipleStu(val.id, e.target.checked)} />
                    </td>
                    <td>
                      <input type="checkbox" onChange={(e) => alldelete(val.id, e.target.checked)} />
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
}

export default View;
