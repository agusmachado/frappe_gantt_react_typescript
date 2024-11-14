import { Tarea } from "../types/TareasTypes"

type Action =
    { type: "nueva_tarea"; payload: Tarea } |
    { type: "editar_tarea"; payload: Tarea} |
    { type: "eliminar_tarea"; payload: string}



const initialState: Tarea[] = []

function tareasReducer(state: Tarea[] = initialState, action: Action): Tarea[] {

    if (action.type === "nueva_tarea") {
        console.log("Agregando Tarea en el REDUCER", action.payload)

        return [
            ...state,
            action.payload
        ]
    }

    if (action.type === "editar_tarea") {
        return state.map( (tarea) => tarea.id === action.payload.id ? {...tarea, ...action.payload } : tarea )
    }

    if (action.type === "eliminar_tarea") {
        
       return state.filter( (tarea) => tarea.id !== action.payload) 
    }
    
    return state
}

export default tareasReducer