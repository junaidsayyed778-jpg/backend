import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost/api/auth",
    withCredentials: true
});

export async function register(username, email, password){
        try{
            const res = await api.post(
                "/register",{
                    username,
                    email,
                    password
                }
            );
            console.log(res.data);

        }catch(err){
            if(err.response){
                alert(err.response.data.message)
            }else{
                alert ("Something went wrong")
            }
        }
}
export async function login(email, password){
    try{
        const res = await api.post(
            "/login",{
                email,
                password
            }
        );
        console.log(res.data)
    }catch(err){
           if(err.response){
                alert(err.response.data.message)
            }else{
                alert ("Something went wrong")
            }
    }
}