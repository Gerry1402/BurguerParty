// Inputs = [
//     Row = [element1, element2, ...],
//     ]

import { extractDefaultValues } from '../**Aux';
import common from './**Common';

export const inputs = [
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
];

export const defaultValues = extractDefaultValues(inputs);
