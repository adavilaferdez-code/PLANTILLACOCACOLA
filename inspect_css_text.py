css_path = r"C:\Users\Adfgd\.gemini\antigravity\scratch\cocacola-plantillas\css\styles.css"

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Imprimir las primeras variables de root que controlan colores y fuentes
import re
root_match = re.search(r":root\s*\{([\s\S]*?)\}", content)
if root_match:
    print("Variables de :root:")
    print(root_match.group(1).strip())
else:
    print("No se encontró :root.")
