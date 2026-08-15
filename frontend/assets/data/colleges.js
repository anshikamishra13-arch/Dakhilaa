/* ============================================================
   colleges.js — College data & JEE closing ranks
   ------------------------------------------------------------
   IITs are admitted through JoSAA using the JEE ADVANCED All-
   India Rank (AIR). NITs / IIITs are admitted through JoSAA
   using the JEE MAIN percentile → JEE Main AIR (CRL).

   Figures below are INDICATIVE, rounded closing-rank bands
   built from recent (2023-2025) JoSAA Round-6, General/
   Open category, Gender-Neutral, All-India-quota trends.
   Real cutoffs move every year and differ further by category
   (OBC/SC/ST/EWS), Home-State vs Other-State quota (NITs), and
   round. Always cross-check the exact number for your year on
   josaa.nic.in before finalising choices.

   examType: 'advanced' → compare against a JEE Advanced rank
             'main'     → compare against a JEE Main AIR
                          (derived from percentile)
   ============================================================ */

const COLLEGES = {

  /* ============================ IITs ============================ */

  /* ── IIT Tier 1 — Bombay/Delhi/Madras + older IITs ── */
  iitb: {
    name: 'IIT Bombay', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 70, 'Electrical Engg': 500, 'Mech Engg': 1800, 'Civil Engg': 3000, 'Chemical Engg': 2800 }
  },
  iitd: {
    name: 'IIT Delhi', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 120, 'Electrical Engg': 550, 'Mech Engg': 2000, 'Civil Engg': 3200, 'Chemical Engg': 3000 }
  },
  iitm: {
    name: 'IIT Madras', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 160, 'Electrical Engg': 600, 'Mech Engg': 2100, 'Civil Engg': 3300, 'Aerospace Engg': 2600 }
  },
  iitk: {
    name: 'IIT Kanpur', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 350, 'Electrical Engg': 900, 'Mech Engg': 2600, 'Civil Engg': 3800, 'Chemical Engg': 3500 }
  },
  iitkgp: {
    name: 'IIT Kharagpur', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 500, 'Electrical Engg': 1100, 'Mech Engg': 3000, 'Civil Engg': 4200, 'Chemical Engg': 3900 }
  },
  iitr: {
    name: 'IIT Roorkee', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 700, 'Electrical Engg': 1400, 'Mech Engg': 3400, 'Civil Engg': 4600, 'Biotechnology': 5200 }
  },
  iitg: {
    name: 'IIT Guwahati', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 900, 'Electrical Engg': 1700, 'Mech Engg': 3700, 'Civil Engg': 5000 }
  },
  iitbhu: {
    name: 'IIT (BHU) Varanasi', tier: 'IIT Tier 1', examType: 'advanced',
    branches: { 'CSE': 1100, 'Electrical Engg': 2000, 'Mech Engg': 4000, 'Civil Engg': 5300 }
  },

  /* ── IIT Tier 2 — established 2008-2016 IITs ── */
  iith: {
    name: 'IIT Hyderabad', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 1300, 'Electrical Engg': 2200, 'Mech Engg': 4300, 'Civil Engg': 5600 }
  },
  iiti: {
    name: 'IIT Indore', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 1500, 'Electrical Engg': 2400, 'Mech Engg': 4500, 'Civil Engg': 5800 }
  },
  iitism: {
    name: 'IIT (ISM) Dhanbad', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 1700, 'Electrical Engg': 2600, 'Mech Engg': 4700, 'Civil Engg': 5600, 'Mining Engg': 6200 }
  },
  iitbbs: {
    name: 'IIT Bhubaneswar', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 2000, 'Electrical Engg': 2900, 'Mech Engg': 5000, 'Civil Engg': 6000 }
  },
  iitmandi: {
    name: 'IIT Mandi', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 2200, 'Electrical Engg': 3100, 'Mech Engg': 5200, 'Civil Engg': 6100 }
  },
  iitgn: {
    name: 'IIT Gandhinagar', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 2400, 'Electrical Engg': 3300, 'Mech Engg': 5400, 'Civil Engg': 6200 }
  },
  iitp: {
    name: 'IIT Patna', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 2600, 'Electrical Engg': 3500, 'Mech Engg': 5600, 'Civil Engg': 6300 }
  },
  iitrpr: {
    name: 'IIT Ropar', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 2800, 'Electrical Engg': 3700, 'Mech Engg': 5800, 'Civil Engg': 6400 }
  },
  iitj: {
    name: 'IIT Jodhpur', tier: 'IIT Tier 2', examType: 'advanced',
    branches: { 'CSE': 3000, 'Electrical Engg': 3900, 'Mech Engg': 6000, 'Civil Engg': 6500 }
  },

  /* ── IIT Tier 3 — newest IITs (2015-16 batch) ── */
  iitbhilai: {
    name: 'IIT Bhilai', tier: 'IIT Tier 3', examType: 'advanced',
    branches: { 'CSE': 4000, 'Electrical Engg': 4800, 'Mech Engg': 6600, 'Civil Engg': 7200 }
  },
  iitgoa: {
    name: 'IIT Goa', tier: 'IIT Tier 3', examType: 'advanced',
    branches: { 'CSE': 4300, 'Electrical Engg': 5100, 'Mech Engg': 6800, 'Civil Engg': 7300 }
  },
  iitpkd: {
    name: 'IIT Palakkad', tier: 'IIT Tier 3', examType: 'advanced',
    branches: { 'CSE': 4600, 'Electrical Engg': 5400, 'Mech Engg': 7000, 'Civil Engg': 7400 }
  },
  iittp: {
    name: 'IIT Tirupati', tier: 'IIT Tier 3', examType: 'advanced',
    branches: { 'CSE': 5000, 'Electrical Engg': 5700, 'Mech Engg': 7200, 'Civil Engg': 7600 }
  },
  iitjammu: {
    name: 'IIT Jammu', tier: 'IIT Tier 3', examType: 'advanced',
    branches: { 'CSE': 5500, 'Electrical Engg': 6000, 'Mech Engg': 7500, 'Civil Engg': 7800 }
  },
  iitdh: {
    name: 'IIT Dharwad', tier: 'IIT Tier 3', examType: 'advanced',
    branches: { 'CSE': 6000, 'Electrical Engg': 6300, 'Mech Engg': 7800, 'Civil Engg': 8000 }
  },

  /* ============================ NITs ============================ */
  /* NITs use JEE Main AIR (CRL). Bands below are a blended
     Home-State/Other-State approximation for illustration. */

  /* ── NIT Tier 1 — the four most sought-after NITs ── */
  nitt: {
    name: 'NIT Trichy', tier: 'NIT Tier 1', examType: 'main',
    branches: { 'CSE': 2500, 'Electrical Engg': 6000, 'Mech Engg': 16000, 'Civil Engg': 22000 }
  },
  nitw: {
    name: 'NIT Warangal', tier: 'NIT Tier 1', examType: 'main',
    branches: { 'CSE': 2800, 'Electrical Engg': 6500, 'Mech Engg': 17000, 'Civil Engg': 23000 }
  },
  nitk: {
    name: 'NIT Surathkal', tier: 'NIT Tier 1', examType: 'main',
    branches: { 'CSE': 3200, 'Electrical Engg': 7000, 'Mech Engg': 18000, 'Civil Engg': 24000 }
  },
  nitrkl: {
    name: 'NIT Rourkela', tier: 'NIT Tier 1', examType: 'main',
    branches: { 'CSE': 5500, 'Electrical Engg': 9000, 'Mech Engg': 22000, 'Civil Engg': 28000 }
  },

  /* ── NIT Tier 2 — strong mid-tier NITs ── */
  nitc: {
    name: 'NIT Calicut', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 8000, 'Electrical Engg': 15000, 'Mech Engg': 32000, 'Civil Engg': 38000 }
  },
  nitdgp: {
    name: 'NIT Durgapur', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 10000, 'Electrical Engg': 17000, 'Mech Engg': 34000, 'Civil Engg': 40000 }
  },
  nitkkr: {
    name: 'NIT Kurukshetra', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 11000, 'Electrical Engg': 18000, 'Mech Engg': 35000, 'Civil Engg': 41000 }
  },
  vnit: {
    name: 'VNIT Nagpur', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 9000, 'Electrical Engg': 16000, 'Mech Engg': 33000, 'Civil Engg': 39000 }
  },
  mnitj: {
    name: 'MNIT Jaipur', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 12000, 'Electrical Engg': 19000, 'Mech Engg': 36000, 'Civil Engg': 42000 }
  },
  mnnit: {
    name: 'MNNIT Allahabad', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 13000, 'Electrical Engg': 20000, 'Mech Engg': 37000, 'Civil Engg': 43000 }
  },
  manit: {
    name: 'MANIT Bhopal', tier: 'NIT Tier 2', examType: 'main',
    branches: { 'CSE': 14000, 'Electrical Engg': 21000, 'Mech Engg': 38000, 'Civil Engg': 44000 }
  },

  /* ── NIT Tier 3 — remaining NITs ── */
  nitsilchar: {
    name: 'NIT Silchar', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 26000, 'Electrical Engg': 37000, 'Mech Engg': 58000, 'Civil Engg': 65000 }
  },
  nith: {
    name: 'NIT Hamirpur', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 28000, 'Electrical Engg': 39000, 'Mech Engg': 60000, 'Civil Engg': 67000 }
  },
  nitj: {
    name: 'NIT Jalandhar', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 24000, 'Electrical Engg': 35000, 'Mech Engg': 55000, 'Civil Engg': 62000 }
  },
  nitp: {
    name: 'NIT Patna', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 30000, 'Electrical Engg': 41000, 'Mech Engg': 62000, 'Civil Engg': 69000 }
  },
  nitrr: {
    name: 'NIT Raipur', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 32000, 'Electrical Engg': 43000, 'Mech Engg': 64000, 'Civil Engg': 71000 }
  },
  nitsri: {
    name: 'NIT Srinagar', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 45000, 'Electrical Engg': 55000, 'Mech Engg': 75000, 'Civil Engg': 85000 }
  },
  nitag: {
    name: 'NIT Agartala', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 42000, 'Electrical Engg': 52000, 'Mech Engg': 72000, 'Civil Engg': 82000 }
  },
  nituk: {
    name: 'NIT Uttarakhand', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 55000, 'Electrical Engg': 65000, 'Mech Engg': 85000, 'Civil Engg': 95000 }
  },
  nitdelhi: {
    name: 'NIT Delhi', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 50000, 'Electrical Engg': 60000, 'Mech Engg': 80000, 'Civil Engg': 90000 }
  },
  nitgoa: {
    name: 'NIT Goa', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 48000, 'Electrical Engg': 58000, 'Mech Engg': 78000, 'Civil Engg': 88000 }
  },
  nitmanipur: {
    name: 'NIT Manipur', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 60000, 'Electrical Engg': 70000, 'Mech Engg': 90000, 'Civil Engg': 1.0e5 }
  },
  nitmeghalaya: {
    name: 'NIT Meghalaya', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 58000, 'Electrical Engg': 68000, 'Mech Engg': 88000, 'Civil Engg': 98000 }
  },
  nitmizoram: {
    name: 'NIT Mizoram', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 62000, 'Electrical Engg': 72000, 'Mech Engg': 92000, 'Civil Engg': 1.02e5 }
  },
  nitnagaland: {
    name: 'NIT Nagaland', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 63000, 'Electrical Engg': 73000, 'Mech Engg': 93000, 'Civil Engg': 1.03e5 }
  },
  nitpuducherry: {
    name: 'NIT Puducherry', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 52000, 'Electrical Engg': 62000, 'Mech Engg': 82000, 'Civil Engg': 92000 }
  },
  nitsikkim: {
    name: 'NIT Sikkim', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 61000, 'Electrical Engg': 71000, 'Mech Engg': 91000, 'Civil Engg': 1.01e5 }
  },
  nitap: {
    name: 'NIT Andhra Pradesh', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 47000, 'Electrical Engg': 57000, 'Mech Engg': 77000, 'Civil Engg': 87000 }
  },
  nitarunachal: {
    name: 'NIT Arunachal Pradesh', tier: 'NIT Tier 3', examType: 'main',
    branches: { 'CSE': 65000, 'Electrical Engg': 75000, 'Mech Engg': 95000, 'Civil Engg': 1.05e5 }
  },

  /* ============================ IIITs ============================ */
  /* IIITs (the 5 original, JEE Main-based, "IIIT" institutes) also use JEE Main AIR */
  iiith: {
    name: 'IIIT Hyderabad', tier: 'IIIT', examType: 'main',
    branches: { 'CSE': 350, 'ECE': 1800, 'CSD': 900 }
  },
  iiitd: {
    name: 'IIIT Delhi', tier: 'IIIT', examType: 'main',
    branches: { 'CSE': 1500, 'ECE': 4000, 'CSAM': 2800 }
  },
  iiitb: {
    name: 'IIIT Bangalore', tier: 'IIIT', examType: 'main',
    branches: { 'CSE': 2500, 'ECE': 5500 }
  },
     iiita: {
    name: 'IIIT Allahabad', tier: 'IIIT', examType: 'main',
    branches: { 'IT-BIn':4100, 'IT': 4700,'ECE':6700 }
  },
  iiitv: {
    name: 'IIIT Vadodara', tier: 'IIIT', examType: 'main',
    branches: { 'CSE': 6000, 'ECE': 12000 }
  },
  iiitna: {
    name: 'IIIT Naya Raipur', tier: 'IIIT', examType: 'main',
    branches: { 'CSE': 9000, 'ECE': 18000 }
  },
   iiita: {
    name: 'IIIT Allahabad', tier: 'IIIT', examType: 'main',
    branches: { 'CSE': 9000, 'IT': 18000 }
  },

};

/* ------------------------------------------------------------
   Percentile → estimated JEE Main AIR (Common Rank List).
   Formula NTA/JoSAA analysts use: Rank ≈ (100 − percentile) / 100 × Total Candidates
   TOTAL_CANDIDATES is an editable assumption (recent years: ~11-13 lakh unique candidates).
   ------------------------------------------------------------ */
const TOTAL_JEE_MAIN_CANDIDATES = 1200000; // ~12 lakh, adjust as NTA updates candidate counts

function percentileToRank(percentile) {
  var p = Math.max(0, Math.min(100, percentile));
  var rank = Math.round(((100 - p) / 100) * TOTAL_JEE_MAIN_CANDIDATES);
  return Math.max(1, rank);
}