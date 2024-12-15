export function ageCalculator(birthDay: Date, targetDay: Date): number {
	const year = targetDay.getFullYear() - birthDay.getFullYear();
	if (hasHadBirthday(birthDay, targetDay)) return year;
	return year - 1;
}

function hasHadBirthday(birthDay: Date, targetDay: Date): Boolean {
	return (
		birthDay.getMonth() <= targetDay.getMonth() ||
		(birthDay.getMonth() === targetDay.getMonth() &&
			birthDay.getDate() <= targetDay.getDate())
	);
}
