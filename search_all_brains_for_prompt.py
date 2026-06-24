import os
import json

brain_dir = r"C:\Users\Adfgd\.gemini\antigravity\brain"
output_path = r"C:\Users\Adfgd\.gemini\antigravity\scratch\cocacola-plantillas\untruncated_original_prompt_found.txt"

found = False

for folder in os.listdir(brain_dir):
    # Omitimos la sesión actual porque sabemos que está recortada
    if folder == "aef82a9c-45f4-4a59-92da-4de7bf8b6550":
        continue
        
    folder_path = os.path.join(brain_dir, folder)
    if not os.path.isdir(folder_path):
        continue
        
    logs_dir = os.path.join(folder_path, ".system_generated", "logs")
    if os.path.exists(logs_dir):
        for log_file in os.listdir(logs_dir):
            if log_file == "transcript_full.jsonl":
                full_path = os.path.join(logs_dir, log_file)
                try:
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as file_obj:
                        for line_num, line in enumerate(file_obj, 1):
                            if "Create the product data catalog" in line:
                                # Vamos a extraer el Prompt de aquí
                                idx = line.find('"Prompt":"')
                                if idx != -1:
                                    start = idx + 10
                                    # Buscamos el final de la cadena de escape del Prompt
                                    # Una forma rápida y robusta es leer los caracteres escapados
                                    prompt_chars = []
                                    escaped = False
                                    for char in line[start:]:
                                        if escaped:
                                            if char == 'n':
                                                prompt_chars.append('\n')
                                            elif char == 't':
                                                prompt_chars.append('\t')
                                            elif char == 'r':
                                                prompt_chars.append('\r')
                                            else:
                                                prompt_chars.append(char)
                                            escaped = False
                                        elif char == '\\':
                                            escaped = True
                                        elif char == '"':
                                            # Fin del string
                                            break
                                        else:
                                            prompt_chars.append(char)
                                            
                                    prompt_text = "".join(prompt_chars)
                                    if len(prompt_text) > 3000:
                                        with open(output_path, 'w', encoding='utf-8') as out_f:
                                            out_f.write(prompt_text)
                                        print(f"FOUND in session {folder} | FILE: {full_path} at line {line_num} (length {len(prompt_text)})")
                                        found = True
                                        break
                except Exception as e:
                    pass
            if found:
                break
    if found:
        break

if not found:
    print("Could not find untruncated prompt in any previous session logs.")
