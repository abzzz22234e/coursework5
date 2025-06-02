#!/usr/bin/env python3
import requests
import json
import time
import os
import sys
from datetime import datetime

# Read the backend URL from the frontend .env file
def get_backend_url():
    env_file_path = "/app/frontend/.env"
    with open(env_file_path, "r") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                return line.strip().split("=")[1].strip('"')
    raise ValueError("REACT_APP_BACKEND_URL not found in frontend/.env")

BACKEND_URL = get_backend_url()
API_URL = f"{BACKEND_URL}/api"

def print_separator():
    print("\n" + "="*80 + "\n")

def test_root_endpoint():
    """Test the root endpoint to check if the API is running."""
    print("Testing root endpoint...")
    try:
        response = requests.get(f"{API_URL}/")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "message" in response.json(), "Response does not contain 'message' field"
        assert response.json()["message"] == "Hello World", f"Expected 'Hello World', got {response.json()['message']}"
        
        print("✅ Root endpoint test passed!")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Error connecting to the server: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Test failed: {e}")
        return False

def test_create_status_check():
    """Test creating a status check entry."""
    print("Testing status check creation...")
    try:
        client_name = f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        payload = {"client_name": client_name}
        
        response = requests.post(f"{API_URL}/status", json=payload)
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "id" in response.json(), "Response does not contain 'id' field"
        assert response.json()["client_name"] == client_name, f"Expected client_name '{client_name}', got {response.json()['client_name']}"
        assert "timestamp" in response.json(), "Response does not contain 'timestamp' field"
        
        print("✅ Create status check test passed!")
        return True, response.json()["id"]
    except requests.exceptions.RequestException as e:
        print(f"❌ Error connecting to the server: {e}")
        return False, None
    except AssertionError as e:
        print(f"❌ Test failed: {e}")
        return False, None

def test_get_status_checks(expected_id=None, expected_client_name=None):
    """Test retrieving status check entries."""
    print("Testing status check retrieval...")
    try:
        response = requests.get(f"{API_URL}/status")
        print(f"Status code: {response.status_code}")
        print(f"Response contains {len(response.json())} status checks")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert isinstance(response.json(), list), "Response is not a list"
        
        if expected_id and expected_client_name:
            found = False
            for status in response.json():
                if status["id"] == expected_id and status["client_name"] == expected_client_name:
                    found = True
                    break
            assert found, f"Could not find status check with id {expected_id} and client_name {expected_client_name}"
            print(f"✅ Found the status check with id {expected_id}")
        
        print("✅ Get status checks test passed!")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Error connecting to the server: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Test failed: {e}")
        return False

def test_error_handling():
    """Test error handling for invalid requests."""
    print("Testing error handling...")
    try:
        # Test with invalid payload (missing required field)
        response = requests.post(f"{API_URL}/status", json={})
        print(f"Status code for invalid payload: {response.status_code}")
        
        assert response.status_code in [422, 400], f"Expected status code 422 or 400 for invalid payload, got {response.status_code}"
        
        # Test with invalid endpoint
        response = requests.get(f"{API_URL}/nonexistent")
        print(f"Status code for invalid endpoint: {response.status_code}")
        
        assert response.status_code == 404, f"Expected status code 404 for invalid endpoint, got {response.status_code}"
        
        print("✅ Error handling test passed!")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Error connecting to the server: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Test failed: {e}")
        return False

def run_all_tests():
    """Run all tests and return overall status."""
    print(f"Testing backend API at {API_URL}")
    print_separator()
    
    # Test 1: Root endpoint
    root_success = test_root_endpoint()
    print_separator()
    
    # Test 2: Create status check
    create_success, status_id = test_create_status_check()
    print_separator()
    
    # Test 3: Get status checks
    if create_success and status_id:
        get_success = test_get_status_checks(status_id, f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}")
    else:
        get_success = test_get_status_checks()
    print_separator()
    
    # Test 4: Error handling
    error_success = test_error_handling()
    print_separator()
    
    # Overall results
    print("Test Results Summary:")
    print(f"Root Endpoint: {'✅ PASS' if root_success else '❌ FAIL'}")
    print(f"Create Status Check: {'✅ PASS' if create_success else '❌ FAIL'}")
    print(f"Get Status Checks: {'✅ PASS' if get_success else '❌ FAIL'}")
    print(f"Error Handling: {'✅ PASS' if error_success else '❌ FAIL'}")
    
    overall_success = all([root_success, create_success, get_success, error_success])
    print(f"\nOverall Test Result: {'✅ PASS' if overall_success else '❌ FAIL'}")
    
    return overall_success

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)