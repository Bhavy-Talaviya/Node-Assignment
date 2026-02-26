const express = require("express");
const app = express();
app.use(express.json());


const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];


app.get("/", (req, res) => {
  res.send("Express server is running");
});


//[Routes-1]Return all students:-
app.get("/students", (req, res) => {
  res.status(200).json(students);
});



//[Routes-2]Return the student with the highest CGPA:-
app.get("/students/topper", (req, res) => {
    if (students.length === 0) {
        return res.status(404).json({ message: "Students Not Found" });
    }
 //Topper Find Using Forloop:-
    let top = 0;
    let index = 0;
    for (let i = 0; i  < students.length; i++) {
        let cgpa = students[i].cgpa;
        if (cgpa > top) {
            top = cgpa;
            index = i;
        }
    }
    res.status(200).json(students[index]);
});




//[Routes-3]Return average CGPA of all students:-
app.get("/students/average", (req, res) => {
   if (!students) {
     return res.status(404).json({ message: "Average Are Not Found" });
  }
 //->Find Average Using For loop:-
   let totalCgpa = 0;
     for (let i = 0; i < students.length; i++) {
       totalCgpa += students[i].cgpa;
}
let averageCgpa = totalCgpa / students.length;
  res.status(200).json(averageCgpa);
});



//[Routes-4]Return TotalStudents:-
app.get("/students/count", (req, res) => {
    const TotalStudents = students.length
  res.status(200).json("Total-students:-" + TotalStudents);
});



//[Routes-5]Return student by ID:-
app.get("/students/:id", (req, res) => {
  const studentsId = Number(req.params.id);
  const student = students.find(u => u.id === studentsId);
  if (!student) {
    return res.status(404).json({ message: "Students not found" });
  }
  res.status(200).json(student);
});



//[Routes-6]Return all students from a specific branch:-
app.get("/students/branch/:branchName",(req,res) =>{
    const branchName = req.params.branchName;
    const studentsInBranch = students.filter(s => s.branch.toLowerCase() === branchName.toLowerCase());
    if (!studentsInBranch) {
        return res.status(404).json({ message: "No Students Found in this Branch" });
    }
    res.status(200).json(studentsInBranch);
});





app.listen(3000, () => {
  console.log("Server started on port 3000");
});