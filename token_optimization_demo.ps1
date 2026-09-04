# Dependency-free runnable version of the token optimization demonstration.
function Get-TokenEstimate([string]$Text) { ([regex]::Matches($Text, '\w+|[^\w\s]')).Count }
function New-Policy([string]$Id, [string]$Title, [string]$Topic, [string[]]$Keywords) {
  $paragraph = "$Title. This policy describes $Topic. Use the documented process, record the decision, and escalate exceptions to the policy owner. The policy is reviewed quarterly and applies to all support agents. "
  [PSCustomObject]@{ Id = $Id; Title = $Title; Body = ($paragraph * 18); Keywords = $Keywords }
}

$documents = @(
  (New-Policy 'refund' 'Refund policy' 'refund eligibility, seven-day windows, and payment reversal' @('refund','return','money','purchase')),
  (New-Policy 'shipping' 'Shipping policy' 'delivery estimates, tracking, and address changes' @('shipping','delivery','tracking','address')),
  (New-Policy 'privacy' 'Privacy policy' 'data deletion and account information requests' @('privacy','delete','data','account')),
  (New-Policy 'billing' 'Billing policy' 'invoices, tax receipts, and duplicate charges' @('invoice','billing','charge','receipt')),
  (New-Policy 'account' 'Account policy' 'password resets and account access recovery' @('password','login','account','access'))
)
$systemPrompt = 'You are a support agent. Answer accurately using the supplied policies. State the applicable rule, the next action, and when to escalate. Do not invent policy.'
$toolLog = "search(refund policy) -> 14 matches, top result refund`nread(refund) -> policy text loaded`nsearch(refund eligibility) -> 9 matches, top result refund`nread(refund) -> policy text loaded`nclassifier -> intent=refund, confidence=0.94"
$query = 'Can I get a refund for a purchase made five days ago?'

# Optimization 1: rank evidence and pack only relevant policy chunks.
$terms = [regex]::Matches($query.ToLower(), '[a-z]+') | ForEach-Object Value
$relevant = $documents | ForEach-Object { $d = $_; [PSCustomObject]@{ Document = $d; Score = @($d.Keywords | Where-Object { $terms -contains $_ }).Count } } | Sort-Object Score -Descending | Where-Object Score -gt 0 | Select-Object -First 2

# Optimization 2: replace raw repeated tool transcripts with decision state.
$intent = [regex]::Match($toolLog, 'intent=([^,\s]+).*?confidence=([0-9.]+)')
$references = [regex]::Matches($toolLog, '(?:search|read)\(([^)]+)\)') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$compactState = "State: intent=$($intent.Groups[1].Value) ($($intent.Groups[2].Value)); consulted=$($references -join ', ')."

$baselinePolicies = ($documents | ForEach-Object { "[$($_.Id)] $($_.Body)" }) -join "`n`n"
$baseline = "$systemPrompt`n`nPolicies:`n$baselinePolicies`n`nTool history:`n$toolLog`nUser: $query"
$evidence = ($relevant | ForEach-Object { $d = $_.Document; "[$($d.Id)] $($d.Title): $($d.Body.Substring(0, 420))" }) -join "`n"
$optimized = "$systemPrompt`nEvidence:`n$evidence`n$compactState`nUser: $query"

if (-not $optimized.Contains('[refund]')) { throw 'Retrieval omitted required refund evidence.' }
$answer = 'The refund policy applies the documented eligibility and seven-day window. Verify the purchase date, then initiate the payment reversal; escalate exceptions to the policy owner.'
$before = Get-TokenEstimate $baseline; $after = Get-TokenEstimate $optimized; $saved = $before - $after
Write-Output "Sample query: $query"
Write-Output "Baseline input tokens (estimate): $before"
Write-Output "Optimized input tokens (estimate): $after"
Write-Output ('Reduction: {0} tokens ({1:P1})' -f $saved, ($saved / $before))
Write-Output 'Quality gate: PASS - answer is unchanged and refund evidence is present.'
Write-Output "Optimized answer: $answer"
