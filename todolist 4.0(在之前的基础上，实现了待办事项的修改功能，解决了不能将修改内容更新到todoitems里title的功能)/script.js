


let todoItems = [];

let finishedItems = [];

function renderTodoItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";
//新加入元素前，先将paneEl中所有的元素给删掉，然后逐一将itemDiv加入到paneEl中
    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";
        

        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";
//inputEl是定位到完成复选框的元素变量
        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            todoItems.splice(i, 1);
//当inputEl被触发change的时候，该元素在遍历时压栈进入finisheditems，同时在此处循环删除该元素位于todoitems的列表元素
            //console.log("finshed:", i, todoItems, finishedItems );
            renderTodoItemList(todoItems, finishedItems);

        });

        let titleEl = document.createElement("div");
        titleEl.className = "title";
        titleEl.contentEditable = true;
        
        titleEl.addEventListener("input",(e)=>{
            todoItems[i].title = titleEl.innerHTML

            console.log(todoItems)
            
        })

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";

        if (item.isImportance) {
            importanceEl.classList.add("open");
        }

        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }
//在clickimportanceEl后isImportance的状态发生改变，紧接着调用renderTodoItemList函数,重新绘制一遍列表
            renderTodoItemList(todoItems, finishedItems);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.addEventListener("click", (e)=>{
            console.log("delete:", item);
            itemDiv.remove()
            todoItems.splice(i,1)   //每次删除下标为i的数组
            renderTodoItemList(todoItems, finishedItems);

            console.log(todoItems)
        })

        titleEl.innerText = item.title;

        itemDiv.append(inputEl);//将inputEl复选框压栈进入itemDiv中
        itemDiv.append(titleEl);//将titleEl元素压栈进入itemDiv中
        itemDiv.append(importanceEl);//将importancEl压栈进入itemDiv中
        itemDiv.append(deleteBtn);//将deletbtn压栈进入itemDiv中
        
        paneEl.append(itemDiv);//将itemDiv压栈进入todolist的paneEl中，即面板元素
    }

}

function renderFinishedItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < finishedItems.length; i++ ) {
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";
//由于his页面和todolist仅仅只是切换了一个视角，而并未切换页面，所以此处的类名仍可以定义为todoitem方便！！！！！！！！！！

        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }
        

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        
        paneEl.append(itemDiv);
    }

}


function renderInputPane(todoItems) {//位于input区域的所有控制和触发
    let inputPaneEl = document.querySelector("#todolist > .input-pane");

    let addBtnEl = inputPaneEl.querySelector("#add-btn");
   
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");

    addBtnEl.addEventListener("click", (e)=>{
        let inputEl = inputPaneEl.querySelector("input");
        //在此处将用户输入的值压栈进入todoitems这一列表
        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false, //push是添加数组的方式
        })
//此处通过对add-btn创建监听将input中的元素加入到Todoitems列表中，这些元素均是以数组（title、isimportant、isfinished）组成
        console.log("add a item: ", inputEl.value);
        
        
        renderTodoItemList(todoItems, finishedItems);

    });
//通过queryselector 寻找到input区域的内容，其中包括inputpane、add-btn、his-btn.其中add-btn设置监听，负责将内容从input框中通过函数TodoItemsList加入到listpane中
//首先通过itemDiv不断向paneEl中从尾部追加div元素，他们分别代表的是加入的一条条待办事项
    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            addBtnEl.classList.remove("close");
            renderTodoItemList(todoItems, finishedItems)
        } else {
            hisBtnEl.classList.add("open");
            addBtnEl.classList.add("close")
            renderFinishedItemList(todoItems, finishedItems)
        }
    });
//此处是his-btn的监听，若hisbtnEl的类表中含有“open”则去除类表中的“open”类，紧接着执行renderTodoList的函数方法，若不含“open”，则在类表中加入“open”类，同时执行renderFinishedItemList的函数
    // let btnEl = document.querySelector("#todolist #add-btn");
}

renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);




//每一次触发监听后都需要遍历一次rendertodoitemlist或者rendertodoitemlist