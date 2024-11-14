import { useEffect, useReducer } from "react"
import tareasReducer from "../reducers/tareasReducer"
import { Tarea } from "../types/TareasTypes"

export default function useTareas() {

  const [ tareas, dispatch ] = useReducer( tareasReducer, [], () => {
    
    const tareasLocalStoarage = localStorage.getItem("tareas")

    return tareasLocalStoarage ? JSON.parse(tareasLocalStoarage) : []
  })

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas])

  const crearTarea = ( tarea: Tarea ) => {
    dispatch({ type: "nueva_tarea", payload: tarea})
  }

  const editarTarea = (tareaEditada: Tarea) => {
    dispatch({ type: "editar_tarea", payload: tareaEditada})
  }

  const eliminarTarea = (tareaId: string ) => {
    dispatch({ type: "eliminar_tarea", payload: tareaId})
  }
  
  return {
    tareas,
    crearTarea,
    editarTarea,
    eliminarTarea
  }
}
