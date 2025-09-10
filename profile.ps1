########## PowerShell Profile: Unified Dev + API Keys ##########

# --- Basics ---
Set-PSReadLineOption -EditMode Windows
$ErrorActionPreference = "Stop"

# --- NVM + Node ---
$env:NVM_HOME  = "C:\Program Files\nvm"
$env:NVM_SYMLINK = "C:\Program Files\nodejs"
if (Test-Path $env:NVM_HOME -and ($env:Path -notmatch [regex]::Escape($env:NVM_HOME))) {
  $env:Path = "$env:NVM_HOME;$env:NVM_SYMLINK;$env:Path"
}

function Use-NodeVersionFromNvmrc {
  $here = Get-Location
  while ($here) {
    $nvmrc = Join-Path $here ".nvmrc"
    if (Test-Path $nvmrc) {
      $ver = (Get-Content $nvmrc | Select-Object -First 1).Trim()
      if ($ver) {
        try { $cur = node -v } catch { $cur = "" }
        if (-not $cur -or ($cur -notmatch [regex]::Escape($ver))) {
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
Use-NodeVersionFromNvmrc
$ExecutionContext.SessionState.Path.GetLocation().Changed += { Use-NodeVersionFromNvmrc }

# --- pnpm ---
try { corepack enable 2>$null } catch {}
$env:PNPM_HOME = "$HOME\AppData\Local\pnpm"
if (!(Test-Path $env:PNPM_HOME)) { New-Item $env:PNPM_HOME -ItemType Directory -Force | Out-Null }
if ($env:Path -notmatch [regex]::Escape($env:PNPM_HOME)) { $env:Path = "$env:PNPM_HOME;$env:Path" }

# --- API KEYS (replace with yours) ---
$env:OPENAI_API_KEY      = "sk-your-openai-key"           # Real OpenAI
$env:OPENROUTER_API_KEY  = "sk-or-your-openrouter-key"    # OpenRouter
$env:OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
$env:GEMINI_API_KEY      = "your-gemini-key"
$env:GOOGLE_API_KEY      = "your-gcp-key"
$env:CLAUDE_API_KEY      = "your-anthropic-key"
$env:GITHUB_TOKEN        = "your-github-pat"

# --- Helpers ---
function Use-Gemini    { $env:ACTIVE_AI="Gemini"; Write-Host "Gemini active" -ForegroundColor Cyan }
function Use-Claude    { $env:ACTIVE_AI="Claude"; Write-Host "Claude active" -ForegroundColor Cyan }
function Use-OpenAI    { $env:ACTIVE_AI="OpenAI"; Write-Host "OpenAI active" -ForegroundColor Cyan }
function Use-OpenRouter{ $env:ACTIVE_AI="OpenRouter"; Write-Host "OpenRouter active" -ForegroundColor Cyan }
function Use-GitHub    { $env:ACTIVE_AI="GitHub"; Write-Host "GitHub active" -ForegroundColor Cyan }

function Show-ApiKeys {
  $mask = { param($s) if (-not $s) { "<empty>" } elseif ($s.Length -le 8) { "****" } else { $s.Substring(0,4) + "****" + $s.Substring($s.Length-4,4) } }
  [pscustomobject]@{
    ACTIVE_AI         = $env:ACTIVE_AI
    OPENAI_API_KEY    = & $mask $env:OPENAI_API_KEY
    OPENROUTER_API_KEY= & $mask $env:OPENROUTER_API_KEY
    GEMINI_API_KEY    = & $mask $env:GEMINI_API_KEY
    GOOGLE_API_KEY    = & $mask $env:GOOGLE_API_KEY
    CLAUDE_API_KEY    = & $mask $env:CLAUDE_API_KEY
    GITHUB_TOKEN      = & $mask $env:GITHUB_TOKEN
    OPENROUTER_BASE_URL = $env:OPENROUTER_BASE_URL
  } | Format-List
}

########## END ##########
