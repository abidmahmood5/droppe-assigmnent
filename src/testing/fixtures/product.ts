import faker from 'faker';

const create = (data: any = {}) => {
  const productId = faker.datatype.number();
  const price = faker.datatype.float();

  const defaultData = {
    title: `Fake Product ${productId}`,
    description: 'Fake description 1', 
    price,
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