import  { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';

export default function NavBar() {
  let {userData}:any=useContext(AuthContext);
  return (
    <div>
      NavBar {userData?.email}
    </div>
  )
}
