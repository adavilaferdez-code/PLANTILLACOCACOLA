import os
import json

# Parse the subagent's transcript to find the exact lists of products and prices
subagent_log = r"C:\Users\Adfgd\.gemini\antigravity\brain\fcd08138-6511-4f19-acfe-d619cd7dffcf\.system_generated\logs\transcript.jsonl"
output_path = r"C:\Users\Adfgd\.gemini\antigravity\scratch\cocacola-plantillas\subagent_prices.txt"

matches = []
if os.path.exists(subagent_log):
    with open(subagent_log, 'r', encoding='utf-8', errors='ignore') as f:
        for line_num, line in enumerate(f, 1):
            if "precio:" in line.lower() or "price:" in line.lower():
                try:
                    data = json.loads(line)
                    content = data.get("content", "")
                    tool_calls = data.get("tool_calls", [])
                    
                    matches.append(f"LINE {line_num} (content):\n{content}\n")
                    for tc in tool_calls:
                        matches.append(f"LINE {line_num} (tool_call {tc.get('name')}):\n{json.dumps(tc.get('args'), indent=2)}\n")
                except Exception as e:
                    matches.append(f"LINE {line_num} (parse error): {e}\n{line[:200]}\n")

with open(output_path, 'w', encoding='utf-8') as out_f:
    out_f.write("\n".join(matches))

print(f"Saved {len(matches)} matches to subagent_prices.txt")
