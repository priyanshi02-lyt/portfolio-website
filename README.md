# Token/cost optimization — runnable submission

This is a dependency-free demonstration for an agent pipeline that sends roughly
100K input tokens per request. Run it with:

```powershell
powershell -ExecutionPolicy Bypass -File .\token_optimization_demo.ps1
```

## What was implemented

1. **Retrieval + context packing.** The baseline includes every policy. The
   optimized pipeline ranks policies using the query and includes only the
   top relevant evidence, clipped to the amount needed for the answer.
   *Quality tradeoff:* a weak retriever can omit evidence. Mitigate with hybrid
   retrieval, a minimum score threshold, citations, and a fallback retrieval
   pass when confidence is low.

2. **Tool/state compaction and deduplication.** The baseline preserves raw tool
   transcripts (including repeated searches/reads). The optimized path retains
   only the intent, confidence, and unique consulted references.
   *Quality tradeoff:* compact state can lose forensic detail. Keep full logs
   outside the model context with a pointer/id and expand them only when needed.

## Sample result

The PowerShell script measures the exact strings it constructs using a portable regex token
estimate (not a provider tokenizer). It also checks that the optimized prompt
contains the required refund evidence and produces the same deterministic answer
as the baseline.

For production, replace `Get-TokenEstimate` with the tokenizer for the chosen
model and run the same comparison over a representative, labelled evaluation
set. Gate deployment on answer quality (e.g. grounded-answer score and task
success rate) as well as token reduction.

The demo data is deliberately small; the percentage reduction is the meaningful
result. At 100K baseline tokens/query, applying the observed percentage would
bring the average request to approximately `100,000 × (1 − reduction)` tokens.
