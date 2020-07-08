export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const getLabel = (key: string) => {
  let label = key;
  // decamelcase
  label = label
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
    .toLowerCase();
  // capitalize
  label = capitalizeFirstLetter(label);
  return label;
};
