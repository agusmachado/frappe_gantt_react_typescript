import { useEffect, useState } from "react";
import { FrappeGantt, Task, ViewMode } from "react-frappe-gantt";
import { useTareasContext } from "../context/TareasContext";
import Modal from "./Modal";

export default function GanttTareas() {

   const { tareas } = useTareasContext()

   const [ tareasGantt, setTareasGantt ] = useState<Task[]>([])
   const [ modoVista, setModoVista ] = useState(ViewMode.Month)  
   const [ seleccionTarea, setSeleccionTara ] = useState<Task | null>(null)


   useEffect( () => {

    const tareasValidas = tareas.filter((tarea) => tarea.comienzo && tarea.final)

    const tareasMapedas = tareasValidas.map((tarea) => ({
        id: tarea.id,
        name: tarea.nombre,
        start: tarea.comienzo,
        end: tarea.final,
        progress: tarea.progreso
    }))

    setTimeout(() => setTareasGantt(tareasMapedas), 0)
   }, [tareas])

   const clickTarea = (tarea: Task) => {
    console.log("Hemos hecho click en la tarea", tarea)
    setSeleccionTara(tarea)    
   }

  return (
    <div className="mt-4 relative">
      <h2 className="text-xl font-semibold mb-2">Gantt de Tareas</h2>

      <div className="flex space-x-2 mb-4">
        <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => setModoVista(ViewMode.HalfDay)}
        >Medio Día</button>
        <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => setModoVista(ViewMode.Day)}
        >Día</button>
        <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => setModoVista(ViewMode.Week)}
        >Semana</button>
        <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => setModoVista(ViewMode.Month)}
        >Mes</button>
      </div>

      { tareasGantt.length > 0 ? (  
      <>    
        <FrappeGantt
            tasks={tareasGantt}  
            viewMode={modoVista}
            onClick={clickTarea}
        />      
        {seleccionTarea && 
            <Modal
                titulo={seleccionTarea.name}
                onClose={() => setSeleccionTara(null)}
            >
                <p>
                    <span className="font-bold">Fecha de inicio:</span>
                    {new Date(seleccionTarea.start).toLocaleDateString("es-ES")}
                </p>
                <p>
                    <span className="font-bold">Fecha de finalización:</span>
                    {new Date(seleccionTarea.end).toLocaleDateString("es-ES")}
                </p>
                <p>{seleccionTarea.progress}% Completado</p>
            </Modal>
        }
      </>
      ) : ( 
      <p>No hay tareas para mostrar. Crea una tarea para ver el diagrama de Gantt.</p>
      )}
    </div>
  );
}
