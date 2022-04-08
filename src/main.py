"""App entry point."""
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="hotel-management.cnsjmvtqfyks.us-west-1.rds.amazonaws.com", port=5432)