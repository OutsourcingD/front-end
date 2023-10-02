import React from "react";

const AuthContext = React.createContext({
    isLogin: false,
    setIsLogin: (value: boolean) => {}
}); // pass null as initial value

export default AuthContext;