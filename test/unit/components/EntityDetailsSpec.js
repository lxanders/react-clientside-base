import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageHeader } from 'react-bootstrap';
import EntityDetails from '../../../src/components/EntityDetails';

describe('EntityDetails', function () {
    const createComponent = (params = { id: 'foo' }, location = { query: {} }) => {
        return <EntityDetails params={params} location={location} />;
    };

    it('should render the entity id in the page header', function () {
        const id = 'anyname';
        const entityDetails = shallow(createComponent({ id }));

        expect(entityDetails.find(PageHeader).contains(id)).to.equal(true);
    });
});
