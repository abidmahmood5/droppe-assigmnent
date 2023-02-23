import React from 'react';
import renderer from 'react-test-renderer';
import Modal from '../../components/modal';

it('creates a modal component with visibility false', () => {
  const handleSubmit = jest.fn();
  const toggleModalVisibility = jest.fn();

  const modalComponent = renderer.create(
    <Modal
      handleSubmit={handleSubmit}
      isOpen={false}
      onToggle={toggleModalVisibility}
    />
  ).toJSON();

  expect(modalComponent).toMatchSnapshot();
});

