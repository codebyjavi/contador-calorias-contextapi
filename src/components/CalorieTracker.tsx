import { useMemo } from "react"
import CalorieDisplay from "./CalorieDisplay"
import useActivity from "../hooks/useActivity"

export default function CalorieTracker() {

  const { state } = useActivity()

  const { activities } = state

  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
  
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
  
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state])

  return (
    <>
     <h2 className="text-4xl font-black text-white text-center">Resumen de Calorías</h2> 
     
     <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

      <CalorieDisplay
        calories={caloriesConsumed}
        text="Consumidas"
      />

      <CalorieDisplay
        calories={caloriesBurned}
        text="Ejercicio"
      />

      <CalorieDisplay
        calories={netCalories}
        text="Diferencia"
      />

     </div>
    </>
  )
}
