# dog_script.py
import json

class Dog:
    def __init__(self, name):
        self.name = name

    def get_name(self):
        return self.name

# Create a constant representing a Dog instance
DEFAULT_DOG = Dog("DefaultDog")

# Output the Dog instance as JSON
print(json.dumps({"DEFAULT_DOG": {"name": DEFAULT_DOG.get_name()}}))