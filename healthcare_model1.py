import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
import csv
import warnings

warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=UserWarning)

class HealthcareModel:
    def __init__(self):
        self.training = pd.read_csv('Data/Training.csv')
        self.testing = pd.read_csv('Data/Testing.csv')
        self.cols = self.training.columns[:-1]
        self.le = preprocessing.LabelEncoder()
        self.clf = DecisionTreeClassifier()
        self.symptoms_dict = {}
        self.severityDictionary = {}
        self.description_list = {}
        self.precautionDictionary = {}

    def prepare_data(self):
        x = self.training[self.cols]
        y = self.training['prognosis']
        self.le.fit(y)
        y = self.le.transform(y)
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
        return x_train, x_test, y_train, y_test

    def train_model(self):
        x_train, x_test, y_train, y_test = self.prepare_data()
        self.clf.fit(x_train, y_train)
        scores = cross_val_score(self.clf, x_test, y_test, cv=3)
        print(f"Decision Tree Accuracy: {scores.mean()}")

        svm_model = SVC()
        svm_model.fit(x_train, y_train)
        print(f"SVM Accuracy: {svm_model.score(x_test, y_test)}")

    def load_symptom_data(self):
        self.symptoms_dict = {symptom: index for index, symptom in enumerate(self.cols)}
        self.load_severity_dict()
        self.load_description_list()
        self.load_precaution_dict()

    def load_severity_dict(self):
        with open('MasterData/symptom_severity.csv', newline='') as csv_file:
            csv_reader = csv.reader(csv_file)
            for row in csv_reader:
                try:
                    self.severityDictionary[row[0]] = int(row[1])
                except (IndexError, ValueError):
                    pass

    def load_description_list(self):
        with open('MasterData/symptom_Description.csv', newline='') as csv_file:
            csv_reader = csv.reader(csv_file)
            for row in csv_reader:
                if len(row) >= 2:
                    self.description_list[row[0]] = row[1]

    def load_precaution_dict(self):
        with open('MasterData/symptom_precaution.csv', newline='') as csv_file:
            csv_reader = csv.reader(csv_file)
            for row in csv_reader:
                if len(row) >= 5:
                    self.precautionDictionary[row[0]] = row[1:5]

    def predict_disease(self, symptoms):
        input_vector = np.zeros(len(self.symptoms_dict), dtype=int)
        for item in symptoms:
            if item in self.symptoms_dict:
                input_vector[self.symptoms_dict[item]] = 1
        return self.le.inverse_transform(self.clf.predict(input_vector.reshape(1, -1)))

    def get_description(self, disease):
        return self.description_list.get(disease, "No description available")

    def get_precautions(self, disease):
        return self.precautionDictionary.get(disease, ["No precautions available"])

    def calculate_condition_severity(self, symptoms, days):
        severity_sum = sum(self.severityDictionary.get(symptom, 0) for symptom in symptoms)
        condition = (severity_sum * days) / (len(symptoms) + 1)
        return "severe" if condition > 13 else "mild"

# Initialize and train the model
model = HealthcareModel()
model.train_model()
model.load_symptom_data()

print("Model training and data loading completed successfully.")
