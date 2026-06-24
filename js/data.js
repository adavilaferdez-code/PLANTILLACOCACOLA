// Catálogo de productos Coca-Cola - Actualizado Junio 2026
// ============================================================
// Este archivo debe cargarse ANTES de app.js
// Proporciona: PRODUCT_CATALOG, PRODUCT_GROUPS
// ============================================================

const PRODUCT_GROUPS = {
  vr237:       { name: 'VR 237', color: '#E61E2A', icon: '' },
  vr350:       { name: 'VR 350', color: '#FF3B4A', icon: '' },
  latas:       { name: 'LATAS', color: '#FFB800', icon: '' },
  medio_litro: { name: 'MEDIO LITRO', color: '#4CD964', icon: '' },
  dos_litros:  { name: '2 LITROS', color: '#1565C0', icon: '' },
  zumos:       { name: 'ZUMOS', color: '#FF9500', icon: '' },
  agua:        { name: 'AGUA', color: '#0097A7', icon: '' },
  otros:       { name: 'OTROS', color: '#8E8E93', icon: '' }
};

const PRODUCT_CATALOG = [

  // ══════════════════════════════════════════════
  // GRUPO: VR 237
  // ══════════════════════════════════════════════

  {
    id: 'vidrio_rell_237',
    name: 'VIDRIO RELL. 23,7 CL (24 unidades)',
    group: 'vr237',
    color: '#E61E2A',
    products: [
      { id: 'vr237_cocacola', marca: 'COCA-COLA', uniCaja: 24, precio: 25.44, pFondo: 0.77 },
      { id: 'vr237_cclight', marca: 'CC LIGHT / CC ZERO / CC ZERO ZERO', uniCaja: 24, precio: 25.44, pFondo: 0.67 },
      { id: 'vr237_fanta_naranja', marca: 'FANTA NARANJA', uniCaja: 24, precio: 25.44, pFondo: 0 },
      { id: 'vr237_fanta_limon', marca: 'FANTA LIMÓN', uniCaja: 24, precio: 25.44, pFondo: 0 },
      { id: 'vr237_sprite', marca: 'SPRITE', uniCaja: 24, precio: 24.96, pFondo: 0 },
      { id: 'vr237_royal_bliss', marca: 'ROYAL BLISS TÓN / CREATIV / YUZ', uniCaja: 24, precio: 31.92, pFondo: 0.799 },
      { id: 'vr237_royal_citricos', marca: 'ROYAL BLISS CÍTRICOS', uniCaja: 24, precio: 28.80, pFondo: 0 },
      { id: 'vr237_nordic', marca: 'NORDIC MIST TÓNICA', uniCaja: 24, precio: 30.96, pFondo: 0 },
      { id: 'vr237_nordic_blue', marca: 'NORDIC MIST TÓNICA BLUE/ROSÉ', uniCaja: 24, precio: 30.96, pFondo: 0 }
    ]
  },
  {
    id: 'vidrio_rell_20',
    name: 'VIDRIO RELL. 20 CL',
    group: 'vr237',
    color: '#E61E2A',
    products: [
      { id: 'vr20_cocacola', marca: 'COCA-COLA', uniCaja: 24, precio: 25.44, pFondo: 0 },
      { id: 'vr20_cclight', marca: 'COCA-COLA LIGHT / CC ZERO / CC22', uniCaja: 24, precio: 25.44, pFondo: 0 },
      { id: 'vr20_fanta_naranja', marca: 'FANTA NARANJA', uniCaja: 24, precio: 25.44, pFondo: 0 },
      { id: 'vr20_fanta_limon', marca: 'FANTA LIMÓN', uniCaja: 24, precio: 25.44, pFondo: 0 },
      { id: 'vr20_sprite', marca: 'SPRITE', uniCaja: 24, precio: 24.96, pFondo: 0 }
    ]
  },
  {
    id: 'vidrio_no_rell_20',
    name: 'VIDRIO NO RELL. 20 CL',
    group: 'vr237',
    color: '#E61E2A',
    products: [
      { id: 'vnr20_cocacola', marca: 'COCA-COLA', uniCaja: 24, precio: 31.44, pFondo: 0 },
      { id: 'vnr20_ccl', marca: 'CCL / CC2 / CC22 / CCOC / CCLC', uniCaja: 24, precio: 31.44, pFondo: 0 },
      { id: 'vnr20_fanta_naranja', marca: 'FANTA NARANJA', uniCaja: 24, precio: 31.44, pFondo: 0 },
      { id: 'vnr20_fanta_limon', marca: 'FANTA LIMÓN', uniCaja: 24, precio: 31.44, pFondo: 0 },
      { id: 'vnr20_sprite', marca: 'SPRITE', uniCaja: 24, precio: 31.44, pFondo: 0 },
      { id: 'vnr20_nordic', marca: 'NORDIC MIST TÓNICA', uniCaja: 24, precio: 37.44, pFondo: 0 },
      { id: 'vnr20_nordic_blue', marca: 'NORDIC MIST BLUE / ROSÉ', uniCaja: 24, precio: 37.44, pFondo: 0 },
      { id: 'vnr20_royal_tonica', marca: 'ROYAL BLISS TÓNICAS', uniCaja: 24, precio: 36.72, pFondo: 0 },
      { id: 'vnr20_royal_rosa', marca: 'ROYAL BLISS ROSA', uniCaja: 24, precio: 36.72, pFondo: 0 },
      { id: 'vnr20_royal_ginger', marca: 'ROYAL BLISS GINGER ALE', uniCaja: 24, precio: 36.72, pFondo: 0 },
      { id: 'vnr20_bare', marca: 'MARE ROSSO', uniCaja: 24, precio: 36.72, pFondo: 0 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: VR 350
  // ══════════════════════════════════════════════

  {
    id: 'vidrio_rell_350',
    name: 'VIDRIO RELL. 350 ML',
    group: 'vr350',
    color: '#FF3B4A',
    products: [
      { id: 'vr350_cocacola', marca: 'COCA-COLA', uniCaja: 24, precio: 29.28, pFondo: 0.85 },
      { id: 'vr350_cclight', marca: 'CC LIGHT / CC ZERO / CC ZERO ZERO', uniCaja: 24, precio: 29.28, pFondo: 0.85 },
      { id: 'vr350_fanta_naranja', marca: 'FANTA NARANJA', uniCaja: 24, precio: 29.28, pFondo: 0.85 },
      { id: 'vr350_fanta_limon', marca: 'FANTA LIMÓN', uniCaja: 24, precio: 29.28, pFondo: 0.85 },
      { id: 'vr350_sprite', marca: 'SPRITE', uniCaja: 24, precio: 29.28, pFondo: 0.85 },
      { id: 'vr350_aquarius', marca: 'AQUARIUS', uniCaja: 24, precio: 33.04, pFondo: 0.85 },
      { id: 'vr350_fuzetea', marca: 'FUZE TEA', uniCaja: 24, precio: 33.12, pFondo: 0.85 },
      { id: 'vr350_nordic', marca: 'NORDIC MIST TÓNICA', uniCaja: 24, precio: 25.00, pFondo: 0.85 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: LATAS
  // ══════════════════════════════════════════════

  {
    id: 'lata_33cl',
    name: 'LATA 33 CL',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata33_cocacola', marca: 'COCA-COLA', uniCaja: 24, precio: 39.36, pFondo: 0 },
      { id: 'lata33_ccl', marca: 'CCL / CC2 / CC22 / CCOC / CCLC', uniCaja: 24, precio: 39.36, pFondo: 0 },
      { id: 'lata33_fanta', marca: 'FANTA', uniCaja: 24, precio: 37.68, pFondo: 0 },
      { id: 'lata33_sprite', marca: 'SPRITE', uniCaja: 24, precio: 37.68, pFondo: 0 },
      { id: 'lata33_aquarius', marca: 'AQUARIUS / AQUARIUS LIBRE / VIVE', uniCaja: 24, precio: 41.04, pFondo: 0 },
      { id: 'lata33_fuzetea', marca: 'FUZE TEA', uniCaja: 24, precio: 39.60, pFondo: 0 }
    ]
  },
  {
    id: 'lata_50cl',
    name: 'LATA 50 CL',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata50_burn', marca: 'BURN / BURN ZERO', uniCaja: 12, precio: 36.48, pFondo: 0 },
      { id: 'lata50_monster', marca: 'MONSTER ENERGY / REINA / JUICED / ULTRA', uniCaja: 24, precio: 56.16, pFondo: 0 },
      { id: 'lata50_reign', marca: 'MONSTER REIGN', uniCaja: 12, precio: 26.04, pFondo: 0 }
    ]
  },
  {
    id: 'lata_33cl_energy',
    name: 'LATA 25 CL - ENERGY',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata33e_monster', marca: 'MONSTER ENERGY / ULTRA', uniCaja: 24, precio: 44.40, pFondo: 0 },
      { id: 'lata33e_burn', marca: 'BURN / BURN ZERO', uniCaja: 24, precio: 58.80, pFondo: 0 }
    ]
  },
  {
    id: 'lata_25cl_slim',
    name: 'LATA 25 CL SLIM',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata25s_royal', marca: 'ROYAL BLISS', uniCaja: 12, precio: 15.48, pFondo: 0 }
    ]
  },
  {
    id: 'lata_25cl_sleek',
    name: 'LATA 25 CL SLEEK',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata25sk_nordic', marca: 'TÓNICA NORDIC Y ZERO', uniCaja: 24, precio: 33.60, pFondo: 0 },
      { id: 'lata25sk_nordic_blue', marca: 'TÓNICA NORDIC BLUE', uniCaja: 24, precio: 33.60, pFondo: 0 }
    ]
  },
  {
    id: 'lata_355ml',
    name: 'LATA 355 ML',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata355_monster', marca: 'MONSTER ENERGY / ULTRA', uniCaja: 24, precio: 24.96, pFondo: 0 }
    ]
  },
  {
    id: 'lata_50cl_energy',
    name: 'LATA 50 CL - ENERGY',
    group: 'latas',
    color: '#FFB800',
    products: [
      { id: 'lata50e_burn', marca: 'BURN / BURN ZERO', uniCaja: 12, precio: 36.48, pFondo: 0 },
      { id: 'lata50e_monster', marca: 'MONSTER ENERGY / REINA / JUICED', uniCaja: 24, precio: 56.16, pFondo: 0 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: MEDIO LITRO
  // ══════════════════════════════════════════════

  {
    id: 'pet_500cc',
    name: 'PET 500 cc',
    group: 'medio_litro',
    color: '#4CD964',
    products: [
      { id: 'pet500_cocacola', marca: 'COCA-COLA', uniCaja: 24, precio: 45.84, pFondo: 0 },
      { id: 'pet500_cclight', marca: 'CC LIGHT / CC ZERO / CC ZERO ZERO', uniCaja: 24, precio: 45.84, pFondo: 0 },
      { id: 'pet500_fanta_naranja', marca: 'FANTA NARANJA', uniCaja: 24, precio: 45.84, pFondo: 0 },
      { id: 'pet500_fanta_limon', marca: 'FANTA LIMÓN', uniCaja: 24, precio: 45.84, pFondo: 0 },
      { id: 'pet500_sprite', marca: 'SPRITE', uniCaja: 24, precio: 45.84, pFondo: 0 },
      { id: 'pet500_aquarius', marca: 'AQUARIUS', uniCaja: 24, precio: 52.32, pFondo: 0 },
      { id: 'pet500_fuzetea', marca: 'FUZE TEA', uniCaja: 24, precio: 52.32, pFondo: 0 },
      { id: 'pet500_powerade', marca: 'POWERADE (12 ud)', uniCaja: 12, precio: 32.88, pFondo: 0 },
      { id: 'pet500_limca', marca: 'LIMCA', uniCaja: 24, precio: 30.96, pFondo: 0 }
    ]
  },
  {
    id: 'pet_600ml',
    name: 'PET 600 ML',
    group: 'medio_litro',
    color: '#4CD964',
    products: [
      { id: 'pet600_ades', marca: 'ADES', uniCaja: 6, precio: 8.28, pFondo: 0 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: 2 LITROS
  // ══════════════════════════════════════════════

  {
    id: 'pet_2ltr',
    name: 'PET 2,0 Ltr',
    group: 'dos_litros',
    color: '#1565C0',
    products: [
      { id: 'pet2_ccregular', marca: 'CC REGULAR / CC2 / CC22 / Col / CC', uniCaja: 6, precio: 28.68, pFondo: 0 },
      { id: 'pet2_fanta', marca: 'FANTA NARANJA / LIMÓN (6 ud)', uniCaja: 6, precio: 27.06, pFondo: 0 },
      { id: 'pet2_sprite', marca: 'SPRITE (6 ud) / SPRITE ZERO', uniCaja: 6, precio: 27.06, pFondo: 0 }
    ]
  },
  {
    id: 'pet_1ltr',
    name: 'PET 1,0 Ltr',
    group: 'dos_litros',
    color: '#1565C0',
    products: [
      { id: 'pet1_cocacola', marca: 'COCA-COLA', uniCaja: 12, precio: 28.20, pFondo: 0 },
      { id: 'pet1_cclight', marca: 'CC LIGHT / CC ZERO / CC ZERO ZERO', uniCaja: 12, precio: 28.20, pFondo: 0 },
      { id: 'pet1_fanta', marca: 'FANTA', uniCaja: 12, precio: 28.20, pFondo: 0 },
      { id: 'pet1_sprite', marca: 'SPRITE', uniCaja: 12, precio: 28.20, pFondo: 0 },
      { id: 'pet1_nordic', marca: 'NORDIC', uniCaja: 12, precio: 24.60, pFondo: 0 },
      { id: 'pet1_limca', marca: 'LIMCA', uniCaja: 12, precio: 25.92, pFondo: 0 },
      { id: 'pet1_aquarius', marca: 'AQUARIUS LIMÓN Y NARANJA', uniCaja: 12, precio: 30.84, pFondo: 0 }
    ]
  },
  {
    id: 'pet_1_5ltr',
    name: 'PET 1,5L',
    group: 'dos_litros',
    color: '#1565C0',
    products: [
      { id: 'pet15_aquarius', marca: 'AQUARIUS (6 uds.)', uniCaja: 8, precio: 23.52, pFondo: 0 },
      { id: 'pet15_fuzetea', marca: 'FUZE TEA (6 uds.)', uniCaja: 4, precio: 21.54, pFondo: 0 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: ZUMOS
  // ══════════════════════════════════════════════

  {
    id: 'zumos_200sr',
    name: '200 S/R',
    group: 'zumos',
    color: '#FF9500',
    products: [
      { id: '200sr_mm_seleccion', marca: 'MINUTE MAID SELECCIÓN', uniCaja: 24, precio: 38.16, pFondo: 0 },
      { id: '200sr_mm_duofrutas', marca: 'MINUTE MAID DUOFRUTAS', uniCaja: 24, precio: 38.16, pFondo: 0 },
      { id: '200sr_mm_uva', marca: 'MINUTE MAID UVA / NBA', uniCaja: 24, precio: 38.16, pFondo: 0 }
    ]
  },
  {
    id: 'pet_1l_zumos',
    name: 'PET 1 Litro - ZUMOS',
    group: 'zumos',
    color: '#FF9500',
    products: [
      { id: 'pet1z_limonisima', marca: 'M. MAID LIMONADA', uniCaja: 6, precio: 24.48, pFondo: 0 }
    ]
  },
  {
    id: 'pet_500ml_zumos',
    name: 'PET 240 ML - ZUMOS',
    group: 'zumos',
    color: '#FF9500',
    products: [
      { id: 'pet500z_honest', marca: 'HONEST COFFEE', uniCaja: 12, precio: 16.80, pFondo: 0 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: AGUA
  // ══════════════════════════════════════════════

  {
    id: 'vr_365_aqb',
    name: 'VR 365 AQB. SINGULAR',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'vr365_aqb_gas', marca: 'AQUABONA SINGULAR CON GAS (20 uds)', uniCaja: 20, precio: 24.00, pFondo: 0 }
    ]
  },
  {
    id: 'vr_330ml',
    name: 'VR 330 ML',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'vr330_aquabona', marca: 'AQUABONA (24 ud)', uniCaja: 24, precio: 20.16, pFondo: 0 }
    ]
  },
  {
    id: 'ret_500cc',
    name: 'RETORNABLE 500 CC',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'ret500_aquabona', marca: 'AQUABONA (20 ud)', uniCaja: 20, precio: 20.20, pFondo: 0 }
    ]
  },
  {
    id: 'ret_litro',
    name: 'RETORNABLE LITRO',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'retl_aquabona', marca: 'AQUABONA (12 ud)', uniCaja: 12, precio: 19.32, pFondo: 0 }
    ]
  },
  {
    id: 'pet_35cl',
    name: 'PET 35 CL',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet35_aquabona', marca: 'AQUABONA (24 ud)', uniCaja: 24, precio: 17.76, pFondo: 0 }
    ]
  },
  {
    id: 'pet_50cl_aqb',
    name: 'PET 50 CL AQUABONA',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet50_aquabona', marca: 'AQUABONA (24 ud)', uniCaja: 24, precio: 20.64, pFondo: 0 }
    ]
  },
  {
    id: 'pet_50cl_aqb_gas',
    name: 'PET 50 CL AQB. CON GAS',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet50_aqb_gas', marca: 'AQUABONA SINGULAR CON GAS', uniCaja: 12, precio: 11.00, pFondo: 0 }
    ]
  },
  {
    id: 'pet_15_agua',
    name: 'PET 1,5 LTR - Agua',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet15a_aquabona', marca: 'AQUABONA (6 ud)', uniCaja: 6, precio: 9.30, pFondo: 0 }
    ]
  },
  {
    id: 'vmr_33cl_agua',
    name: 'VMR 33 CL - Agua',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'vmr33a_vilas', marca: 'VILAS DEL TURBÓN (24 ud)', uniCaja: 24, precio: 27.36, pFondo: 0 }
    ]
  },
  {
    id: 'vmr_75cl_agua',
    name: 'VMR 75 CL - Agua',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'vmr75a_vilas', marca: 'VILAS DEL TURBÓN (6 ud)', uniCaja: 6, precio: 12.30, pFondo: 0 }
    ]
  },
  {
    id: 'pet_50cl_agua',
    name: 'PET 50 CL - Agua',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet50a_vilas', marca: 'VILAS DEL TURBÓN (24 ud)', uniCaja: 24, precio: 16.80, pFondo: 0 }
    ]
  },
  {
    id: 'pet_1l_agua',
    name: 'PET 1 Litro - Agua',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet1a_vilas', marca: 'VILAS DEL TURBÓN (6 ud)', uniCaja: 6, precio: 5.82, pFondo: 0 }
    ]
  },
  {
    id: 'pet_600ml_agua',
    name: 'PET 600 ML - Agua',
    group: 'agua',
    color: '#0097A7',
    products: [
      { id: 'pet600_smartwater', marca: 'SMARTWATER', uniCaja: 12, precio: 12.48, pFondo: 0 }
    ]
  },

  // ══════════════════════════════════════════════
  // GRUPO: OTROS
  // ══════════════════════════════════════════════

  {
    id: 'premix_20ltr',
    name: 'PREMIX 20 LTR',
    group: 'otros',
    color: '#8E8E93',
    products: [
      { id: 'premix_cocacola', marca: 'COCA-COLA (4,2 cajas de 24 ud.)', uniCaja: 100.8, precio: 84.80, pFondo: 0 },
      { id: 'premix_fanta', marca: 'FANTA (4,2 cajas de 24 ud.)', uniCaja: 100.8, precio: 81.20, pFondo: 0 },
      { id: 'premix_sprite', marca: 'SPRITE (4,2 cajas de 24 ud.)', uniCaja: 100.8, precio: 81.20, pFondo: 0 },
      { id: 'premix_nordic', marca: 'NORDIC MIST (4,2 cajas de 24 ud.)', uniCaja: 100.8, precio: 80.20, pFondo: 0 }
    ]
  },
  {
    id: 'bib_10lts',
    name: 'B.I.B. 10 Lts',
    group: 'otros',
    color: '#8E8E93',
    products: [
      { id: 'bib10_cocacola', marca: 'CC/CC LIG/CC ZERO (13,33 cajas 24 ud.)', uniCaja: 319.92, precio: 234.50, pFondo: 0 },
      { id: 'bib10_cczero', marca: 'FANTA NARANJA Y ZERO (13,3 cajas 24 ud.)', uniCaja: 319.92, precio: 189.50, pFondo: 0 }
    ]
  },
  {
    id: 'bib_5lts',
    name: 'B.I.B. 5 Lts',
    group: 'otros',
    color: '#8E8E93',
    note: 'Todas 6,67 cajas de 24 uds. Excepto Fanta que es 5,63 cajas de 24 uds.',
    products: [
      { id: 'bib5_cocacola', marca: 'CC LIGHT / CC ZERO ZERO', uniCaja: 160.08, precio: 117.25, pFondo: 0 },
      { id: 'bib5_fanta_naranja', marca: 'FANTA NARANJA Y LIMÓN ZERO', uniCaja: 160.08, precio: 90.75, pFondo: 0 },
      { id: 'bib5_sprite_zero', marca: 'SPRITE ZERO', uniCaja: 160.08, precio: 115.95, pFondo: 0 },
      { id: 'bib5_nordic', marca: 'NORDIC MIST TÓNICA', uniCaja: 160.08, precio: 123.05, pFondo: 0 },
      { id: 'bib5_aquarius', marca: 'AQUARIUS LIBRE', uniCaja: 160.08, precio: 158.65, pFondo: 0 },
      { id: 'bib5_nestea', marca: 'NESTEA SIN AZÚCAR', uniCaja: 160.08, precio: 158.65, pFondo: 0 }
    ]
  },
  {
    id: 'vmr_0375',
    name: 'VMR 0,275 Lit.',
    group: 'otros',
    color: '#8E8E93',
    products: [
      { id: 'vmr0375_appletiser', marca: 'APPLETISER', uniCaja: 24, precio: 32.88, pFondo: 0 }
    ]
  },
  {
    id: 'vmr_075',
    name: 'VMR 0,75 Lit.',
    group: 'otros',
    color: '#8E8E93',
    products: [
      { id: 'vmr075_appletiser', marca: 'APPLETISER', uniCaja: 6, precio: 16.14, pFondo: 0 }
    ]
  },
  {
    id: 'vmr_1lit',
    name: 'VMR 1 LIT.',
    group: 'otros',
    color: '#8E8E93',
    products: [
      { id: 'vmr1_cocacola', marca: 'COCA-COLA / CC ZERO / CC LIGHT', uniCaja: 6, precio: 18.66, pFondo: 0 }
    ]
  }
];
