# services/firebase_service.py
import os
import json
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("firebase_service")

# Try importing firebase libraries
try:
    import firebase_admin
    from firebase_admin import credentials, firestore, storage
    FIREBASE_LIBS_AVAILABLE = True
except ImportError:
    FIREBASE_LIBS_AVAILABLE = False

class FirebaseService:
    def __init__(self):
        self.firebase_enabled = False
        self.db = None
        self.bucket = None
        self.local_db_path = "db.json"
        
        if not FIREBASE_LIBS_AVAILABLE:
            logger.warning("Firebase Admin SDK libraries not installed yet. Running in local fallback mode.")
            return

        # Check for service account key file
        key_path = "serviceAccountKey.json"
        
        try:
            if os.path.exists(key_path):
                cred = credentials.Certificate(key_path)
                # We need storage bucket name, let's check config/env or read from serviceAccountKey project_id
                with open(key_path, "r") as f:
                    key_data = json.load(f)
                project_id = key_data.get("project_id")
                bucket_name = os.getenv("FIREBASE_STORAGE_BUCKET") or f"{project_id}.firebasestorage.app"
                
                # Check if already initialized to prevent duplicate initialization error
                if not firebase_admin._apps:
                    firebase_admin.initialize_app(cred, {
                        'storageBucket': bucket_name
                    })
                self.db = firestore.client()
                self.bucket = storage.bucket()
                self.firebase_enabled = True
                logger.info(f"Firebase successfully initialized for project: {project_id} using bucket: {bucket_name}")
            else:
                # Try initializing with environment variable project ID
                project_id = os.getenv("FIREBASE_PROJECT_ID")
                if project_id:
                    bucket_name = os.getenv("FIREBASE_STORAGE_BUCKET") or f"{project_id}.firebasestorage.app"
                    if not firebase_admin._apps:
                        firebase_admin.initialize_app(options={
                            'projectId': project_id,
                            'storageBucket': bucket_name
                        })
                    self.db = firestore.client()
                    self.bucket = storage.bucket()
                    self.firebase_enabled = True
                    logger.info(f"Firebase successfully initialized using env vars for project: {project_id}")
                else:
                    logger.warning("No Firebase serviceAccountKey.json or FIREBASE_PROJECT_ID found. Using local fallback.")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {str(e)}. Falling back to local mode.")
            self.firebase_enabled = False

    async def save_design(self, design_id: str, prompt: str, color: str, occasion: str, style: str, length: str, local_image_path: str, design_name: str, base_url: str) -> str:
        """
        Saves design to database (Firestore or local db.json) and uploads the image to Firebase Storage if available.
        Returns the public image URL.
        """
        timestamp = datetime.utcnow().isoformat()
        image_url = f"{base_url}/static/images/{os.path.basename(local_image_path)}"

        if self.firebase_enabled and self.bucket and self.db:
            try:
                # 1. Upload to Firebase Storage
                filename = os.path.basename(local_image_path)
                blob = self.bucket.blob(f"nail_designs/{filename}")
                blob.upload_from_filename(local_image_path)
                
                # Make it publicly readable
                blob.make_public()
                image_url = blob.public_url
                logger.info(f"Uploaded image to Firebase Storage: {image_url}")
                
                # 2. Save metadata to Firestore
                doc_ref = self.db.collection("nail_designs").document(design_id)
                doc_ref.set({
                    "id": design_id,
                    "prompt": prompt,
                    "color": color,
                    "occasion": occasion,
                    "style": style,
                    "length": length,
                    "imageUrl": image_url,
                    "designName": design_name,
                    "timestamp": timestamp
                })
                logger.info(f"Saved design {design_id} to Firestore.")
                return image_url
            except Exception as e:
                logger.error(f"Firebase save failed: {str(e)}. Falling back to local database save.")

        # Local fallback save to db.json
        try:
            designs = []
            if os.path.exists(self.local_db_path):
                with open(self.local_db_path, "r") as f:
                    try:
                        designs = json.load(f)
                    except json.JSONDecodeError:
                        designs = []
            
            designs.append({
                "id": design_id,
                "prompt": prompt,
                "color": color,
                "occasion": occasion,
                "style": style,
                "length": length,
                "imageUrl": image_url,
                "designName": design_name,
                "timestamp": timestamp
            })
            
            with open(self.local_db_path, "w") as f:
                json.dump(designs, f, indent=2)
                
            logger.info(f"Saved design {design_id} to local db.json.")
        except Exception as e:
            logger.error(f"Local database save failed: {str(e)}")

        return image_url

    def get_designs(self) -> list:
        """
        Retrieves all saved designs, sorted by timestamp descending.
        """
        if self.firebase_enabled and self.db:
            try:
                docs = self.db.collection("nail_designs").order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
                designs = []
                for doc in docs:
                    designs.append(doc.to_dict())
                return designs
            except Exception as e:
                logger.error(f"Firestore retrieve failed: {str(e)}. Falling back to local db.json.")

        # Local fallback retrieve from db.json
        if os.path.exists(self.local_db_path):
            try:
                with open(self.local_db_path, "r") as f:
                    designs = json.load(f)
                    # Sort descending by timestamp
                    designs.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
                    return designs
            except Exception as e:
                logger.error(f"Local database read failed: {str(e)}")
        
        return []

# Singleton instance
firebase_service = FirebaseService()
