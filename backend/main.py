from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This api takes title and topic and returns a mock dialog
@app.post("/generate-dialog")
def generate_dialog(data: dict):
    title = data.get("title")
    topic = data.get("topic")
    dialog = [
        {"speaker": "Beth", "text": f"Hi Andrew, let's dive into {title}, what do you think about {topic}?"},
        {"speaker": "Andrew", "text": "It’s evolving fast. I think it can really help personalize learning."},
        {"speaker": "Beth", "text": "It can make learning fun too"},
        {"speaker": "Andrew", "text": "Yes, exactly"},
    ]
    return dialog
