$(function(){
  $('.durationDateExt').click(function(){
    var currentEndDateParts = $('#currentEndDate').val().split('-'),
    date = new Date(currentEndDateParts[0] + '-' + currentEndDateParts[1] + '-' + currentEndDateParts[2]),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear(),
    duration = $(this).val(),
    newEndDate;

    switch(duration){
      case '1y':
        newEndDate = new Date(y + 1, m, d);
        break;
      case '3m':
        newEndDate = new Date(y, m + 4, d);
        break;
      case '6m':
        newEndDate = new Date(y, m + 7, d);
        break;
    }

    var end = newEndDate.getFullYear()  + '-' + (newEndDate.getMonth() < 10 ? '0' + newEndDate.getMonth() : newEndDate.getMonth()) + '-' +
    (newEndDate.getDate() < 10 ? '0' + newEndDate.getDate() : newEndDate.getDate())

    console.log(end, moment(newEndDate).format('Do MMM YYYY'));

    // UI:
    $('#newEndDateVal').val(moment(newEndDate).format('Do MMM YYYY'));
    $('#newEndDateId').val(end);
  });


  $('#startDateId').datepicker({dateFormat: 'yy-mm-dd'});

  $('.durationDate').click(function(){
    var parts = $('#startDateId').val().split('-'),
    date = new Date(parts[0] + '-' + parts[1] + '-' + parts[2]),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear(),
    duration = $(this).val(),
    endDate;

    switch(duration){
      case '1y':
        endDate = new Date(y + 1, m, d);
        break;
      case '3m':
        endDate = new Date(y, m + 3, d);
        break;
      case '6m':
        endDate = new Date(y, m + 6, d);
        break;
    }

    var end = endDate.getFullYear()  + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' +
    (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate());
    $('#endDateId').val(end);
  });
});
