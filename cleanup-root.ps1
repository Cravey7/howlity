$ErrorActionPreference = "SilentlyContinue"

# Function to merge directories
function Merge-Directory {
    param (
        [string]$source,
        [string]$destination
    )
    
    if (Test-Path $source) {
        # Create destination if it doesn't exist
        if (-not (Test-Path $destination)) {
            New-Item -ItemType Directory -Force -Path $destination | Out-Null
        }
        
        # Copy all items from source to destination, overwriting only if newer
        Get-ChildItem -Path $source -Recurse | ForEach-Object {
            $destPath = $_.FullName.Replace($source, $destination)
            if ($_.PSIsContainer) {
                if (-not (Test-Path $destPath)) {
                    New-Item -ItemType Directory -Force -Path $destPath | Out-Null
                }
            }
            else {
                if (-not (Test-Path $destPath) -or 
                    (Get-Item $_.FullName).LastWriteTime -gt (Get-Item $destPath).LastWriteTime) {
                    Copy-Item $_.FullName -Destination $destPath -Force
                }
            }
        }
    }
}

# Directories to merge
$merges = @{
    "lib" = "devflow/lib"
    "components" = "devflow/app/components"
    "types" = "devflow/types"
    "supabase" = "devflow/supabase"
}

# Merge directories
foreach ($merge in $merges.GetEnumerator()) {
    Write-Host "Merging $($merge.Key) into $($merge.Value)..."
    Merge-Directory -source $merge.Key -destination $merge.Value
}

# Clean up redundant directories after merging
$toDelete = @(
    "app",
    "components",
    "lib",
    "types",
    "supabase",
    "node_modules",
    "package.json",
    "package-lock.json"
)

foreach ($dir in $toDelete) {
    if (Test-Path $dir) {
        Write-Host "Removing $dir..."
        Remove-Item -Path $dir -Force -Recurse
    }
}

Write-Host "Root directory cleanup completed." 