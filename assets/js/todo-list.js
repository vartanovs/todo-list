// Check off specific To-Do by clicking on it
$('ul').on('click', 'li', function complete() {
  $(this).toggleClass('complete');
});

// Delete a To-Do by clicking on the inner span
$('ul').on('click', 'span', function fade(event) {
  $(this).parent().fadeOut(500, function remove() {
    $(this).remove();
  });
  event.stopPropagation();
});

// Add additional To-Do by typing into input field, pressing 'Enter'
$('input[type="text"]').keypress(function submit(event) {
  if (event.which === 13) {
    // Grab user input new To-Do text, place into holder variable
    const toDoText = $(this).val();
    // Create a new li and append to ul
    $('ul').append(`<li><span>X</span> ${toDoText}</li>`);
    // Empty input text field
    $(this).val('');
  }
});
