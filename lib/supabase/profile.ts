import { getSupabaseClient } from "./client"

export async function updateUserProfile(userId: string, profileData: any) {
  const supabase = getSupabaseClient()

  try {
    // First update the user metadata
    await supabase.auth.updateUser({
      data: profileData,
    })

    // Then update the profile in the profiles table
    const { error } = await supabase.from("profiles").update(profileData).eq("id", userId)

    if (error) {
      console.error("Error updating profile:", error)
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error in updateUserProfile:", error)
    return { success: false, error }
  }
}

export async function getUserProfile(userId: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      throw error
    }

    return { profile: data, error: null }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return { profile: null, error }
  }
}
