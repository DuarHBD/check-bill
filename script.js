const nameLI=document.getElementById('list-name');
const btnPutName=document.getElementById('btnput')
const input_name=document.getElementById('input-name')
const namebox=document.getElementById('name-box')
const moneybox=document.getElementById('monney-box')
const optionNameBTN=document.getElementById('option-name')
const optionMonneyBTN=document.getElementById('option-money')
const dropname=document.getElementById('dropname')
const input_money=document.getElementById('input-money')
const btnPutmoney=document.getElementById('btnputmoney')
const moneyLi=document.getElementById('list-money')
const calbtn=document.getElementById('calbtn')
const tablecal=document.getElementById("display-cal")
const cal_box=document.getElementById('cal-box')



const Prename=[
    {id:0,name:'ชื่อคนที่1'},
    {id:1,name:'ชื่อคนที่2'},
    {id:3,name:'ชื่อคนที่3'}
]
const Prelist=[
    // {id:0,name:'ชื่อคนที่1',amount:100},
    // {id:1,name:'ชื่อคนที่2',amount:0},
    // {id:3,name:'ชื่อคนที่3',amount:20}
]
let data=Prename
let list=Prelist
let transaction=[]

function init(){
    
    nameLI.innerHTML=''
    moneyLi.innerHTML=''
    dropname.innerHTML=''
    tablecal.innerHTML=''
    data.forEach(addDatatoName)
    data.forEach(adddatoDropname)
    list.forEach(addDatatomoney)
    transaction.forEach(DisplayCal)
    

   
}

function addDatatoName(data){
    // console.log(data)
    const item=document.createElement('li')
    item.classList.add('name')
    item.innerHTML=`${data.name}<button class="delete" onclick="removeName(${data.id})">X</button>`
    // console.log(item)
    nameLI.appendChild(item)
    // console.log(nameLI)
}
function adddatoDropname(data){
    const item=document.createElement('option')
    item.classList.add('select-name')
    item.innerHTML=`${data.name}`
    dropname.appendChild(item)
    

 }
function addDatatomoney(list){
    const row=document.createElement('tr')
    const col1=document.createElement('td')
    const col2=document.createElement('td')
    col1.innerHTML=`${list.name}`
    formatAmount=formatNumberWithCommas(list.amount)
    col2.innerHTML=`฿${formatAmount}<button class="deleteList" onclick="removeMoney(${list.id})">X</button>`
    row.appendChild(col1)
    row.appendChild(col2)
   
    moneyLi.appendChild(row)

}
function DisplayCal(transaction){
    const row=document.createElement('tr')
    const col1=document.createElement('td')
    const col2=document.createElement('td')
    col2.classList.add("col2")
    const col3=document.createElement('td')
    col1.innerHTML=`${transaction.name}`
    formatAmount=formatNumberWithCommas(transaction.amount)
    col2.innerHTML=`฿${formatAmount}`
    col3.innerHTML=`${transaction.receiverName}`
    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
   
    tablecal.appendChild(row)

    
}

function autoIDname(){
    return Math.floor(Math.random()*1000000)
    //ปัดตัวเลขลง romdom0-1 
}
function autoIDmoney(){
    return Math.floor(Math.random()*-1000000)

}
function addNamebyuser(e) {
    e.preventDefault()
    // console.log("555")
    if(input_name.value.trim()===''){
        alert('กรุณาระบุข้อมูลให้ครบ')
        //ตัดช่องว่างข้างๆออก เผื่อมีการเว้นวรรค
        //=== เปรียบค่าพร้อมชนิดข้อมูล
    }else{
        // console.log(autoID())
        const datauser={
            id:autoIDname(),
            name:input_name.value,
           }
        data.push(datauser);
        
        addDatatoName(datauser);
        adddatoDropname(datauser)
        input_name.value='';
        
        console.log(data)
    }
}
function addMoneybyuser(e){
    e.preventDefault()
    console.log(dropname.value)
    if(input_money.value.trim()===''){
        alert('กรุณาระบุข้อมูลให้ครบเเละกรอกเฉพาะตัวเลข')
        //ตัดช่องว่างข้างๆออก เผื่อมีการเว้นวรรค
        //=== เปรียบค่าพร้อมชนิดข้อมูล
    }else{
        const selectValue=dropname.options[dropname.selectedIndex].text;
        const existingEntry = list.find(item => item.name === selectValue);
        const amountValue = parseFloat(input_money.value);

        
        if (existingEntry) {
                // ถ้ามีชื่อซ้ำ ให้เพิ่มจำนวนเงินเข้าไปใน entry ที่เจอ
                existingEntry.amount += amountValue;
                input_money.value='';
                
                
                
                
        }else{
        const moneyuser={
            id:autoIDmoney(),
            name:selectValue,
            amount:amountValue
        }
        list.push(moneyuser)
        addDatatomoney(moneyuser)
        input_money.value='';}
        
    }
    
    init();
    // console.log(list)
    
 
}
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
function removeName(id){
    // console.log('delete name')
    data=data.filter(item=>item.id!==id);
    //ส่งtransac เข้าไปแล้วคืนค่า ตามเงื่อนไข 
    //{id:1,text:"ค่าขนม",amount:-100}, ถ้าไอดีไม่ตรงกับปุ่มที่กด คืนค่ากลับค่าตรงลบทิ้ง

    init()

}
function removeMoney(id){
    console.log('delete money')
    list=list.filter(item=>item.id!==id);
    init()

}

function hideBothDivs() {
    
    namebox.style.display = 'block';
    moneybox.style.display = 'none';
    cal_box.style.display = 'none';
}
optionNameBTN.addEventListener('click', function() {
    // แสดง div1 และซ่อน div2
    namebox.style.display = 'block';
    moneybox.style.display = 'none';

    
});
optionMonneyBTN.addEventListener('click', function() {
    // แสดง div1 และซ่อน div2
    namebox.style.display = 'none';
    moneybox.style.display = 'block';
    cal_box.style.display = 'block';

    
});
function calculate(){
    transaction = []; // เคลียร์การทำธุรกรรม
    tablecal.innerHTML = ''; // เคลียร์ตารางแสดงผล
    let total=list.reduce((sum, person) => sum += person.amount, 0);
    // cal.innerHTML=`${total}`
    let averageAmount = total / list.length;
    let payers = []; // คนที่ต้องโอนเงิน
    let receivers = []; // คนที่ต้องรับเงิน
    
    list.forEach(person => {
        let difference = person.amount - averageAmount;
        if (difference > 0) {
          receivers.push({ ...person, excess: difference }); // คนที่มีเงินเกิน
        } else if (difference < 0) {
          payers.push({ ...person, deficit: -difference }); // คนที่มีเงินไม่พอ
        }
      });
      
      // ลอจิกสำหรับการโอนเงิน
    payers.forEach(payer => {
        while (payer.deficit > 0) {
          let receiver = receivers.find(r => r.excess > 0);
          if (!receiver) break; // หากไม่มีคนที่ต้องรับเงินเพิ่ม ให้หยุดการทำงาน
      
          let transferAmount = Math.min(payer.deficit, receiver.excess);
          payer.deficit -= transferAmount;
          receiver.excess -= transferAmount;
      
          console.log(
            `${payer.name} โอนเงินให้ ${receiver.name} จำนวน ${transferAmount}`
          );
        transaction.push({name:payer.name,
            amount:transferAmount.toFixed(2),
            receiverName:receiver.name})
        
    }
      });
      init()
      
      console.log(transaction) 
}
// console.log(member)
// hideBothDivs();
btnPutName.addEventListener('click',addNamebyuser)
btnPutmoney.addEventListener('click',addMoneybyuser)
calbtn.addEventListener('click',calculate)
document.getElementById('save').addEventListener('click', function() {
    html2canvas(document.getElementById('container')).then(function(canvas) {
        // Convert the canvas to a data URL
        let imgData = canvas.toDataURL('image/png');

        // Create a link to download the image
        let link = document.createElement('a');
        link.href = imgData;
        link.download = 'div-image.png';
        document.body.appendChild(link);
        link.click(); // Simulate click to download
        document.body.removeChild(link); // Remov
    });
});
hideBothDivs()
init()


