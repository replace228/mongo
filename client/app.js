$.get('/records', function(data) {
  var list = JSON.parse(data);
  var tbody = $('tbody');
  list.forEach(function(item) {
    var row = $('<tr><td>' + item.firstName + '</td><td>' + item.lastName + '</td></tr>');
    tbody.append(row);
  });
});
