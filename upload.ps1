[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "智慧圖書館管理系統 - 上傳至 GitHub"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "   智慧圖書館管理系統 - 一鍵上傳至 GitHub" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "目標 GitHub 儲存庫: https://github.com/ming0823-maker/-.git" -ForegroundColor Yellow
Write-Host "本地分支: main" -ForegroundColor Yellow
Write-Host ""

$git = "$PSScriptRoot\git.cmd"

if (-not (Test-Path "$PSScriptRoot\.git")) {
    Write-Host "初始化本地 Git 儲存庫..." -ForegroundColor Gray
    & $git init
}

Write-Host "1. 正在檢查並打包最新程式碼..." -ForegroundColor Gray
& $git add .
& $git commit -m "update: 智慧圖書館管理系統最新版" 2>$null

Write-Host "2. 正在綁定遠端 GitHub 位址..." -ForegroundColor Gray
& $git branch -M main
& $git remote remove origin 2>$null
& $git remote add origin https://github.com/ming0823-maker/-.git

Write-Host ""
Write-Host "3. 請選擇推送驗證方式：" -ForegroundColor Cyan
Write-Host "   [1] 瀏覽器彈窗登入授權 (預設，直接按 Enter 即可)" -ForegroundColor White
Write-Host "   [2] 輸入 GitHub Personal Access Token (PAT)" -ForegroundColor White
Write-Host ""
$choice = Read-Host "請選擇 [預設 1]"

if ($choice -eq "2") {
    Write-Host ""
    $token = Read-Host "請輸入或貼上您的 GitHub Token (例如 ghp_xxxxxxxx)"
    if ($token) {
        Write-Host "正在使用 Token 推送至 GitHub..." -ForegroundColor Green
        & $git push "https://${token}@github.com/ming0823-maker/-.git" main --force
    } else {
        Write-Host "未輸入 Token，將改用瀏覽器登入授權..." -ForegroundColor Yellow
        & $git push -u origin main
    }
} else {
    Write-Host ""
    Write-Host "正在啟動瀏覽器登入授權，請在彈出的視窗中點擊「Sign in with your browser」進行授權..." -ForegroundColor Green
    & $git push -u origin main
}

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "---------------------------------------------------" -ForegroundColor Yellow
    Write-Host "⚠️ 若儲存庫已有 README 或授權被拒絕，是否嘗試強制覆蓋遠端？" -ForegroundColor Yellow
    Write-Host "---------------------------------------------------" -ForegroundColor Yellow
    $ans = Read-Host "請輸入 Y 確認強制覆蓋，或按 Enter 退出 [Y/N]"
    if ($ans -eq "Y" -or $ans -eq "y") {
        Write-Host "正在執行強制推送 (git push -u origin main --force)..." -ForegroundColor Magenta
        & $git push -u origin main --force
    }
}

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host "🎉 上傳成功！所有檔案已完整推送到 GitHub！" -ForegroundColor Green
    Write-Host "請重新整理您的 GitHub 頁面查看：" -ForegroundColor Green
    Write-Host "👉 https://github.com/ming0823-maker/-" -ForegroundColor Cyan
    Write-Host "===================================================" -ForegroundColor Green
} else {
    Write-Host "===================================================" -ForegroundColor Red
    Write-Host "❌ 上傳未完成。請確認您的 GitHub 帳號是否有此儲存庫的寫入權限。" -ForegroundColor Red
    Write-Host "===================================================" -ForegroundColor Red
}
