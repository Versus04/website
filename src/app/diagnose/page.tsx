'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { Input, Label, Slider, RadioGroup, RadioGroupItem, Button } from '../../../components/ui/ui-components'
import { ArrowLeft, ArrowRight, Brain, Loader2 } from 'lucide-react'
import axios from 'axios'

import { cn } from '../../../lib/utils'
const steps = [
  { id: 'name', title: 'Your Name' },
  { id: 'symptom', title: 'Main Symptom' },
  { id: 'duration', title: 'Symptom Duration' },
  { id: 'questions', title: 'Additional Questions' },
  { id: 'result', title: 'Your Results' },
]

export default function DiagnosePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    symptom: '',
    duration: 1,
    additionalSymptoms: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('/api/predict', {
        symptoms: [formData.symptom, ...formData.additionalSymptoms],
        days: formData.duration
      })
      setPrediction(response.data)
      setCurrentStep(steps.length - 1) // Move to the results step
    } catch (error) {
      console.error('Error making prediction:', error)
      setError('An error occurred while making the prediction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="text-lg p-6"
            />
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="symptom">What's your main symptom?</Label>
            <Input
              id="symptom"
              name="symptom"
              value={formData.symptom}
              onChange={handleInputChange}
              placeholder="Enter your main symptom"
              className="text-lg p-6"
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="duration">How long have you been experiencing this symptom?</Label>
            <Slider
              id="duration"
              min={1}
              max={30}
              step={1}
              value={[formData.duration]}
              onValueChange={(value) => setFormData({ ...formData, duration: value[0] })}
            />
            <p className="text-center text-gray-600">{formData.duration} day(s)</p>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label>Please answer the following questions:</Label>
            <RadioGroup onValueChange={(value) => setFormData((prevData) => ({
              ...prevData,
              additionalSymptoms: [...prevData.additionalSymptoms, value]
            }))}>
              {['Do you have a fever?', 'Are you experiencing fatigue?', 'Do you have a cough?'].map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={`question-${index}-yes`} id={`question-${index}-yes`} />
                  <Label htmlFor={`question-${index}-yes`}>Yes</Label>
                  <RadioGroupItem value={`question-${index}-no`} id={`question-${index}-no`} />
                  <Label htmlFor={`question-${index}-no`}>No</Label>
                  <span className="ml-2">{question}</span>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case 4:
        return (
          <div className="text-center">
            {prediction ? (
              <>
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Prediction: {prediction.predicted_disease}</h2>
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-gray-600 mt-2">Severity: {prediction.severity}</p>
                </div>
                <p className="text-gray-700 mb-6">{prediction.description}</p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Precautions:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {prediction.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p>No prediction available</p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.symptom.trim() !== '' && 
           formData.duration > 0 &&
           formData.additionalSymptoms.length === 3 // Assuming 3 additional questions
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">HealthPredict AI</span>
          </Link>
        </nav>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{steps[currentStep].title}</h1>
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-1/5 h-2 rounded-full ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <form onSubmit={handleSubmit}>
              {renderStep()}
              <div className="mt-8 flex justify-between">
                {currentStep > 0 && currentStep < steps.length - 1 && (
                  <Button type="button"  onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                )}
                {currentStep < steps.length - 2 && (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {currentStep === steps.length - 2 && (
                  <Button type="submit" className="ml-auto" disabled={isLoading || !isFormValid()}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                      </>
                    ) : (
                      <>Get Results <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button type="button" onClick={() => setCurrentStep(0)} className="ml-auto">
                    Start Over
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}