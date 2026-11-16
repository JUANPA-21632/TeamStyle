$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = if ($env:PORT) { [int]$env:PORT } else { 3000 }
$client = [System.Net.Sockets.TcpClient]::new()

try {
    $client.Connect('127.0.0.1', $port)
    Write-Output "TeamStyle ya funciona en http://localhost:$port"
    exit 0
}
catch {
    $node = Get-Command node.exe -ErrorAction Stop
    $stdout = Join-Path $projectRoot 'teamstyle-server.log'
    $stderr = Join-Path $projectRoot 'teamstyle-server-error.log'
    $pidFile = Join-Path $projectRoot ".teamstyle-server-$port.pid"
    $process = Start-Process -FilePath $node.Source -ArgumentList 'server.js' -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru
    Set-Content -Path $pidFile -Value $process.Id -Encoding ASCII
}
finally {
    $client.Dispose()
}

for ($attempt = 0; $attempt -lt 10; $attempt++) {
    Start-Sleep -Seconds 1
    $client = [System.Net.Sockets.TcpClient]::new()
    try {
        $client.Connect('127.0.0.1', $port)
        Write-Output "TeamStyle funciona en http://localhost:$port. Ya puedes cerrar esta ventana."
        exit 0
    }
    catch {
        if ($process.HasExited) {
            $errorLog = Join-Path $projectRoot 'teamstyle-server-error.log'
            if (Test-Path $errorLog) {
                Get-Content $errorLog -Tail 20
            }
            throw 'El servidor se cerró al iniciar. Revisa el mensaje anterior.'
        }
    }
    finally {
        $client.Dispose()
    }
}

throw "El servidor no respondió en el puerto $port. Revisa teamstyle-server-error.log."
