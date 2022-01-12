#!/usr/bin/env node

// Working through this: https://github.com/testdouble/contributing-tests/wiki/Bank-OCR-kata

import { readFile } from 'fs/promises';

import {
	buffers as digitBuffers,
	// strings as digitStrings,
} from './digits.js';


// TODO: Implement streaming (fs.readStream) so as to not smoke through a bunch of memory on huge file reads
// .... or maybe it's not worth it, since User Story 1 says "A normal file contains around 500 entries."


async function getBufferFromFile(filePath) {
	try {
		const buffer = await readFile(filePath);
		return buffer;
	}
	catch (getBufferFromFileError) {
		console.error('getBufferFromFileError: %o', getBufferFromFileError);
		throw getBufferFromFileError;
	}
}

// Space        : 0x20 (32)
// Newline '\n' : 0x0a (10)
function getEntriesFromBuffer(buffer) {
	const entries    = [];
	const entryLines = [];

	let lineNumber = 0;
	let cursor = 0;

	try {
		while (cursor < buffer.length) {
			if (typeof entryLines[lineNumber] !== 'object' || Array.isArray(entryLines[lineNumber] !== true)) {
				entryLines[lineNumber] = [];
			}

			// If the character being read is a newline '\n' [0x0a (10)],
			// skip over it and increment the lineNumber counter, since
			// we're on a new line, after all
			if (buffer[cursor] === 0x0a) {
				lineNumber++;
				cursor++;
				continue;
			}

			entryLines[lineNumber].push(buffer[cursor]);

			cursor++;
		} // while (cursor < buffer.length)


		let currentEntry = [];

		for (const entryLine of entryLines) {
			// If this is a blank/empty line (the 4th line as per the format),
			// push the assembled current entry to the entries array, since it
			// will be fully assembled at this point
			if (entryLine.length === 0) {
				entries.push(currentEntry);
				currentEntry = [];
				continue;
			}

			// If this isn't an blank/empty line (the 4th line as per the format),
			// and it's less than 27 characters long, add spaces to the end of the
			// line until it's 27 characters long
			while (entryLine.length < 27) {
				entryLine.push(0x20);
			}

			currentEntry = [ ...currentEntry, ...entryLine ];
		} // for (const entryLine of entryLines)

		return entries;
	}
	catch (getEntriesFromBufferError) {
		console.error('getEntriesFromBufferError: %o', getEntriesFromBufferError);
		throw getEntriesFromBufferError;
	}
}

function getAccountNumberFromEntry(entry) {
	let accountNumber = '';

	for (let digitCounter = 0; digitCounter <= 8; digitCounter++) {
		const digitOffset = digitCounter * 3;

		const digit = [
			entry[digitOffset + 0],  entry[digitOffset + 1],  entry[digitOffset + 2],
			entry[digitOffset + 27], entry[digitOffset + 28], entry[digitOffset + 29],
			entry[digitOffset + 54], entry[digitOffset + 55], entry[digitOffset + 56],
		];

		const bufferDigit = Buffer.from(digit);

		const indexDigit = digitBuffers.findIndex(element => element.equals(bufferDigit));
		accountNumber += indexDigit;
	} // for (let digitCounter = 0; digitCounter <= 8; digitCounter++)

	return accountNumber;
}

function getAccountNumbersFromEntries(entries) {
	const accountNumbers = [];

	for (const entry of entries) {
		const entryAccountNumber = getAccountNumberFromEntry(entry);
		accountNumbers.push(entryAccountNumber);
	} // for (const entry of entries)

	return accountNumbers;
}


export default {
	getBufferFromFile,
	getEntriesFromBuffer,
	getAccountNumberFromEntry,
	getAccountNumbersFromEntries,
};
