var dataset = [
  {
    id: 1,
    taskName: "Task 1",
    startDate: new Date(2017, 0, 1),
    endDate: new Date(2017, 5, 1),
    milestone: false,
    dependentsId: 1,
    status: "Complete"
  },
  {
    id: 2,
    taskName: "Task 2",
    startDate: new Date(2017, 1, 12),
    endDate: new Date(2017, 2, 3),
    milestone: false,
    dependentsId: 1,
    status: "In Progress"
  },
  {
    id: 3,
    taskName: "Task 3",
    startDate: new Date(2017, 5, 1),
    endDate: new Date(2017, 5, 1),
    milestone: true,
    dependentsId: 3,
    status: "In Progress"
  },
  {
    id: 4,
    taskName: "Task 4",
    startDate: new Date(2017, 5, 11),
    endDate: new Date(2017, 11, 27),
    milestone: false,
    dependentsId: 4,
    status: "In Progress"
  },
  {
    id: 5,
    taskName: "Task 5",
    startDate: new Date(2017, 10, 11),
    endDate: new Date(2018, 11, 27),
    milestone: false,
    dependentsId: 4,
    status: "In Progress"
  },
  {
    id: 6,
    taskName: "Task 6",
    startDate: new Date(2018, 11, 27),
    endDate: new Date(2018, 11, 27),
    milestone: true,
    dependentsId: 6,
    status: "Complete"
  },
  {
    id: 7,
    taskName: "Task 7",
    startDate: new Date(2018, 0, 1),
    endDate: new Date(2018, 2, 3),
    milestone: false,
    dependentsId: 7,
    status: "In Progress"
  },
  {
    id: 8,
    taskName: "Task 8",
    startDate: new Date(2018, 2, 1),
    endDate: new Date(2018, 3, 20),
    milestone: false,
    dependentsId: 8,
    status: "In Progress"
  },
  {
    id: 9,
    taskName: "Task 9",
    startDate: new Date(2018, 3, 1),
    endDate: new Date(2018, 4, 27),
    milestone: false,
    dependentsId: 9,
    status: "In Progress"
  },
  {
    id: 10,
    taskName: "Task 10",
    startDate: new Date(2018, 3, 11),
    endDate: new Date(2018, 5, 27),
    milestone: false,
    dependentsId: 10,
    status: "In Progress"
  }
]

export default dataset
