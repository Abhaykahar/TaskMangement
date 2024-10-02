import React, { useState } from 'react'
import Header from '../Component/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [dep, setDep] = useState("");
    const [gender, setGender] = useState("");
    const navigation = useNavigate();

    const Getdata = () => {
        let data = JSON.parse(localStorage.getItem('corse')) || [];
        if (data) {
            return data;
        } else {
            return [];
        }
    };

    const [record, setRecord] = useState(Getdata());

    const handle = (e) => {
        e.preventDefault();

        if (!title || !dep || !gender || !name) {
            toast.error("All fields are required..");
            return false;
        }

        let obj = {
            id: Math.floor(Math.random() * 10000),
            title,
            dep,
            name,
            gender, // Include gender in the object
            status: "deactive",
        };

        let old = [...record, obj];
        localStorage.setItem('corse', JSON.stringify(old));
        toast.success("Successfully added Task");

        setTimeout(() => {
            navigation("/view");
        }, 1000);

        setTitle('');
        setDep("");
        setName("");
        setGender(""); // Reset gender
    };

    return (
        <div>
            <Header />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        
                        <form onSubmit={handle} className='border p-3 shadow bg-light'>
                            <h3 className='mb-3 text-center'>Add Task</h3>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Task Name</label>
                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Task Title</label>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Task Description</label>
                                <input type="text" className="form-control" onChange={(e) => setDep(e.target.value)} value={dep} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">type</label>
                                <select className="form-select" onChange={(e) => setGender(e.target.value)} value={gender}>
                                    <option value="">Select type</option>
                                    <option value="Hard">Hard</option>
                                    <option value="Easy">easy</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            
                            <button type="submit" className="btn btn-success mx-auto d-block mt-4">Submit</button>
                        </form>

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
};

export default Add;
