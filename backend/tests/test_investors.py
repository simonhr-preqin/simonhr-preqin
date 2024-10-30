import sys
sys.path.append('..')
from fastapi.testclient import TestClient
import unittest
from app.main import app

class TestInvestors(unittest.TestCase):
  def setUp(self):
    self.client = TestClient(app)

  def test_get_investors(self):
    response = self.client.get("/api/v1/investors")
    self.assertEqual(response.status_code, 200, "HTTP request failed")
    self.assertIsInstance(response.json(), list)
    print(response.json())

if __name__ == '__main__':
  unittest.main()
