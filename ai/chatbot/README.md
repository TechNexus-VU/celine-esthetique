# AI Beauty Chatbot Backend

**Developer:** Ameema Rashid (AI Lead)  
**Assigned Task:** AI Beauty Chatbot with RAG Pipeline, Intent Recognition, Session Memory, Business Rules  
**API Endpoints:** `POST /api/ai/chat`, `POST /api/ai/chat/stream`

---

## Quick Start

```bash
# Navigate to this folder
cd ai/chatbot

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run server
uvicorn app.main:app --reload
```

## API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| GET | `/health` | Health check |
| POST | `/api/ai/chat` | AI chat with JSON response |
| POST | `/api/ai/chat/stream` | AI chat with SSE streaming |

## Test

```bash
pytest tests/ -v
```

## Project Structure

```
ai/chatbot/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, endpoints, rate limiting
│   ├── config.py            # Pydantic settings
│   ├── database.py          # FAISS vector database
│   ├── session_store.py     # SQLite session persistence
│   ├── firebase_session_store.py  # Firebase Firestore (optional)
│   ├── business_rules.py    # Salon policies engine
│   └── services/
│       ├── __init__.py
│       ├── rag_service.py   # RAG + intent + business rules
│       └── streaming_service.py  # SSE streaming
├── data/
│   └── salon_knowledge.json # 50 sample salon entries
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_chatbot.py      # API tests
│   └── test_rag.py          # RAG unit tests
├── requirements.txt
└── .env.example
```

## Environment Variables

| Variable | Required | Description |
|:---|:---|:---|
| `GROQ_API_KEY` | Yes | Groq Cloud API key |
| `GROQ_MODEL_NAME` | No | Default: `llama-3.3-70b-versatile` |
| `EMBEDDING_MODEL_NAME` | No | Default: `all-MiniLM-L6-v2` |

## Notes

- Sample data used (50 entries). Official data migration: replace `data/salon_knowledge.json` and restart.
- SQLite is default session store. Configure Firebase in `.env` for cloud persistence.
- Rate limiting: 10 requests per minute per IP.
- This module is part of the Celine Esthetique platform. See root README for full project overview.
