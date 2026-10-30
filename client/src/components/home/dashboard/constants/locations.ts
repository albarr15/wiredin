export interface LocationItem {
  name: string;
  type: "city" | "region";
  area: string;
}

export const PH_LOCATIONS: LocationItem[] = [
  // Metro Manila (NCR)
  { name: "Pasig City", type: "city", area: "Metro Manila" },
  { name: "Makati City", type: "city", area: "Metro Manila" },
  { name: "Taguig City (BGC)", type: "city", area: "Metro Manila" },
  { name: "Quezon City", type: "city", area: "Metro Manila" },
  { name: "Manila", type: "city", area: "Metro Manila" },
  { name: "Mandaluyong City", type: "city", area: "Metro Manila" },
  { name: "San Juan City", type: "city", area: "Metro Manila" },
  { name: "Pasay City", type: "city", area: "Metro Manila" },
  { name: "Parañaque City", type: "city", area: "Metro Manila" },
  { name: "Las Piñas City", type: "city", area: "Metro Manila" },
  { name: "Muntinlupa City (Alabang)", type: "city", area: "Metro Manila" },
  { name: "Marikina City", type: "city", area: "Metro Manila" },
  { name: "Caloocan City", type: "city", area: "Metro Manila" },
  { name: "Malabon City", type: "city", area: "Metro Manila" },
  { name: "Navotas City", type: "city", area: "Metro Manila" },
  { name: "Valenzuela City", type: "city", area: "Metro Manila" },
  { name: "Pateros", type: "city", area: "Metro Manila" },

  // Greater Manila & Luzon Cities
  { name: "Antipolo City", type: "city", area: "Rizal" },
  { name: "Cainta", type: "city", area: "Rizal" },
  { name: "Taytay", type: "city", area: "Rizal" },
  { name: "Bacoor City", type: "city", area: "Cavite" },
  { name: "Imus City", type: "city", area: "Cavite" },
  { name: "Dasmariñas City", type: "city", area: "Cavite" },
  { name: "Tagaytay City", type: "city", area: "Cavite" },
  { name: "Santa Rosa", type: "city", area: "Laguna" },
  { name: "Calamba City", type: "city", area: "Laguna" },
  { name: "Biñan City", type: "city", area: "Laguna" },
  { name: "Los Baños", type: "city", area: "Laguna" },
  { name: "Angeles City", type: "city", area: "Pampanga" },
  { name: "San Fernando", type: "city", area: "Pampanga" },
  { name: "Malolos City", type: "city", area: "Bulacan" },
  { name: "Baguio City", type: "city", area: "Benguet" },
  { name: "Batangas City", type: "city", area: "Batangas" },
  { name: "Lipa City", type: "city", area: "Batangas" },
  { name: "Dagupan City", type: "city", area: "Pangasinan" },
  { name: "Naga City", type: "city", area: "Camarines Sur" },
  { name: "Legazpi City", type: "city", area: "Albay" },
  { name: "San Fernando", type: "city", area: "La Union" },
  { name: "Vigan City", type: "city", area: "Ilocos Sur" },
  { name: "Laoag City", type: "city", area: "Ilocos Norte" },

  // Visayas Cities
  { name: "Cebu City", type: "city", area: "Cebu" },
  { name: "Mandaue City", type: "city", area: "Cebu" },
  { name: "Lapu-Lapu City", type: "city", area: "Cebu" },
  { name: "Iloilo City", type: "city", area: "Iloilo" },
  { name: "Bacolod City", type: "city", area: "Negros Occidental" },
  { name: "Dumaguete City", type: "city", area: "Negros Oriental" },
  { name: "Tacloban City", type: "city", area: "Leyte" },
  { name: "Tagbilaran City", type: "city", area: "Bohol" },
  { name: "Roxas City", type: "city", area: "Capiz" },

  // Mindanao Cities
  { name: "Davao City", type: "city", area: "Davao del Sur" },
  { name: "Cagayan de Oro City", type: "city", area: "Misamis Oriental" },
  { name: "General Santos City", type: "city", area: "South Cotabato" },
  { name: "Zamboanga City", type: "city", area: "Zamboanga del Sur" },
  { name: "Iligan City", type: "city", area: "Lanao del Norte" },
  { name: "Butuan City", type: "city", area: "Agusan del Norte" },
  { name: "Tagum City", type: "city", area: "Davao del Norte" },

  // Philippine Regions
  { name: "Metro Manila (NCR)", type: "region", area: "National Capital Region" },
  { name: "Calabarzon (Region IV-A)", type: "region", area: "Southern Tagalog" },
  { name: "Central Luzon (Region III)", type: "region", area: "Central Luzon" },
  { name: "Central Visayas (Region VII)", type: "region", area: "Central Visayas" },
  { name: "Western Visayas (Region VI)", type: "region", area: "Western Visayas" },
  { name: "Davao Region (Region XI)", type: "region", area: "Mindanao" },
  { name: "Northern Mindanao (Region X)", type: "region", area: "Mindanao" },
  { name: "Cordillera (CAR)", type: "region", area: "Northern Luzon" },
  { name: "Ilocos Region (Region I)", type: "region", area: "Northern Luzon" },
  { name: "Cagayan Valley (Region II)", type: "region", area: "Northern Luzon" },
  { name: "Bicol Region (Region V)", type: "region", area: "Southern Luzon" },
  { name: "Eastern Visayas (Region VIII)", type: "region", area: "Eastern Visayas" },
  { name: "Soccsksargen (Region XII)", type: "region", area: "Mindanao" },
  { name: "Caraga (Region XIII)", type: "region", area: "Mindanao" },
  { name: "BARMM", type: "region", area: "Muslim Mindanao" },
];
