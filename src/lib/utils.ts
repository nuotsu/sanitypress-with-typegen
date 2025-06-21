import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function slug(str: string) {
	return str
		.toLowerCase()
		.replace(/[\s\W]+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}
