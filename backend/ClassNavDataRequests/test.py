import requests
import time
import json

url = "https://classnav.ou.edu/index_ajax.php"
headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Referer": "https://classnav.ou.edu/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
}

# Use a session to handle cookies
session = requests.Session()

# Step 1: Fetch the main page to get valid cookies
main_page_url = "https://classnav.ou.edu/"
session.get(main_page_url, headers=headers)

# Step 2: Fetch data
all_data = []
page_size = 100
total_records = 10814  # Update this if needed

for start in range(0, total_records, page_size):
    params = {
        "sEcho": "12",  # Increment this if needed
        "iColumns": "18",
        "sColumns": "",
        "iDisplayStart": str(start),
        "iDisplayLength": str(page_size),
        "mDataProp_0": "0",
        "mDataProp_1": "1",
        "mDataProp_2": "2",
        "mDataProp_3": "3",
        "mDataProp_4": "4",
        "mDataProp_5": "5",
        "mDataProp_6": "6",
        "mDataProp_7": "7",
        "mDataProp_8": "8",
        "mDataProp_9": "9",
        "mDataProp_10": "10",
        "mDataProp_11": "11",
        "mDataProp_12": "12",
        "mDataProp_13": "13",
        "mDataProp_14": "14",
        "mDataProp_15": "15",
        "mDataProp_16": "16",
        "mDataProp_17": "17",
        "sSearch": "",
        "bRegex": "false",
        "sSearch_0": "",
        "bRegex_0": "false",
        "bSearchable_0": "true",
        # ... include all other parameters from the cURL ...
        "semester": "202510",  # Verify this is correct!
        "subject": "all",
        "available": "true",
        "waitlist": "true",
    }

    response = session.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        if "aaData" in data and len(data["aaData"]) > 0:
            all_data.extend(data["aaData"])
            print(f"Fetched {len(data['aaData'])} records from page {start // page_size + 1}")
        else:
            print(f"No data in page {start // page_size + 1}. Stopping.")
            break
    else:
        print(f"Failed to fetch page {start // page_size + 1}: {response.status_code}")
        break

    time.sleep(1)  # Avoid rate limiting

print(f"Total records fetched: {len(all_data)}") 

# Save to JSON
with open("data.json", "w") as f:
    json.dump(all_data, f, indent=4)

# Save to CSV (if the data is tabular)
import csv

with open("data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Column1", "Column2", "Column3"])  # Add column headers
    for row in all_data:
        writer.writerow(row)