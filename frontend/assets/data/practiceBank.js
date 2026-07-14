/* ============================================================
   practiceBank.js — Extra practice questions grouped by topic.
   Topic keys match the topic names used in diagnostic.html so a
   student's weak topics map directly onto a daily practice set.
   ============================================================ */

const PRACTICE_BANK = {
  'Kinematics': [
    { text: 'A ball is thrown vertically upward with speed 20 m/s (g=10 m/s²). Time to return to the point of projection:', opts: ['1 s', '2 s', '4 s', '8 s'], ans: 2 },
    { text: 'A car accelerates from rest at 3 m/s² for 4 s. Distance covered:', opts: ['12 m', '24 m', '36 m', '48 m'], ans: 1 },
  ],
  'Laws of Motion': [
    { text: 'Two blocks of 3 kg and 2 kg are connected by a string over a frictionless pulley. Acceleration of the system (g=10):', opts: ['1 m/s²', '2 m/s²', '3 m/s²', '4 m/s²'], ans: 1 },
    { text: 'A rocket expels gas at 500 m/s and loses mass at 10 kg/s. Thrust force on the rocket:', opts: ['500 N', '1000 N', '5000 N', '10000 N'], ans: 2 },
  ],
  'Work & Energy': [
    { text: 'A spring with k=200 N/m is compressed 0.1 m. Elastic PE stored:', opts: ['0.5 J', '1 J', '2 J', '4 J'], ans: 1 },
    { text: 'A 1000 kg car moving at 20 m/s brakes to rest. Work done by friction:', opts: ['-100 kJ', '-200 kJ', '-400 kJ', '-800 kJ'], ans: 1 },
  ],
  'Gravitation': [
    { text: 'Orbital velocity of a satellite close to Earth\'s surface is approximately:', opts: ['5.6 km/s', '7.9 km/s', '9.8 km/s', '11.2 km/s'], ans: 1 },
    { text: 'If Earth\'s radius doubled keeping mass constant, surface gravity would become:', opts: ['2×', '4×', '1/2×', '1/4×'], ans: 3 },
  ],
  'Thermodynamics': [
    { text: 'For an isothermal process on an ideal gas:', opts: ['ΔU = 0', 'ΔQ = 0', 'W = 0', 'ΔP = 0'], ans: 0 },
    { text: 'Efficiency of a Carnot engine operating between 400K and 300K:', opts: ['20%', '25%', '30%', '75%'], ans: 1 },
  ],
  'Waves': [
    { text: 'Two waves of frequency 256 Hz and 260 Hz produce beats at a rate of:', opts: ['2 Hz', '4 Hz', '6 Hz', '8 Hz'], ans: 1 },
    { text: 'The fundamental frequency of a string fixed at both ends depends on:', opts: ['Length only', 'Tension only', 'Length, tension and mass per length', 'Amplitude'], ans: 2 },
  ],
  'Electrostatics': [
    { text: 'Two charges of +2μC and -2μC placed 1 m apart form a dipole of moment:', opts: ['1 μC·m', '2 μC·m', '4 μC·m', '0.5 μC·m'], ans: 1 },
    { text: 'Electric potential due to a point charge at infinity is:', opts: ['Maximum', 'Zero', 'Undefined', 'Negative'], ans: 1 },
  ],
  'Current Electricity': [
    { text: 'Two resistors of 4Ω and 6Ω are connected in parallel. Equivalent resistance:', opts: ['2.4 Ω', '5 Ω', '10 Ω', '24 Ω'], ans: 0 },
    { text: 'In a Wheatstone bridge, the galvanometer shows zero deflection when the bridge is:', opts: ['Overloaded', 'Balanced', 'Short circuited', 'Open circuited'], ans: 1 },
  ],
  'Optics': [
    { text: 'A convex lens of focal length 20 cm forms a real image at 40 cm. Object distance is:', opts: ['20 cm', '30 cm', '40 cm', '60 cm'], ans: 1 },
    { text: 'The critical angle for total internal reflection decreases when refractive index:', opts: ['Increases', 'Decreases', 'Stays same', 'Becomes 1'], ans: 0 },
  ],
  'Modern Physics': [
    { text: 'The de Broglie wavelength of a particle is inversely proportional to its:', opts: ['Charge', 'Momentum', 'Energy', 'Mass only'], ans: 1 },
    { text: 'In Bohr\'s model, the radius of the nth orbit of hydrogen is proportional to:', opts: ['n', 'n²', '1/n', '1/n²'], ans: 1 },
  ],
  'Mole Concept': [
    { text: 'Number of moles in 22g of CO₂ (molar mass 44 g/mol):', opts: ['0.25', '0.5', '1', '2'], ans: 1 },
    { text: 'Volume occupied by 1 mole of an ideal gas at STP:', opts: ['11.2 L', '22.4 L', '44.8 L', '1 L'], ans: 1 },
  ],
  'Periodic Table': [
    { text: 'Atomic radius generally decreases across a period because of:', opts: ['Decreasing nuclear charge', 'Increasing nuclear charge pulling electrons in', 'Addition of new shells', 'Increasing shielding'], ans: 1 },
    { text: 'Which of these has the largest atomic radius?', opts: ['Li', 'Na', 'K', 'Cs'], ans: 3 },
  ],
  'Chemical Bonding': [
    { text: 'The hybridization of carbon in CH₄ is:', opts: ['sp', 'sp²', 'sp³', 'sp³d'], ans: 2 },
    { text: 'Which molecule is non-polar despite having polar bonds?', opts: ['H₂O', 'NH₃', 'CO₂', 'HCl'], ans: 2 },
  ],
  'Thermochemistry': [
    { text: 'Standard enthalpy of formation of an element in its standard state is:', opts: ['Always positive', 'Always negative', 'Zero', 'Undefined'], ans: 2 },
    { text: 'Hess\'s Law is a consequence of which property of enthalpy?', opts: ['It is a path function', 'It is a state function', 'It is always negative', 'It depends on rate'], ans: 1 },
  ],
  'Equilibrium': [
    { text: 'Increasing pressure on N₂ + 3H₂ ⇌ 2NH₃ shifts equilibrium towards:', opts: ['Reactants', 'Products', 'No shift', 'Cannot be determined'], ans: 1 },
    { text: 'A catalyst affects chemical equilibrium by:', opts: ['Shifting it towards products', 'Shifting it towards reactants', 'Not shifting position, only reaching it faster', 'Increasing Keq'], ans: 2 },
  ],
  'Organic Chemistry': [
    { text: 'The functional group -COOH is called:', opts: ['Aldehyde', 'Ketone', 'Carboxylic acid', 'Ester'], ans: 2 },
    { text: 'Markovnikov\'s rule applies to addition of HX to:', opts: ['Symmetrical alkenes', 'Unsymmetrical alkenes', 'Alkanes', 'Aromatic rings'], ans: 1 },
  ],
  'Electrochemistry': [
    { text: 'In a galvanic cell, reduction occurs at the:', opts: ['Anode', 'Cathode', 'Salt bridge', 'External wire'], ans: 1 },
    { text: 'The SI unit of molar conductivity is:', opts: ['S m² mol⁻¹', 'S m⁻¹', 'S mol⁻¹', 'Ω m'], ans: 0 },
  ],
  'Coordination': [
    { text: 'The coordination number of Ni in [Ni(NH₃)₄]²⁺ is:', opts: ['2', '4', '6', '8'], ans: 1 },
    { text: 'Ligands that donate through two atoms are called:', opts: ['Unidentate', 'Bidentate', 'Ambidentate', 'Polydentate'], ans: 1 },
  ],
  'p-Block Elements': [
    { text: 'Which p-block element shows the anomalous inert-pair effect most prominently?', opts: ['Boron', 'Carbon', 'Lead (Pb)', 'Silicon'], ans: 2 },
    { text: 'The shape of NH₃ molecule is:', opts: ['Trigonal planar', 'Pyramidal', 'Tetrahedral', 'Linear'], ans: 1 },
  ],
  'Reaction Kinetics': [
    { text: 'For a zero-order reaction, the rate is:', opts: ['Independent of concentration', 'Directly proportional to concentration', 'Inversely proportional to concentration', 'Proportional to concentration squared'], ans: 0 },
    { text: 'The unit of rate constant for a second-order reaction is:', opts: ['mol L⁻¹ s⁻¹', 's⁻¹', 'L mol⁻¹ s⁻¹', 'mol² L⁻² s⁻¹'], ans: 2 },
  ],
  'Quadratic Equations': [
    { text: 'If the roots of x² - (a+1)x + a = 0 are equal, then a =', opts: ['0 only', '1 only', '0 or 1', 'No solution'], ans: 2 },
    { text: 'Sum of roots of 2x² - 6x + 4 = 0 is:', opts: ['2', '3', '-3', '4'], ans: 1 },
  ],
  'Trigonometry': [
    { text: 'The value of tan(45°) + tan(30°) is:', opts: ['1 + √3', '1 + 1/√3', '2', '√3'], ans: 1 },
    { text: 'If sin θ = 3/5 and θ is acute, cos θ equals:', opts: ['3/5', '4/5', '5/4', '5/3'], ans: 1 },
  ],
  'Sequences & Series': [
    { text: 'The sum of an infinite GP with first term 4 and ratio 1/2 is:', opts: ['4', '6', '8', '16'], ans: 2 },
    { text: 'The 10th term of an AP with a=3, d=2 is:', opts: ['19', '21', '23', '25'], ans: 1 },
  ],
  'Limits': [
    { text: 'lim(x→∞) (1 + 1/x)^x equals:', opts: ['1', 'e', '∞', '0'], ans: 1 },
    { text: 'lim(x→2) (x² - 4)/(x - 2) equals:', opts: ['0', '2', '4', 'Undefined'], ans: 2 },
  ],
  'Differentiation': [
    { text: 'd/dx (sin x · cos x) equals:', opts: ['cos 2x', '-cos 2x', 'sin 2x', '-sin 2x'], ans: 0 },
    { text: 'If y = ln(x), dy/dx equals:', opts: ['x', '1/x', 'ln(x)', 'eˣ'], ans: 1 },
  ],
  'Integration': [
    { text: '∫ eˣ dx equals:', opts: ['eˣ + C', 'xeˣ + C', 'eˣ/x + C', 'ln(x) + C'], ans: 0 },
    { text: '∫₀^(π/2) sin x dx equals:', opts: ['0', '1', 'π/2', '-1'], ans: 1 },
  ],
  'Matrices': [
    { text: 'If A is a 3×3 matrix with |A| = 5, then |2A| equals:', opts: ['10', '20', '40', '5'], ans: 2 },
    { text: 'The product of a matrix and its inverse is always:', opts: ['Zero matrix', 'Identity matrix', 'Transpose', 'Diagonal matrix with random entries'], ans: 1 },
  ],
  'Probability': [
    { text: 'A card is drawn from a standard deck. Probability it is a king:', opts: ['1/13', '1/26', '1/52', '4/13'], ans: 0 },
    { text: 'Two events A and B are independent if P(A∩B) equals:', opts: ['P(A) + P(B)', 'P(A) × P(B)', 'P(A) - P(B)', 'P(A|B)'], ans: 1 },
  ],
  'Coordinate Geometry': [
    { text: 'The slope of the line joining (2,3) and (6,11) is:', opts: ['1', '2', '3', '4'], ans: 1 },
    { text: 'The equation x² + y² = 25 represents a circle of radius:', opts: ['5', '10', '25', '√25'], ans: 0 },
  ],
  '3D Geometry': [
    { text: 'The distance between the points (1,2,3) and (4,6,3) is:', opts: ['3', '5', '7', '9'], ans: 1 },
    { text: 'A line has direction ratios (1,1,1). Its direction cosines are each:', opts: ['1', '1/√3', '1/3', '√3'], ans: 1 },
  ],
};