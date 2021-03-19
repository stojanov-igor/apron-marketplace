import Accounts from "./Account";
import publicJs from "../utils/publicJs";

const value = 0;
const gasLimit = -1;

const listServices = async (maincontract) => {
    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listServices(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    return data?data:[];

};

const queryServiceByUuid = async (maincontract,id) => {
    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.queryServiceByUuid(AccountId, {value, gasLimit},id);
    data = publicJs.formatResult(data);
    return data;

};

const listServicesProvider = async (maincontract,id) => {
    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listServicesProvider(AccountId, {value, gasLimit},AccountId);
    data = publicJs.formatResult(data);
    return data;
};
const setAddService = async (maincontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (maincontract === null || !maincontract || !maincontract.tx || !AccountId) return;




    const{uuid,name,description,logo,providerName,providerOwner,usage,declaimer,pricePlan,createTime}=obj;

    const data = await maincontract.tx.addService({value, gasLimit:-1}, uuid,name,description,logo,createTime,providerName,providerOwner,usage,pricePlan,declaimer).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized) {
            console.log(result.status.isFinalized ,result.status.isInBlock );
            console.log(result)
            cb(true)
        }
    });
    return data;
};



export default {
    listServices,
    queryServiceByUuid,
    listServicesProvider,
    setAddService,

}

