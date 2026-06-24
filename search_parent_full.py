import os
import json

# Search parent's transcript_full.jsonl for OCR results or early prompts
parent_log_full = r"C:\Users\Adfgd\.gemini\antigravity\brain\aef82a9c-45f4-4a59-92da-4de7bf8b6550\.system_generated\logs\transcript_full.jsonl"
output_path = r"C:\Users\Adfgd\.gemini\antigravity\scratch\cocacola-plantillas\parent_ocr.txt"

matches = []
if os.path.exists(parent_log_full):
    with open(parent_log_full, 'r', encoding='utf-8', errors='ignore') as f:
        for line_num, line in enumerate(f, 1):
            # We look for files loaded or early planning steps
            if line_num <= 10 or "ocr" in line.lower() or "extracted" in line.lower() or "excel" in line.lower():
                try:
                    data = json.loads(line)
                    step_index = data.get("step_index", 0)
                    content = data.get("content", "")
                    tool_calls = data.get("tool_calls", [])
                    
                    if content or tool_calls:
                        matches.append(f"STEP {step_index} (line {line_num}):\nContent snippet: {content[:400]}\n")
                        for tc in tool_calls:
                            matches.append(f"Tool call {tc.get('name')}:\n{json.dumps(tc.get('args'))[:400]}\n")
                except Exception as e:
                    pass

with open(output_path, 'w', encoding='utf-8') as out_f:
    out_f.write("\n".join(matches))

print(f"Saved {len(matches)} matches to parent_ocr.txt")
