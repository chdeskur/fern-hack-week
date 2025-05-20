import os
import requests
import sys
import time
import csv


# Check if there is an open test incident for this region
region = sys.argv[1]
incident_name = f"Sites down in {region} region"
token = os.environ['INCIDENT_API_KEY']
auth_header = {"Authorization": f"Bearer {token}"}
list_test_response = requests.get("https://api.incident.io/v2/incidents?page_size=250&mode%5Bone_of%5D=test", headers=auth_header)
if list_test_response.status_code != 200:
    print(list_test_response.json())
    sys.exit(f"Request failed with status code {list_test_response.status_code}")
# Look for one that matches our naming convention
test_incident_id = ''
test_incident_summary = ''
for incident in list_test_response.json()["incidents"]:
    if incident["name"] == incident_name:
        test_incident_id = incident["id"]
        incident_url = incident["permalink"]
        test_incident_summary = incident["summary"]
        print(f"Test incident '{incident["name"]}' (id:{test_incident_id}) exists. See: {incident_url}")
        break

# Check if there is an open 'standard' incident for this region
list_response = requests.get("https://api.incident.io/v2/incidents?page_size=250", headers=auth_header)
if list_response.status_code != 200:
    print(list_response.json())
    sys.exit(f"Request failed with status code {list_response.status_code}")
# Look for one that matches our naming convention
incident_id = ''
incident_summary = ''
for incident in list_response.json()["incidents"]:
    if incident["name"] == incident_name:
        incident_id = incident["id"]
        incident_url = incident["permalink"]
        incident_summary = incident["summary"]
        print(f"Incident '{incident["name"]}' (id:{incident_id}) exists. See: {incident_url}")
        break

# Hit all sites to see if the are up
sites_down = []
file = open('sites.csv', 'r')
reader = csv.reader(file, delimiter=',')
# Provide user agent header to hopefully avoid 403s
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
for row in reader:
    domain = row[0]
    try:
        resp = requests.get(f"https://{domain}", headers=headers)
    except:
        resp.status_code = 'request failed'
    if resp.status_code != 200:
        print(f"Issue getting {domain}")
        print(resp)
        sites_down.append(domain)
    print(resp.status_code)


# If all sites are good, close any open test incidents 
# TODO: Should we also auto-resolve non-test incidents?
if len(sites_down) == 0:
    print("All sites appear to be OK")

    # Close test incident if it exists
    if test_incident_id != '':
        print(f"All sites in region:{region} now appear to be up. Cancelling test incident.")
        # List of status IDs
        # Monitoring: 01HR85VFNXWH1H6976YCEJ5XJB
        # Declined: 01HR85VFNXG4ZXWCCFJ9NTJA6B
        # Cancelled: 01HR85VFNXMV8SBQ3FRPMDBCST
        # Closed: 01HR85VFNXJPF6TXWYTXA6NBS2
        edit_response = requests.post(f'https://api.incident.io/v2/incidents/{test_incident_id}/actions/edit', headers=auth_header, json={"incident": {"incident_status_id": "01HR85VFNXMV8SBQ3FRPMDBCST"},"notify_incident_channel": False})
        if edit_response.status_code != 200:
            print(edit_response.json())
            sys.exit(f"Request failed with status code {edit_response.status_code}")
    exit()


# Check if this incident should be created/updated/escalated

# If no test or standard incident exists, create a new one
if test_incident_id == '' and incident_id == '':
    create_response = requests.post('https://api.incident.io/v2/incidents', headers=auth_header, json={
        "idempotency_key": f"{region}-{time.time()}",
        "name": incident_name,
        "incident_status_id": "01HR85VFNXWH1H6976YCEJ5XJB", # Monitoring
        "mode": "test",
        "severity_id": "01HR85VFNX9NYZG6B5Z40K8Y9V", # Minor
        "summary": f"The following sites are down in the {region} as of {time.strftime('%l:%M%p %Z on %b %d, %Y')}.\n\n\nSites:\n\n- {"\n\n- ".join(sites_down)}",
        "visibility": "public"
        })
    if create_response.status_code != 200:
        print(create_response.json())
        sys.exit(f"Request failed with status code {create_response.status_code}")

    print("Incident created: ", create_response.json()["incident"]["permalink"])
    exit(1)

# If standard incident exists, leave it be
if incident_id != '':
    print("Standard incident already exists, see logs above")
    exit(1)

# If test incident does exists, compare site list
test_incident_sites=test_incident_summary.split("Sites:\n\n- ")[1].split("\n\n- ")
# Look for any currently down sites that are still down
sites_stayed_down = False
for currently_down_site in sites_down:
    for previously_down_site in test_incident_sites:
        # If sites have stayed down, convert incident from test -> standard
        if currently_down_site == previously_down_site:
            sites_stayed_down = True
            print("One or more previously down sites are still down, converting the test incident to standard and updating the site list.")
            updated_json = {
                "incident": {
                    "mode": "standard",
                    "summary": f"The following sites are down in the {region} as of {time.strftime('%l:%M%p %Z on %b %d, %Y')}.\n\n\nSites:\n\n- {"\n\n- ".join(sites_down)}"
                },
                "notify_incident_channel": True
            }
            break
    if sites_stayed_down:
        break

if not sites_stayed_down:
    print("The list of sites down has changed. Updating the test incident to relfect the updated site list.")
    updated_json = {
        "incident": {
            "summary": f"The following sites are down in the {region} as of {time.strftime('%l:%M%p %Z on %b %d, %Y')}.\n\n\nSites:\n\n- {"\n\n- ".join(sites_down)}"
        },
        "notify_incident_channel": False
    }

# Apply updates
edit_response = requests.post(f'https://api.incident.io/v2/incidents/{test_incident_id}/actions/edit', headers=auth_header, json=updated_json)
if edit_response.status_code != 200:
    print(edit_response.json())
    sys.exit(f"Request failed with status code {edit_response.status_code}")

exit(1)