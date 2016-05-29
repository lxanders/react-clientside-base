import { createAction } from 'redux-actions';
import R from 'ramda';

export const addEntity = createAction('ADD_ENTITY');

export function storeEntity(entityName) {
    return (dispatch, getState, services) => {
        dispatch(addEntity({ status: 'storing' }));

        return services.storeEntity(entityName)
        .then((entity) => dispatch(addEntity({ status: 'success', entity })))
        .catch((error) => dispatch(addEntity({ status: 'error', error: error.message })));
    };
}

function isEntityNew(state, entityId) {
    const itemNames = R.map(R.prop('name'), state.entities.items);

    return !R.contains(entityId, itemNames);
}

export function storeEntityIfNew(entityId) {
    return (dispatch, getState) => {
        if (isEntityNew(getState(), entityId)) {
            return dispatch(storeEntity(entityId));
        }

        const warning = 'Entity with that name was already present. Not adding.';

        dispatch(addEntity({ status: 'warning', warning }));

        return Promise.resolve();
    };
}

export const requestEntities = createAction('REQUEST_ENTITIES');

export function fetchEntities() {
    return (dispatch, getState, services) => {
        dispatch(requestEntities({ status: 'fetching' }));

        return services.fetchEntities()
        .then((entities) => dispatch(requestEntities({ status: 'success', items: entities })))
        .catch((error) => dispatch(requestEntities({ status: 'error', error: error.message })));
    };
}
