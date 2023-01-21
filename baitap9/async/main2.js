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

async function toggleBtn(index) {
    let name
    let status
    
    try {
        showLoading()
        const res = await axios.get(`https://63c96a17904f040a965db8df.mockapi.io/todo-list/${index}`);
        const temp = res.data
            name = temp.name
            status = temp.status
            if (status === "active") status = "completed"
            else status = "active"
            axios.put(`https://63c96a17904f040a965db8df.mockapi.io/todo-list/${index}`,
                { status, name })
                 try {
                    fetchData()
                    input.value = ''
                } catch (error){
                    alert('Co loi');
                }
            fetchData()
    } catch(error){
        alert('Co loi');
    }
}

function edit(id) {
    currentEdit = id
    let item = document.getElementById(`${id}`)
    let box = item.querySelector('.edit-box')
    box.style.display = "flex"
}

async function del(id) {
    const res = await axios.delete(`https://63c96a17904f040a965db8df.mockapi.io/todo-list/${id}`)
    try {
            fetchData()
        } catch (error){
            alert('Co loi');
        }
    
}

async function fetchData() {
    try {
        showLoading()
    const tasks = await axios.get('https://63c96a17904f040a965db8df.mockapi.io/todo-list')
            data = res.data
            

            if (currentPage === "all") showItems(tasks)
            if (currentPage === "active") showActiveItems(tasks)
            if (currentPage === "completed") showCompletedItems(tasks)

            showItemsLeft(tasks)
        } catch(error){
        alert("co loi");
    } finally {
        hideLoading()
    }
    
}

function showItems  (tasks)  {
    let content = ''

    data.forEach((task) => {
        if (task.status === "active") {
            content += `<li class="todo-item" id="${task.id}" ondblclick="edit(${task.id})"> 
                    <input type="checkbox" class="toggle" onclick="toggleBtn(${task.id})"> 
                    <label>${task.name}</label> 
                    <input type="text" class="edit-box" onkeypress="editName(event)">
                    <div class="delBtn" onclick="del(${task.id})">X</div>
                    </li>`
        }
        else {
            content += `<li class="todo-item-completed" id="${task.id}" ondblclick="edit(${task.id})"> 
                    <input type="checkbox" class="toggle" onclick="toggleBtn(${task.id})"> 
                    <label>${task.name}</label> 
                    <input type="text" class="edit-box" onkeypress="editName(event)">
                    <div class="delBtn" onclick="del(${task.id})">X</div>
                    </li>`
        }
    })

    document.querySelector('.todo-list').innerHTML = content
}

function showActiveItems (tasks)  {
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
}

function showCompletedItems  (tasks)  {
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
}

$('.new-todo').addEventListener('keypress', function (event) {
        event.key === "Enter" 
        event.preventDefault()
        const name = input.value
        const status = "active"
       try {
        showLoading()
        const res = axios.post('https://63c96a17904f040a965db8df.mockapi.io/todo-list',
            { status, name })
            console.log(res)
       } catch (error) {

       } finally {
        hideLoading()
       }  
    
})

const showItemsLeft = () => {
    let sum = 0
    data.forEach(task => {
        if (task.status === "active") sum++
    })
    $('.item-left').innerHTML = `${sum} item left`
}

$('.all').addEventListener('click', function (event) {
    event.preventDefault()
    showItems()
    currentPage = "all"
})

$('.active').addEventListener('click', function (event) {
    event.preventDefault()
    showActiveItems()
    currentPage = "active"
})

$('.completed').addEventListener('click', function (event) {
    event.preventDefault()
    showCompletedItems()
    currentPage = "completed"
})

async function editName(event) {
        event.key === "Enter"
        event.preventDefault()
        let item = document.getElementById(`${currentEdit}`)
        console.log(item)
        let box = item.querySelector('.edit-box')
        let name = box.value
        let status
        try {
        showLoading()
        const res = await axios.get(`https://63c96a17904f040a965db8df.mockapi.io/todo-list/${currentEdit}`)
        status = res.data.status
        axios.put(`https://63c96a17904f040a965db8df.mockapi.io/todo-list/${currentEdit}`,
            {
                name,
                status
            })
            fetchData()
            box.style.display = "none"

        } catch(error)  {
            alert("co loi");       
        } finally {
            hideLoading()
        }
}

showLoading()
fetchData()



