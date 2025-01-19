import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // Import using ES module syntax

// Read the JSON file
const jsonPath = path.join(process.cwd(), 'data', 'exercises.json');
const rawData = fs.readFileSync(jsonPath);
const exercises = JSON.parse(rawData).exercises;

// Function to send data to the API
async function sendDataToAPI(exercises) {
  const apiUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/import-exercises`
    : 'http://localhost:3000/api/import-exercises';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercises),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Import result:', result);
  } catch (error) {
    console.error('Error importing exercises:', error);
  }
}

// Run the import
sendDataToAPI(exercises);