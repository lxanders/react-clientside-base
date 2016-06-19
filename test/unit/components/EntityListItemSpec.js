import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import R from 'ramda';
import { Link } from 'react-router';
import EntityListItem from '../../../src/components/EntityListItem';

describe('EntityListItem', function () {
    const createDefaultProps = () => {
        return {
            name: 'any name'
        };
    };

    const createComponent = (props = {}) => {
        const mergedProps = R.merge(createDefaultProps(), props);

        return <EntityListItem {...mergedProps} />;
    };

    const testCases = [
        { name: 'a', expected: 'a' },
        { name: 'A', expected: 'a' },
        { name: 'a b', expected: 'ab' },
        { name: 'äb', expected: 'b' },
        { name: '#a', expected: 'a' },
        { name: 'a3', expected: 'a3' }
    ];

    testCases.forEach((testCase) => {
        it(`should remove non-word characters and lower-case the result for ${testCase.name}`, function () {
            const { name, expected } = testCase;
            const expectedUri = `/entities/${expected}`;
            const entityListItem = shallow(createComponent({ name }));
            const link = entityListItem.find(Link);

            expect(link.prop('to')).to.equal(expectedUri);
            expect(link.children().text()).to.equal(expected);
        });
    });
});
