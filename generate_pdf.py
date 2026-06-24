# -*- coding: utf-8 -*-
"""
Coca-Cola European Partners - PDF Order Generator
Delegación Badajoz - Badajoz, España
Generated using ReportLab
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

def format_currency(val):
    if val == 0:
        return "0,00 €"
    s = f"{val:,.2f}"
    # Spanish format: dot for thousands, comma for decimals
    s = s.replace(',', 'TEMP').replace('.', ',').replace('TEMP', '.')
    return f"{s} €"

def format_discount(val, tipo="%"):
    if not val or val == 0:
        return "-"
    if tipo == "%":
        s = f"{val:,.1f}"
        s = s.replace('.', ',')
        return f"{s}%"
    else:
        return format_currency(val)

def draw_header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    
    # A4 dimensions: 595.27 x 841.89 points
    page_width, page_height = A4
    
    # 1. Header: Corporate red band (#E61A23) full width
    header_height = 50
    canvas_obj.setFillColor(colors.HexColor('#E61A23'))
    canvas_obj.rect(0, page_height - header_height, page_width, header_height, stroke=0, fill=1)
    
    # Text inside header
    canvas_obj.setFillColor(colors.white)
    canvas_obj.setFont("Helvetica-Bold", 14)
    canvas_obj.drawString(36, page_height - 32, "Coca-Cola European Partners")
    
    canvas_obj.setFont("Helvetica-Bold", 11)
    canvas_obj.drawRightString(page_width - 36, page_height - 30, "Delegación Badajoz")
    
    # 2. Footer: Centered light gray text
    canvas_obj.setFillColor(colors.HexColor('#777777'))
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.drawCentredString(page_width / 2.0, 25, "Coca-Cola European Partners · Delegación Badajoz · Documento generado automáticamente")
    
    canvas_obj.restoreState()

def build_pdf(filename="pedido.pdf", order_data=None):
    # Target path setup
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=70,  # Clear space for header
        bottomMargin=50 # Clear space for footer
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    normal_style = ParagraphStyle(
        'NormalCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor('#222222'),
        leading=11
    )
    
    bold_style = ParagraphStyle(
        'BoldCustom',
        parent=normal_style,
        fontName='Helvetica-Bold'
    )
    
    title_style = ParagraphStyle(
        'TitleCustom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        textColor=colors.HexColor('#E61A23'),
        spaceAfter=10,
        spaceBefore=15
    )
    
    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=normal_style,
        fontName='Helvetica-Bold',
        textColor=colors.white,
        alignment=0 # Left aligned by default
    )
    
    table_header_center = ParagraphStyle(
        'TableHeaderCenter',
        parent=table_header_style,
        alignment=1 # Centered
    )
    
    table_header_right = ParagraphStyle(
        'TableHeaderRight',
        parent=table_header_style,
        alignment=2 # Right aligned
    )

    story = []
    
    # 1. Spacer to push down content below top header
    story.append(Spacer(1, 10))
    
    # Extract order details from order_data or fallback
    if order_data is None:
        client_name = "Cafetería Plaza Badajoz"
        order_date = "14/06/2026"
        shipment_date = "15/06/2026"
        products = [
            {"sabor": "Coca-Cola Original", "formato": "-", "unidades": 10, "precio": 35.00, "descuento": 10.0, "descuento_tipo": "%", "uniCaja": 24},
            {"sabor": "Coca-Cola Zero", "formato": "-", "unidades": 6, "precio": 36.00, "descuento": 5.0, "descuento_tipo": "%", "uniCaja": 24},
            {"sabor": "Fanta Naranja", "formato": "-", "unidades": 4, "precio": 32.00, "descuento": 0.0, "descuento_tipo": "%", "uniCaja": 24},
            {"sabor": "Fanta Limón", "formato": "-", "unidades": 2, "precio": 32.00, "descuento": 0.0, "descuento_tipo": "%", "uniCaja": 24},
            {"sabor": "Sprite", "formato": "-", "unidades": 3, "precio": 33.00, "descuento": 6.0, "descuento_tipo": "%", "uniCaja": 24},
            {"sabor": "Aquabona", "formato": "-", "unidades": 5, "precio": 15.32, "descuento": 0.0, "descuento_tipo": "%", "uniCaja": 30},
            {"sabor": "Royal Bliss Tónica", "formato": "-", "unidades": 3, "precio": 31.82, "descuento": 8.0, "descuento_tipo": "%", "uniCaja": 24},
            {"sabor": "Monster Energy", "formato": "-", "unidades": 2, "precio": 56.16, "descuento": 5.0, "descuento_tipo": "%", "uniCaja": 24},
        ]
    else:
        client_name = order_data.get("clientName", "Cliente Genérico")
        order_date = order_data.get("effectiveDate", "14/06/2026")
        order_notes = order_data.get("orderNotes", "")
        products = order_data.get("products", [])
        
    # 2. Datos del pedido block
    # Organized as a premium styled box
    info_data = [
        [
            Paragraph(f"<b>Cliente:</b> {client_name}", normal_style),
            Paragraph(f"<b>Fecha:</b> {order_date}", normal_style)
        ],
        [
            Paragraph("<b>Delegación:</b> Badajoz", normal_style),
            Paragraph(f"<b>Notas:</b> <i>{order_notes}</i>" if order_notes else "", normal_style)
        ]
    ]
    
    # Total printable width is 595.27 - 72 = 523.27 points
    info_table = Table(info_data, colWidths=[261.6, 261.6])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8F9FA')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#E0E0E0')),
        ('INNERGRID', (0,0), (-1,-1), 0.25, colors.HexColor('#E5E5E5')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(info_table)
    
    # 3. Product table title
    story.append(Paragraph("DETALLE DEL PEDIDO (AGRUPADO POR SABOR)", title_style))
    
    # Prepare table headers
    # Columns: Producto, Formato, Unidades, Precio Unit., Descuento, Precio Neto, Subtotal
    headers = [
        Paragraph("Producto", table_header_style),
        Paragraph("Formato", table_header_center),
        Paragraph("Unidades", table_header_center),
        Paragraph("Precio Unit.", table_header_right),
        Paragraph("Descuento", table_header_center),
        Paragraph("Precio Neto", table_header_right),
        Paragraph("Subtotal", table_header_right)
    ]
    
    table_rows = [headers]
    
    # Helper styles for text/values alignment inside table cells
    cell_left = ParagraphStyle('CellLeft', parent=normal_style, alignment=0)
    cell_center = ParagraphStyle('CellCenter', parent=normal_style, alignment=1)
    cell_right = ParagraphStyle('CellRight', parent=normal_style, alignment=2)
    cell_bold_right = ParagraphStyle('CellBoldRight', parent=bold_style, alignment=2)
    
    total_cajas = 0
    total_unidades = 0
    total_bruta = 0
    total_neta = 0
    
    for p in products:
        unidades_caja = p["unidades"]
        total_cajas += unidades_caja
        total_unidades += unidades_caja * p["uniCaja"]
        
        bruta = unidades_caja * p["precio"]
        total_bruta += bruta
        
        # Calculate discount
        if p["descuento_tipo"] == "%":
            precio_neto = p["precio"] * (1 - p["descuento"] / 100)
        else:
            precio_neto = p["precio"] - p["descuento"]
            
        neta = unidades_caja * precio_neto
        total_neta += neta
        
        row = [
            Paragraph(p["sabor"], cell_left),
            Paragraph(p["formato"], cell_center),
            Paragraph(str(unidades_caja), cell_center),
            Paragraph(format_currency(p["precio"]), cell_right),
            Paragraph(format_discount(p["descuento"], p["descuento_tipo"]), cell_center),
            Paragraph(format_currency(precio_neto), cell_right),
            Paragraph(format_currency(neta), cell_bold_right)
        ]
        table_rows.append(row)
        
    # Column widths summing up exactly to 523 points
    col_widths = [183, 45, 50, 60, 55, 60, 70]
    
    prod_table = Table(table_rows, colWidths=col_widths)
    prod_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#E61A23')), # Corporate red header background
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#D3D3D3')),
        ('INNERGRID', (0,0), (-1,-1), 0.25, colors.HexColor('#E0E0E0')),
    ]))
    
    # Zebra striping for readability
    for i in range(1, len(table_rows)):
        bg_color = colors.HexColor('#FFFFFF') if i % 2 != 0 else colors.HexColor('#F8F9FA')
        prod_table.setStyle(TableStyle([
            ('BACKGROUND', (0, i), (-1, i), bg_color)
        ]))
        
    story.append(prod_table)
    
    story.append(Spacer(1, 20))
    
    # 5. Totales Table
    # Columns: CAJAS, UNIDADES, FACT. BRUTA, FACT. NETA
    totals_headers = [
        Paragraph("CAJAS", table_header_center),
        Paragraph("UNIDADES", table_header_center),
        Paragraph("FACT. BRUTA", table_header_center),
        Paragraph("FACT. NETA", table_header_center)
    ]
    
    totals_val_style = ParagraphStyle(
        'TotalsVal',
        parent=bold_style,
        textColor=colors.white,
        fontSize=10,
        alignment=1
    )
    
    totals_values = [
        Paragraph(str(total_cajas), totals_val_style),
        Paragraph(str(total_unidades), totals_val_style),
        Paragraph(format_currency(total_bruta), totals_val_style),
        Paragraph(format_currency(total_neta), totals_val_style)
    ]
    
    totals_data = [totals_headers, totals_values]
    
    # Width: Spans full page width (523pt)
    totals_table = Table(totals_data, colWidths=[120, 120, 140, 143])
    totals_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (2,1), colors.HexColor('#2C2C2C')), # Dark gray background for first 3 columns
        ('BACKGROUND', (3,0), (3,1), colors.HexColor('#E61A23')), # Corporate red background for last column (FACT. NETA)
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#444444')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#1C1C1C')),
    ]))
    
    story.append(totals_table)
    
    # Build doc
    doc.build(story, onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)

if __name__ == "__main__":
    import json
    order = None
    pdf_name = "pedido.pdf"
    
    if len(sys.argv) > 1:
        json_path = sys.argv[1]
        if os.path.exists(json_path):
            try:
                with open(json_path, 'r', encoding='utf-8') as f:
                    order = json.load(f)
                print(f"Loaded order data from {json_path}")
            except Exception as e:
                print(f"Error loading JSON file: {e}")
        else:
            print(f"JSON file not found: {json_path}")
            
    if len(sys.argv) > 2:
        pdf_name = sys.argv[2]
        
    build_pdf(pdf_name, order)
    print(f"PDF generated successfully as {pdf_name}")
