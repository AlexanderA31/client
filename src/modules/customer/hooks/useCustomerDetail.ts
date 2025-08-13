import { useGenericApi } from '@/common/hooks/useGenericApi'
import { useKardex } from '@/common/hooks/useKardex'
import { CUSTOMER_ENDPOINTS_CONFIG } from '@/common/configs/api/customer-endpoints.config'
import { I_Customer } from '@/common/types/modules/customer'

export const useCustomerDetail = (customerId: string) => {
	const genericApi = useGenericApi(CUSTOMER_ENDPOINTS_CONFIG)

	const { data: customer, isLoading: isLoadingCustomer } = genericApi.useCustomQueryEndpoint('getById', {
		urlParams: { id: customerId },
	})

	// Fetch sales from kardex
	const { records: sales, loading: isLoadingSales } = useKardex({
		filters: { customerId: customerId, movementType: 'sale' },
	})

	// Fetch purchases from kardex
	const { records: purchases, loading: isLoadingPurchases } = useKardex({
		filters: { customerId: customerId, movementType: 'purchase' },
	})

	return {
		customer: customer as I_Customer | undefined,
		purchases: purchases?.data?.items || [],
		sales: sales?.data?.items || [],
		isLoading: isLoadingCustomer || isLoadingSales || isLoadingPurchases,
	}
}
