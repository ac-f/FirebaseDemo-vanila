/////////////////////////////////
//////////引入的東西放這邊/////////
////////////////////////////////
import { createData, readData, updateData, deleteData } from './db.js';

/////////////////////////////////
/////////定義Element在這邊////////
////////////////////////////////
const contentEl = document.getElementById('content');
const createBtnEl = document.getElementById('create-btn');
const readBtnEl = document.getElementById('read-btn');
const updateBtnEl = document.getElementById('update-btn');
const deleteBtnEl = document.getElementById('delete-btn');
const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const bornEl = document.getElementById('born');

/////////////////////////////////
////////////給他幾個變數///////////
////////////////////////////////
let firstName;
let lastName;
let born;


/////////////////////////////////
//////////輪到監聽事件出場/////////
////////////////////////////////
createBtnEl.addEventListener('click', async () => {
    getFormData();
    await createData(firstName, lastName, +born);
    await syncData();
});
readBtnEl.addEventListener('click', async () => {
    await syncData();
});
updateBtnEl.addEventListener('click', async () => {
    getFormData();
    await updateData(firstName, lastName, +born);
    await syncData();
});
deleteBtnEl.addEventListener('click', async () => {
    await deleteData();
    await syncData();
});

/////////////////////////////////
///以下都是會用到很多次的function///
////////////////////////////////

// 取得表單資料
function getFormData() {
    firstName = firstNameEl.value == "" ? "John" : firstNameEl.value;
    lastName = lastNameEl.value == "" ? "Doe" : lastNameEl.value;
    born = bornEl.value == "" ? 2000 : bornEl.value;
}

// 這邊要跟FireStore同步資料
async function syncData() {
    contentEl.innerHTML = "";
    const data = await readData();
    if (data.length === 0) {
        contentEl.innerHTML = "目前沒有資料";
        return;
    }
    data.forEach((item) => {
        // 資料長這樣
        // {born: 1815, first: "Ada", last: "Lovelace"}
        console.log(item)
        contentEl.innerHTML += `${item.born} ${item.first} ${item.last} <br>`;
    });
} 