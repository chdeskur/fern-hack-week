import os
import requests
import sys
import time

domain = sys.argv[1]
region = sys.argv[2]
incident_name = f"{domain} - Down"
token = os.environ['INCIDENT_API_KEY']
auth_header = {"Authorization": f"Bearer {token}"}

# TODO: try using custom fields/sevarities to reduce the number of incidents we need to page through.
# TODO: Handle pagination (only matters when there are more than 250 active incidents, will matter even less once we can fileter on other fields)

# Get all incidents
# Note: Add `&mode%5Bone_of%5D=test` to url for testing
list_response = requests.get("https://api.incident.io/v2/incidents?page_size=250", headers=auth_header)
if list_response.status_code != 200:
    print(list_response.json())
    sys.exit(f"Request failed with status code {list_response.status_code}")

# Look for one that matches our naming convention DOMAIN - Down
for incident in list_response.json()["incidents"]:
    if incident["name"] == incident_name:
        print("Incident already exists. See: ", incident["permalink"])
        exit()

#If none found, create new one
create_response = requests.post('https://api.incident.io/v2/incidents', headers=auth_header, json={
    "idempotency_key": f"{domain}-{time.time()}",
    "name": incident_name,
    "severity_id": "01HR85VFNX9NYZG6B5Z40K8Y9V",
    "summary": f"{domain} appears to be down. First observed in region: {region} as of {time.strftime('%l:%M%p %Z on %b %d, %Y')}.",
    "visibility": "public"
    })
if list_response.status_code != 200:
    print(create_response.json())
    sys.exit(f"Request failed with status code {list_response.status_code}")

if "incident" not in create_response.json():
    print("Incident not created. See response below:")
    print(create_response.json())
else:
    print("Incident created: ", create_response.json()["incident"]["permalink"])

# TODO: do we want this to auto-close when sites come back up?