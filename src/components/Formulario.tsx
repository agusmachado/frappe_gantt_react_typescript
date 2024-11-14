import { useState } from "react"
import { useTareasContext } from "../context/TareasContext"

export default function Formulario() {

    const { tareas, crearTarea, editarTarea, eliminarTarea } = useTareasContext()

    const [ nombre, setNombre ] = useState<string>("")
    const [ comienzo, setComienzo ] = useState<Date>(new Date())
    const [ final, setFinal ] = useState<Date>(new Date())
    const [ progreso, setProgreso ] = useState<number>(0)
    const [ modo, setModo] = useState<"crear" | "editar">("crear")
    const [ seleccionarTareaId, setSeleccionarTareaId ] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const fechaComienzoFormateada = comienzo.toISOString().split("T")[0]
        const fechaFinalFormateada = final.toISOString().split("T")[0]

        const nuevaTarea = {
            id: seleccionarTareaId || Date.now().toString(),
            nombre,
            comienzo: fechaComienzoFormateada,
            final: fechaFinalFormateada,
            progreso
        }
 
        console.log(nuevaTarea) 
        
         
        if (modo === "crear") {
            crearTarea(nuevaTarea)
        }   else if (modo === "editar") {
           console.log("Estamos en modo EDITAR", nuevaTarea) 
           editarTarea(nuevaTarea)
        }    

        resetearFormulario()
    }

    const eliminarTareaFormulario = () => {
        if (seleccionarTareaId) {
            console.log("Eliminando Tarea en FORMULARIO", seleccionarTareaId)
            eliminarTarea(seleccionarTareaId)
            resetearFormulario()
        }
    }
    
    const resetearFormulario = () => {
        setNombre("")
        setComienzo(new Date())
        setFinal(new Date())
        setProgreso(0)
        setModo("crear")
        setSeleccionarTareaId(null)
    }


    const tareaSeleccionadaEditar = (tareaId: string) => {
        const tarea = tareas.find((tarea) => tarea.id === tareaId)

        if (tarea) {
            setNombre(tarea.nombre)
            setComienzo(new Date(tarea.comienzo))
            setFinal(new Date(tarea.final))
            setProgreso(tarea.progreso)
            setModo("editar")
            setSeleccionarTareaId(tarea.id)
        }
    }


  return (
    <form 
        className="w-full p-4 bg-red-400 rounded shadow-md space-x-4"
        onSubmit={handleSubmit}
    >
        <div className="flex justify-between items-center">        
            {/* Input para nuevo proyecto y Select para seleccionar proyecto */}
            {modo === "crear" ?(
            <input 
                type="text"
                className="w-1/4 p-2 border border-gray-300 rounded" 
                placeholder="Nombre del Proyecto"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            ) : ( 
            <select
                className="w-1/4 p-2 border border-gray-300 rounded" 
                value={seleccionarTareaId || ""}
                onChange={(e) => tareaSeleccionadaEditar(e.target.value)}
            >
                <option> -- Seleccionar Proyecto -- </option>
                {tareas.map( ( tarea ) => 
                    <option
                        key={tarea.id}
                        value={tarea.id}
                    >
                        {tarea.nombre}
                    </option>
                )}
            </select>
            )}
            {/* Campos de Fechas */}
            <input 
                type="date"
                className="w-1/6 p-2 border border-gray-300 rounded" 
                required
                value={comienzo.toISOString().split("T")[0]}
                onChange={(e) => setComienzo( new Date(e.target.value))}
            />
            <input 
                type="date"
                className="w-1/6 p-2 border border-gray-300 rounded"
                required
                value={final.toISOString().split("T")[0]} 
                onChange={(e) => setFinal( new Date(e.target.value))}
            />

            {/* Campo de Progreso de Proyecto o Tarea */}
            <div className="flex items-center border border-gray-300 rounded w-32">
                <input 
                    type="number" 
                    className="w-full p-2 border-none rounded-l"
                    placeholder="Progreso"
                    value={progreso}
                    onChange={(e) => setProgreso(Number(e.target.value))}
                />
                <span className="p-2 bg-gray-200 rounded-r">%</span>
            </div>


            {/* Botones */}
    
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                { modo === "crear" ? "Crear Tarea" : "Editar"}
            </button>


            { modo === "editar" && (
            <button
                type="button"
                className="bg-red-500 text-white p-2 rounded"
                onClick={eliminarTareaFormulario}
            >
                Eliminar
            </button>)}

            <button
                type="button"
                className="bg-orange-300 p-2 rounded"
                onClick={() => {
                    resetearFormulario()
                    setModo( modo === "crear" ? "editar" : "crear")
                }}
            >
                { modo === "crear" ? "Cambiar a Editar/Eliminar" : "Cambiar a Crear"}
            </button>

        </div>
    </form>
  )
}
