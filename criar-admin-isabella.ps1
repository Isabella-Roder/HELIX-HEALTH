$ErrorActionPreference = "Stop"

$apiUrl = "http://localhost:8080"

Write-Host "=========================================="
Write-Host "Helix Health - Criar admin Isabella"
Write-Host "=========================================="
Write-Host ""
Write-Host "Antes de rodar, deixe o Spring Boot ligado em http://localhost:8080"
Write-Host ""

$paciente = @{
    nome = "Isabella"
    nomeSocial = "Isabella"
    cpf = "00000000000"
    telefone = "(00) 00000-0000"
    endereco = "Endereco de teste"
    convenio = "Particular"
    contatoEmergencia = "(00) 00000-0000"
    dataNascimento = "2000-01-01"
    sexo = "FEMININO"
    genero = "MULHER_TRANS"
}

Write-Host "Criando paciente Isabella..."
$pacienteSalvo = Invoke-RestMethod `
    -Uri "$apiUrl/pacientes/cadastrar" `
    -Method Post `
    -ContentType "application/json" `
    -Body ($paciente | ConvertTo-Json)

Write-Host "Paciente criada com ID: $($pacienteSalvo.id)"

$usuario = @{
    nome = "Isabella"
    nomeSocial = "Isabella"
    email = "isabella@helixhealth.com"
    senha = "123456"
    tipoUsuario = @("ADMIN", "PACIENTE")
    ativo = $true
    paciente = @{
        id = $pacienteSalvo.id
    }
    profissional = $null
}

Write-Host "Criando usuario admin..."
$usuarioSalvo = Invoke-RestMethod `
    -Uri "$apiUrl/usuarios/cadastrar" `
    -Method Post `
    -ContentType "application/json" `
    -Body ($usuario | ConvertTo-Json -Depth 4)

Write-Host ""
Write-Host "Pronto."
Write-Host "Email: $($usuarioSalvo.email)"
Write-Host "Senha: 123456"
Write-Host "Perfis: ADMIN e PACIENTE"
Write-Host ""
