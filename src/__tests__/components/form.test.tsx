import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../components/form';

it('creates a form', () => {
  const handleSubmit = jest.fn();

  const formComponent = renderer.create(
    <Form on-submit={handleSubmit} />
  ).toJSON();

  expect(formComponent).toMatchSnapshot();
});
