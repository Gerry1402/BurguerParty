import { extractDefaultValues } from './**Aux';

export const inputs = [
    [
        {
            size: { xs: 12, md: 6, lg: 6 },
            label: '',
            control: {
                type: '',
                placeholder: '',
                name: '',
                defaultValue: '',
            },
            feedback: '',
        },
    ],
];

export const defaultValues = extractDefaultValues(inputs);
