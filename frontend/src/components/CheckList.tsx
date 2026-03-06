import { useState, useEffect } from 'react'
import habitService from '@/api/habitService'
import type { HabitToday } from '@/types/habit.types';


function Checklist() {

  const [habits, setHabits] = useState<HabitToday[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) 
  
  const getProgressMessage = (progress: number): string => {
    if (progress === 100) return '🎉 ¡Mas ready que 10 readys!'
    if (progress >= 75) return '💪 ¡Ya casito!'
    if (progress >= 50) return '🔥 ¡Medio medio, tibio!'
    if (progress >= 25) return '🚀 ¡Lo que falta es día!'
    return '👋 ¡Empezamos ya o que?!'
  }

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await habitService.getToday()
        setHabits(data)
      } catch (err) {
        setError('Error al cargar los hábitos')
      } finally {
        setLoading(false)
      }
    }
    fetchHabits()
  }, [])

  const handleComplete = async (id: number) => {
    try {
      await habitService.complete(id)
      setHabits(prev => prev.map(habit => 
        habit.id === id ? { ...habit, is_completed_today: true } : habit
      ))
    } catch (err) {
      setError('Error al completar el hábito')
    }
  } 

  const progress = habits.length === 0 ? 0 : Math.round((habits.filter(habit => habit.is_completed_today).length / habits.length) * 100)

  if (loading) return <div>Cargando ... </div>
  if (error) return <div>{error}</div>
    
  return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
  
        {/* Header */}
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Hábitos para hoy</h2>
        </div>
  
        <div className="p-6 space-y-6">
  
          {/* Barra de progreso */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{getProgressMessage(progress)}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
  
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
  
          {/* Checklist */}
          <ul className="space-y-4">
            {habits.map((habit) => (
              <li
                key={habit.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl"
              >
                <div className="flex items-start gap-3">
  
                  {/* Icono */}
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                    📌
                  </div>
  
                  {/* Texto */}
                  <div>
                    <p className="font-medium text-sm">{habit.title}</p>
                    <p className="text-xs text-gray-500">
                      {habit.description}
                    </p>
                  </div>
                </div>
  
                {/* Estado */}
                {habit.is_completed_today ? (
                  <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                ) : (
                  <button onClick={() => handleComplete(habit.id)} className="w-6 h-6 border-2 border-gray-300 rounded hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition">
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export { Checklist }