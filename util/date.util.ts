import { addDays, addHours } from 'date-fns';

// Clamp number between two values with the following line:
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const roundTo = (roundTo: number) => (x: number) => Math.round(x / roundTo) * roundTo;
const roundDownTo = (roundTo: number) => (x: number) => Math.floor(x / roundTo) * roundTo;
const roundUpTo = (roundTo: number) => (x: number) => Math.ceil(x / roundTo) * roundTo;

export const roundToHour = roundTo(1000 * 60 * 60);
export const roundDownToHour = roundDownTo(1000 * 60 * 60);
export const roundUpToHour = roundUpTo(1000 * 60 * 60);

export const roundToDay = roundTo(1000 * 60 * 60 * 24);
export const roundDownToDay = roundDownTo(1000 * 60 * 60 * 24);
export const roundUpToDay = roundUpTo(1000 * 60 * 60 * 24);

/**
 * Finds all days between 2 dates.
 * Start is inclusive, end is exclusive
 * If start = 2020-01-01T10:00:00 & end = 2020-01-03T10:00:00
 * Return value would be [2020-01-01, 2020-01-02, 2020-01-03]
 */
export function findAllDaysBetween2Dates(start: Date, end: Date): Date[] {
	const dates: Date[] = [];
	let current = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
	while (current < end) {
		dates.push(current);
		current = addDays(current, 1);
	}
	return dates;
}

/**
 * Finds all hours between 2 dates.
 * Start is inclusive, end is exclusive
 */
export function findAllHoursBetween2Dates(start: Date, end: Date): Date[] {
	const hours: Date[] = [];
	let current = new Date(roundUpToHour(start.getTime()));
	while (current < end) {
		hours.push(current);
		current = addHours(current, 1);
	}
	return hours;
}
