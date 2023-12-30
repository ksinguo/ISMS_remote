const yearInput = document.getElementById('year');
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const deviceNameInput = document.getElementById('deviceName');

const sessionStart_dom = document.getElementById('sessionStart');
const sessionEnd_dom = document.getElementById('sessionEnd');

const connectionPurposeInput = document.getElementById('connectionPurpose')
const sourceIPInput = document.getElementById('sourceIP');
const companyNameInput = document.getElementById('companyName');
const vpnAccountInput = document.getElementById('vpnAccount');
const pdf_Button = document.getElementById('pdf_Button');
const clear_Button = document.getElementById('clear_Button')
const companyName = document.getElementById('companyName');

const fw_admin_dom = document.getElementById('fw_admin');
const fw_year_dom = document.getElementById('fw_year');
const fw_month_dom = document.getElementById('fw_month');
const fw_day_dom = document.getElementById('fw_day');
const fw_directions_dom = document.getElementById('fw_directions');


companyName.addEventListener('input',function(){
    const companyIp = {
        '精誠科技整合股份有限公司':[
            '203.69.251.193',
            '10.30.2.100',
        ],
        '群璇地理資訊':[
            '10.20.1.243'
        ],
        '光特資訊科技股份有限公司':[
            '10.20.1.246'
        ]
    }
    const selectCompany = this.value;
    const ipOutput = companyIp[selectCompany] || [];
    const ipOptions = document.getElementById('ipOptions');
    const sourceIP = document.getElementById('sourceIP');
    sourceIP.value = '';
    ipOptions.innerHTML = '';
    console.log(ipOptions)
    ipOutput.forEach(item => {
        let option = document.createElement('option');
        option.value=item;
        ipOptions.appendChild(option);
        
    });

})
clear_Button.addEventListener('click',(e)=>{
    clearAllInputs();
})



pdf_Button.addEventListener('click', (e) => {
    const year = yearInput.value;
    const month = monthInput.value;
    const day = dayInput.value;
    const deviceName = deviceNameInput.value;
    const connectionPurpose = connectionPurposeInput.value;
    const sourceIP = sourceIPInput.value;
    const companyName = companyNameInput.value;
    const vpnAccount = vpnAccountInput.value;
    const fw_admin = fw_admin_dom.value;
    const fw_year = fw_year_dom.value;
    const fw_month = fw_month_dom.value;
    const fw_day = fw_day_dom.value;
    const fw_directions = fw_directions_dom.value;
    const sessionStart = getSessionDuration(sessionStart_dom);//回傳整個日期字串
    const sessionEnd = getSessionDuration(sessionEnd_dom);//回傳整個日期字串
   

    const data ={
        year:year,
        month:month,
        day:day,
        deviceName:deviceName,
        connectionPurpose:connectionPurpose,
        sourceIP:sourceIP,
        companyName:companyName,
        vpnAccount:vpnAccount,
        fw_admin:fw_admin,
        fw_year:fw_year,
        fw_month:fw_month,
        fw_day:fw_day,
        fw_directions:fw_directions,
        sessionStart:sessionStart,
        sessionEnd:sessionEnd,
    }
    const dataJson = JSON.stringify(data);
    localStorage.setItem('data', dataJson);
    openNewfullWindow();
    //window.location.href = './isms.html'
})

function openNewfullWindow() {
    const fullScreen = "width=1000,height=800,left=100,top=100"
    window.open('./isms.html', "_blank", fullScreen);
    // var windowFeatures = "width=800,height=600,left=100,top=100";
    // window.open("./isms.html", "_blank", windowFeatures);
}
//全部清除按鈕的方法
function clearAllInputs() {
    // 獲取所有input元素
    var inputs = document.getElementsByTagName('input');
    
    // 遍歷並清空它們的值
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'text' || inputs[i].type === 'number' || inputs[i].type === 'date') {
            inputs[i].value = '';
        }
    }
}


// 回傳整個日期字串
function getSessionDuration(session_dom){
    let session = new Date(session_dom.value);
    // 將西元年轉換為民國年
    let rocYear = session.getFullYear() - 1911;
    let month = session.getMonth() + 1; // getMonth() 返回 0-11
    let day = session.getDate();
    // 格式化日期，確保月和日都是兩位數
    let formattedMonth = month < 10 ? '0' + month : month;
    let formattedDay = day < 10 ? '0' + day : day;
    return `${rocYear}/${formattedMonth}/${formattedDay}`;
}
