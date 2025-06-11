// Main Users Handler
document.addEventListener('alpine:init', () => {
	Alpine.data('usersHandler', () => ({
		selectedPermissionValue: '',
		selectedStoreCode: '',
		selectedTenantCode: '',

		// Permission definitions
		allPermissions: [
			{ Value: '10', Name: 'Accountant', Description: 'Full access to all data' },
			{ Value: '20', Name: 'Store', Description: 'Access to specific store data' },
			{ Value: '30', Name: 'Tenant', Description: 'Access to specific tenant data' }
		],

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

		// Visibility and state logic based on permission
		get shouldShowStoreAndTenant() {
			return this.selectedPermissionValue === '20' || this.selectedPermissionValue === '30';
		},

		get shouldShowTenant() {
			return this.selectedPermissionValue === '30';
		},

		get isStoreDisabled() {
			return false; // Store is always enabled when visible
		},

		get isTenantDisabled() {
			return !this.selectedStoreCode; // Tenant disabled if no store selected
		},

		// Helper method to get permission display
		getPermissionDisplay() {
			const permission = this.allPermissions.find(p => p.Value === this.selectedPermissionValue);
			return permission ? `${permission.Name} (${permission.Value})` : '';
		},

		// Callback when permission is selected - implements business logic
		onPermissionSelect(item) {
			console.log('Permission selected:', item);

			const permissionValue = item.Value;

			switch (permissionValue) {
				case '10': // Accountant - clear both Store and Tenant
					console.log('Accountant selected: Clearing Store and Tenant');
					this.selectedStoreCode = '';
					this.selectedTenantCode = '';
					break;

				case '20': // Store - clear only Tenant, keep Store
					console.log('Store permission selected: Clearing Tenant, keeping Store');
					this.selectedTenantCode = '';
					// Store remains as is
					break;

				case '30': // Tenant - keep both Store and Tenant as normal
					console.log('Tenant permission selected: No changes to Store/Tenant');
					// No automatic clearing
					break;

				default:
					console.log('Unknown permission selected');
					break;
			}
		},

		// Callback when store is selected
		onStoreSelect(item) {
			console.log('Store selected:', item);

			// Only reset tenant if permission allows tenant selection
			if (this.selectedPermissionValue === '30') {
				// Reset tenant selection when store changes
				this.selectedTenantCode = '';
			}
		},

		// Callback when tenant is selected  
		onTenantSelect(item) {
			console.log('Tenant selected:', item);
			// No special logic needed for tenant selection
		}
	}));
});
