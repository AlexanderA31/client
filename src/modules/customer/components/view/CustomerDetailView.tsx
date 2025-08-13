'use client'

import { useCustomerDetail } from '@/modules/customer/hooks/useCustomerDetail'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
	customerId: string
}

export function CustomerDetailView({ customerId }: Props) {
	const { customer, purchases, sales, isLoading } = useCustomerDetail(customerId)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!customer) {
		return <div>Customer not found</div>
	}

	return (
		<div className='flex flex-col gap-4'>
			<Card>
				<CardHeader>
					<CardTitle>
						{customer.firstName} {customer.lastName}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Email: {customer.email}</p>
					<p>Phone: {customer.phone}</p>
					<p>Address: {customer.address}</p>
				</CardContent>
			</Card>

			<Tabs defaultValue='sales'>
				<TabsList>
					<TabsTrigger value='sales'>Sales</TabsTrigger>
					<TabsTrigger value='purchases'>Purchases</TabsTrigger>
				</TabsList>
				<TabsContent value='sales'>
					<Card>
						<CardHeader>
							<CardTitle>Sales</CardTitle>
						</CardHeader>
						<CardContent>
							<pre>{JSON.stringify(sales, null, 2)}</pre>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='purchases'>
					<Card>
						<CardHeader>
							<CardTitle>Purchases</CardTitle>
						</CardHeader>
						<CardContent>
							<pre>{JSON.stringify(purchases, null, 2)}</pre>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
