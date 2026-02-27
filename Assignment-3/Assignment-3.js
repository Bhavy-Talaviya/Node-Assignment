const express = require("express");
const app = express();
app.use(express.json());


//All States Data:- 
const states = [
  { id: 1, name: "Andhra Pradesh", population: 49386799, literacyRate: 67.02, annualBudget: 279279, gdp: 14000000 },
  { id: 2, name: "Arunachal Pradesh", population: 1383727, literacyRate: 65.38, annualBudget: 28000, gdp: 300000 },
  { id: 3, name: "Assam", population: 31205576, literacyRate: 72.19, annualBudget: 122000, gdp: 4500000 },
  { id: 4, name: "Bihar", population: 104099452, literacyRate: 61.80, annualBudget: 261885, gdp: 6500000 },
  { id: 5, name: "Chhattisgarh", population: 25545198, literacyRate: 70.28, annualBudget: 121500, gdp: 4000000 },
  { id: 6, name: "Goa", population: 1458545, literacyRate: 88.70, annualBudget: 25000, gdp: 800000 },
  { id: 7, name: "Gujarat", population: 63872399, literacyRate: 78.03, annualBudget: 243965, gdp: 21000000 },
  { id: 8, name: "Haryana", population: 25351462, literacyRate: 75.55, annualBudget: 180000, gdp: 9000000 },
  { id: 9, name: "Himachal Pradesh", population: 6864602, literacyRate: 82.80, annualBudget: 50000, gdp: 2000000 },
  { id: 10, name: "Jharkhand", population: 32988134, literacyRate: 66.41, annualBudget: 110000, gdp: 4500000 },
  { id: 11, name: "Karnataka", population: 61095297, literacyRate: 75.36, annualBudget: 275000, gdp: 18000000 },
  { id: 12, name: "Kerala", population: 33406061, literacyRate: 94.00, annualBudget: 150000, gdp: 12000000 },
  { id: 13, name: "Madhya Pradesh", population: 72626809, literacyRate: 69.32, annualBudget: 240000, gdp: 10000000 },
  { id: 14, name: "Maharashtra", population: 112374333, literacyRate: 82.34, annualBudget: 340000, gdp: 35000000 },
  { id: 15, name: "Manipur", population: 2855794, literacyRate: 79.85, annualBudget: 32000, gdp: 600000 },
  { id: 16, name: "Meghalaya", population: 2966889, literacyRate: 75.48, annualBudget: 30000, gdp: 500000 },
  { id: 17, name: "Mizoram", population: 1097206, literacyRate: 91.33, annualBudget: 25000, gdp: 400000 },
  { id: 18, name: "Nagaland", population: 1978502, literacyRate: 79.55, annualBudget: 27000, gdp: 500000 },
  { id: 19, name: "Odisha", population: 41974218, literacyRate: 72.87, annualBudget: 200000, gdp: 8000000 },
  { id: 20, name: "Punjab", population: 27743338, literacyRate: 75.84, annualBudget: 180000, gdp: 11000000 },
  { id: 21, name: "Rajasthan", population: 68548437, literacyRate: 66.11, annualBudget: 225000, gdp: 14000000 },
  { id: 22, name: "Sikkim", population: 610577, literacyRate: 81.42, annualBudget: 15000, gdp: 200000 },
  { id: 23, name: "Tamil Nadu", population: 72147030, literacyRate: 80.09, annualBudget: 300000, gdp: 22000000 },
  { id: 24, name: "Telangana", population: 35003674, literacyRate: 72.80, annualBudget: 290000, gdp: 15000000 },
  { id: 25, name: "Tripura", population: 3673917, literacyRate: 87.22, annualBudget: 25000, gdp: 700000 },
  { id: 26, name: "Uttar Pradesh", population: 199812341, literacyRate: 67.68, annualBudget: 350000, gdp: 25000000 },
  { id: 27, name: "Uttarakhand", population: 10086292, literacyRate: 78.82, annualBudget: 60000, gdp: 3000000 },
  { id: 28, name: "West Bengal", population: 91276115, literacyRate: 76.26, annualBudget: 310000, gdp: 16000000 }
];



//Server Running Code:-
app.get("/", (req, res) => {
  res.send("Express server is running");
});


//[Routes-1]Return all states:-
app.get("/states", (req, res) => {
  res.status(200).json(states);
});


//[Routes-3]Return the state with the highest GDP:-
app.get("/states/highest-gdp", (req, res) => {
  if (!states || states.length === 0) {
    return res.status(404).json({ message: "No states available" });
  }
 //Find HighestGdpState:-
    let highestGdpState = states[0];
     for (let i = 0; i < states.length; i++) {
       if (states[i].gdp > highestGdpState.gdp) {
         highestGdpState = states[i];
       }
     }
    res.status(200).json(highestGdpState);
});


//[Routes-2]Return a single state by ID:-
app.get("/states/:id", (req, res) => {
  const statesId = Number(req.params.id);
  const state = states.find(u => u.id === statesId);
  if (!state) {
    return res.status(404).json({ message: "states Are not found"});
  }
  res.status(200).json(state);
});


//[Routes-4]Add a new state record:-
app.post("/states", (req, res) => {
  const newstates = {
    id: states.length + 1,
    name: req.body.name,
    population: req.body.population,
    literacyRate: req.body.literacyRate,
    annualBudget: req.body.annualBudget,
    gdp: req.body.gdp
   };
   states.push(newstates);
 //Add Status Message:-
   res.status(201).json({
     message: "Add Newstates",
     states: newstates
   });
});


//[Routes-5]Replace entire state Record:-
app.put("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = states.findIndex(s => s.id === id);
 //Send Message:-
  if (index === -1) {
    return res.status(404).json({ message: "State not found" });
  }
 //Replace State:-
  states[index] = {
    id: id,
    name: req.body.name,
    population: req.body.population,
    literacyRate: req.body.literacyRate,
    annualBudget: req.body.annualBudget,
    gdp: req.body.gdp
  };
 //Send Message To State Replaced:- 
  res.status(200).json(states[index]);
});


//[Routes-6]Replace annualBudget value:-
app.put("/states/:id/budget", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);
 //Check if State exists:-
  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }
 //Update only AnnualBudget field:-
  state.annualBudget = req.body.annualBudget;
 //Send Message:-
  res.status(200).json(state);
});


//[Routes-7]Replace population value entirely:-
app.put("/states/:id/population", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);
 //Check if State exists:-
  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }
 //Update only Population field:-
  state.population = req.body.population;
 //Send Message:-
  res.status(200).json(state);
});


//[Routes-8]Update LiteracyRate only:-
app.patch("/states/:id/literacy", (req, res) => {
   const id = parseInt(req.params.id);
   const state = states.find(s => s.id === id);
 //Check if State exists:-
   if (!state) {
      return res.status(404).json({ message: "State not found" });
   }
 //Update only LiteracyRate field:-
    state.literacyRate = req.body.literacyRate;
 //Send Message:-
   res.status(200).json(state);
});


//[Routes-9]Update gdp only:-
app.patch("/states/:id/gdp", (req, res) => {
    const id = parseInt(req.params.id);
    const state = states.find(s => s.id === id);
 //Check if State exists:- 
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
 //Update only GDP field:-
    state.gdp = req.body.gdp;
 //Send Message:-
    res.status(200).json(state);
});


//[Routes-10]Allow updating any provided fields without replacing entire object:-
app.patch("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const state = states.find(s => s.id === id);
 //Check if State exists:-
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
 //Upadte All Filed:-
    if (req.body.name !== undefined) {
      state.name = req.body.name;
    }
    if (req.body.population !== undefined) {
      state.population = req.body.population;
    }
    if (req.body.literacyRate !== undefined) {
      state.literacyRate = req.body.literacyRate;
    }
    if (req.body.annualBudget !== undefined) {
      state.annualBudget = req.body.annualBudget;
    }
    if (req.body.gdp !== undefined) {
      state.gdp = req.body.gdp;
    }
 //Send Message:-
    res.status(200).json(state);
});


//[Routes-11]Delete state by ID:-
app.delete("/states/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = states.findIndex(s => s.id === id);
 //Check if State exists:-
  if (index === -1) {
    return res.status(404).json({ message: "State not found" });
  }
  states.splice(index, 1);
 //Send Message:-
  res.status(204).send();
}); 


//[Routes-12]Delete state by Name:-
app.delete("/states/name/:stateName", (req, res) => {
  const name = req.params.stateName.toLowerCase();
  const index = states.findIndex(s => s.name.toLowerCase() === name);
 //Check if State exists:-
   if (index === -1) {
     return res.status(404).json({ message: "State not found" });
   }
   states.splice(index, 1);
 //Send Message:-
   res.status(204).send();
});


//[Routes-13]Delete all states where literacyRate<given value:-
app.delete("/states/low-literacy/:percentage", (req, res) => {
  const percentage = parseFloat(req.params.percentage);
  let deletedCount = 0;
  for (let i = states.length - 1; i >= 0; i--) {
    if (states[i].literacyRate < percentage) {
      states.splice(i, 1);
      deletedCount++;
    }
  }
 //Send Message:-
  res.status(200).json({ deletedCount });
});



//Server Running Code:-
app.listen(3000, () => {
  console.log("Server started on port 3000");
});