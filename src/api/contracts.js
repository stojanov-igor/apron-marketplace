import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import INIT_STATE from './initState';
import mainConnect from './mainContract'

import {ApiPromise, WsProvider} from '@polkadot/api';

const  {mainAddress} = window;

const ws_server = `ws://${mainAddress.basepath}:9944`;
const gateway_server = `ws://${mainAddress.basepath}:8082/detailed_logs`;

const SubstrateContext = React.createContext();


const connect = async (state, dispatch) => {
    const {apiState} = state;

    if (apiState) return;

    dispatch({type: 'CONNECT_INIT'});


    const wsProvider = new WsProvider(ws_server);
    const api = await ApiPromise.create({
        provider: wsProvider, types: {
            Address: 'AccountId',
            LookupSource: 'AccountId'
        }
    });

    if (api.isConnected) {
        dispatch({type: 'CONNECT', payload: api});
    }
    await api.isReady.then((api) => dispatch({type: 'CONNECT_SUCCESS'}));

};

const connectGateway = async (state, dispatch) => {
    const socket = new WebSocket(gateway_server);

    socket.onopen = function (event) {
        // socket.send('connect');
        console.log('Websocket connect');
    };
    socket.onmessage= function (event) {
        dispatch({type: 'SET_MSG', payload: event.data})
        console.log("Received Message:================= " + event.data);
    };

};

const initState = {...INIT_STATE};

const SubstrateContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);
    console.log("=====state=====",state);

    connect(state, dispatch);
    connectGateway(state, dispatch);
    mainConnect(state, dispatch);


    return <SubstrateContext.Provider value={{state,dispatch}}>
        {props.children}
    </SubstrateContext.Provider>;
};

const useSubstrate = () => ({...useContext(SubstrateContext)});

export {SubstrateContextProvider, useSubstrate};
