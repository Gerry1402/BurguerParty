import { extractDefaultValues } from '../**Aux';
import common from './**Common';

export const inputs = [
    [
        {
            size: { xs: 12, md: 6, lg: 6 },
            ...common.name,
        },
        {
            size: { xs: 12, md: 6, lg: 6 },
            ...common.surname,
        },
    ],
    [
        {
            size: { xs: 12, md: 6, lg: 6 },
            ...common.email,
        },
        {
            size: { xs: 12, md: 6, lg: 6 },
            ...common.password,
        },
    ],
    [
        {
            size: { xs: 12, md: 8, lg: 9 },
            ...common.description,
        },
        {
            size: { xs: 12, md: 4, lg: 3 },
            ...common.birthdate,
        },
    ],
];

export const defaultValues = extractDefaultValues(inputs);
