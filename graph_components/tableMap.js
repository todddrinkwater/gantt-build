var info =  [
  {
    id: 1,
    taskName: "Task 1",
    startTime: "01/01/16",
    endTime: "10/01/16",
  },
  {
    id: 2,
    taskName: "Task 2",
    startTime: "10/01/16",
    endTime: "20/01/16",
  },
  {
    id: 3,
    taskName: "Task 3",
    startTime: "21/01/16",
    endTime: "29/01/16",
  }
]

function sortTable(info){
  info.map((dataEntry) => { // map through every element in the info array
    for (var prop in dataEntry) { // for each property in the object return a row containing the object data
      console.log(dataEntry[prop]);
  }
  })
}
