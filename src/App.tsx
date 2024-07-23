import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])
    
  return (
    <>
      <header className="py-8 bg-green-600">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-white uppercase font-bold text-2xl">Contador de calorías</h1>
          <button 
            className="px-6 py-3 bg-black text-white uppercase font-bold rounded-md disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}>
            Reinciar app
            </button>
        </div>
      </header>

      <section className="bg-green-400">
        <div className="max-w-3xl mx-auto py-20">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
          <div className="max-w-3xl mx-auto">
            <CalorieTracker
              activities={state.activities}
            />
          </div>
      </section>

      <section className="mx-auto p-10">
        <div className=" mx-auto max-w-3xl">
          <ActivityList
            activities={state.activities}
            dispatch={dispatch}
          />
        </div>
      </section>
    </>
  )
}

export default App
