import { API } from '../config';
import axios from 'axios'
import { AsyncStorage } from 'react-native'

interface IRequest{
    url: string,
    method: any,
    body: any
}

export async function ExecuteRequest(request:IRequest){
    return await axios({
        url: API + request.url,
        method: request.method,
        data: request.body,
        headers:{
            "Authorization": "Bearer " + (await AsyncStorage.getItem("@token")).toString()
        }
    })
    .then(response => ProcessRequest(response.data))
    .catch(error => {
        if(error.response === undefined) alert("Service not found.")
        else if(error.response.status === 401) GenerateToken().then(response => ExecuteRequest(request))
        else alert(error.message)
    })
}

function ProcessRequest(request:any){
    if(request.Error) alert(request.Mensaje)
    else return request;
}

export async function GenerateToken(){
    await axios.post(API + "login", null, {
        params:{
            asUsuario: "test",
            asContrasena: "test"
        }
    })
    .then(response => SetToken(response.data.token))
    .catch(error => {
        alert("The token could not be obtained. Try it again.")
    })
}

async function SetToken(token){
    await AsyncStorage.setItem("@token", token);
}