# I don't actually have this test working but you can imagine what it would look like if it did

import unittest
from unittest.mock import patch
from flask import Blueprint, jsonify
from ...blueprints.request import request_bp

# Create a mock for the database connection
@patch('.../db.get_db')
class RequestBlueprintTest(unittest.TestCase):

    def setUp(self, mock_db):
        # Create a blueprint instance for testing
        self.app = Blueprint('test_request_bp', __name__)
        self.app.register_blueprint(request_bp)

        # Mock the database connection and cursor, this looks silly
        mock_db.return_value.cursor.return_value.execute.return_value.fetchall.return_value = [
            {'id': 1, 'reason': 'Test reason', 'amount': 100.0, 'member_id': 1, 'trans_date': '2024-02-16', 'account_number': 10025102}
        ]

        print(mock_db)

    def test_get_requests(self, mock_db):
        # Test the get_requests endpoint
        with self.app.test_client() as client:
            response = client.get('/requests')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, [{
                'id': 1,
                'reason': 'Test reason',
                'amount': 100.0,
                'member_id': 1,
                'trans_date': '2024-02-16',
                'account_number': 10025102
            }])

            # Assert that the database connection was closed
            mock_db.close_db.assert_called_once()

    # def test_add_request(self, mock_db):
        # Test the add_request endpoint with valid data
        

if __name__ == '__main__':
    unittest.main()