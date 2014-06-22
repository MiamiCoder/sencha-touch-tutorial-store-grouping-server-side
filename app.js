/* 
Stores - serrver-side grouping.
*/

var loopsCounter = 0;

Ext.application({
    name: 'App',
    models: ['Product'],
    stores: ['ProductsRemote'],
    requires:['Ext.util.DelayedTask'],
    launch: function () {

        // Use the getStore function to get a reference to a store added via the stores config.
        var productsStore = Ext.getStore('ProductsRemote');

        productsStore.on({
            load: this.onStoreLoad
        });

        productsStore.load();

        

        var updateTask = Ext.create('Ext.util.DelayedTask', function () {

            // Reconfiguring grouper in a delayed task, just to wait for the previous operations  
            // to execute on the server and invoke the callbacks. 
            productsStore.setGrouper({
                property: 'color',
                direction: 'DESC'
            });

            // You have to reload for the new grouper to take effect.
            productsStore.load();

        }, this);

        updateTask.delay(2000);

        updateTask = Ext.create('Ext.util.DelayedTask', function () {

            // Reconfiguring grouper in a delayed task, just to wait for the previous operations  
            // to execute on the server and invoke the callbacks. 
            productsStore.setGroupField('productLine');
            productsStore.setGroupDir('DESC');
            productsStore.load();

        }, this);


        updateTask.delay(4000);

        updateTask = Ext.create('Ext.util.DelayedTask', function () {

            // Reconfiguring grouper in a delayed task, just to wait for the previous operations  
            // to execute on the server and invoke the callbacks. 
            productsStore.setGrouper({
                groupFn: function (record) {
                    return record.get('productName').substring(0,4);
                },
                sortProperty: 'productName'
            });

            productsStore.load();

        }, this);


        updateTask.delay(6000);

        
    },

    onStoreLoad: function (store, records) {

        var grouper = store.getGrouper();

        if (loopsCounter < 3) {

            console.log('Records grouped by ' + grouper.getProperty() + ' ' + grouper.getDirection() + ':');
            store.each(function (record) {
                console.log('- ' + record.get(grouper.getProperty()) + ' - ' + record.get('productName'));
            });
        } else {
            console.log('Records grouped by first four chars of productName ' + grouper.getDirection() + ':');
            store.each(function (record) {
                console.log('- ' + record.get('productName'));
            });
        }

        loopsCounter++;
    }
});      