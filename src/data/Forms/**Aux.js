export const extractDefaultValues = (inputs) =>
    inputs.flat().reduce((acc, input) => {
        acc[input.control.name] = input.control.defaultValue;
        return acc;
    }, {});
