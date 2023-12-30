window.onload = function () {
    const dataString = localStorage.getItem('data'); // 從 localStorage 獲取值
    const data = JSON.parse(dataString);
    renderDay(data);
    render_recordId(data.year,data.month,data.day);
    renderCompany(data.companyName,data.vpnAccount);
    renderConnect(data.deviceName,data.sessionStart,data.sessionEnd,data.connectionPurpose,data.sourceIP);
    if(data.companyName === '精誠科技整合股份有限公司'){
        render_fw(data.vpnAccount,"SSLVPN-Group",data.fw_admin,data.fw_year,data.fw_month,data.fw_day,data.fw_directions);
    }
    else if(data.companyName === '群璇地理資訊'){
        render_fw(data.sourceIP,'10.0.5.132',data.fw_admin,data.fw_year,data.fw_month,data.fw_day,data.fw_directions);
    }
    else if(data.companyName === '光特資訊科技股份有限公司'){
        render_fw(data.sourceIP,'10.0.5.5',data.fw_admin,data.fw_year,data.fw_month,data.fw_day,data.fw_directions);
    }

    convertHTMLtoPDF();
}


function convertHTMLtoPDF() {
    const divID = document.getElementById('divID');
    //如果要調整解析度在這粒scale值放大
    html2canvas(divID,{ scale: 2 }).then(canvas => {
        // 將 canvas 轉換為圖片
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', [297, 210]);
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
    });
    
    
    
    
    
    // const { jsPDF } = window.jspdf;
    // console.log(jsPDF);
    // //let doc = new jsPDF('l', 'mm', [1500, 1400]);
    // const doc = new jsPDF('p', 'mm', 'a4');
    // let pdfjs = document.querySelector('#divID');
    // doc.html(pdfjs, {
    //     callback: function (doc) {
    //         doc.save("newpdf.pdf");
    //     },
    //     x: 12,
    //     y: 12
    // });
} 
function renderDay(data){
    const yearOutput =  `  ${data.year}  年`;
    const monthOutput =`  ${data.month}  月`;
    const dayOutput =`  ${data.day}  日`;    
    const yearRender = document.querySelectorAll('.year');
    const monthRender = document.querySelectorAll('.month');
    const dayRender = document.querySelectorAll('.day');
    yearRender.forEach((Item) => {
        Item.textContent = yearOutput;
    })
    monthRender.forEach((Item)=>{
        Item.textContent = monthOutput;
    })
    dayRender.forEach((Item)=>{
        Item.textContent = dayOutput;
    })
    
}
function renderCompany(companyInput,vpnAccountInput){
    const companyName = document.getElementById('companyName');
    const companyTel = document.getElementById('companyTel');
    const companyAdr = document.getElementById('companyAdr');
    const vpnAccount = document.getElementById('vpnAccount');
    if(companyInput === "精誠科技整合股份有限公司"){
        const tel = '02-77201888';
        const address = '台北市內湖區瑞光路318號6樓';
        companyName.textContent = companyInput;
        companyTel.textContent = tel;
        companyAdr.textContent = address;
    }
    else if(companyInput ==='群璇地理資訊')
    {
        const tel = '0930848267';
        const address = '台北市和平東路二段53巷2號5樓';
        companyName.textContent = companyInput;
        companyTel.textContent = tel;
        companyAdr.textContent = address;
    }
    else if(companyInput === '光特資訊科技股份有限公司'){
        const tel = '(02)25575558#15';
        const address = '臺北市大同區重慶北路2段197號3樓';
        companyName.textContent = companyInput;
        companyTel.textContent = tel;
        companyAdr.textContent = address;

    }
    else{
        alert('非內建廠商');
    }
    vpnAccount.textContent = `VPN帳號名稱:${vpnAccountInput}`;
}
function renderConnect(deviceNameInput,sessionStart,sessionEnd,connectionPurposeInput,sourceIPInput){
    const sessionDuration = `(起訖日:${sessionStart}-${sessionEnd})`;
    // 取出要render的dom
    const deviceName = document.getElementById('deviceName');
    const connectionPurpose = document.getElementById('connectionPurpose');
    const sourceIP = document.getElementById('sourceIP')
    const sessionDuration_dom = document.getElementById('sessionDuration')
    //開始render
    deviceName.textContent = deviceNameInput;
    connectionPurpose.textContent = connectionPurposeInput;
    sourceIP.textContent = sourceIPInput;
    sessionDuration_dom.textContent = sessionDuration;
}
function render_recordId(year,month,day){
    const recordId = document.getElementById('recordId');
    const westYear = ((parseInt(year)+11).toString()).slice(-2);
    const render_recordId = `紀錄編號：U0-G-032-${westYear}0${month}0${day}-`;
    recordId.textContent = render_recordId;
}
function render_fw(sourceObj,destObj,fw_admin,fw_year,fw_month,fw_day,fw_directions){
    // 組出一個新的設定日期的字串
    const fw_date = `${fw_year}/${fw_month.toString().padStart(2, '0')}/${fw_day.toString().padStart(2, '0')}`;
    // 取出isms.html中要render的dom
    const sourceObj_dom= document.getElementById('sourceObj');
    const destObj_dom = document.getElementById('destObj');
    const fw_admin_dom = document.getElementById('fw_admin');
    const fw_date_dom = document.getElementById('fw_date');
    const fw_directions_dom = document.getElementById('fw_directions');
    //開始render
    sourceObj_dom.textContent = sourceObj;
    destObj_dom.textContent = destObj;
    fw_admin_dom.textContent = fw_admin;
    fw_date_dom.textContent = fw_date;
    fw_directions_dom.textContent = fw_directions;
}