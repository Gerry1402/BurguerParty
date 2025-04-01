// Inputs = [
//     Row = [element1, element2, ...],
//     ]

import { extractDefaultValues } from '../**Aux';
import common from './**Common';

export const inputs = [
    {
        ...common.email,
        size: { xs: 12, md: 6, lg: 6 },
    },
    {
        ...common.password,
        size: { xs: 12, md: 6, lg: 6 },
    },
];

export const defaultValues = extractDefaultValues(inputs);
