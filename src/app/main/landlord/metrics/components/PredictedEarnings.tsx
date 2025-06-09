'use client'

import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { PythonService } from '@/services/PythonService'

interface DataPoint {
  day: string
  earnings: number
}

const PredictedEarnings = () => {
  const [earningsData, setEarningsData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const earnings = await PythonService.getPredictedEarnings()
        const formattedData = earnings.map((value, index) => ({
          day: `Day ${index + 1}`,
          earnings: value,
        }))
        setEarningsData(formattedData)
      } catch (err) {
        setError('Error fetching predicted earnings.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  if (loading) return <p className="text-center">Loading predicted earnings...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="w-full h-96 p-4 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Predicted Earnings (Next 7 Days)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={earningsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" stroke="#00C49F" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PredictedEarnings