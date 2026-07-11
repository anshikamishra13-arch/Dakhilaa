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
  iitk: {
    name: 'IIT Kanpur',
    tier: 'IIT Tier 1',
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
    tier: 'IIT Tier 1',
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
    tier: 'IIT Tier 1',
    branches: {
      'CSE':              260,
      'Electrical Engg':  255,
      'Mech Engg':        240,
      'Civil Engg':       230,
    }
  },
  iitg: {
    name: 'IIT Guwahati',
    tier: 'IIT Tier 1',
    branches: {
      'CSE':              250,
      'Electrical Engg':  245,
      'Mech Engg':        230,
      'Civil Engg':       220,
    }
  },
  iitbh: {
    name: 'IIT BHU',
    tier: 'IIT Tier 1',
    branches: {
      'CSE':              245,
      'Electrical Engg':  240,
      'Mech Engg':        225,
      'Civil Engg':       215,
    }
  },  
  iitkh: {
    name: 'IIT Kharagpur',
    tier: 'IIT Tier 1',
    branches:{ 
      'CSE':              235,
      'Electrical Engg':  230,
      'Mech Engg':        215,
      'Civil Engg':       205,
    }
  },

  /* ── IIT Tier 2 ──────────────────────────────────────────── */
  iiti: {
    name: 'IIT Indore',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              250,
      'Electrical Engg':  245,
      'Mech Engg':        230,
      'Civil Engg':       220,
    }
  },
  iitbhub: {
    name: 'IIT Bhubaneswar',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              245,
      'Electrical Engg':  240,
      'Mech Engg':        225,
      'Civil Engg':       215,
    }
  },
  iitMandi: {
    name: 'IIT Mandi',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              240,
      'Electrical Engg':  235,
      'Mech Engg':        220,
      'Civil Engg':       210,
    }
  },
  iitga: {
    name: 'IIT Gandhinagar',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              235,
      'Electrical Engg':  230,
      'Mech Engg':        215,
      'Civil Engg':       205,
    }
  },
  iitpat: {
    name: 'IIT Patna',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              230,
      'Electrical Engg':  225,
      'Mech Engg':        210,
      'Civil Engg':       200,
    }
  },
  iitdh: {
    name: 'IIT Dharwad',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              225,
      'Electrical Engg':  220,
      'Mech Engg':        205,
      'Civil Engg':       195,
    }
  },
  iitj: {
    name: 'IIT Jodhpur',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              220,
      'Electrical Engg':  215,
      'Mech Engg':        200,
      'Civil Engg':       190,
    }
  },
  iitrop: {
    name: 'IIT Ropar',
    tier: 'IIT Tier 2',
    branches: {
      'CSE':              215,
      'Electrical Engg':  210,
      'Mech Engg':        195,
      'Civil Engg':       185,
    }
  },

  /* ── IIT Tier 3 ──────────────────────────────────────────── */
  iitp: {
    name: 'IIT Palakkad',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              210,
      'Electrical Engg':  205,  
    }
  },
  iitbhilai: {
    name: 'IIT Bhilai',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              205,
      'Electrical Engg':  200,
      'Mech Engg':        185,
      'Civil Engg':       175,
    }
  },
  iitjammu: {
    name: 'IIT Jammu',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              200,
      'Electrical Engg':  195,
      'Mech Engg':        180,
      'Civil Engg':       170,
      'Chemical Engg':    165,
    }
  },
  iittirupati: {
    name: 'IIT Tirupati',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              200,
      'Electrical Engg':  195,
      'Mech Engg':        180,
      'Civil Engg':       170,
      'Chemical Engg':    165,
    }
  },
  iitgoa: {
    name: 'IIT Goa',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              200,
      'Electrical Engg':  195,
      'Mech Engg':        180,
      'Civil Engg':       170,
      'Chemical Engg':    165,
    }
  },
  iitdh:{
    name: 'IIT Dharwad',
    tier: 'IIT Tier 3',
    branches: {
      'CSE':              225,
      'Electrical Engg':  220,
      'Mech Engg':        205,
      'Civil Engg':       195,
    }
  },
  
  /* ── NIT Tier 1 ──────────────────────────────────────────── */
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