import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHome = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/')
    },[navigate])

  return <>
  </>;
};

export default RedirectHome;
