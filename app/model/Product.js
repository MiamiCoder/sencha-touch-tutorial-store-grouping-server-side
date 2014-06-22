Ext.define('App.model.Product', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'productCode',
        fields: [
            { name: 'productCode', type: 'string' },
            { name: 'productName', type: 'string' },
            { name: 'productLine', type: 'string' },
            { name: 'color', type: 'string' }
        ]
    }
});