import { createClient } from "@supabase/supabase-js";

// Supabase
const URL = "https://cjnyzdjpfieyukiljajg.supabase.co"
const API_KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(URL, API_KEY)

// Mapbox

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

