import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrash2, FiPlus } from 'react-icons/fi'

export default function WorkoutSetsWidget() {
  const [sets, setSets] = useState([
    { weight: 80, reps: 8 },
    { weight: 80, reps: 8 },
    { weight: 85, reps: 6 }
  ])

  const handleAddSet = () => {
    setSets([...sets, { weight: 80, reps: 8 }])
  }

  const handleWeightChange = (idx, val) => {
    const newSets = [...sets]
    newSets[idx].weight = Number(val) || 0
    setSets(newSets)
  }

  const handleRepsChange = (idx, val) => {
    const newSets = [...sets]
    newSets[idx].reps = Number(val) || 0
    setSets(newSets)
  }

  const handleRemoveSet = (idx) => {
    setSets(sets.filter((_, i) => i !== idx))
  }

  return (
    <div className="glass-panel p-6 rounded-2xl glow-purple flex flex-col justify-between h-[240px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Strength Tracking</span>
          <h4 className="text-base font-bold text-white font-display mt-0.5">Bench Press</h4>
        </div>
        <button className="text-purple-400 hover:text-purple-300">
          <FiTrendingUp size={16} />
        </button>
      </div>

      {/* Sets Column Table */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[120px] pr-1 scrollbar-thin">
        {sets.map((set, idx) => (
          <div key={idx} className="flex items-center justify-between gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-zinc-500 font-bold w-6">#{idx + 1}</span>
            <div className="flex items-center gap-1.5 w-20">
              <input 
                type="number" 
                value={set.weight} 
                onChange={(e) => handleWeightChange(idx, e.target.value)}
                className="w-10 bg-black/40 border border-white/5 rounded px-1.5 py-0.5 text-center text-xs font-bold text-white outline-none"
              />
              <span className="text-[9px] text-zinc-500 font-bold">kg</span>
            </div>
            <div className="flex items-center gap-1.5 w-20">
              <input 
                type="number" 
                value={set.reps} 
                onChange={(e) => handleRepsChange(idx, e.target.value)}
                className="w-10 bg-black/40 border border-white/5 rounded px-1.5 py-0.5 text-center text-xs font-bold text-white outline-none"
              />
              <span className="text-[9px] text-zinc-500 font-bold">reps</span>
            </div>
            <button 
              onClick={() => handleRemoveSet(idx)} 
              className="text-zinc-600 hover:text-red-400 transition-colors"
            >
              <FiTrash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Add */}
      <div className="flex gap-2 border-t border-white/5 pt-3 mt-1">
        <button 
          onClick={handleAddSet}
          className="flex-grow flex items-center justify-center gap-1 bg-white/5 border border-white/5 hover:bg-white/10 text-white font-semibold py-1.5 rounded-lg text-[10px] transition-all"
        >
          <FiPlus size={12} /> Add Set
        </button>
      </div>
    </div>
  )
}
