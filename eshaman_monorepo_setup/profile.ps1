########## PowerShell Profile: Unified Dev Env ##########

# --- Quality of life (optional but nice) ---
Set-PSReadLineOption -EditMode Windows
$ErrorActionPreference = "Stop"

# --- Ensure Git on PATH (if needed) ---
$gitPossible = "C:\Program Files\Git\bin"
if (Test-Path $gitPossible -and ($env:Path -notmatch [regex]::Escape($gitPossible))) {
  $env:Path = "$gitPossible;$env:Path"
}

# --- NVM for Windows (auto-use project Node if .nvmrc exists) ---
# Install nvm-windows normally (default: C:\Program Files\nvm) before using this.
$env:NVM_HOME  = "C:\Program Files\nvm"
$env:NVM_SYMLINK = "C:\Program Files\nodejs"
if (Test-Path $env:NVM_HOME -and ($env:Path -notmatch [regex]::Escape($env:NVM_HOME))) {
  $env:Path = "$env:NVM_HOME;$env:NVM_SYMLINK;$env:Path"
}

function Use-NodeVersionFromNvmrc {
  $root = Get-Location
  $here = $root
  while ($here -ne $null) {
    $nvmrc = Join-Path $here ".nvmrc"
    if (Test-Path $nvmrc) {
      $ver = (Get-Content $nvmrc | Select-Object -First 1).Trim()
      if ($ver) {
        try {
          $current = node --version 2>$null
        } catch { $current = "" }
        if (-not $current -or ($current -notmatch [regex]::Escape($ver))) {
          Write-Host "→ nvm use $ver" -ForegroundColor Cyan
          nvm use $ver | Out-Null
        }
      }
      break
    }
    $parent = Split-Path $here -Parent
    $here = if ($parent -ne $here) { $parent } else { $null }
  }
}

# Run it for the current directory on shell start
Use-NodeVersionFromNvmrc

# Hook into directory change so switching folders updates Node automatically
$ExecutionContext.SessionState.Path.GetLocation().Changed += {
  Use-NodeVersionFromNvmrc
}

# --- Corepack / pnpm setup (no global installer headaches) ---
# Prefer project-local pnpm via Corepack (Node 16.17+)
try { corepack enable 2>$null } catch {}
# In case PNPM_HOME is needed by some tools:
$env:PNPM_HOME = "$HOME\AppData\Local\pnpm"
if (!(Test-Path $env:PNPM_HOME)) { New-Item $env:PNPM_HOME -ItemType Directory -Force | Out-Null }
if ($env:Path -notmatch [regex]::Escape($env:PNPM_HOME)) {
  $env:Path = "$env:PNPM_HOME;$env:Path"
}

# --- Yarn modern (optional, also via corepack) ---
# try { corepack prepare yarn@stable --activate 2>$null } catch {}

# --- Node global bin (if you end up using npm -g anyway) ---
$nodeGlobal = "$HOME\AppData\Roaming\npm"
if (Test-Path $nodeGlobal -and ($env:Path -notmatch [regex]::Escape($nodeGlobal))) {
  $env:Path = "$nodeGlobal;$env:Path"
}

# --- Git sane defaults (safe on Windows) ---
git config --global core.autocrlf true
git config --global pull.rebase false
git config --global init.defaultBranch main

# --- Helper: print current toolchain summary (call Show-DevEnv) ---
function Show-DevEnv {
  Write-Host "Shell: $($PSVersionTable.PSVersion)" -ForegroundColor Green
  try { node -v } catch { Write-Host "Node: (not found)" -ForegroundColor Yellow }
  try { npm -v }  catch { Write-Host "npm:  (not found)" -ForegroundColor Yellow }
  try { pnpm -v } catch { Write-Host "pnpm: (not found)" -ForegroundColor Yellow }
  try { git --version } catch { Write-Host "Git:  (not found)" -ForegroundColor Yellow }
}
############################################################
