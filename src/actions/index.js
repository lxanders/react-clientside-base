import R from 'ramda';
import * as types from './types';

export const addEntity = (payload) => ({
    type: types.ADD_ENTITY,
    payload
});

export function storeEntity(entityName) {
    return (dispatch, getState, services) => {
        dispatch(addEntity({ status: 'storing' }));

        return services.storeEntity(entityName)
        .then((entity) => dispatch(addEntity({ status: 'success', entity })))
        .catch((error) => dispatch(addEntity({ status: 'error', error: error.message })));
    };
}

function isEntityNew(state, entityName) {
    const itemNames = R.map(R.prop('name'), state.entities.items);

    return !R.contains(entityName, itemNames);
}

export function storeEntityIfNew(entityName) {
    return (dispatch, getState) => {
        if (isEntityNew(getState(), entityName)) {
            return dispatch(storeEntity(entityName));
        }

        const warning = 'Entity with that name was already present. Not adding.';

        dispatch(addEntity({ status: 'warning', warning }));

        return Promise.resolve();
    };
}

export const requestEntities = (payload) => ({
    type: types.REQUEST_ENTITIES,
    payload
});

export function fetchEntities() {
    return (dispatch, getState, services) => {
        dispatch(requestEntities({ status: 'fetching' }));

        return services.fetchEntities()
        .then((entities) => dispatch(requestEntities({ status: 'success', items: entities })))
        .catch((error) => dispatch(requestEntities({ status: 'error', error: error.message })));
    };
}
