// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case

export function anagrams(stringA: string, stringB: string): Boolean {
	const cleanA = clean(stringA);
	const cleanB = clean(stringB);

	const dictA = getDict(cleanA);
	const dictB = getDict(cleanB);

	return isEqual(dictA, dictB);
}

function clean(str: string) {
	const strLower = str.toLowerCase();
	//Delete space and match only letters and numbers
	const regex = /[^a-z0-9]/gi;
	return strLower.replace(regex, "");
}

function getDict(str: string): Object {
	const dict: { [key: string]: number } = {};
	for (let char of str) {
		if (!dict.hasOwnProperty(char)) dict[char] = 1;
		else dict[char]++;
	}
	return dict;
}

function isEqual(objectA: Object, objectB: Object): Boolean {
	const keysA = Object.keys(objectA).sort();
	const keysB = Object.keys(objectB).sort();
	const valuesA = Object.values(objectA).sort();
	const valuesB = Object.values(objectB).sort();
	const areKeysEqual = JSON.stringify(keysA) === JSON.stringify(keysB);
	const areValuesEqual = JSON.stringify(valuesA) === JSON.stringify(valuesB);
	return areKeysEqual && areValuesEqual;
}

// --- Other Solutions

// function isEqual(objectA: Object, objectB: Object): Boolean {
// 	const entriesA = Object.entries(objectA).sort();
// 	const entriesB = Object.entries(objectB).sort();
// 	return JSON.stringify(entriesA) === JSON.stringify(entriesB);
// }
