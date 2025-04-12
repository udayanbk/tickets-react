// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkLoginExists } from "../api/user_api";
// import LoginPage from "./Login";

// const HomeRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkValidLogin()
//   }, []);

//   const checkValidLogin = async ()=>{
//     const resp = await checkLoginExists()
//     console.log("resp", resp);
//     if(resp?.data?.status === true){
//       navigate("/home");
//     }
//     else{
//       navigate("/login");
//     }
//   };


//   return null;
// };

// export default HomeRedirect;
