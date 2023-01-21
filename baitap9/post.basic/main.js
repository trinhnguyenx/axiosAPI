function $(selector) {
  return document.querySelector(selector);
}

function showLoading() {
  $(".loading").style.display = "flex";
}

function hideLoading() {
  $(".loading").style.display = "none";
}

async function fetchData() {
  const { data } = await axios.get(
    'https://631b4048fae3df4dcff94f47.mockapi.io/api/todoItems'
  );
  return data;
}

function li_todoItem(item) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.id = item.id;
  li.innerText = item.title;
  return li;
}

function li_inProgressItem(item) {
  const li = document.createElement("li");
  li.className = "in-progress-item";
  li.id = item.id;
  li.innerText = item.title;
  return li;
}

function li_doneItem(item) {
  const li = document.createElement("li");
  li.className = "done-item";
  li.id = item.id;
  li.innerText = item.title;
  return li;
}

function filteredItems(items) {
  const todoItems = items.filter((item) => item.status === "todo");
  const inProgressItems = items.filter((item) => item.status === "in-progress");
  const doneItems = items.filter((item) => item.status === "done");

  return [todoItems, inProgressItems, doneItems];
}

function showItems(items) {
  const ul_todoItems = $(".todo-items");
  const ul_inProgressItems = $(".in-progress-items");
  const ul_doneItems = $(".done-items");

  const [todoItems, inProgressItems, doneItems] = filteredItems(items);

  todoItems.map((item) => {
    ul_todoItems.appendChild(li_todoItem(item));
  });

  inProgressItems.map((item) => {
    ul_inProgressItems.appendChild(li_inProgressItem(item));
  });

  doneItems.map((item) => {
    ul_doneItems.appendChild(li_doneItem(item));
  });
}

async function main() {
  try {
    showLoading();
    const items = await fetchData();
    showItems(items);
  } catch (error) {
    alert("Loading failed");
  } finally {
    hideLoading();
  }
}


const form = document.getElementById('my-form');

form.addEventListener('submit', async function (e) {
  e.preventDefault()

    const title = $('#input-title').value
    const status = $('#select-status').value

  try {
    showLoading()
    const res = await axios.post(
      'https://631b4048fae3df4dcff94f47.mockapi.io/api/todoItems',
      {title,status}
    );
    if(res.status == 201 ) {
      return alert("them thanh cong");
    }
    console.log([res.status])
  } catch (error) {
    return alert("them that bai");
  } finally {
   hideLoading()
  }

});


main();

