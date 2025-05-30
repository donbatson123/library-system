from sqlalchemy import create_engine
import pandas as pd

filtered_df = pd.read_csv('checkouts_insert.csv')
# Connect to the container's DB
engine = create_engine("postgresql://postgres:password@db:5432/library")

# Load devices to match barcodes to device_id
devices_df = pd.read_sql("SELECT id AS device_id, barcode FROM devices", engine)
devices_df["barcode"] = devices_df["barcode"].astype(str).str.strip()

# Prep checkout data
insert_df = filtered_df[["perm_id", "barcode", "Checkout Date", "Due Date"]].copy()
insert_df.columns = ["perm_id", "barcode", "checkout_date", "return_date"]

# Clean columns
insert_df["barcode"] = insert_df["barcode"].astype(str).str.strip()
insert_df["checkout_date"] = pd.to_datetime(insert_df["checkout_date"], errors="coerce").dt.date
insert_df["return_date"] = pd.to_datetime(insert_df["return_date"], errors="coerce").dt.date

# Merge to get device_id
merged_df = pd.merge(insert_df, devices_df, on="barcode", how="left")
merged_df = merged_df.dropna(subset=["device_id"])
merged_df["device_id"] = merged_df["device_id"].astype(int)

# Final format
final_df = merged_df[["perm_id", "device_id", "checkout_date", "return_date"]]

print("🧪 Columns in final_df:", final_df.columns.tolist())
print("📊 First few rows of final_df:")
print(final_df.head())

#final_df = final_df[["student_id", "device_id", "checkout_date", "return_date"]]
student_df = pd.read_sql("SELECT id AS student_id, perm_id FROM students", engine)

final_df["perm_id"] = final_df["perm_id"].astype(str).str.strip()
student_df["perm_id"] = student_df["perm_id"].astype(str).str.strip()

final_df = final_df.merge(student_df, on="perm_id", how="left")

final_df = final_df[["student_id", "device_id", "checkout_date", "return_date"]]


####troubleshoot
print("🔍 Final DataFrame preview:")
print(final_df.head())
print("📏 Shape:", final_df.shape)
print("📋 Dtypes:\n", final_df.dtypes)

# Final insert
final_df.to_sql("device_checkouts", engine, if_exists="append", index=False)

print(f"✅ Inserted {len(final_df)} Chromebook checkouts into device_checkouts.")

