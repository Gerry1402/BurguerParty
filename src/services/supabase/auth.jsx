import supabase from './supabase'

export const signUpSupabase = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({email, password});
    if (error) {
        console.log("Error: ", error);
        return null;
    }
    else{
        console.log("User: ", user);
        return user;
    }
};

export const signInSupabase = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({email, password});
    if (error) {
        console.log("Error: ", error);
        return null;
    } else{
        console.log("User: ", user);
        return user;
    }
};

export const getActualUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

