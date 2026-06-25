/* ============================================================
   colleges.js — College data & JEE cutoff scores
   Source: JEE Advanced / JoSAA historical cutoffs (General category)
   All scores are out of 360 (JEE Advanced scale)
   ============================================================ */

const COLLEGES = {
  /* ── IIT Tier 1 ──────────────────────────────────────────── */
  iitb: {
    name: 'IIT Bombay',
    tier: 'IIT Tier 1',
    branches: {
      'CSE':              340,
      'Electrical Engg':  335,
      'Mech Engg':        320,
      'Civil Engg':       310,
      'Chemical Engg':    305,
    }
  },
  iitd: {
    name: 'IIT Delhi',
    tier: 'IIT Tier 1',
    branches: {
      'CSE':              320,
      'Electrical Engg':  315,
      'Mech Engg':        300,
      'Civil Engg':       290,
      'Chemical Engg':    285,
    }
  },
  iitm: {
    name: 'IIT Madras',
    tier: 'IIT Tier 1',
    branches: {
      'CSE':              300,
      'Electrical Engg':  295,
      'Mech Engg':        280,
      'Civil Engg':       270,
      'Aerospace Engg':   268,
    }
  },

  /* ── IIT Tier 2 ──────────────────────────────────────────── */
  iitk: {
    name: 'IIT Kanpur',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              290,
      'Electrical Engg':  285,
      'Mech Engg':        270,
      'Civil Engg':       260,
      'Chemical Engg':    255,
    }
  },
  iitr: {
    name: 'IIT Roorkee',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              280,
      'Electrical Engg':  275,
      'Mech Engg':        260,
      'Civil Engg':       250,
      'Biotechnology':    230,
    }
  },
  iith: {
    name: 'IIT Hyderabad',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              260,
      'Electrical Engg':  255,
      'Mech Engg':        240,
      'Civil Engg':       230,
    }
  },

  /* ── IIT Tier 3 ──────────────────────────────────────────── */
  iiti: {
    name: 'IIT Indore',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              250,
      'Electrical Engg':  245,
      'Mech Engg':        230,
      'Civil Engg':       220,
    }
  },
  iitbhu: {
    name: 'IIT BHU',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              245,
      'Electrical Engg':  240,
      'Mech Engg':        225,
      'Civil Engg':       215,
    }
  },
  iitg: {
    name: 'IIT Guwahati',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              240,
      'Electrical Engg':  235,
      'Mech Engg':        220,
      'Civil Engg':       210,
    }
  },
  iitkhg: {
    name: 'IIT Kharagpur',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              235,
      'Electrical Engg':  230,
      'Mech Engg':        215,
      'Civil Engg':       205,
    }
  },

  /* ── NIT Tier 1 ──────────────────────────────────────────── */
  nitt: {
    name: 'NIT Trichy',
    tier: 'NIT Tier 1',
    branches: {
      'CSE':              200,
      'Electrical Engg':  195,
      'Mech Engg':        180,
      'Civil Engg':       170,
      'Chemical Engg':    165,
    }
  },
  nitw: {
    name: 'NIT Warangal',
    tier: 'NIT Tier 1',
    branches: {
      'CSE':              185,
      'Electrical Engg':  180,
      'Mech Engg':        165,
      'Civil Engg':       155,
    }
  },
  nitk: {
    name: 'NIT Surathkal',
    tier: 'NIT Tier 1',
    branches: {
      'CSE':              175,
      'Electrical Engg':  170,
      'Mech Engg':        155,
      'Civil Engg':       145,
    }
  },

  /* ── NIT Tier 2 ──────────────────────────────────────────── */
  nitc: {
    name: 'NIT Calicut',
    tier: 'NIT Tier 2',
    branches: {
      'CSE':              165,
      'Electrical Engg':  160,
      'Mech Engg':        145,
      'Civil Engg':       135,
    }
  },
  nitd: {
    name: 'NIT Delhi',
    tier: 'NIT Tier 2',
    branches: {
      'CSE':              170,
      'Electrical Engg':  165,
      'Mech Engg':        150,
      'Civil Engg':       140,
    }
  },
  nitr: {
    name: 'NIT Rourkela',
    tier: 'NIT Tier 2',
    branches: {
      'CSE':              160,
      'Electrical Engg':  155,
      'Mech Engg':        140,
      'Civil Engg':       130,
    }
  },

  /* ── IIIT ────────────────────────────────────────────────── */
  iiith: {
    name: 'IIIT Hyderabad',
    tier: 'IIIT',
    branches: {
      'CSE':              190,
      'ECE':              185,
      'CSD':              180,
    }
  },
  iiitd: {
    name: 'IIIT Delhi',
    tier: 'IIIT',
    branches: {
      'CSE':              180,
      'ECE':              175,
      'CSAM':             170,
    }
  },
};