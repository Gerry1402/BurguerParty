import supabase from "./supabase";

export const insertSupabase = async (table, list_json) => {
    const { data, error } = await supabase
        .from("events")
        .insert(list_json)
        .select();
    if (error) {
        console.log("Error: ", error);
    }
    else {
        console.log("Data: ", data);
    }
};

export const updateSupabase = async (table, json, id) => {
    const { data, error } = await supabase
        .from(table)
        .update(json)
        .eq('id', id)
        .select();
    if (error) {
        console.log("Error: ", error);
    }
    else {
        console.log("Data: ", data);
    }
}

export const deleteSupabase = async (table, id) => {
    const { errors } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
        .select();
    if (errors) {
        console.log("Error: ", errors);
    }
}
