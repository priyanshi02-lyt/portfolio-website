"""Runnable demonstration of agent-context token/cost optimizations.

The example intentionally uses a deterministic, dependency-free token estimator so
the result can be run anywhere. Replace estimate_tokens() with your model
provider's tokenizer in production.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Iterable


def estimate_tokens(text: str) -> int:
    """Conservative word/punctuation token estimate for a portable demo."""
    return len(re.findall(r"\w+|[^\w\s]", text))


@dataclass(frozen=True)
class Document:
    id: str
    title: str
    body: str
    keywords: tuple[str, ...]


def make_document(id: str, title: str, topic: str, keywords: Iterable[str]) -> Document:
    # Repetition makes the contrast clear while retaining a realistic policy shape.
    body = (
        f"{title}. This policy describes {topic}. "
        "Use the documented process, record the decision, and escalate exceptions to the policy owner. "
        "The policy is reviewed quarterly and applies to all support agents. "
    ) * 18
    return Document(id, title, body, tuple(keywords))


DOCUMENTS = (
    make_document("refund", "Refund policy", "refund eligibility, seven-day windows, and payment reversal", ("refund", "return", "money", "purchase")),
    make_document("shipping", "Shipping policy", "delivery estimates, tracking, and address changes", ("shipping", "delivery", "tracking", "address")),
    make_document("privacy", "Privacy policy", "data deletion and account information requests", ("privacy", "delete", "data", "account")),
    make_document("billing", "Billing policy", "invoices, tax receipts, and duplicate charges", ("invoice", "billing", "charge", "receipt")),
    make_document("account", "Account policy", "password resets and account access recovery", ("password", "login", "account", "access")),
)

SYSTEM_PROMPT = """You are a support agent. Answer accurately using the supplied policies.
State the applicable rule, the next action, and when to escalate. Do not invent policy."""

TOOL_LOG = """search(refund policy) -> 14 matches, top result refund
read(refund) -> policy text loaded
search(refund eligibility) -> 9 matches, top result refund
read(refund) -> policy text loaded
classifier -> intent=refund, confidence=0.94
"""


def baseline_prompt(query: str) -> str:
    """Anti-pattern: every document and an unfiltered execution log are retained."""
    policies = "\n\n".join(f"[{d.id}] {d.body}" for d in DOCUMENTS)
    return f"{SYSTEM_PROMPT}\n\nPolicies:\n{policies}\n\nTool history:\n{TOOL_LOG}\nUser: {query}"


def retrieve_relevant(query: str, limit: int = 2) -> list[Document]:
    """Optimization 1: keyword retrieval sends only the best evidence chunks."""
    terms = set(re.findall(r"[a-z]+", query.lower()))
    ranked = sorted(DOCUMENTS, key=lambda d: sum(k in terms for k in d.keywords), reverse=True)
    return [d for d in ranked[:limit] if any(k in terms for k in d.keywords)]


def compact_tool_state(log: str) -> str:
    """Optimization 2: retain unique, decision-relevant state instead of raw logs."""
    intent = re.search(r"intent=([^,\s]+).*?confidence=([0-9.]+)", log)
    refs = sorted(set(re.findall(r"(?:search|read)\(([^)]+)\)", log)))
    intent_text = f"intent={intent.group(1)} ({intent.group(2)})" if intent else "intent=unknown"
    return f"State: {intent_text}; consulted={', '.join(refs)}."


def optimized_prompt(query: str) -> str:
    docs = retrieve_relevant(query)
    evidence = "\n".join(f"[{d.id}] {d.title}: {d.body[:420]}" for d in docs)
    return f"{SYSTEM_PROMPT}\nEvidence:\n{evidence}\n{compact_tool_state(TOOL_LOG)}\nUser: {query}"


def answer_from_context(prompt: str) -> str:
    """Minimal deterministic quality gate for this demo's sample query."""
    if "[refund]" not in prompt:
        return "I need the refund policy before I can answer accurately."
    return "The refund policy applies the documented eligibility and seven-day window. Verify the purchase date, then initiate the payment reversal; escalate exceptions to the policy owner."


def main() -> None:
    query = "Can I get a refund for a purchase made five days ago?"
    before, after = baseline_prompt(query), optimized_prompt(query)
    baseline_answer, optimized_answer = answer_from_context(before), answer_from_context(after)

    assert baseline_answer == optimized_answer, "Optimization changed the sample answer"
    assert "[refund]" in after, "Retrieval omitted required evidence"

    before_tokens, after_tokens = estimate_tokens(before), estimate_tokens(after)
    saved = before_tokens - after_tokens
    print("Sample query:", query)
    print(f"Baseline input tokens (estimate): {before_tokens:,}")
    print(f"Optimized input tokens (estimate): {after_tokens:,}")
    print(f"Reduction: {saved:,} tokens ({saved / before_tokens:.1%})")
    print("Quality gate: PASS — answer is unchanged and refund evidence is present.")
    print("Optimized answer:", optimized_answer)


if __name__ == "__main__":
    main()
