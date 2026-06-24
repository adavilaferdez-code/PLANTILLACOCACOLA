/* ============================================================
   COCA-COLA PLANTILLAS — Application Logic
   ============================================================
   Depends on data.js (must be loaded first)
   Provides: PRODUCT_CATALOG, PRODUCT_GROUPS globals
   ============================================================ */

// ---- Storage Keys ----
const STORAGE_KEY = 'cocacola_plantillas';
const AUTOSAVE_KEY = 'cocacola_autosave';

// ---- Globals for filtering ----
let activeGroup = 'all';
let searchQuery = '';

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', init);

function init() {
  setCurrentDate();
  updateLocation();
  renderAllCategories();
  setupEventListeners();
  setupKeypad();
  loadAutoSave();
  applyFilters();
  handleHeaderScroll();
  registerServiceWorker();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('Service Worker registrado con éxito');
        
        // Detect update and force page reload
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Nueva versión disponible, recargando página...');
                window.location.reload();
              }
            });
          }
        });
      })
      .catch(err => console.warn('Error al registrar Service Worker:', err));
  }
}

// ============================================================
// DATE MANAGEMENT
// ============================================================
function setCurrentDate() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formatted = now.toLocaleDateString('es-ES', options);
  // Capitalize first letter
  const dateStr = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  document.getElementById('currentDate').textContent = dateStr;

  const welcomeDateEl = document.getElementById('welcome-date');
  if (welcomeDateEl) welcomeDateEl.textContent = dateStr;

  // Set effective date to today
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  document.getElementById('effectiveDate').value = `${yyyy}-${mm}-${dd}`;
}

// ============================================================
// RENDERING
// ============================================================
function renderAllCategories() {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  // Group categories by their group field
  const groupOrder = [];
  const groupedCats = {};

  PRODUCT_CATALOG.forEach(cat => {
    const g = cat.group || 'other';
    if (!groupedCats[g]) {
      groupedCats[g] = [];
      groupOrder.push(g);
    }
    groupedCats[g].push(cat);
  });

  // Render each group
  groupOrder.forEach(groupKey => {
    const groupInfo = PRODUCT_GROUPS[groupKey];
    if (groupInfo) {
      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      groupHeader.setAttribute('data-group', groupKey);
      groupHeader.style.setProperty('--group-color', groupInfo.color);
      groupHeader.innerHTML = groupInfo.icon ? `<span>${groupInfo.icon}</span> ${groupInfo.name}` : groupInfo.name;
      container.appendChild(groupHeader);
    }

    groupedCats[groupKey].forEach(cat => {
      container.appendChild(renderCategory(cat));
    });
  });
}

function renderCategory(cat) {
  const section = document.createElement('section');
  section.className = 'category-section fade-in';
  section.setAttribute('data-group', cat.group);
  section.setAttribute('data-cat', cat.id);

  // Comprobar si esta categoría tiene productos con descuento en euros habilitado
  const showDtoEurCol = cat.products.some(p => hasEuroDiscount(p, cat));

  // Build product rows
  let rowsHTML = '';
  cat.products.forEach(p => {
    const isEligible = hasEuroDiscount(p, cat);
    let dtoEurHTML = '';
    
    if (showDtoEurCol) {
      if (isEligible) {
        dtoEurHTML = `
          <td class="input-cell" data-label="Dto €">
            <input type="text" id="dtoeur-${p.id}" class="dtoeur-input" value=""
                   inputmode="none" placeholder="0 €"
                   onfocus="showKeypad(this)"
                   oninput="onInputChange('${p.id}','${cat.id}')">
          </td>`;
      } else {
        dtoEurHTML = `<td class="input-cell disabled-cell" data-label="Dto €">-</td>`;
      }
    }

    rowsHTML += `
      <tr id="row-${p.id}" data-product="${p.id}">
        <td class="marca-cell" data-label="Marca">
          <div style="font-weight: 600;">${p.marca}</div>
        </td>
        <td class="center" data-label="Ud/Caja">${p.uniCaja}</td>
        <td class="center" data-label="Precio">${formatCurrency(p.precio)}</td>
        <td class="input-cell" data-label="Cajas">
          <div class="stepper-container">
            <input type="text" id="qty-${p.id}" class="qty-input" value=""
                   inputmode="none" placeholder="0"
                   onfocus="showKeypad(this)"
                   oninput="onInputChange('${p.id}','${cat.id}')">
            <div class="stepper-controls">
              <button type="button" class="stepper-btn btn-minus" onclick="adjustQty('${p.id}','${cat.id}',-1)">−</button>
              <button type="button" class="stepper-btn btn-plus" onclick="adjustQty('${p.id}','${cat.id}',1)">+</button>
            </div>
          </div>
        </td>
        ${dtoEurHTML}
        <td class="input-cell" data-label="% Dto">
          <input type="text" id="dto-${p.id}" class="dto-input" value=""
                 inputmode="none" placeholder="0"
                 onfocus="showKeypad(this)"
                 oninput="onInputChange('${p.id}','${cat.id}')">
        </td>
        <td class="calc-cell" data-label="F. Bruta" id="bruta-${p.id}">-</td>
        <td class="calc-cell neta-cell" data-label="F. Neta" id="neta-${p.id}">-</td>
        <td class="calc-cell netocaja-cell" data-label="Neto/Caja" id="netocaja-${p.id}">-</td>
      </tr>`;
  });

  let headerDtoEurHTML = showDtoEurCol ? '<th class="input-col">Dto €</th>' : '';

  section.innerHTML = `
    <div class="category-header" style="--cat-color: ${cat.color}" onclick="toggleCategory('${cat.id}')">
      <div class="category-title">
        <span class="cat-name">${cat.name}</span>
        <span class="cat-count" id="cat-count-${cat.id}">0 productos</span>
      </div>
      <div class="category-right">
        <span class="cat-total" id="cat-total-${cat.id}">0,00 €</span>
        <span class="chevron" id="chevron-${cat.id}">▸</span>
      </div>
    </div>
    <div class="category-body" id="cat-body-${cat.id}">
      <table class="product-table">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Ud/Caja</th>
            <th>Precio</th>
            <th class="input-col">Cajas</th>
            ${headerDtoEurHTML}
            <th class="input-col">% Dto</th>
            <th>F. Bruta</th>
            <th>F. Neta</th>
            <th>Neto/Caja</th>
          </tr>
        </thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    </div>`;

  return section;
}

// ============================================================
// CATEGORY TOGGLE
// ============================================================
function toggleCategory(catId) {
  const body = document.getElementById('cat-body-' + catId);
  const chevron = document.getElementById('chevron-' + catId);
  if (!body || !chevron) return;
  body.classList.toggle('expanded');
  chevron.classList.toggle('rotated');
}

// ============================================================
// CALCULATIONS
// ============================================================
function onInputChange(productId, catId) {
  const qtyInput = document.getElementById('qty-' + productId);
  const dtoInput = document.getElementById('dto-' + productId);
  const dtoEurInput = document.getElementById('dtoeur-' + productId);
  
  const qty = parseFloat(qtyInput.value) || 0;
  const dto = parseFloat(dtoInput.value) || 0;
  const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;

  const product = findProduct(productId);
  if (!product) return;

  // Calcular aplicando primero el % Dto al precio de tarifa, y luego restando el Dto €
  const bruta = qty * product.precio;
  const precioConDtoPct = product.precio * (1 - dto / 100);
  const netoCaja = precioConDtoPct - dtoEur;
  const neta = qty * netoCaja;

  // Update display
  const brutaEl = document.getElementById('bruta-' + productId);
  const netaEl = document.getElementById('neta-' + productId);
  const netoCajaEl = document.getElementById('netocaja-' + productId);

  brutaEl.textContent = qty !== 0 ? formatCurrency(bruta) : '-';
  netaEl.textContent = qty !== 0 ? formatCurrency(neta) : '-';
  netoCajaEl.textContent = qty !== 0 ? formatCurrency(netoCaja) : '-';

  // Toggle has-value class for styling
  brutaEl.classList.toggle('has-value', qty !== 0);
  netaEl.classList.toggle('has-value', qty !== 0);
  netoCajaEl.classList.toggle('has-value', qty !== 0);

  // Highlight active row
  const row = document.getElementById('row-' + productId);
  if (row) row.classList.toggle('active-row', qty !== 0);

  // Update totals
  updateCategoryTotal(catId);
  updateGlobalTotals();

  // Auto-save
  autoSave();
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function findProduct(productId) {
  for (const cat of PRODUCT_CATALOG) {
    for (const p of cat.products) {
      if (p.id === productId) return p;
    }
  }
  return null;
}

function formatCurrency(value) {
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' €';
}

function updateCategoryTotal(catId) {
  const category = PRODUCT_CATALOG.find(c => c.id === catId);
  if (!category) return;

  let total = 0;
  let count = 0;

  category.products.forEach(p => {
    const qty = parseFloat(document.getElementById('qty-' + p.id)?.value) || 0;
    const dto = parseFloat(document.getElementById('dto-' + p.id)?.value) || 0;
    const dtoEurInput = document.getElementById('dtoeur-' + p.id);
    const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;
    
    if (qty !== 0) {
      const precioConDtoPct = p.precio * (1 - dto / 100);
      const netoCaja = precioConDtoPct - dtoEur;
      total += qty * netoCaja;
      count++;
    }
  });

  const totalEl = document.getElementById('cat-total-' + catId);
  const countEl = document.getElementById('cat-count-' + catId);

  if (totalEl) {
    const newText = total !== 0 ? formatCurrency(total) : '0,00 €';
    if (totalEl.textContent !== newText) {
      totalEl.textContent = newText;
      totalEl.classList.add('pulse');
      setTimeout(() => totalEl.classList.remove('pulse'), 300);
    }
  }
  if (countEl) {
    countEl.textContent = count + ' producto' + (count !== 1 ? 's' : '');
  }
}

function updateGlobalTotals() {
  let totalCajas = 0;
  let totalUnidades = 0;
  let totalBruta = 0;
  let totalNeta = 0;

  PRODUCT_CATALOG.forEach(cat => {
    cat.products.forEach(p => {
      const qty = parseFloat(document.getElementById('qty-' + p.id)?.value) || 0;
      const dto = parseFloat(document.getElementById('dto-' + p.id)?.value) || 0;
      const dtoEurInput = document.getElementById('dtoeur-' + p.id);
      const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;
      
      if (qty !== 0) {
        totalCajas += qty;
        totalUnidades += qty * p.uniCaja;
        const bruta = qty * p.precio;
        totalBruta += bruta;
        
        const precioConDtoPct = p.precio * (1 - dto / 100);
        const netoCaja = precioConDtoPct - dtoEur;
        totalNeta += qty * netoCaja;
      }
    });
  });

  const els = {
    totalCajas: document.getElementById('totalCajas'),
    totalUnidades: document.getElementById('totalUnidades'),
    totalBruta: document.getElementById('totalBruta'),
    totalNeta: document.getElementById('totalNeta')
  };

  const newValues = {
    totalCajas: totalCajas.toLocaleString('es-ES'),
    totalUnidades: totalUnidades.toLocaleString('es-ES'),
    totalBruta: formatCurrency(totalBruta),
    totalNeta: formatCurrency(totalNeta)
  };

  Object.keys(els).forEach(key => {
    if (els[key] && els[key].textContent !== newValues[key]) {
      els[key].textContent = newValues[key];
      els[key].classList.add('pulse');
      setTimeout(() => els[key].classList.remove('pulse'), 300);
    }
  });

  // Actualizar la cabecera resumen
  updateHeaderSummary();
}

// ============================================================
// WHATSAPP SHARING
// ============================================================
function shareWhatsApp() {
  const clientName = document.getElementById('clientName').value || 'Sin nombre';
  const date = document.getElementById('effectiveDate').value || new Date().toLocaleDateString('es-ES');

  let message = `📋 *PEDIDO - ${clientName.toUpperCase()}*\n`;
  message += `📅 Fecha: ${date}\n`;
  message += `━━━━━━━━━━━━━━━━━━\n\n`;

  let currentGroup = '';
  let hasProducts = false;

  PRODUCT_CATALOG.forEach(cat => {
    let catHasProducts = false;
    let catText = '';

    cat.products.forEach(p => {
      const qty = parseFloat(document.getElementById('qty-' + p.id)?.value) || 0;
      if (qty !== 0) {
        if (!catHasProducts) {
          // Add group header if new group
          if (cat.group !== currentGroup) {
            currentGroup = cat.group;
            const groupInfo = PRODUCT_GROUPS[cat.group];
            if (groupInfo) {
              const groupIconPrefix = groupInfo.icon ? `${groupInfo.icon} ` : '';
              message += `${groupIconPrefix}*${groupInfo.name}*\n\n`;
            }
          }
          catText += `▪️ *${cat.name}*\n`;
          catHasProducts = true;
          hasProducts = true;
        }
        const dto = parseFloat(document.getElementById('dto-' + p.id)?.value) || 0;
        const dtoEurInput = document.getElementById('dtoeur-' + p.id);
        const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;
        
        const precioConDtoPct = p.precio * (1 - dto / 100);
        const netoCaja = precioConDtoPct - dtoEur;
        const neta = qty * netoCaja;
        
        catText += `  ${p.marca}: ${qty} cajas`;
        let dtosText = [];
        if (dto > 0) dtosText.push(`-${dto}%`);
        if (dtoEur > 0) dtosText.push(`-${dtoEur}€/cj`);
        if (dtosText.length > 0) catText += ` (${dtosText.join(' ')})`;
        catText += ` → ${formatCurrency(neta)}\n`;
      }
    });

    if (catHasProducts) {
      message += catText + '\n';
    }
  });

  if (!hasProducts) {
    alert('No hay productos en el pedido. Introduce al menos un producto.');
    return;
  }

  // Add totals
  message += `━━━━━━━━━━━━━━━━━━\n`;
  message += `📊 *TOTALES*\n`;
  message += `Cajas: ${document.getElementById('totalCajas').textContent}\n`;
  message += `Unidades: ${document.getElementById('totalUnidades').textContent}\n`;
  message += `Fact. Bruta: ${document.getElementById('totalBruta').textContent}\n`;
  message += `*Fact. Neta: ${document.getElementById('totalNeta').textContent}*\n`;

  const notes = document.getElementById('orderNotes').value.trim();
  if (notes) {
    message += `\n📝 *Notas:* ${notes}\n`;
  }
  message += `\n✍️ *Antonio Dávila D.M. 607075531*`;

  const url = 'https://wa.me/?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
}

// ============================================================
// EMAIL SHARING (PROSPECTUS EMAIL)
// ============================================================
function shareEmail() {
  const clientName = document.getElementById('clientName').value || 'Sin nombre';
  const date = document.getElementById('effectiveDate').value || new Date().toLocaleDateString('es-ES');
  
  // Custom padding helper functions
  const padRight = (str, len) => str.padEnd(len, ' ');
  const padLeft = (str, len) => str.padStart(len, ' ');
  const padCenter = (str, len) => {
    str = String(str);
    const totalPadding = len - str.length;
    if (totalPadding <= 0) return str;
    const padLeftCount = Math.floor(totalPadding / 2);
    const padRightCount = totalPadding - padLeftCount;
    return ' '.repeat(padLeftCount) + str + ' '.repeat(padRightCount);
  };

  const subject = `Propuesta de Pedido - ${clientName.toUpperCase()}`;
  let body = `📋 PROPUESTA DE PEDIDO - ${clientName.toUpperCase()}\n`;
  body += `Fecha pedido: ${date}\n`;
  body += `Delegación: Badajoz\n`;
  body += `==================================================\n\n`;
  
  body += `DETALLE DEL PEDIDO (AGRUPADO POR SABOR):\n`;
  body += '┌' + '─'.repeat(24) + '┬' + '─'.repeat(7) + '┬' + '─'.repeat(8) + '┬' + '─'.repeat(11) + '┬' + '─'.repeat(11) + '┐\n';
  body += '│ ' + padRight('SABOR', 22) + ' │ ' + padCenter('CAJAS', 5) + ' │ ' + padCenter('DTO', 6) + ' │ ' + padCenter('NETO/CJ', 9) + ' │ ' + padCenter('SUBTOTAL', 9) + ' │\n';
  body += '├' + '─'.repeat(24) + '┼' + '─'.repeat(7) + '┼' + '─'.repeat(8) + '┼' + '─'.repeat(11) + '┼' + '─'.repeat(11) + '┤\n';

  let hasProducts = false;
  
  PRODUCT_CATALOG.forEach(cat => {
    cat.products.forEach(p => {
      const qty = parseFloat(document.getElementById('qty-' + p.id)?.value) || 0;
      if (qty !== 0) {
        hasProducts = true;
        const dto = parseFloat(document.getElementById('dto-' + p.id)?.value) || 0;
        const dtoEurInput = document.getElementById('dtoeur-' + p.id);
        const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;
        
        const precioConDtoPct = p.precio * (1 - dto / 100);
        const netoCaja = precioConDtoPct - dtoEur;
        const neta = qty * netoCaja;
        
        let dtosText = [];
        if (dto > 0) dtosText.push(`${dto}%`);
        if (dtoEur > 0) dtosText.push(`${dtoEur}€`);
        let dtoStr = dtosText.length > 0 ? dtosText.join('+') : '-';
        
        // Truncate brand name to fit in column
        let brandName = p.marca;
        if (brandName.length > 22) brandName = brandName.substring(0, 19) + '...';
        
        body += '│ ' + padRight(brandName, 22) + ' │ ' + padCenter(qty, 5) + ' │ ' + padCenter(dtoStr, 6) + ' │ ' + padLeft(formatCurrency(netoCaja), 9) + ' │ ' + padLeft(formatCurrency(neta), 9) + ' │\n';
      }
    });
  });
  
  body += '└' + '─'.repeat(24) + '┴' + '─'.repeat(7) + '┴' + '─'.repeat(8) + '┴' + '─'.repeat(11) + '┴' + '─'.repeat(11) + '┘\n\n';

  if (!hasProducts) {
    alert('No hay productos en el pedido. Introduce al menos un producto.');
    return;
  }
  
  const totalCajas = document.getElementById('totalCajas').textContent;
  const totalUnidades = document.getElementById('totalUnidades').textContent;
  const totalBruta = document.getElementById('totalBruta').textContent;
  const totalNeta = document.getElementById('totalNeta').textContent;

  body += `RESUMEN DE FACTURACIÓN:\n`;
  body += '┌' + '─'.repeat(16) + '┬' + '─'.repeat(16) + '┬' + '─'.repeat(15) + '┬' + '─'.repeat(14) + '┐\n';
  body += '│ ' + padCenter('TOTAL CAJAS', 14) + ' │ ' + padCenter('TOTAL UNIDADES', 14) + ' │ ' + padCenter('FACT. BRUTA', 13) + ' │ ' + padCenter('FACT. NETA', 12) + ' │\n';
  body += '├' + '─'.repeat(16) + '┼' + '─'.repeat(16) + '┼' + '─'.repeat(15) + '┼' + '─'.repeat(14) + '┤\n';
  body += '│ ' + padCenter(totalCajas, 14) + ' │ ' + padCenter(totalUnidades, 14) + ' │ ' + padLeft(totalBruta, 13) + ' │ ' + padLeft(totalNeta, 12) + ' │\n';
  body += '└' + '─'.repeat(16) + '┴' + '─'.repeat(16) + '┴' + '─'.repeat(15) + '┴' + '─'.repeat(14) + '┘\n\n';

  body += `Atentamente,\n`;
  body += `Antonio Dávila D.M. - 607075531\n`;
  body += `Coca-Cola European Partners - Delegación Badajoz`;
  
  // Copiar propuesta al portapapeles automáticamente
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(body)
      .then(() => {
        showToast('📋 ¡Propuesta copiada! Ya puedes abrir tu correo y pegarla.');
      })
      .catch((err) => {
        showToast('❌ Error al copiar. Por favor, inténtalo de nuevo.');
      });
  } else {
    showToast('❌ Tu navegador no soporta el copiado automático.');
  }
}


// ============================================================
// SAVE / LOAD (localStorage)
// ============================================================
function getState() {
  const notesEl = document.getElementById('orderNotes');
  const state = {
    clientName: document.getElementById('clientName').value,
    effectiveDate: document.getElementById('effectiveDate').value,
    orderNotes: notesEl ? notesEl.value : '',
    products: {}
  };
  PRODUCT_CATALOG.forEach(cat => {
    cat.products.forEach(p => {
      const qty = parseFloat(document.getElementById('qty-' + p.id)?.value) || 0;
      const dto = parseFloat(document.getElementById('dto-' + p.id)?.value) || 0;
      const dtoEurInput = document.getElementById('dtoeur-' + p.id);
      const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;
      if (qty !== 0 || dto > 0 || dtoEur > 0) {
        state.products[p.id] = { qty, dto, dtoEur };
      }
    });
  });
  return state;
}

function loadState(state) {
  if (state.clientName) {
    document.getElementById('clientName').value = state.clientName;
  }
  if (state.effectiveDate) {
    document.getElementById('effectiveDate').value = state.effectiveDate;
  }
  const notesEl = document.getElementById('orderNotes');
  if (notesEl && state.orderNotes !== undefined) {
    notesEl.value = state.orderNotes;
  }
  if (state.products) {
    // Si estamos cargando datos, transicionar al catálogo
    const dashView = document.getElementById('dashboard-view');
    const catalogView = document.getElementById('catalog-view');
    if (dashView && catalogView && catalogView.classList.contains('hidden')) {
      dashView.style.display = 'none';
      catalogView.classList.remove('hidden');
      window.scrollTo(0, 0);
    }

    Object.entries(state.products).forEach(([id, data]) => {
      const qtyInput = document.getElementById('qty-' + id);
      const dtoInput = document.getElementById('dto-' + id);
      const dtoEurInput = document.getElementById('dtoeur-' + id);
      if (qtyInput && data.qty !== undefined) qtyInput.value = data.qty;
      if (dtoInput && data.dto !== undefined) dtoInput.value = data.dto;
      if (dtoEurInput && data.dtoEur !== undefined) dtoEurInput.value = data.dtoEur;
      // Find category and trigger calculation
      const cat = PRODUCT_CATALOG.find(c => c.products.some(p => p.id === id));
      if (cat) {
        onInputChange(id, cat.id);
        // Expandir automáticamente la categoría si el producto cargado tiene cantidad > 0
        if (data.qty && parseFloat(data.qty) > 0) {
          const body = document.getElementById('cat-body-' + cat.id);
          const chevron = document.getElementById('chevron-' + cat.id);
          if (body && !body.classList.contains('expanded')) {
            body.classList.add('expanded');
            if (chevron) chevron.classList.add('rotated');
          }
        }
      }
    });
  }
}

function autoSave() {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(getState()));
  } catch (e) {
    // Storage full or unavailable
  }
}

function loadAutoSave() {
  try {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      loadState(JSON.parse(saved));
    }
  } catch (e) {
    // Invalid data, ignore
  }
}

function saveTemplate() {
  const state = getState();
  const name = state.clientName || 'Sin nombre';
  const timestamp = new Date().toISOString();
  const key = name + '_' + timestamp;

  let templates = {};
  try {
    templates = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    templates = {};
  }

  templates[key] = {
    ...state,
    savedAt: timestamp,
    label: name + ' - ' + new Date().toLocaleDateString('es-ES')
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    showToast('✅ Plantilla guardada: ' + name);
  } catch (e) {
    showToast('❌ Error al guardar');
  }
}

function showLoadModal() {
  const modalFooter = document.getElementById('modal-footer');
  if (modalFooter) modalFooter.classList.remove('hidden');
  let templates = {};
  try {
    templates = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    templates = {};
  }

  const entries = Object.entries(templates).sort((a, b) =>
    b[1].savedAt.localeCompare(a[1].savedAt)
  );

  const body = document.getElementById('modal-body');
  document.getElementById('modal-title').textContent = 'Plantillas Guardadas';

  if (entries.length === 0) {
    body.innerHTML = '<p class="modal-empty">No hay plantillas guardadas</p>';
  } else {
    body.innerHTML = entries.map(([key, data]) => {
      const safeKey = key.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `
        <div class="template-item" onclick="loadTemplate('${safeKey}')">
          <div class="template-info">
            <span class="template-name">${data.label || key}</span>
            <span class="template-date">${new Date(data.savedAt).toLocaleString('es-ES')}</span>
          </div>
          <div class="template-actions">
            <button class="btn-load">Cargar</button>
            <button class="btn-delete" onclick="event.stopPropagation(); deleteTemplate('${safeKey}')">&times;</button>
          </div>
        </div>`;
    }).join('');
  }

  document.getElementById('modal-overlay').classList.remove('hidden');
}

function loadTemplate(key) {
  let templates = {};
  try {
    templates = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return;
  }

  if (templates[key]) {
    resetAll();
    loadState(templates[key]);
    closeModal();
    showToast('📂 Plantilla cargada');
  }
}

function deleteTemplate(key) {
  if (!confirm('¿Eliminar esta plantilla?')) return;

  let templates = {};
  try {
    templates = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return;
  }

  delete templates[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  showLoadModal(); // Refresh the modal
  showToast('🗑️ Plantilla eliminada');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ============================================================
// COPIAS DE SEGURIDAD (EXPORTAR / IMPORTAR)
// ============================================================
function exportBackup() {
  const templates = localStorage.getItem(STORAGE_KEY);
  if (!templates || templates === '{}') {
    showToast('⚠️ No hay plantillas para exportar');
    return;
  }

  try {
    const blob = new Blob([templates], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    a.href = url;
    a.download = `coca_cola_plantillas_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📥 Copia descargada. Guárdala en tus Archivos.');
  } catch (err) {
    showToast('❌ Error al exportar la copia');
  }
}

function triggerImport() {
  const fileInput = document.getElementById('import-file-input');
  if (fileInput) fileInput.click();
}

function importBackup(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (typeof imported !== 'object' || Array.isArray(imported)) {
        throw new Error('Formato inválido');
      }

      // Fusionar con las plantillas existentes
      let current = {};
      try {
        current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      } catch (err) {
        current = {};
      }

      const merged = { ...current, ...imported };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      showToast('✅ Copia importada con éxito');
      showLoadModal(); // Refrescar lista del modal
    } catch (err) {
      showToast('❌ Archivo de copia de seguridad inválido');
    }
    input.value = ''; // Limpiar input
  };
  reader.readAsText(file);
}

function resetAll() {
  // Reiniciar estado de cabecera contraída
  isScrolled = false;
  const header = document.getElementById('app-header');
  if (header) header.classList.remove('scrolled');

  // Regresar al Dashboard al reiniciar
  const dashView = document.getElementById('dashboard-view');
  const catalogView = document.getElementById('catalog-view');
  if (dashView && catalogView) {
    dashView.classList.remove('fade-out');
    dashView.style.display = '';
    catalogView.classList.add('hidden');
    window.scrollTo(0, 0);
  }

  document.getElementById('clientName').value = '';
  const notesEl = document.getElementById('orderNotes');
  if (notesEl) notesEl.value = '';
  document.getElementById('searchInput').value = '';

  // Reset active group tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  const allTab = document.querySelector('.tab-btn[data-group="all"]');
  if (allTab) allTab.classList.add('active');
  activeGroup = 'all';

  PRODUCT_CATALOG.forEach(cat => {
    // Ensure categories collapse back
    const body = document.getElementById('cat-body-' + cat.id);
    const chevron = document.getElementById('chevron-' + cat.id);
    if (body) body.classList.remove('expanded');
    if (chevron) chevron.classList.remove('rotated');

    cat.products.forEach(p => {
      const qty = document.getElementById('qty-' + p.id);
      const dto = document.getElementById('dto-' + p.id);
      const dtoEur = document.getElementById('dtoeur-' + p.id);
      if (qty) qty.value = '';
      if (dto) dto.value = '';
      if (dtoEur) dtoEur.value = '';

      const brutaEl = document.getElementById('bruta-' + p.id);
      const netaEl = document.getElementById('neta-' + p.id);
      const netoCajaEl = document.getElementById('netocaja-' + p.id);

      if (brutaEl) {
        brutaEl.textContent = '-';
        brutaEl.classList.remove('has-value');
      }
      if (netaEl) {
        netaEl.textContent = '-';
        netaEl.classList.remove('has-value');
      }
      if (netoCajaEl) {
        netoCajaEl.textContent = '-';
        netoCajaEl.classList.remove('has-value');
      }

      document.getElementById('row-' + p.id)?.classList.remove('active-row');
    });
    updateCategoryTotal(cat.id);
  });

  applyFilters();
  updateGlobalTotals();
  localStorage.removeItem(AUTOSAVE_KEY);
}

function newTemplate() {
  if (confirm('¿Crear nueva plantilla? Se perderán los cambios no guardados.')) {
    resetAll();
    setCurrentDate();
    showToast('🆕 Nueva plantilla');
  }
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('show');

  // Force reflow for re-triggering animation
  void toast.offsetWidth;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ============================================================
// EVENT LISTENERS
// ============================================================
function setupEventListeners() {
  document.getElementById('btnNew').addEventListener('click', newTemplate);
  document.getElementById('btnClearQty').addEventListener('click', clearAllQuantities);
  document.getElementById('btnSave').addEventListener('click', saveTemplate);
  document.getElementById('btnLoad').addEventListener('click', showLoadModal);
  document.getElementById('btnPrint').addEventListener('click', generatePDF);
  document.getElementById('fab-whatsapp').addEventListener('click', shareWhatsApp);
  document.getElementById('fab-email').addEventListener('click', shareEmail);
  document.getElementById('fab-catalog').addEventListener('click', openCatalogModal);

  // Close modal on overlay click
  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === e.currentTarget) closeModal();
  });

  const catalogModal = document.getElementById('catalog-modal');
  if (catalogModal) {
    catalogModal.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeCatalogModal();
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeCatalogModal();
    }
  });

  // Auto-save client name, notes and date changes
  document.getElementById('clientName').addEventListener('input', () => {
    autoSave();
    updateHeaderSummary();
  });
  const notesEl = document.getElementById('orderNotes');
  if (notesEl) {
    notesEl.addEventListener('input', autoSave);
  }
  document.getElementById('effectiveDate').addEventListener('change', autoSave);

  // Escuchar scroll para encoger cabecera
  window.addEventListener('scroll', handleHeaderScroll);

  // Tab selector click events
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeGroup = tab.getAttribute('data-group');
      applyFilters();
    });
  });

  // Search input events
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  
  searchInput.addEventListener('input', () => {
    applyFilters();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    applyFilters();
    searchInput.focus();
  });
}

// ============================================================
// COMBINED SEARCH AND TAB FILTERING LOGIC
// ============================================================
function applyFilters() {
  const container = document.getElementById('product-container');
  const searchInput = document.getElementById('searchInput');
  searchQuery = searchInput.value.trim().toLowerCase();
  
  const btnClear = document.getElementById('btnClearSearch');
  if (searchQuery) {
    btnClear.classList.remove('hidden');
  } else {
    btnClear.classList.add('hidden');
  }
  
  const groupHeaders = container.querySelectorAll('.group-header');
  const catSections = container.querySelectorAll('.category-section');
  const isReviewMode = (activeGroup === 'review');
  
  catSections.forEach(section => {
    const catGroup = section.getAttribute('data-group');
    const catName = section.querySelector('.cat-name').textContent.toLowerCase();
    
    // En modo revisión, mostramos cualquier categoría elegible del catálogo
    const matchesGroup = isReviewMode || (activeGroup === 'all' || catGroup === activeGroup);
    
    // Check product rows matching query
    const rows = section.querySelectorAll('tr[data-product]');
    let visibleRowsCount = 0;
    
    rows.forEach(row => {
      const productId = row.getAttribute('data-product');
      const qtyInput = document.getElementById('qty-' + productId);
      const qty = qtyInput ? (parseFloat(qtyInput.value) || 0) : 0;
      
      const product = findProduct(productId);
      const productMarca = product ? product.marca.toLowerCase() : '';
      
      // En modo revisión, solo mostramos las filas que tengan cantidad > 0
      const matchesReview = !isReviewMode || (qty > 0);
      
      const matchesSearch = !searchQuery || 
                            productMarca.includes(searchQuery) || 
                            catName.includes(searchQuery);
                            
      if (matchesGroup && matchesReview && matchesSearch) {
        row.style.display = '';
        visibleRowsCount++;
      } else {
        row.style.display = 'none';
      }
    });
    
    // Show/hide category section
    if (matchesGroup && visibleRowsCount > 0) {
      section.classList.remove('hidden');
      
      const body = section.querySelector('.category-body');
      const chevron = section.querySelector('.chevron');
      // Auto-expandir en modo búsqueda o en modo revisión para ver los productos directamente
      if (searchQuery !== '' || isReviewMode) {
        if (body) body.classList.add('expanded');
        if (chevron) chevron.classList.add('rotated');
      }
    } else {
      section.classList.add('hidden');
    }
  });
  
  // Show/hide group headers based on visible child categories
  groupHeaders.forEach(header => {
    const groupKey = header.getAttribute('data-group');
    const visibleCats = container.querySelectorAll(`.category-section[data-group="${groupKey}"]:not(.hidden)`);
    if (visibleCats.length > 0) {
      header.classList.remove('hidden');
    } else {
      header.classList.add('hidden');
    }
  });

  // Mostrar mensaje de pedido vacío si estamos en modo revisión y no hay ningún producto seleccionado
  const noProductsMsgId = 'review-empty-message';
  let noProductsMsg = document.getElementById(noProductsMsgId);
  const visibleSectionsCount = container.querySelectorAll('.category-section:not(.hidden)').length;

  if (isReviewMode && visibleSectionsCount === 0) {
    if (!noProductsMsg) {
      noProductsMsg = document.createElement('div');
      noProductsMsg.id = noProductsMsgId;
      noProductsMsg.className = 'review-empty-message';
      noProductsMsg.innerHTML = `
        <div class="review-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block; margin: 0 auto 12px;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h3>Pedido Vacío</h3>
        <p>No has introducido cantidades en ningún producto todavía.</p>
        <button type="button" class="btn-review-back" onclick="document.querySelector('.tab-btn[data-group=\'all\']').click()">Ver Todos los Productos</button>
      `;
      container.appendChild(noProductsMsg);
    } else {
      noProductsMsg.classList.remove('hidden');
    }
  } else {
    if (noProductsMsg) {
      noProductsMsg.classList.add('hidden');
    }
  }
}


// ============================================================
// STEPPER QUANTITY ADJUSTMENT
// ============================================================
function adjustQty(productId, catId, delta) {
  const qtyInput = document.getElementById('qty-' + productId);
  if (!qtyInput) return;

  let currentVal = parseFloat(qtyInput.value) || 0;
  const newVal = currentVal + delta;
  
  qtyInput.value = newVal === 0 ? '' : newVal;
  
  // Disparar el evento de cambio
  onInputChange(productId, catId);
}

// ============================================================
// SCROLLED HEADER LOGIC
// ============================================================
let isScrolled = false;
function handleHeaderScroll() {
  const header = document.getElementById('app-header');
  if (!header) return;
  const sy = window.scrollY;
  // Histéresis: se contrae al bajar de 120px y se expande al subir de 80px (evita bucles por el cambio de 12px de altura)
  if (!isScrolled && sy > 120) {
    isScrolled = true;
    header.classList.add('scrolled');
    updateHeaderSummary();
  } else if (isScrolled && sy < 80) {
    isScrolled = false;
    header.classList.remove('scrolled');
  }
}

function updateHeaderSummary() {
  const clientNameInput = document.getElementById('clientName');
  const clientName = clientNameInput ? (clientNameInput.value.trim() || 'Sin Cliente') : 'Sin Cliente';
  const totalCajas = document.getElementById('totalCajas')?.textContent || '0';
  const totalNeta = document.getElementById('totalNeta')?.textContent || '0,00 €';
  const summaryEl = document.getElementById('headerSummaryText');
  
  if (summaryEl) {
    summaryEl.textContent = `${clientName.toUpperCase()} • ${totalCajas} Cajas • ${totalNeta}`;
  }
}

// ============================================================
// VIRTUAL KEYPAD LOGIC
// ============================================================
function setupKeypad() {
  const btnClose = document.getElementById('btnKeypadClose');
  if (btnClose) {
    btnClose.addEventListener('click', hideKeypad);
  }

  // Keypad keys
  const keys = document.querySelectorAll('.keypad-key[data-val]');
  keys.forEach(key => {
    key.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const val = key.getAttribute('data-val');
      handleKeyPress(val);
    });
  });

  // Next button
  const btnNext = document.getElementById('btnKeypadNext');
  if (btnNext) {
    btnNext.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handleKeypadNext();
    });
  }

  // Global document click to close keypad when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('qty-input') && 
        !e.target.classList.contains('dto-input') && 
        !e.target.classList.contains('dtoeur-input') && 
        !e.target.closest('.virtual-keypad') && 
        !e.target.closest('.stepper-btn')) {
      hideKeypad();
    }
  });
}

function showKeypad(input) {
  activeInput = input;
  const keypad = document.getElementById('virtual-keypad');
  if (!keypad) return;

  const row = input.closest('tr[data-product]');
  if (!row) return;

  const productId = row.getAttribute('data-product');
  const product = findProduct(productId);
  if (!product) return;

  // Auto-expandir la sección de categoría que contiene este input si está colapsada
  const catSection = row.closest('.category-section');
  if (catSection) {
    const body = catSection.querySelector('.category-body');
    const chevron = catSection.querySelector('.chevron');
    if (body && !body.classList.contains('expanded')) {
      body.classList.add('expanded');
      if (chevron) chevron.classList.add('rotated');
    }
  }

  const nameEl = document.getElementById('keypad-product-name');
  const detailsEl = document.getElementById('keypad-product-details');
  
  if (nameEl) nameEl.textContent = product.marca;
  if (detailsEl) {
    const isQty = input.classList.contains('qty-input');
    const isDto = input.classList.contains('dto-input');
    const isDtoEur = input.classList.contains('dtoeur-input');
    let typeStr = '';
    if (isQty) typeStr = 'Cajas (Cantidad)';
    else if (isDto) typeStr = 'Descuento (%)';
    else if (isDtoEur) typeStr = 'Descuento (€/caja)';
    
    detailsEl.textContent = `${typeStr} • Tarifa: ${formatCurrency(product.precio)} (${product.uniCaja} ud/caja)`;
  }

  keypad.classList.add('active');

  // Centrar la fila activa en pantalla de forma instantánea (evita bucles de scroll suave y saltos de teclado)
  setTimeout(() => {
    row.scrollIntoView({ behavior: 'auto', block: 'center' });
  }, 80);
}

function hideKeypad() {
  const keypad = document.getElementById('virtual-keypad');
  if (keypad) {
    keypad.classList.remove('active');
  }
  if (activeInput) {
    activeInput.blur();
    activeInput = null;
  }
}

function handleKeyPress(val) {
  if (!activeInput) return;

  let currentVal = activeInput.value;
  
  if (val === 'backspace') {
    if (currentVal.length > 0) {
      activeInput.value = currentVal.substring(0, currentVal.length - 1);
    }
  } else if (val === '-') {
    if (activeInput.classList.contains('qty-input')) {
      if (currentVal.startsWith('-')) {
        activeInput.value = currentVal.substring(1);
      } else {
        activeInput.value = '-' + currentVal;
      }
    }
  } else if (val === '.') {
    if (!activeInput.classList.contains('qty-input')) {
      if (!currentVal.includes('.')) {
        if (currentVal === '') {
          activeInput.value = '0.';
        } else {
          activeInput.value = currentVal + '.';
        }
      }
    }
  } else {
    if (currentVal === '0') {
      activeInput.value = val;
    } else {
      activeInput.value = currentVal + val;
    }
  }

  // Ejecutar recálculo
  const row = activeInput.closest('tr[data-product]');
  if (row) {
    const productId = row.getAttribute('data-product');
    const catSection = row.closest('.category-section');
    const catId = catSection ? catSection.getAttribute('data-cat') : '';
    onInputChange(productId, catId);
  }
}

function handleKeypadNext() {
  if (!activeInput) return;

  // Encontrar todos los inputs visibles de cajas, dto en euros y dto porcentual
  const allInputs = Array.from(document.querySelectorAll('.qty-input, .dtoeur-input, .dto-input'))
                         .filter(input => {
                           const tr = input.closest('tr[data-product]');
                           const section = input.closest('.category-section');
                           const isRowVisible = tr && tr.style.display !== 'none';
                           const isSectionVisible = section && !section.classList.contains('hidden');
                           return input.offsetParent !== null && isRowVisible && isSectionVisible;
                         });

  const index = allInputs.indexOf(activeInput);
  if (index !== -1 && index < allInputs.length - 1) {
    const nextInput = allInputs[index + 1];
    nextInput.focus();
  } else {
    hideKeypad();
  }
}

// ============================================================
// DYNAMIC NAVIGATION FLOW (DASHBOARD)
// ============================================================
function startOrder(groupFilter = 'all') {
  const dashView = document.getElementById('dashboard-view');
  const catalogView = document.getElementById('catalog-view');
  
  // Reiniciar estado de cabecera contraída
  isScrolled = false;
  const header = document.getElementById('app-header');
  if (header) header.classList.remove('scrolled');
  
  if (dashView && catalogView) {
    dashView.classList.add('fade-out');
    setTimeout(() => {
      dashView.style.display = 'none';
      catalogView.classList.remove('hidden');
      window.scrollTo(0, 0);
      
      // Asegurar que la cabecera inicie en estado extendido limpio
      isScrolled = false;
      if (header) header.classList.remove('scrolled');
      
      const tab = document.querySelector(`.tab-btn[data-group="${groupFilter}"]`);
      if (tab) {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
      activeGroup = groupFilter;
      applyFilters();
      
      setTimeout(() => {
        const firstInput = document.querySelector('.category-section:not(.hidden) .qty-input');
        if (firstInput) firstInput.focus();
      }, 100);
    }, 300);
  }
}

// ============================================================
// PRODUCT ELIGIBILITY HELPER FOR EURO DISCOUNT
// ============================================================
function hasEuroDiscount(p, cat) {
  return true;
}

// ============================================================
// CLEAR QUANTITIES TO ZERO
// ============================================================
function clearAllQuantities() {
  if (!confirm('¿Poner a cero todas las cantidades (Cajas)?')) return;
  
  PRODUCT_CATALOG.forEach(cat => {
    let catChanged = false;
    cat.products.forEach(p => {
      const qtyInput = document.getElementById('qty-' + p.id);
      if (qtyInput && qtyInput.value !== '') {
        qtyInput.value = '';
        catChanged = true;
        
        const brutaEl = document.getElementById('bruta-' + p.id);
        const netaEl = document.getElementById('neta-' + p.id);
        const netoCajaEl = document.getElementById('netocaja-' + p.id);
        
        if (brutaEl) {
          brutaEl.textContent = '-';
          brutaEl.classList.remove('has-value');
        }
        if (netaEl) {
          netaEl.textContent = '-';
          netaEl.classList.remove('has-value');
        }
        if (netoCajaEl) {
          netoCajaEl.textContent = '-';
          netoCajaEl.classList.remove('has-value');
        }
        
        const row = document.getElementById('row-' + p.id);
        if (row) {
          row.classList.remove('active-row');
        }
      }
    });
    if (catChanged) {
      updateCategoryTotal(cat.id);
    }
  });
  
  updateGlobalTotals();
  autoSave();
  showToast('🧹 Cantidades puestas a cero');
}

// ============================================================
// PDF GENERATION AND PRINTING
// ============================================================
function generatePDF() {
  const clientNameInput = document.getElementById('clientName');
  const clientName = clientNameInput ? (clientNameInput.value.trim() || 'Bar Jesus') : 'Bar Jesus';
  
  const notesInput = document.getElementById('orderNotes');
  const notes = notesInput ? notesInput.value.trim() : '';
  
  const dateVal = document.getElementById('effectiveDate').value;
  let orderDate = new Date();
  if (dateVal) {
    const [yr, mo, dy] = dateVal.split('-');
    orderDate = new Date(yr, mo - 1, dy);
  }
  
  const formatShortDate = (d) => {
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };
  
  const fechaPedido = formatShortDate(orderDate);

  let rowsHTML = '';
  let activeProductsCount = 0;
  
  let totalCajasVal = 0;
  let totalUnidadesVal = 0;
  let totalBrutaVal = 0;
  let totalNetaVal = 0;

  // Gather active products
  PRODUCT_CATALOG.forEach(cat => {
    cat.products.forEach(p => {
      const qtyInput = document.getElementById('qty-' + p.id);
      const qty = qtyInput ? (parseFloat(qtyInput.value) || 0) : 0;
      if (qty !== 0) {
        activeProductsCount++;
        const dtoInput = document.getElementById('dto-' + p.id);
        const dto = dtoInput ? (parseFloat(dtoInput.value) || 0) : 0;
        const dtoEurInput = document.getElementById('dtoeur-' + p.id);
        const dtoEur = dtoEurInput ? (parseFloat(dtoEurInput.value) || 0) : 0;

        const precioConDtoPct = p.precio * (1 - dto / 100);
        const netoCaja = precioConDtoPct - dtoEur;
        const neta = qty * netoCaja;
        const discountVal = p.precio - netoCaja;

        totalCajasVal += qty;
        totalUnidadesVal += qty * p.uniCaja;
        totalBrutaVal += qty * p.precio;
        totalNetaVal += neta;

        // Formatear el detalle del descuento para mostrar claramente el % y el de euros/caja
        let discountText = '0,00 €';
        if (dto > 0 && dtoEur > 0) {
          discountText = `${formatCurrency(discountVal)} (${dto}% + ${dtoEur}€)`;
        } else if (dto > 0) {
          discountText = `${formatCurrency(discountVal)} (${dto}%)`;
        } else if (dtoEur > 0) {
          discountText = `${formatCurrency(discountVal)} (-${dtoEur}€/cj)`;
        } else if (discountVal > 0) {
          discountText = formatCurrency(discountVal);
        }

        rowsHTML += `
          <tr>
            <td class="product-name">${p.marca}</td>
            <td class="col-center">${cat.name}</td>
            <td class="col-center">${qty}</td>
            <td class="col-right">${formatCurrency(p.precio)}</td>
            <td class="col-right">${dtoEur > 0 ? formatCurrency(dtoEur) : '0,00 €'}</td>
            <td class="col-right">${dto > 0 ? dto + '%' : '0%'}</td>
            <td class="col-right">${formatCurrency(netoCaja)}</td>
            <td class="col-right">${formatCurrency(neta)}</td>
          </tr>
        `;
      }
    });
  });

  // If no products entered, generate the default mockup rows from the user's screenshot
  if (activeProductsCount === 0) {
    const mockupProducts = [
      { marca: 'Coca-Cola Original', format: '-' },
      { marca: 'Coca-Cola Zero', format: '-' },
      { marca: 'Fanta Naranja', format: '-' },
      { marca: 'Fanta Limón', format: '-' },
      { marca: 'Sprite', format: '-' },
      { marca: 'Nestea', format: '-' }
    ];
    mockupProducts.forEach(p => {
      rowsHTML += `
        <tr>
          <td class="product-name">${p.marca}</td>
          <td class="col-center">${p.format}</td>
          <td class="col-center">0</td>
          <td class="col-right">0,00 €</td>
          <td class="col-right">0,00 €</td>
          <td class="col-right">0%</td>
          <td class="col-right">0,00 €</td>
          <td class="col-right">0,00 €</td>
        </tr>
      `;
    });
  }

  const printArea = document.getElementById('print-area');
  if (!printArea) return;

  printArea.innerHTML = `
    <div class="print-pdf-container">
      <div class="print-watermark">
        <img src="assets/logo.jpg" alt="Watermark">
      </div>
      <table class="print-banner-table">
        <tr>
          <td class="print-banner-left">Coca-Cola European Partners</td>
          <td class="print-banner-right">Delegación Badajoz</td>
        </tr>
      </table>
      
      <h1 class="print-title">PLANTILLA COCACOLA</h1>
      
      <table class="print-info-table">
        <tr>
          <td class="print-info-label">Cliente:</td>
          <td class="print-info-value">${clientName}</td>
        </tr>
        <tr>
          <td class="print-info-label">Fecha:</td>
          <td class="print-info-value">${fechaPedido}</td>
        </tr>
      </table>
      
      <table class="print-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="col-center">Formato</th>
            <th class="col-center">Unidades</th>
            <th class="col-right">Precio Unit.</th>
            <th class="col-right">Dto €</th>
            <th class="col-right">% Dto</th>
            <th class="col-right">Precio Neto</th>
            <th class="col-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
      
      <table class="print-totals-table">
        <tr>
          <td class="print-total-cell">
            <span class="print-total-label">CAJAS</span>
            <span class="print-total-value">${totalCajasVal.toLocaleString('es-ES')}</span>
          </td>
          <td class="print-total-cell">
            <span class="print-total-label">UNIDADES</span>
            <span class="print-total-value">${totalUnidadesVal.toLocaleString('es-ES')}</span>
          </td>
          <td class="print-total-cell">
            <span class="print-total-label">FACT. BRUTA</span>
            <span class="print-total-value">${formatCurrency(totalBrutaVal)}</span>
          </td>
          <td class="print-total-cell cell-red">
            <span class="print-total-label">FACT. NETA</span>
            <span class="print-total-value">${formatCurrency(totalNetaVal)}</span>
          </td>
        </tr>
      </table>
      
      <div class="print-footer">
        Coca-Cola European Partners · Delegación Badajoz · Documento generado automáticamente
      </div>
    </div>
  `;

  // Trigger print dialog
  window.print();
}

// ============================================================
// GEOLOCATION MANAGEMENT
// ============================================================
function updateLocation() {
  if (!navigator.geolocation) {
    console.log('Geolocalización no soportada por el navegador');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`);
        if (response.ok) {
          const data = await response.json();
          const city = data.locality || data.city || data.village || data.town || 'Badajoz';
          const locEl = document.getElementById('currentLocationText');
          if (locEl) {
            locEl.textContent = city;
          }
        }
      } catch (err) {
        console.warn('Error al obtener la localidad por coordenadas:', err);
      }
    },
    (error) => {
      console.warn('Error de geolocalización:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}

// ============================================================
// CATALOG MODAL CONTROL
// ============================================================
function openCatalogModal() {
  const modal = document.getElementById('catalog-modal');
  const iframe = document.getElementById('catalog-iframe');
  if (modal && iframe) {
    iframe.src = 'assets/catalogo_2025.pdf#page=3';
    modal.classList.remove('hidden');
    
    // Limpiar botones activos
    document.querySelectorAll('.nav-page-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
}

function closeCatalogModal() {
  const modal = document.getElementById('catalog-modal');
  const iframe = document.getElementById('catalog-iframe');
  if (modal && iframe) {
    iframe.src = '';
    modal.classList.add('hidden');
  }
}

function jumpToCatalogPage(pageNumber) {
  const iframe = document.getElementById('catalog-iframe');
  if (iframe) {
    iframe.src = 'assets/catalogo_2025.pdf#page=' + pageNumber;
  }
  
  // Resaltar botón activo
  document.querySelectorAll('.nav-page-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-page') == pageNumber) {
      btn.classList.add('active');
    }
  });
}

