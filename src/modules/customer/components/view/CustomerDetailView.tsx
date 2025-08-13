'use client'

interface Props {
	customerId: string
}

export function CustomerDetailView({ customerId }: Props) {
	return (
		<div>
			<h1>Customer Details</h1>
			<p>Customer ID: {customerId}</p>
		</div>
	)
}
