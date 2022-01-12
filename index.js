#!/usr/bin/env node

// Working through this: https://github.com/testdouble/contributing-tests/wiki/Bank-OCR-kata

import { Console } from 'console';

const cs = new Console({
	stdout : process.stdout,
	stderr : process.stderr,

	inspectOptions : {
		breakLength : 200,
		colors      : true,
		compact     : true,
		showHidden  : false,
	},
});


import ocr from './lib/ocr.js';


(async () => {
	try {
		const buffer = await ocr.getBufferFromFile('./ocr-account-numbers.txt');

		const entries = ocr.getEntriesFromBuffer(buffer);

		const accountNumbers = ocr.getAccountNumbersFromEntries(entries);

		cs.log({ accountNumbers });
	}
	catch (topLevelError) {
		cs.error('topLevelError: %o', topLevelError);

		process.exit(2);
	}
})();
