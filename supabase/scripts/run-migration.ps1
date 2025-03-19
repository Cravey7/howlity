# Load environment variables
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $name = $matches[1]
            $value = $matches[2]
            Set-Item -Path "Env:$name" -Value $value
        }
    }
}

# Check if Supabase CLI is installed
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "Supabase CLI is not installed. Installing..."
    npm install -g supabase
}

# Check if user is logged in
try {
    supabase status | Out-Null
} catch {
    Write-Host "Please login to Supabase first:"
    supabase login
}

# Link project if not already linked
if (-not $env:SUPABASE_PROJECT_REF) {
    $project_ref = Read-Host "Please enter your Supabase project reference"
    supabase link --project-ref $project_ref
}

# Push the migration
Write-Host "Pushing migration..."
supabase db push

Write-Host "Migration complete!" 