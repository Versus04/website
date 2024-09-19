from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from healthcare_model1 import HealthcareModel

app = FastAPI()

# Initialize the model
model = HealthcareModel()
model.train_model()
model.load_symptom_data()

class PredictionRequest(BaseModel):
    symptoms: list[str]
    days: int

class PredictionResponse(BaseModel):
    predicted_disease: str
    description: str
    precautions: list[str]
    severity: str

@app.post("/predict", response_model=PredictionResponse)
async def predict_disease(request: PredictionRequest):
    try:
        predicted_disease = model.predict_disease(request.symptoms)[0]
        description = model.get_description(predicted_disease)
        precautions = model.get_precautions(predicted_disease)
        severity = model.calculate_condition_severity(request.symptoms, request.days)
        
        return PredictionResponse(
            predicted_disease=predicted_disease,
            description=description,
            precautions=precautions,
            severity=severity
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))