import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserFormData{
   
  firstName: string;
  lastName: string;
  email: string;
  age:number;
  phone: string;
  birthDate: string;
}

export default function AddUser() {
   // 1-
  let{register,handleSubmit,formState:{errors}}=useForm<UserFormData>();
  let navigate=useNavigate();
  // 2
  let onSubmit=async(data:UserFormData)=>{
    // api call
    console.log(data)
    try {
      let response=await axios.post('https://dummyjson.com/users/add',data)
      console.log(response)
      toast.success('yeeaah !!!! user added successfully')
      navigate('/dashboard/users-list')


    } catch (error) {
       toast.error('sorry something wrong happened!!')
    }
  }
  return (
    <div>
      <div className="d-flex justify-content-between mx-2">
        <h3>Add User</h3>
      </div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="m-5 shadow-lg p-3">
        <div className="row">
          <div className="col-md-6">
            <label>first Name</label>

            <input
              className="form-control"
              type="text"
              placeholder="enter first name"
               {...register('firstName',{required:'firstName is required!!!!'})}
            />

            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
          </div>
          <div className="col-md-6">
            <label>last Name</label>

            <input
              className="form-control"
              type="text"
              placeholder="enter last name"
               {...register('lastName',{required:'lastName is required!!!!'})}
            />

            {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-6">
            <label>email</label>

            <input
              className="form-control"
              type="email"
              placeholder="enter email"
               {...register('email',{required:'email is required!!!!',pattern:{
                 value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message:'email should be validd'
               }})}
            />

            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>
          <div className="col-md-6">
            <label>age</label>

            <input
              className="form-control"
              type="number"
              placeholder="enter age"
               {...register('age',{required:'age is required!!!!',max:{value:55,message:'sorry max age is 55'}})}
            />

            {errors.age && <span className="text-danger">{errors.age.message}</span>}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-6">
            <label>phone</label>

            <input
              className="form-control"
              type="number"
              placeholder="enter phone"
               {...register('phone',{required:'phone is required!!!!'})}
            />

             {errors.phone && <span className="text-danger">{errors.phone.message}</span>} 
          </div>
          <div className="col-md-6">
            <label>birth date</label>

            <input
              className="form-control"
              type="date"
              placeholder="enter birth date"
               {...register('birthDate',{required:'birthDate is required!!!!'})}
            />

            {errors.birthDate && <span className="text-danger">{errors.birthDate.message}</span>}
          </div>
        </div>
        <div className="text-center my-5">
          <button className=" btn btn-warning text-white  w-50">add user</button>
        </div>
      </form>
    </div>
  );
}
