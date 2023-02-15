import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);


    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            
            let inputobj={"username": username,
            "password": password};
            fetch("https://cors-anywhere.herokuapp.com/https://netzwelt-devtest.azurewebsites.net/Account/SignIn",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(inputobj)
            
            }).then((resp) => {
                //console.log("resp" + resp.status)
                console.log(resp)
                if(resp.ok ===false){ 
                  //  console.log("resp" + resp.status)
                 throw new Error("Invalid username or password")
                }
                else{
                     toast.success("Success");
                     sessionStorage.setItem("username",username);
                     sessionStorage.setItem("jwttoken",resp.jwtToken);
                   usenavigate('/home/index')
                }
            }).catch((err) => {
                toast.error("Invalid username or password");
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === "" || username === null) {
            result = false;
            toast.warning("Please Enter Username");
        }
        if (password === "" || password === null) {
            result = false;
            toast.warning("Please Enter Password");
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;