$(document).ready(function () {
  const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];

  savedItems.forEach(item => {
    const classDone = item.done ? ' todo-list__item--done' : '';
    $('.todo-list__items').append(
      `<li class="todo-list__item${classDone}">
         ${item.text}
         <span class="todo-list__delete">
           <i class="fas fa-backspace"></i>
         </span>
       </li>`,
    );
  });
});

$('.todo-list__input').keypress(function (event) {
  if (event.which === 13) {
    const itemText = $(this).val();
    $(this).val('');

    const newItem = { text: itemText, done: false };

    const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    savedItems.push(newItem);
    localStorage.setItem('todoItems', JSON.stringify(savedItems));

    $('.todo-list__items').append(
      `<li class="todo-list__item">
         ${itemText}
         <span class="todo-list__delete">
           <i class="fas fa-backspace"></i>
         </span>
       </li>`,
    );
  }
});

$('.todo-list__items').on('click', '.todo-list__item', function () {
  $(this).toggleClass('todo-list__item--done');

  const updatedItems = [];
  $('.todo-list__item').each(function () {
    const text = $(this).text().trim();
    const done = $(this).hasClass('todo-list__item--done');
    updatedItems.push({ text, done });
  });

  localStorage.setItem('todoItems', JSON.stringify(updatedItems));
});

$('.todo-list__items').on('click', '.todo-list__delete', function (event) {
  event.stopPropagation();
  $(this)
    .parent()
    .fadeOut(function () {
      $(this).remove();

      const updatedItems = [];
      $('.todo-list__item').each(function () {
        const text = $(this).text().trim();
        const done = $(this).hasClass('todo-list__item--done');
        updatedItems.push({ text, done });
      });

      localStorage.setItem('todoItems', JSON.stringify(updatedItems));
    });
});

$('.todo-list__toggle').click(function () {
  $('.todo-list__input').fadeToggle();
});

console.log(typeof $);
