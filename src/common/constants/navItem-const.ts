import { NavConfig } from '@/common/types/navItem'
import { ROUTE_PATH } from '@/common/constants/routes-const'
import { GROUP_PERMISSIONS, PERMISSIONS } from '@/common/constants/rolePermissions-const'

export const ALL_NAV_ITEMS: NavConfig = [
	{
		groupName: 'Principal',
		permission: GROUP_PERMISSIONS.MAIN,
		items: [
			{
				title: 'Dashboard',
				url: ROUTE_PATH.ADMIN.DASHBOARD,
				icon: 'dashboard',
				isActive: false,
				permission: PERMISSIONS.DASHBOARD,
			},
		],
	},
	{
		groupName: 'Inventario',
		permission: GROUP_PERMISSIONS.INVENTORY,
		items: [
			{
				title: 'Categorías',
				url: ROUTE_PATH.ADMIN.CATEGORY,
				icon: 'listDetails',
				isActive: false,
				permission: PERMISSIONS.CATEGORIES,
			},
			{
				title: 'Proveedores',
				url: ROUTE_PATH.ADMIN.SUPPLIER,
				icon: 'truck',
				isActive: false,
				permission: PERMISSIONS.SUPPLIERS,
			},
			{
				title: 'Marcas',
				url: ROUTE_PATH.ADMIN.BRANDS,
				icon: 'brandMedium',
				isActive: false,
				permission: PERMISSIONS.BRANDS,
			},
			{
				title: 'Productos',
				url: ROUTE_PATH.ADMIN.PRODUCT,
				icon: 'boxModel2',
				isActive: false,
				permission: PERMISSIONS.PRODUCTS,
			},
		],
	},
	{
		groupName: 'Económico',
		permission: GROUP_PERMISSIONS.ECONOMIC,
		items: [
			{
				title: 'Ventas',
				url: ROUTE_PATH.ADMIN.SALES,
				icon: 'sortAscendingLetters',
				isActive: false,
				permission: PERMISSIONS.SALES,
			},
			{
				title: 'Reportes',
				url: ROUTE_PATH.ADMIN.REPORTS,
				icon: 'chartArcs',
				isActive: false,
				permission: PERMISSIONS.REPORTS,
			},
		],
	},
	{
		groupName: 'Configuración',
		permission: GROUP_PERMISSIONS.CONFIGURATION,
		items: [
			{
				title: 'Administración',
				icon: 'settingsCog',
				isActive: false,
				permission: PERMISSIONS.ADMINISTRATION,
				items: [
					{
						title: 'Local',
						url: ROUTE_PATH.ADMIN.CONFIGURATION.LOCAL,
						icon: 'store',
						permission: PERMISSIONS.ADMINISTRATION,
					},
					{
						title: 'Facturación',
						url: ROUTE_PATH.ADMIN.CONFIGURATION.BILLING,
						icon: 'receipt',
						permission: PERMISSIONS.ADMINISTRATION,
					},
					{
						title: 'Preferencias',
						url: ROUTE_PATH.ADMIN.CONFIGURATION.PREFERENCE,
						icon: 'server',
						permission: PERMISSIONS.ADMINISTRATION,
					},
					{
						title: 'Personalización',
						url: ROUTE_PATH.ADMIN.CONFIGURATION.PERSONALIZATION,
						icon: 'add',
						permission: PERMISSIONS.ADMINISTRATION,
					},
				],
			},
			{
				title: 'Estructura',
				icon: 'boxModel2',
				isActive: false,
				permission: PERMISSIONS.ATTRIBUTES,
				items: [
					{
						title: 'Atributos',
						url: ROUTE_PATH.ADMIN.ATTRIBUTES,
						icon: 'boxModel2',
						permission: PERMISSIONS.ATTRIBUTES,
					},
					{
						title: 'Plantillas',
						url: ROUTE_PATH.ADMIN.TEMPLATES,
						icon: 'listDetails',
						permission: PERMISSIONS.TEMPLATES,
					},
				],
			},
		],
	},
]
