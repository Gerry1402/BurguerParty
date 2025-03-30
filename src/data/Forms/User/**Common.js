const adultAge = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
};

const common = {

    name: {
        label: 'Name',
        control: {
            type: 'text',
            placeholder: 'Name',
            name: 'name',
            defaultValue: '',
        },
        feedback: 'Write a name',
    },

    surname: {
        label: 'Surname',
        control: {
            type: 'text',
            placeholder: 'Sur Name',
            name: 'surname',
            defaultValue: '',
        },
        feedback: 'Write one or two surnames',
    },

    email: {
        label: 'Email',
        control: {
            type: 'email',
            placeholder: 'example@email.com',
            name: 'email',
            defaultValue: '',
        },
        feedback: 'Write a valid email',
    },

    password: {
        label: 'Password',
        control: {
            type: 'password',
            name: 'password',
            minLength: 8,
            defaultValue: '',
        },
        feedback: 'Write a minimum of 8 characters',
    },

    description: {
        label: 'Description',
        control: {
            as: 'textarea',
            rows: 3,
            placeholder: 'Write a minimum of 50 characters.',
            name: 'description',
            minLength: 50,
            maxLength: 500,
            defaultValue: '',
        },
        feedback: 'Write a minimum of 50 characters',
    },

    birthdate: {
        label: 'Birthdate',
        control: {
            type: 'date',
            name: 'birthdate',
            defaultValue: adultAge(18),
            max: adultAge(18),
        },
        feedback: 'Write a valid birthdate',
    },
};

export default common;
