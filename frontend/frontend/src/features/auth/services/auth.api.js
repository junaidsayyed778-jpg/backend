import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function register(username, email, password){
        try{
            const res = await api.post(
                "/api/auth/register",{
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
export async function login(username, password){
    try{
        const res = await api.post("/api/auth/login",{
                username,
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

export async function getMe(){
    try{
        const res = await api.get("/get-me")
        return res.data
    }catch(err){
           if(err.response){
                alert(err.response.data.message)
            }else{
                alert ("Something went wrong")
            }
    }
}