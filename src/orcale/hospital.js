import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import axios from 'axios';
import HospitalJson from './../../build/contracts/Hospital.json';

const Hospital = {
    web3Provider: null,
    web3: null,
    contract: null,
    instance: null,
    baseUrl: null,
    baseOrg: null,
    ethAccounts: null,


    init: () => {
        let self = this;
        self.web3Provider =  new Web3.providers.HttpProvider('http://localhost:8545');
        self.web3 = new Web3(self.web3Provider);
            self.web3.version.getNetwork((error, netId) => {
                if(error){
                  console.log(err, 'First');
                  return;
                }
                self.web3 = new Web3(self.web3Provider);
                self.accounts = self.web3.eth.accounts;
                // console.log(self.accounts, ': ssss');
                console.log('My man: This is an unknown network.', netId);
                return self.web3;
                return self.accounts;
              });
        return new Promise((resolve, reject) =>{
            self.contract = TruffleContract(HospitalJson);
            self.contract.setProvider(self.web3Provider);
            self.contract.deployed().then(instance => {
                // return instance;
                self.instance = instance
                return instance
            })
            .then((result) => {
                self.instance = result;
                self.baseUrl = 'http://localhost:3000/api/'
                self.baseOrg = 'org.acme.hospital.'
                resolve(result);
            }).catch((err) => {
                console.log('It is not working ', err.message);
                reject(err)
            })
        });
    },

    accounts: () => {
        let self = this;
        console.log(self.accounts, ' :meh');
        return self.accounts;

    },

    register: (address, role) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.entityRegister(role, {from: address, gas:3000000})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },

    registerH: (address, role) => {
        let self = this;
        return new Promise((resolve, reject) => {
            axios({
                method: post,
                url: self.baseUrl+role,
                data: {
                    "$class": self.baseOrg+role,
                    "personId": address,
                    "name": role
                }
            })
            .then(response => { return response })
        })
        .then(result => { resolve(response) })
        .catch(error => { reject(error) })

    },

    signIn: (address) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.checkRegistration({from: address, gas:3000000})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },

    details: (address) => {
// get all details balance and role
    },

    balance: (address) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.getBalance({from: address})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    role: (address) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.getRole({from: address})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    grant: (sender, target) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.grantAccess(target, {from: sender, gas:3000000})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    revoke: (sender, target) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.revokeAccess(target, {from: sender, gas: 3000000})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    pay: (sender, target) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.sendPayment(target, {from: sender, gas:3000000})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    check: (sender, target) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.didIGaveRights(target, {from: sender})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    verify: (sender, target) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.doIHaveRights(target, {from, sender})
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
        });
    },
    fire: (sender, target) => {
        let self = this;
        return new Promise((resolve, reject) => {
            self.instance.helperEvent(target, sender, {from: sender})
            .then(response => {resolve(response) })
            .catch(error => reject(error))
        });
    }
};

export default Hospital;

