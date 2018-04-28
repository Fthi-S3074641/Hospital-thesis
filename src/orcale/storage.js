const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

class myStorage {
    constructor() {
        this.cardName = 'admin@hospital-ehr';
        this.businessNetworkIdentifier = 'hospital-ehr';
        this.businessNetworkDefinition = null;
        this.bizNetworkConnection = new BusinessNetworkConnection();
    }

    init() {
        this.bizNetworkConnection.connect(this.cardName).then((definition) => {
            this.businessNetworkDefinition = definition;
        })
    }

    network() {
        return this.businessNetworkDefinition.getName();
    }

    
}




