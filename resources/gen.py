import json
import os

def generate_resource_files(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)

    for key, value in data.items():
        title = key.capitalize()
        description = value.get("description", "")
        resources = value.get("resources", [])

        # Generate the Markdown file content
        content = f"""+++
title = \"{title}\"
description = \"{description}\"
+++

{description}

### Resources
| Resource | Courtesy |
| :-- | :-- |
"""

        for resource in resources:
            resource_name = resource.get("resource_name", "").replace(" ", "_")
            resource_href = resource.get("resource_href", "#")
            courtesy_name = resource.get("courtesy_name", "")
            courtesy_href = resource.get("courtesy_href", "#")
            
            content += f"| <a class=\"inline-button\" href=\"{resource_href}\" target=\"_blank\">{resource_name}</a> | <a class=\"inline-button\" href=\"{courtesy_href}\" target=\"_blank\">{courtesy_name}</a> |\n"

        # File name based on the title
        file_name = f"{title.lower().replace(' ', '_')}.md"
        with open(file_name, "w") as md_file:
            md_file.write(content)

# Path to the repository.json file
file_path = "repository.json"
if os.path.exists(file_path):
    generate_resource_files(file_path)
    print("Resource files generated successfully.")
else:
    print(f"File '{file_path}' not found.")
