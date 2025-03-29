import supabase from './supabase'

export const signUpSupabase = async (json) => {
    let { data, error } = await supabase.auth.signUp(json);
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log("Data: ", data);
    }
};

export const signInSupabase = async (json) => {
    let { data, error } = await supabase.auth.signInWithPassword(json);
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log("Data: ", data);
    }
};

export const getActualUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

