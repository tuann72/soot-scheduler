import requests
import time
import json

def fetch_class_data(total_records=10814, page_size=100, output_file="data.json"):
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

    session = requests.Session()
    main_page_url = "https://classnav.ou.edu/"
    session.get(main_page_url, headers=headers)
    
    all_data = []
    
    for start in range(0, total_records, page_size):
        params = {
            "sEcho": "12",
            "iColumns": "18",
            "sColumns": "",
            "iDisplayStart": str(start),
            "iDisplayLength": str(page_size),
            "semester": "202510",
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

    
    print(f"Total records fetched: {len(all_data)}")
    
    # Save to JSON
    with open("data.json", "w") as f:
        json.dump(all_data, f, indent=4)
    
    return all_data


if __name__ == '__main__':
    fetch_class_data()