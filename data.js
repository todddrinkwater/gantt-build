dataset =  [
  {
    id: 1,
    taskName: "Task 1",
    startDate: new Date(2017, 0, 1),
    endDate: new Date(2017, 5, 1),
    milestone: false,
    dependentsId: [], // consider DB relationships and how these might split up into seperate tables.
    status: "Complete"
  },
  {
    id: 2,
    taskName: "Task 2",
    startDate: new Date(2017, 1, 12),
    endDate: new Date(2017, 2, 3),
    milestone: false,
    dependentsId: [1],
    status: "In Progress"
  },
  {
    id: 3,
    taskName: "Task 3",
    startDate: new Date(2017, 4, 12),
    endDate: new Date(2017, 4, 20),
    milestone: false,
    dependentsId: [1, 2],
    status: "In Progress"
  },
  {
    id: 4,
    taskName: "Task 4",
    startDate: new Date(2017, 5, 11),
    endDate: new Date(2017, 11, 27),
    milestone: false,
    dependentsId: [1, 2],
    status: "In Progress"
  },
  {
    id: 5,
    taskName: "Task 5",
    startDate: new Date(2018, 5, 11),
    endDate: new Date(2018, 11, 27),
    milestone: false,
    dependentsId: [1, 2],
    status: "In Progress"
  }
]
