$apiUrl = "http://localhost:8080"

function New-RandomDigits($prefix) {
    return "$prefix$(Get-Random -Minimum 100000 -Maximum 999999)"
}

try {
    Invoke-RestMethod -Uri "$apiUrl/profissionais" -Method Get | Out-Null
} catch {
    Write-Host "Backend nao respondeu em $apiUrl"
    Write-Host "Rode o Spring Boot antes de executar este arquivo."
    exit 1
}

$random = Get-Random -Minimum 10000 -Maximum 99999
$emailPaciente = "paciente$random@email.com"
$senhaPaciente = "123456"

$profissionalBody = @{
    nome = "Dra Teste $random"
    nomeSocial = ""
    cpf = New-RandomDigits "456"
    telefone = "11977777777"
    email = "dra$random@email.com"
    tipoProfissional = "MEDICO"
    especialidadeProfissional = "CLINICO_GERAL"
    registroProfissional = "CRM$random"
    ativo = $true
} | ConvertTo-Json

$profissional = Invoke-RestMethod `
    -Uri "$apiUrl/profissionais/cadastrar" `
    -Method Post `
    -ContentType "application/json" `
    -Body $profissionalBody

$pacienteBody = @{
    nome = "Paciente Teste $random"
    nomeSocial = ""
    cpf = New-RandomDigits "987"
    telefone = "11999999999"
    endereco = "Rua Teste, 123"
    convenio = "Unimed"
    contatoEmergencia = "11988888888"
    dataNascimento = "2000-05-10"
    sexo = "FEMININO"
    genero = "MULHER_CIS"
    email = $emailPaciente
    senha = $senhaPaciente
} | ConvertTo-Json

$paciente = Invoke-RestMethod `
    -Uri "$apiUrl/pacientes/cadastrar-com-usuario" `
    -Method Post `
    -ContentType "application/json" `
    -Body $pacienteBody

$agendamentoBody = @{
    paciente = @{
        id = $paciente.id
    }
    profissional = @{
        id = $profissional.id
    }
    dataConsulta = "2026-07-23"
    horaConsulta = "10:30"
    statusAgendamento = "AGENDADO"
    observacao = "Consulta criada pelos dados de teste."
} | ConvertTo-Json -Depth 4

$agendamento = Invoke-RestMethod `
    -Uri "$apiUrl/agendamentos/cadastrar" `
    -Method Post `
    -ContentType "application/json" `
    -Body $agendamentoBody

Write-Host ""
Write-Host "Dados de teste criados com sucesso."
Write-Host "Profissional: $($profissional.nome) ID $($profissional.id)"
Write-Host "Paciente: $($paciente.nome) ID $($paciente.id)"
Write-Host "Agendamento ID: $($agendamento.id)"
Write-Host ""
Write-Host "Login do paciente:"
Write-Host "Email: $emailPaciente"
Write-Host "Senha: $senhaPaciente"
Write-Host ""
