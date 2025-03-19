$ErrorActionPreference = "SilentlyContinue"

# Create necessary directories
$directories = @(
    "app/api/auth",
    "app/api/systems",
    "app/api/applications",
    "app/components/ui",
    "app/components/forms",
    "app/components/layout",
    "app/components/data-display",
    "app/components/modals",
    "app/dashboard/components",
    "app/applications/components",
    "app/systems/components",
    "app/marketing",
    "app/auth",
    "app/dashboard"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Move files from parenthesized directories to their proper locations
$moves = @{
    "(marketing)/*" = "app/marketing/"
    "(dashboard)/*" = "app/dashboard/"
    "(auth)/*" = "app/auth/"
}

foreach ($move in $moves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item -Path $move.Key -Destination $move.Value -Force
        Remove-Item -Path ($move.Key -replace "/\*$","") -Force -Recurse
    }
}

# Move marketing file to marketing directory if it exists
if (Test-Path "app/marketing") {
    Move-Item -Path "app/marketing" -Destination "app/marketing/page.tsx" -Force
}

# Clean up old directories
$oldDirs = @("(marketing)", "(dashboard)", "(auth)")
foreach ($dir in $oldDirs) {
    if (Test-Path "app/$dir") {
        Remove-Item -Path "app/$dir" -Force -Recurse
    }
}

# Move components to their proper locations
$componentMoves = @{
    "app/components/layout.tsx" = "app/components/layout/"
}

foreach ($move in $componentMoves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item -Path $move.Key -Destination $move.Value -Force
    }
}

# Create marketing directory and move file if needed
if (Test-Path "app/marketing") {
    if (-not (Test-Path "app/marketing/page.tsx") -and (Test-Path "app/marketing")) {
        $content = Get-Content "app/marketing"
        Set-Content "app/marketing/page.tsx" $content
        Remove-Item "app/marketing"
        New-Item -ItemType Directory -Force -Path "app/marketing" | Out-Null
    }
}

Write-Host "Directory cleanup completed." 