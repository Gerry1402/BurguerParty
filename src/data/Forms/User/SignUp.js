import { extractDefaultValues } from '../Extra';
import common from './Common';

export const inputs = [
    {
        ...common.name,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common.surname,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common.birthdate,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common.username,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common.email,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common.password,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        size: { xs: 12, md: 12, lg: 12 },
        ...common.description,
    },
];

export const defaultValues = extractDefaultValues(inputs);
