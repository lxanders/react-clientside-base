import React from 'react';
import { Link } from 'react-router';

const createEntityDetailsUri = (name) => {
    return `/entities/${name}`;
};

const normalizeEntityName = (name) => {
    return name.trim().toLowerCase().replace(/\W/g, '');
};

const EntityListItem = ({ name }) => {
    const normalizedName = normalizeEntityName(name);

    return <Link to={createEntityDetailsUri(normalizedName)}>{normalizedName}</Link>;
};

EntityListItem.propTypes = {
    name: React.PropTypes.string.isRequired
};

export default EntityListItem;
