import requests
import time
import pandas as pd
import json
import os
import sys

default_url = "https://osmosis-api.lavenderfive.com:443"
query_path = "/osmosis/concentratedliquidity/v1beta1/liquidity_per_tick_range"

def read_data_from_api(url, pool_id, block_height=None):
    headers = {"Content-Type": "application/json"}
    if block_height is not None:
        headers['x-cosmos-block-height'] = str(block_height)
    response = requests.get(url + query_path, params={"pool_id": pool_id}, headers=headers)
    response.raise_for_status()  # Raise HTTPError for non-200 status codes
    data = response.json()
    return data

def preprocess_data(data):
    df = pd.DataFrame(data['liquidity'])
    df['liquidity_amount'] = pd.to_numeric(df['liquidity_amount'])
    df['lower_tick'] = pd.to_numeric(df['lower_tick'])
    df['upper_tick'] = pd.to_numeric(df['upper_tick'])
    df['tick_range'] = df['upper_tick'] - df['lower_tick']
    return df

if __name__ == "__main__":
    # Retrieve command-line arguments
    args = sys.argv[1:]

    # Parse arguments
    pool_id = args[0]
    block_height = args[1] if len(args) > 1 else None
    url = args[2] if len(args) > 2 else default_url

    try:
        data = read_data_from_api(url, pool_id, block_height)
        df = preprocess_data(data)
        
        # Serialize processed data to JSON
        processed_data = df.to_dict(orient='records')
        json_data = json.dumps(processed_data)

        # Print JSON data to stdout
        print(json_data)
    except requests.HTTPError as e:
        print(f"HTTP Error: {e.response.status_code} - {e.response.reason}")
    except Exception as e:
        print(f"An error occurred: {e}")
