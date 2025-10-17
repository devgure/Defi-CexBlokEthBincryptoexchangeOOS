import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Sample data for training (in production, use real transaction data)
data = {
    'amount': [100, 200, 50, 500, 1000, 150, 300, 75],
    'frequency': [1, 5, 2, 10, 20, 3, 7, 1],
    'is_fraud': [0, 1, 0, 1, 1, 0, 1, 0]
}
df = pd.DataFrame(data)

X = df[['amount', 'frequency']]
y = df['is_fraud']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions)}")

# Save model
joblib.dump(model, 'fraud_model.pkl')

# Load and predict
loaded_model = joblib.load('fraud_model.pkl')
print(loaded_model.predict([[250, 8]]))  # Example prediction
