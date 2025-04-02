import axios from "axios";
const adultAge = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
};

export const getCitiesCountries = async () => {
    const relations = await axios
        .get("https://countriesnow.space/api/v0.1/countries/population/cities")
        .then((data) => data.data.data.map(({ city, country }) => ({ [city]: country })));
    const cities = relations.flatMap(obj => Object.keys(obj));
    const countries = [...new Set(relations.flatMap(obj => Object.values(obj)))];
    return { cities, countries, relations };
};

export const common_inputs = {
    name: {
        label: "Name",
        control: {
            type: "text",
            placeholder: "Name",
            name: "name",
            defaultValue: "",
        },
        feedback: "Write a name",
    },

    surname: {
        label: "Surname",
        control: {
            type: "text",
            placeholder: "Sur Name",
            name: "surname",
            defaultValue: "",
        },
        feedback: "Write one or two surnames",
    },

    display_name: {
        label: "Username",
        group: "@",
        control: {
            type: "text",
            placeholder: "username",
            name: "display_name",
            defaultValue: "",
        },
        feedback: "Try another username",
    },

    email: {
        label: "Email",
        control: {
            type: "email",
            placeholder: "example@email.com",
            name: "email",
            defaultValue: "",
        },
        feedback: "Write a valid email",
    },

    password: {
        label: "Password",
        control: {
            type: "password",
            name: "password",
            minLength: 8,
            defaultValue: "",
        },
        feedback: "Write a minimum of 8 characters",
    },

    description: {
        label: "Description",
        control: {
            as: "textarea",
            rows: 3,
            placeholder: "Write a minimum of 50 characters.",
            name: "description",
            minLength: 50,
            maxLength: 500,
            defaultValue: "",
        },
        feedback: "Write a minimum of 50 characters",
    },

    birthdate: {
        label: "Birthdate",
        control: {
            type: "date",
            name: "birthdate",
            defaultValue: adultAge(),
            max: adultAge(),
        },
        feedback: "Write a valid phone number",
    },
    phone: {
        label: "Phone Number",
        control: {
            type: "tel",
            name: "phone",
            defaultValue: "",
        },
        feedback: "Write a valid phone number",
    },
};

export const common_selects = {
    country: {
        name: "country",
        defaultValue: "Choose a country",
        options: [],
    },
    city: {
        name: "city",
        defaultValue: "Choose a city",
        options: [],
    },
};
