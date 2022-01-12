const digit0 =
' _ ' +
'| |' +
'|_|';

const digit1 =
'   ' +
'  |' +
'  |';

const digit2 =
' _ ' +
' _|' +
'|_ ';

const digit3 =
' _ ' +
' _|' +
' _|';

const digit4 =
'   ' +
'|_|' +
'  |';

const digit5 =
' _ ' +
'|_ ' +
' _|';

const digit6 =
' _ ' +
'|_ ' +
'|_|';

const digit7 =
' _ ' +
'  |' +
'  |';

const digit8 =
' _ ' +
'|_|' +
'|_|';

const digit9 =
' _ ' +
'|_|' +
' _|';


const buffers = [
	Buffer.from(digit0),
	Buffer.from(digit1),
	Buffer.from(digit2),
	Buffer.from(digit3),
	Buffer.from(digit4),
	Buffer.from(digit5),
	Buffer.from(digit6),
	Buffer.from(digit7),
	Buffer.from(digit8),
	Buffer.from(digit9),
];

const strings = [
	digit0,
	digit1,
	digit2,
	digit3,
	digit4,
	digit5,
	digit6,
	digit7,
	digit8,
	digit9,
];


export {
	buffers,
	strings,
};
