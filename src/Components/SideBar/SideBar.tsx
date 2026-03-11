import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { RiUserSettingsFill } from "react-icons/ri";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { TbLogout, TbLogout2 } from "react-icons/tb";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";


export default function SideBar() {
  let {userData}:any=useContext(AuthContext);
  let [collapse,setCollapse]=useState(false);

let toggleCollapse=()=>{
  setCollapse(! collapse)
}

  return (
<div className="sidebarContainer vh-100">
     <Sidebar collapsed={collapse} className="vh-100">
      {collapse ?<TbLogout onClick={toggleCollapse} size={25} className="m-3"/>:
      <TbLogout2 onClick={toggleCollapse} size={25} className="m-3"/>

      }
      <div className="text-center my-2">
        <img  src={userData?.image} alt="profile" className="rounded-circle w-50"/>
        <h5 className="my-1">{userData?.firstName}</h5>
        <h6 className="text-warning">adminn</h6>
      </div>
  <Menu>
    <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem icon={<FaUsersGear />} component={<Link to="/dashboard/users-list" />}> Users</MenuItem>
    <MenuItem icon={<RiUserSettingsFill />} component={<Link to="/dashboard/add-user" />}> Add user</MenuItem>
     <MenuItem icon={<CgProfile />} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
      <MenuItem icon={<BiLogOutCircle />}> Logout</MenuItem>
  </Menu>
</Sidebar>
</div>
  )
}
