import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://evznarzuyatnlbgiinee.supabase.co"
    ,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2em5hcnp1eWF0bmxiZ2lpbmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDc5NDYsImV4cCI6MjA1OTkyMzk0Nn0.FDgdo8kEqR7aS4CmMIi_bx0cDk-b2BIsgF3gxiJnmR4")