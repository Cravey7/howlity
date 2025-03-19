#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Installing..."
    npm install -g supabase
fi

# Check if user is logged in
if ! supabase status &> /dev/null; then
    echo "Please login to Supabase first:"
    supabase login
fi

# Link project if not already linked
if [ -z "$SUPABASE_PROJECT_REF" ]; then
    echo "Please enter your Supabase project reference:"
    read project_ref
    supabase link --project-ref $project_ref
fi

# Push the migration
echo "Pushing migration..."
supabase db push

echo "Migration complete!" 