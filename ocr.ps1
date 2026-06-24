# PowerShell Script for Native Windows OCR on screenshots

$ErrorActionPreference = "Stop"

# Load necessary assemblies for WinRT and Drawing
[void][System.Reflection.Assembly]::LoadWithPartialName('System.Drawing')
try {
    [void][System.Reflection.Assembly]::Load('System.Runtime.WindowsRuntime, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089')
} catch {
    Write-Host "Could not load WindowsRuntime assembly, but we'll try to use WinRT namespaces anyway."
}

# Function to run OCR on an image file using Windows.Media.Ocr
function Get-OcrText($imagePath) {
    # Resolve absolute path
    $absPath = [System.IO.Path]::GetFullPath($imagePath)
    
    # We must run this in an async-compatible environment or use Task waiting since WinRT methods are Async
    $asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($absPath)
    while ($asyncOp.Status -eq "Started") { Start-Sleep -Milliseconds 10 }
    $file = $asyncOp.GetResults()
    
    $asyncOp2 = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
    while ($asyncOp2.Status -eq "Started") { Start-Sleep -Milliseconds 10 }
    $stream = $asyncOp2.GetResults()
    
    $asyncOp3 = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
    while ($asyncOp3.Status -eq "Started") { Start-Sleep -Milliseconds 10 }
    $decoder = $asyncOp3.GetResults()
    
    $asyncOp4 = $decoder.GetSoftwareBitmapAsync()
    while ($asyncOp4.Status -eq "Started") { Start-Sleep -Milliseconds 10 }
    $bitmap = $asyncOp4.GetResults()
    
    # Try Spanish language first, then default user language
    $lang = [Windows.Globalization.Language]::new("es-ES")
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
    if ($engine -eq $null) {
        $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    }
    
    if ($engine -eq $null) {
        throw "OCR Engine could not be created."
    }
    
    $asyncOp5 = $engine.RecognizeAsync($bitmap)
    while ($asyncOp5.Status -eq "Started") { Start-Sleep -Milliseconds 10 }
    $result = $asyncOp5.GetResults()
    
    return $result.Text
}

$brainDir = "C:\Users\Adfgd\.gemini\antigravity\brain\aef82a9c-45f4-4a59-92da-4de7bf8b6550"
$images = Get-ChildItem -Path $brainDir -Filter "media__*.png"
$output = ""

foreach ($img in $images) {
    Write-Host "Processing $($img.Name)..."
    try {
        $text = Get-OcrText $img.FullName
        $output += "=========================================`n"
        $output += "FILE: $($img.Name)`n"
        $output += "=========================================`n"
        $output += "$text`n`n"
    } catch {
        $output += "=========================================`n"
        $output += "FILE: $($img.Name) (ERROR)`n"
        $output += "=========================================`n"
        $output += "Error: $($_.Exception.Message)`n`n"
    }
}

$outputFile = "C:\Users\Adfgd\.gemini\antigravity\scratch\cocacola-plantillas\ocr_results.txt"
$output | Out-File -FilePath $outputFile -Encoding utf8
Write-Host "OCR process completed! Output written to $outputFile"
