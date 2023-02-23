import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../components/button';

it('creates a button component', () => {
  const buttonComponent = renderer.create(
    <Button>Add a Product</Button>
  ).toJSON();

  expect(buttonComponent).toMatchSnapshot();
});

