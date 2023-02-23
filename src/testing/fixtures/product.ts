import faker from 'faker';

const create = (data: any = {}) => {
  const productId = faker.datatype.number();
  const defaultData = {
    title: `Fake Product ${productId}`,
    description: 'Fake description 1', 
    price: '$23.90',
  };

  const newData = {
    ...defaultData,
    ...data,
  };

  return newData;
};

export default {
  create,
}