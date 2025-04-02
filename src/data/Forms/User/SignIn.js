// Inputs = [
//     Row = [element1, element2, ...],
//     ]

import { extractDefaultValuesInputs } from '../Extra';
import { common_inputs } from './Common';

export const inputs = [
    {
        ...common_inputs.email,
        size: { xs: 12, md: 6, lg: 6 },
    },
    {
        ...common_inputs.password,
        size: { xs: 12, md: 6, lg: 6 },
    },
];

export const defaultValues = extractDefaultValuesInputs(inputs);
