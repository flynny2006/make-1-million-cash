# Mirror site/ → docs/ for GitHub Pages
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Remove-Item -Recurse -Force (Join-Path $root 'docs') -ErrorAction SilentlyContinue
Copy-Item -Recurse (Join-Path $root 'site') (Join-Path $root 'docs')
Write-Host 'Synced site -> docs. Commit and push to publish.'
