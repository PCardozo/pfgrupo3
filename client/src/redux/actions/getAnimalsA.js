import axios from 'axios';
export const GET_ALL_ANIMALS = "GET_ALL_ANIMALS";
export const GET_ANIMAL_NAME = "GET_ANIMAL_NAME";


export const getAllAnimals = ()=>(dispatch)=>{
    axios("http://localhost:3001/animals")
    .then(res=>{
        dispatch({
            type:GET_ALL_ANIMALS,
            payload: res.data
        })
    })
}

export function getAnimalName(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/animals?name=${name}`);
            return dispatch({
                type: GET_ANIMAL_NAME,
                payload: json.data
            });
        } catch(error) {
            console.log(error);
            alert (`Animal cant be found! Error: ${error}`);
        }
    }
}

