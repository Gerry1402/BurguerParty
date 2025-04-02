import { extractDefaultValuesInputs } from "../Extra";
import { common_inputs, common_selects } from "./Common";

export const inputs1 = [
    {
        ...common_inputs.name,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.surname,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.birthdate,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.display_name,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.email,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.password,
        size: { xs: 12, md: 6, lg: 4 },
    },
];

export const inputs2 = [
    {
        ...common_inputs.phone,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.description,
        size: { xs: 12, md: 12, lg: 12 },
    },
];

export const selects = {
    country: {
        ...common_selects.country,
        size: { xs: 12, md: 6, lg: 4 },
    },
    city: {
        ...common_selects.city,
        size: { xs: 12, md: 6, lg: 4 },
    },
};

export const defaultValues = {
    ...extractDefaultValuesInputs(inputs1),
    ...extractDefaultValuesInputs(inputs2),
    country: "",
    city: "",
};
