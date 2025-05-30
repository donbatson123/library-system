import pandas as pd

  # change if needed

df = pd.read_csv("backend/chromebook.txt", delimiter="\t")
print(df.columns)
df.drop(columns=["Due Date"], inplace=True)
print(df.columns)