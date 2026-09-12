const spreadsheetId1 = '11bVwIgamf-boMEBp3MnZkhgDeJU1NIHouVpELfVy8ys';
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId1}/gviz/tq?tqx=out:json`;

// function GetMeetingDates(){
//   fetch(url)
//   .then((res) => res.text())
//   .then((data) => {
//     // Google returns JSON wrapped in a function call; strip wrapper
//     const json = JSON.parse(data.substring(47, data.length - 2));
//     console.log('Sheet Columns:', json.table.cols);
//     console.log('Sheet Rows:', json.table.rows);
//     console.log(json);

//     //gets days of the meetings
//     const meeting_days = [];
//     for (var i = 0; i < json.table.rows.length; ++i) {
//         meeting_days.push(json.table.rows[i].c[1].v);
//     } $("#meeting_days").text(meeting_days)

//     //gets months of the meetings
//     const meeting_months = [];
//     for (var i = 0; i < json.table.rows.length; ++i){
//         meeting_months.push(json.table.rows[i].c[0].v);
//     } $("#meeting_months").text(meeting_months)

//     const next_day = meeting_days[0];
//     const next_month = meeting_months[0];
//     const next_meeting = next_month + '-' + next_day + '-2026';
//     // $("#next_meeting").text(notification)
//     // next_meeting.textContent("hello")

//   });
// }

  fetch(url)
  .then((res) => res.text())
  .then((data) => {
    // Google returns JSON wrapped in a function call; strip wrapper
    const json = JSON.parse(data.substring(47, data.length - 2));

    //gets value of C2 on the sheet
    const notification = json.table.rows[0].c[2].v;
    if (notification){
      $("#notification").text(notification)
      $("#notification").addClass("notification")
    }

  });



  // fetch(url)
  // .then((res) => res.text())
  // .then((data) => {
  //   // Google returns JSON wrapped in a function call; strip wrapper
  //   const json = JSON.parse(data.substring(47, data.length - 2));
  //   console.log('Sheet Columns:', json.table.cols);
  //   console.log('Sheet Rows:', json.table.rows);
  //   console.log(json);

  //   //gets days of the meetings
  //   const meeting_days = [];
  //   for (var i = 0; i < json.table.rows.length; ++i) {
  //       meeting_days.push(json.table.rows[i].c[1].v);
  //   } $("#meeting_days").text(meeting_days)

  //   //gets months of the meetings
  //   const meeting_months = [];
  //   for (var i = 0; i < json.table.rows.length; ++i){
  //       meeting_months.push(json.table.rows[i].c[0].v);
  //   } $("#meeting_months").text(meeting_months)

  //   //gets value of C2 on the sheet
  //   const notification = json.table.rows[0].c[2].v;
  //   if (notification){
  //     $("#notification").text(notification)
  //     $("#notification").addClass("notification")
  //   }
    


  //   const day = meeting_days[0];
  //   const month = meeting_months[0];
  //   const next_meeting = month + '-' + day + '-2026';
  //   $("#next_meeting").text(next_meeting)

  // });