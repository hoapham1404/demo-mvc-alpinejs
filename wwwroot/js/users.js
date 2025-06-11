// Main Users Handler
document.addEventListener('alpine:init', () => {
	Alpine.data('usersHandler', () => ({
		selectedStoreCode: '',
		selectedTenantCode: '',

		allStores: [
			{ StoreCode: 'T001', StoreName: 'Store 001' },
			{ StoreCode: 'T002', StoreName: 'Store 002' },
			{ StoreCode: 'T003', StoreName: 'Store 003' }
		],

		allTenantsJson: [
			{ TenantCode: 'TN001', TenantName: 'Tenant 001', StoreCode: 'T001' },
			{ TenantCode: 'TN002', TenantName: 'Tenant 002', StoreCode: 'T001' },
			{ TenantCode: 'TN003', TenantName: 'Tenant 003', StoreCode: 'T002' },
			{ TenantCode: 'TN004', TenantName: 'Tenant 004', StoreCode: 'T003' }
		],

		// Computed property for filtered tenants based on selected store
		get filteredTenants() {
			if (!this.selectedStoreCode) return [];
			return this.allTenantsJson.filter(tenant =>
				tenant.StoreCode === this.selectedStoreCode
			);
		},

		// Callback when store is selected
		onStoreSelect(item) {
			console.log('Store selected:', item);
			// Reset tenant selection when store changes
			this.selectedTenantCode = '';
		},

		// Callback when tenant is selected  
		onTenantSelect(item) {
			console.log('Tenant selected:', item);
		}
	}));
});
