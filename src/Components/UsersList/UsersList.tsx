import axios from "axios"
import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import { CiTrash } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export default function UsersList() {
  let navigate=useNavigate()
  let [users,setUsers]=useState<User[]>([])
  // modal
  const [show, setShow] = useState(false);
  const [userId,setUserId]=useState<number | null>(null)
const [userData,setUserData]=useState<User | null>(null)

  const handleClose = () => setShow(false);

  const handleShow = (user:User) => {
    setShow(true);
    setUserId(user.id)
    setUserData(user)
  }

  let deleteUser=async()=>{
    try {
       await axios.delete(`https://dummyjson.com/users/${userId}`)
       handleClose();
       toast.success("user deleted success")
       getUsers()
    } catch (error) {
      console.log(error)
      toast.error('wronggggggggggg')
    }
  }

  let getUsers=async()=>{
    try {
      let response=await axios.get('https://dummyjson.com/users')
      setUsers(response?.data?.users || null)
    } catch (error) {
      console.log(error)
    }
  }
  let moveToAddUser=()=>{
    navigate('/dashboard/add-user')
  }
  useEffect(()=>{
    getUsers()
  },[])


  return (
    <div>
     <div className="d-flex justify-content-between mx-2">
      <h3> Users List</h3>
      <button onClick={moveToAddUser} className="btn btn-warning text-white">Add new user</button>
     </div>
     <hr/>
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
           <th>#</th>
          <th>First Name</th>
          <th>last Name</th>
          <th>email</th>
          <th>phone</th>
          <th>birth date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user)=>(
          <tr key={user?.id}>
          <td>{user?.id}</td>
          <td><img src={user?.image} className="w-25"/></td>
          <td>{user?.firstName}</td>
          <td>{user?.lastName}</td>
          <td>{user?.email}</td>
            <td>{user?.phone}</td>
          
            <td>{user?.birthDate}</td>
            <td>
               <FiEdit className="text-warning mx-2" size={20}/>
              <CiTrash onClick={()=>handleShow(user)} className="text-danger mx-2" size={25} />
             
            </td>
          
          
        </tr>
      ))}
     
      </tbody>
    </Table>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>confirm delete {userData?.firstName} {userData?.lastName}!!!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want continue!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
