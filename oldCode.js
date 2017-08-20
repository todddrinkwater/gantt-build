start = []
dataset.forEach( data => {
  start.push(data.startDate)
} )
var minDate = new Date(Math.min.apply(null,start));


// calculate max end dates

end = []
dataset.forEach( data => {
  end.push(data.endDate)
} )
var maxDate = new Date(Math.max.apply(null, end));
