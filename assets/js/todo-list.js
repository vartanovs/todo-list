// Show or hide To-Do Input Bar by clicking on '+' icon
$('.fa-plus').click(() => {
  $('input[type="text"]').fadeToggle();
});

// Check off specific To-Do by clicking on it
const strikeOn = function activateLiStrikeThru() {
  $('ul').on('click', 'li', function complete() {
    $(this).toggleClass('complete');
  });
};

// Delete a To-Do by clicking on the remove icon
$('ul').on('click', '.remove', function fade(event) {
  $(this).parent().fadeOut(500, function remove() {
    $(this).remove();
  });
  strikeOn();
  event.stopPropagation();
});

// Edit a To-Do by clicking on the edit icon
$('ul').on('click', '.edit', function edit(event) {
  // Get parent <li> and grandpaent <ul> with holder variables
  const thisLi = $(this).parent();
  const thisUl = thisLi.parent();

  // Check if to-do is currently editable
  const todoText = thisLi.children('.todo');
  if (todoText.attr('contenteditable') === 'false') {
    // If not editable, make to-do text editable and bring into focus
    todoText.attr('contenteditable', 'true');
    todoText.focus();
    // Deactivate strikethru listener
    thisUl.off('click', 'li');
    // Activate listener for 'enter' key and character limit on to-do entry
    todoText.keypress((e) => {
      if (e.which === 13 || todoText.text().length > 24) {
        // Make to-do text no longer editable
        todoText.attr('contenteditable', 'false');
        // Reactivate strikethru listener
        strikeOn();
      }
    });
  } else {
    // If already editable, make to-do text no longer editable
    todoText.attr('contenteditable', 'false');
    // Reactive strikethru listener
    strikeOn();
  }
  event.stopPropagation();
});

// Add additional To-Do by typing into input field, pressing 'Enter'
$('input[type="text"]').keypress(function submit(event) {
  if (event.which === 13) {
    // Grab user input new To-Do text, place into holder variable
    const toDoText = $(this).val();
    // Create a new li and append to ul
    $('ul').append(`<li><span class="remove icon"><i class="fa fa-trash-alt"></i></span><span class="edit icon"><i class="fa fa-pencil-alt"></i></span><span class="todo" contenteditable="false"> ${toDoText}<span></li>`);
    // Empty input text field
    $(this).val('');
  }
});
