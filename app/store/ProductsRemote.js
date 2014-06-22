Ext.define('App.store.ProductsRemote', {
    extend: 'Ext.data.Store',
    config: {
        model: 'App.model.Product',
        autoSync: false,
        proxy: {
            type: 'ajax',
            api: {
                read: '../../services/collectibles.ashx'
            },
            reader: {
                rootProperty: 'products'
            }
        },
        grouper: {
            property: 'productLine',
            direction:'ASC'
        },
        remoteGroup: true
    }
});