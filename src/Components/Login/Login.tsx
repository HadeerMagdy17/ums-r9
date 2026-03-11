import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";


interface LoginFormInpts{
  username:string;
  password:string;
}
interface AuthContextType{
  saveUserData:()=>void
}
export default function Login() {

  let {saveUserData}=useContext(AuthContext) as AuthContextType
  // 1-
  let{register,handleSubmit,formState:{errors}}=useForm<LoginFormInpts>();
  let navigate=useNavigate();
  // 2
  let onSubmit=async(data:LoginFormInpts)=>{
    // api call
    try {
      let response=await axios.post('https://dummyjson.com/auth/login',data)
     localStorage.setItem('userToken',response?.data?.accessToken)
     saveUserData()
     toast.success('yeeaah !!!! logged successfully')
      navigate('/dashboard')


    } catch (error) {
       toast.error('sorry something wrong happened!!')
    }
  }
  return (
   <div className="login-container ">
     <div className='container-fluid '>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4 bg-white p-5 rounded">
        <div className="title text-center">
           <h3>User Management system</h3>
         <h4>SIGN IN</h4>
         <small>enter your credentiallllllllllllll</small>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>User Name</label>

          <input className='form-control' type='text' placeholder='enter user name'
             {...register('username',{required:'userName is required!!!!'})}
          />

          {errors.username && <span className="text-danger">{errors.username.message}</span>}
     
             <label>Password</label>
          <input className='form-control' type='password' placeholder='enter password'
            {...register('password',{required:'password is required!!!!'})}
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}

          <button className='btn btn-warning w-100 text-white my-3'>login</button>
       
        </form>
        </div>
      </div>
    
    </div>
   </div>
  )
}
