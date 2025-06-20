'use client'

export default function CSS({ code }: { code?: string }) {
	if (!code) return null

	return (
		<style jsx>{`
			${code}
		`}</style>
	)
}
