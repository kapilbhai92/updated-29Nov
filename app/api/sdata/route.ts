import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'sendEntries.json');
const entryNumberFilePath = path.join(process.cwd(), 'entryNumber.json');

// Function to get the last entry number or return 0 if no entries exist
function getLastEntryNumber() {
  try {
    // Check if the data file exists and read it
    const data = JSON.parse(readFileSync(filePath, 'utf8'));

    // If no data exists in the file, return 0
    if (data.length === 0) return 0;

    // If data exists, get the last entry and return its entry number
    const lastEntry = data[data.length - 1];
    return lastEntry.entryNumber;
  } catch (error) {
    // If no data file exists, return 0
    return 0;
  }
}

// Function to save the updated data back to the file
function saveDataToFile(data: any) {
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();

    // Get the last entry number
    const lastEntryNumber = getLastEntryNumber();
    const newEntryNumber = lastEntryNumber + 1; // Increment the entry number

    // Add the new entry number to the new data
    const entryWithNumber = { ...newData, entryNumber: newEntryNumber };

    // Read existing data
    let existingData = [];
    try {
      existingData = JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (error) {
      // If the file doesn't exist or is empty, initialize an empty array
      existingData = [];
    }

    // Add the new entry to the existing data array
    existingData.push(entryWithNumber);

    // Save the updated data back to the file
    saveDataToFile(existingData);

    return NextResponse.json({ data: entryWithNumber });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
