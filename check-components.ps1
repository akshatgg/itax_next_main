$sourceDir = "src"
Write-Host "Checking components inside '$sourceDir'..." -ForegroundColor Cyan
$files = Get-ChildItem -Path $sourceDir -Recurse -Include *.js, *.jsx, *.ts, *.tsx


foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $errors = @()

    foreach ($line in $content) {
        if ($line -match 'import\s+.*\s+from\s+["' + "'" + ']([^"' + "'" + ']+)["' + "'" + ']') {
            $importPath = $matches[1]

            # Skip packages like react, next, axios, etc.
            if ($importPath -notmatch '^(react|next|axios|@|http|https|[a-zA-Z0-9_\-\.]+)$') {
                $resolvedPath = Join-Path $file.DirectoryName $importPath
                $componentExists = Test-Path "$resolvedPath.js" -or
                                   Test-Path "$resolvedPath.jsx" -or
                                   Test-Path "$resolvedPath.tsx" -or
                                   Test-Path "$resolvedPath/index.js" -or
                                   Test-Path "$resolvedPath/index.jsx" -or
                                   Test-Path "$resolvedPath/index.tsx"

                if (-not $componentExists) {
                    $errors += "Missing: '$importPath' in -> $($file.FullName)"
                }
            }
        }
    }

    if ($errors.Count -gt 0) {
        Write-Host "`n-------------------------" -ForegroundColor DarkGray
        Write-Host "File: $($file.FullName)" -ForegroundColor Yellow
        $errors | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    }
}
