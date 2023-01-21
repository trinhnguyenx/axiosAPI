let currentPage = "all";
let data;
let tasks;
let currentEdit = -1;
const input = document.querySelector('.new-todo');

function $(selector) {
    return document.querySelector(selector)
}

function showLoading() {
    $('.loading').style.display = 'flex'
}

function hideLoading() {
    $('.loading').style.display = 'none'
}

function del(id) {
    axios.delete(`https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs/${id}`).then(
        (res) => {
            fetchData()
        }
    )
    hideLoading()
}

const fetchData = () => {
    console.log('fetch');
    showLoading()
    tasks = axios.get('https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs')
    .then(
        (res) => {
            data = res.data
            console.log(data)

            if (currentPage === "all") showItems()
            if (currentPage === "active") showActiveItems()
            if (currentPage === "completed") showCompletedItems()

            showItemsLeft()
        })
    .then(() => {
        hideLoading()
    })
    .catch((error) => {
        alert("co loi");
    })  
}

const showItems = () => {
    let content = ''

    data.forEach((task) => {
        if (task.status === "active") {
            content += `<li class="todo-item" id="${task.id}" ondblclick="edit(${task.id})"> 
                    <input type="checkbox" class="toggle" onclick="toggleBtn(${task.id})"> 
                    <label>${task.name}</label> 
                    <input type="text" class="edit-box" onkeypress="editName(e)">
                    <div class="delBtn" onclick="del(${task.id})">X</div>
                    </li>`
        }
        else {
            content += `<li class="todo-item-completed" id="${task.id}" ondblclick="edit(${task.id})"> 
                    <input type="checkbox" class="toggle" onclick="toggleBtn(${task.id})"> 
                    <label>${task.name}</label> 
                    <input type="text" class="edit-box" onkeypress="editName(e)">
                    <div class="delBtn" onclick="del(${task.id})">X</div>
                    </li>`
              

        }
    })

    document.querySelector('.todo-list').innerHTML = content
    hideLoading()
}

const showActiveItems = () => {
    let content = ''

    data.forEach((task) => {
        if (task.status === "active")
            content += `<li class="todo-item" id="${task.id}"> 
                        <input type="checkbox" class="toggle" onclick="toggleBtn(${task.id})"> 
                        <label>${task.name}</label> 
                        <div class="delBtn" onclick="del(${task.id})">X</div>
                        </li>`
    })

    document.querySelector('.todo-list').innerHTML = content
    hideLoading()
}

const showCompletedItems = () => {
    let content = ''

    data.forEach((task) => {
        if (task.status === "completed")
            content += `<li class="todo-item-completed" id="${task.id}"> 
                        <input type="checkbox" class="toggle" onclick="toggleBtn(${task.id})"> 
                        <label>${task.name}</label> 
                        <div class="delBtn" onclick="del(${task.id})">X</div>
                        </li>`
    })

    document.querySelector('.todo-list').innerHTML = content
    hideLoading()
}

$('.new-todo').addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        const name = input.value
        const status = "active"
        showLoading()
        axios.post('https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs',
            { status, name })
        .then(() => {
                fetchData()
                input.value = ''
        })
        .then(() => {
            hideLoading()
        })
        .catch((error) => {
            alert("co loi");
        })   
    }
})

const showItemsLeft = () => {
    let sum = 0
    data.forEach(task => {
        if (task.status === "active") sum++
    })
    $('.item-left').innerHTML = `${sum} item left`
}

$('.all').addEventListener('click', function (e) {
    e.preventDefault()
    showItems()
    currentPage = "all"
})

$('.active').addEventListener('click', function (e) {
    e.preventDefault()
    showActiveItems()
    currentPage = "active"
})

$('.completed').addEventListener('click', function (e) {
    e.preventDefault()
    showCompletedItems()
    currentPage = "completed"
})
$('.icon').addEventListener('click', function (e) {
    e.preventDefault()
    currentPage = "completed"
})
function toggleBtn(index) {
    let name
    let status
    showLoading()
    axios.get(`https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs/${index}`)
    .then(
        (res) => {
            const temp = res.data
            name = temp.name
            status = temp.status
            if (status === "active") status = "completed"
            else status = "active"
            axios.put(`https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs/${index}`,
                { status, name }).then(() => {
                    fetchData()
                    input.value = ''
                })
            fetchData()
        }
    )
    .catch((error) => {
        alert('Co loi');
    })
    hideLoading()
}

function edit(id) {
    currentEdit = id
    let item = document.getElementById(`${id}`)
    let box = item.querySelector('.edit-box')
    box.style.display = "flex"
}

function editName(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        let item = document.getElementById(`${currentEdit}`)
        console.log(item)
        let box = item.querySelector('.edit-box')
        let name = box.value
        let status
        showLoading()
        axios.get(`https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs/${currentEdit}`)
        .then(res => {
            status = res.data.status
        })
        .catch((error) => {
            alert("co loi");
        })
        axios.put(`https://63cbb569ea85515415140ab2.mockapi.io/api/todoMVC/blogs/${currentEdit}`,
            {
                name,
                status
            })
        .then(() => {
            fetchData()
            box.style.display = "none"
        })
        .then(() => {
            hideLoading()
        })
        .catch((error) => {
            alert("co loi");
        })
    }
}

fetchData()



