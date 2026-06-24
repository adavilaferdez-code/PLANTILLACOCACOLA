import os
import json

brain_dir = r"C:\Users\Adfgd\.gemini\antigravity\brain"
conversations = os.listdir(brain_dir)

found_references = []

for conv in conversations:
    conv_path = os.path.join(brain_dir, conv)
    if not os.path.isdir(conv_path):
        continue
    
    logs_dir = os.path.join(conv_path, ".system_generated", "logs")
    if os.path.exists(logs_dir):
        for log_file in os.listdir(logs_dir):
            if log_file.endswith(".jsonl") or log_file.endswith(".log"):
                log_path = os.path.join(logs_dir, log_file)
                try:
                    with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
                        for line_num, line in enumerate(f, 1):
                            # We are looking for "vr237_cocacola" or price data matching cocacola vr237
                            if "vr237" in line.lower() or "25.44" in line or "25,44" in line:
                                found_references.append(f"CONV: {conv} | FILE: {log_file} | LINE: {line_num}\n{line}\n{'-'*50}\n")
                except Exception as e:
                    pass

output_path = r"C:\Users\Adfgd\.gemini\antigravity\scratch\cocacola-plantillas\search_results.txt"
with open(output_path, 'w', encoding='utf-8') as out_f:
    out_f.writelines(found_references)

print(f"Done! Found {len(found_references)} matching entries. Saved to search_results.txt")
